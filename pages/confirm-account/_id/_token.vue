<template>
  <div class="flex flex-col items-center">
    <h2 class="my-6 text-center text-3xl font-extrabold text-gray-900">
      E-Mail Bestätigung
    </h2>
    <div
      class="flex flex-col items-center space-y-4 bg-white w-96 py-8 px-4 sm:px-10"
    >
      <div v-if="loading" class="flex flex-col items-center">
        <loading-indicator></loading-indicator>
        <div class="mt-8 text-sm text-gray-500">
          Ihre E-Mail wird bestätitgt...
        </div>
      </div>
      <div v-if="error && loading" class="text-green-600 text-center">
        <div key="success-notice">
          <div class="my-8">
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-black"
            >
              <!-- Heroicon name: outline/check -->
              <svg
                class="h-6 w-6 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <h3
                id="modal-title"
                class="text-lg leading-6 font-medium text-gray-900"
              >
                Erfolgreich bestätigt
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Die Emailadresse wurde erfolgreich bestätigt.
                </p>
              </div>
            </div>
            <div class="mt-5 sm:mt-6">
              <nuxt-link
                to="/login"
                class="transition duration-150 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-400 text-base font-medium text-black hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:text-sm"
              >
                Zum Login
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div v-if="error && !loading" class="text-red-600 text-center">
        <div key="error-notice">
          <div class="my-8">
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-black"
            >
              <!-- Heroicon name: outline/check -->
              <svg
                class="h-6 w-6 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <h3
                id="modal-title"
                class="text-lg leading-6 font-medium text-gray-900"
              >
                Nicht erfolgreich
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Es konnte keine Emailadresse bestätigt werden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!error && !loading">
        <nuxt-link to="/login">
          <button
            type="button"
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Zum Login
          </button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useMeta,
  useStore,
  computed,
  useRoute,
} from '@nuxtjs/composition-api'

import { AuthState } from '~/store/auth'

interface State {
  auth: AuthState
}

export default defineComponent({
  name: 'ConfirmAccountPage',
  layout: 'auth',
  setup() {
    const store = useStore<State>()
    const route = useRoute()

    const id = computed(() => route.value.params.id)
    const token = computed(() => route.value.params.token)
    const confirmationData = ref({ id, token })

    const validateToken = async () => {
      await store.dispatch('auth/confirmEmailAddress', confirmationData.value)
    }

    validateToken()

    const loading = computed(() => store.state.auth.isLoading)
    const error = computed(() => store.state.auth.errors)

    useMeta({ title: 'E-Mail bestätigen | HackingPolitics' })
    return {
      confirmationData,
      loading,
      error,
    }
  },
  head: {},
})
</script>
