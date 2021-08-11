<template>
  <div class="min-h-screen bg-gray-200 flex flex-col justify-between">
    <div class="flex-1 overflow-scroll relative">
      <Nuxt />
    </div>
    <base-footer></base-footer>
    <notification-toast />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  ref,
  onMounted,
  useContext,
  useRoute,
  computed,
  useStore,
  watch,
} from '@nuxtjs/composition-api'
import { cloneDeep } from 'lodash'
import jwtDecode from 'jwt-decode'
import { useAxios } from '~/composables/useAxios'
import {
  HocuspocusProvider,
  WebSocketStatus,
} from '~/services/hocuspocus/HocuspocusProvider'
import { RootState } from '~/store'
import { TokenUpdateMessage } from '~/services/hocuspocus/OutgoingMessages/TokenUpdateMessage'
import { JwtPayloadWithUser } from '~/store/authentication'
import { AwarenessState, StateUser } from '~/types/collaborations'

export default defineComponent({
  name: 'Collaboration',
  beforeRouteEnter(_, from, next) {
    const previousRoute = from.path || from.fullPath
    next((vm) => {
      // @ts-ignore
      vm.routeBefore = previousRoute
    })
  },
  setup() {
    const context = useContext()
    const store = useStore<RootState>()
    const axios = useAxios()

    const route = useRoute()

    const projectId = ref<String>(route.value.params.id)

    const status = ref<String>('not connected')
    const provider = ref<any>(null)

    const awarenessStates = ref<AwarenessState[]>([])

    const fetchUser = async () => {
      // @ts-ignore
      const token = context.$auth.strategy.token.get()

      const decoded = jwtDecode<JwtPayloadWithUser>(token)
      if (token) {
        try {
          const user = await axios.get(`/users/${decoded.id}`)
          context.$auth.setUser(user.data)
          currentUser.value = {
            name: context.$auth.user?.username || '[not logged in]',
            id: context.$auth.user?.id || 0,
            area: null,
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchUser()

    // @ts-ignore#
    const currentUser = ref<StateUser>({
      name: context.$auth.user?.username || '[not logged in]',
      id: context.$auth.user?.id || 0,
      area: null,
    })

    const currentArea = computed(() => {
      return store.state.collaboration.currentArea
    })

    onMounted(() => {
      provider.value = new HocuspocusProvider({
        url: context.$config.WS_URL,
        name: 'project-' + projectId.value,
        parameters: { authToken: getToken() },
        onConnect: () => {
          status.value = 'connected'
        },
        onMessage: ({ _event, _message }) => {
          // any document update is applied *after* this hook
          // console.log(`[message] ◀️ ${message.name}`, event)
        },
        onOutgoingMessage: () => {
          // console.info(`[message] ▶️ ${message.name} (${message.description})`)
        },
        onClose: ({ event }) => {
          // hocuspocus-server/CloseEvent.ts:Forbidden
          if (event.code === 4403) {
            // prevent the provider from endlessly retrying
            provider.value.disconnect()
            // eslint-disable-next-line no-console
            console.log('WS disconnected, authentication failure')
          }

          status.value = 'disconnected'
        },
        onDisconnect: () => {
          if (provider.value.shouldConnect) {
            // eslint-disable-next-line no-console
            console.log(
              'WS connection closed unexpectedly, trying to reconnect...'
            )
          }
        },
        onAwarenessChange: ({ states }) => {
          awarenessStates.value = states
        },
      })
      setTimeout(sendTokenUpdate.bind(this), 5000)

      setAwarenessState()
    })

    watch(
      () => currentArea.value,
      (newVal) => {
        changeArea(newVal)
      }
    )

    watch(
      () => awarenessStates.value,
      (newVal) => {
        store.commit('collaboration/SET_AWARENESS_STATES', cloneDeep(newVal))
      }
    )

    const getToken = () => {
      // @ts-ignore
      const prefixed = cloneDeep(context.$auth.strategy.token.get()) || ''
      return prefixed.replace(
        // @ts-ignore
        `${context.$auth.strategy.options.token.type} `,
        ''
      )
    }

    const changeArea = (e: string | null) => {
      currentUser.value.area = e
      provider.value.setAwarenessField('user', currentUser.value)
    }

    const setAwarenessState = (values = {}) => {
      currentUser.value = {
        ...currentUser.value,
        ...values,
      }
      provider.value.setAwarenessField('user', currentUser.value)
    }

    const sendTokenUpdate = () => {
      // @todo how can we listen to token changes instead of polling?
      // * localStorage eventListener only triggers when the change occured in another tab
      // * $auth.$storage.watchState() did not trigger in tests (with: token, _token, _token.local, auth._token.local as key)
      setTimeout(sendTokenUpdate.bind(this), 5000)

      const current = getToken()
      if (provider.value.options.parameters.authToken === current) {
        // token did not change since the last check
        return
      }

      // update the options, even if the WS server does not receive this, so we can compare
      // any new values and also if the connection is dropped the provider can reconnect
      // with a valid token
      provider.value.options.parameters.authToken = current

      if (provider.value.status !== WebSocketStatus.Connected) {
        return
      }

      if (!current) {
        provider.value.disconnect()
        return
      }

      provider.value.send(TokenUpdateMessage, { token: current })
    }

    onBeforeUnmount(() => {
      provider?.value?.destroy()
    })

    return {
      currentUser,
      awarenessStates,
      status,
      currentArea,
    }
  },
})
</script>
