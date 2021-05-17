<template>
  <div>
    <main-nav></main-nav>
    <breadcrumps-bar></breadcrumps-bar>
    <main class="max-w-lg mx-auto pt-10 pb-12 px-4 lg:pb-16">
      <div class="w-full flex justify-end">
        <div class="flex -space-x-1">
          <collab-user
            v-for="user in users"
            :key="user.userID"
            :user-name="user.username[0].toUpperCase()"
          />
        </div>
      </div>
      <form @submit.prevent>
        <div class="space-y-6">
          <div>
            <div class="flex items-center space-x-2">
              <div
                class="h-3 w-3 rounded-full"
                :class="hasJoined ? 'bg-green-400' : 'bg-red-400'"
              ></div>
              <h1 class="text-lg leading-6 font-medium text-gray-900">
                Collaboration Test
              </h1>
            </div>
            <p class="mt-1 text-sm text-gray-500">
              Formfelder mit Websocket bearbeiten und sperren.
            </p>
          </div>

          <div>
            <label
              for="project_name"
              class="block text-sm font-medium text-gray-700"
            >
              Thema
            </label>

            <div class="mt-1">
              <div class="flex items-center space-x-1">
                <input
                  id="project_title"
                  v-model="title"
                  type="text"
                  name="project_name"
                  class="block w-full shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm border-gray-300 rounded-md disabled:bg-gray-100"
                  :disabled="checkIfLocked('title')"
                  @blur="blurEvent('title', title)"
                  @click="clickEvent('title', title)"
                  @input="changeEvent('title', title)"
                />
                <div class="w-5">
                  <div
                    v-if="checkIfLocked('title')"
                    class="w-5 h-5 rounded-full bg-green-400 flex items-center text-xs justify-center text-white"
                  >
                    {{ getLockedByUserName('title') }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label
              for="description"
              class="block text-sm font-medium text-gray-700"
            >
              Beschreibung
            </label>
            <div class="mt-1">
              <div class="flex items-center space-x-1">
                <textarea
                  id="project_description"
                  v-model="description"
                  name="description"
                  rows="3"
                  class="block w-full shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm border-gray-300 rounded-md disabled:bg-gray-100"
                  :disabled="checkIfLocked('description')"
                  @blur="blurEvent('description', description)"
                  @click="clickEvent('description', description)"
                  @input="changeEvent('description', description)"
                ></textarea>
                <div class="w-5">
                  <div
                    v-if="checkIfLocked('description')"
                    class="w-5 h-5 rounded-full bg-green-400 flex items-center text-xs justify-center text-white"
                  >
                    {{ getLockedByUserName('description') }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label for="tags" class="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <input
              id="tags"
              type="text"
              name="tags"
              class="mt-1 block w-full shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div class="flex justify-end">
            <button
              type="button"
              class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              @click="leaveGroup"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  onUnmounted,
  ref,
  Ref,
} from '@nuxtjs/composition-api'
import { getStoredAuthToken } from '~/utils/authToken'
import { getRandomBgColor } from '~/utils/randomColors'

interface Field {
  fieldID: string
  fieldValue: any
  lockedByUserID: string
  lockedByUsername: string
}

export default defineComponent({
  name: 'CollaborationPage',
  middleware: 'isLoggedin',
  setup() {
    const title: Ref<string> = ref('Project Nero')
    const description: Ref<string> = ref('Project Nero')
    const hasJoined: Ref<boolean> = ref(false)

    // Here, we want Nuxt context instead.
    const ctx: any = useContext()

    // Setup context:
    // For example, nuxt-socket-io has a built-in
    // teardown feature which will need the onUnmounted hook
    ctx.onUnmounted = onUnmounted

    // And finally, we can get the socket like before:
    // (instead of "this", it's "ctx" because that's the
    // context here)
    const token = getStoredAuthToken()
    const socket = ctx.$nuxtSocket({
      reconnection: false,
      auth: {
        token,
      },
    })

    socket.emit('joinGroup', 'test', (data: any) => {
      if (data.status === 'ok') {
        hasJoined.value = true
        socket.emit('getDocument', (data: any) => {
          console.log('getDocument', data)
        })

        socket.emit('getUserList', (data: any) => {
          console.log('getUserList', data)
        })
      }
    })

    const leaveGroup = () => {
      socket.emit('leaveGroup', 'test')
    }

    const users = ref([])
    socket.on('updateUsers', (data: any) => {
      users.value = data
      console.log('updateUsers', data)
    })

    // Locked Fields
    const lockedFields: Ref<Field[]> = ref([])
    socket.on('updateDocument', (data: any) => {
      const fields: Field[] = Object.values(data)
      lockedFields.value = fields.filter(
        (el: Field) => el.lockedByUserID != null
      )
      const field = lockedFields.value.find((el) => el.fieldID === 'title')
      if (field) {
        title.value = field.fieldValue
      }

      const fieldDescription = lockedFields.value.find(
        (el) => el.fieldID === 'description'
      )
      if (fieldDescription) {
        description.value = fieldDescription.fieldValue
      }
    })

    const blurEvent = (field: string, ref: Ref) => {
      socket.emit('unlockField', { fieldID: field, fieldValue: ref })
    }

    const clickEvent = (field: string, ref: Ref) => {
      socket.emit('lockField', { fieldID: field, fieldValue: ref })
    }

    const changeEvent = (field: string, ref: Ref) => {
      socket.emit('updateField', { fieldID: field, fieldValue: ref })
    }

    onUnmounted(() => {
      socket.emit('leaveGroup', 'test')
    })

    const checkIfLocked = (field: any): boolean => {
      if (lockedFields) {
        const check = lockedFields.value.find(
          (el: Field) => el.fieldID === field
        )
        return !!check
      }
      return false
    }

    const getLockedByUserName = (field: string): string | null => {
      if (lockedFields) {
        const lockedField: Field | undefined = lockedFields.value.find(
          (el: Field) => el.fieldID === field
        )

        return lockedField
          ? lockedField.lockedByUsername[0].toUpperCase()
          : null
      }
      return null
    }

    return {
      title,
      blurEvent,
      clickEvent,
      changeEvent,
      users,
      lockedFields,
      description,
      leaveGroup,
      getRandomBgColor,
      hasJoined,
      checkIfLocked,
      getLockedByUserName,
    }
  },
})
</script>
