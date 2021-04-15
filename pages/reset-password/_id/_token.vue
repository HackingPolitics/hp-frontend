<template>
  <div v-if="response === null">
    <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Neues Passwort</h2>
    <p class="mt-2 text-sm text-gray-600 max-w">
      Geben Sie Ihr neues Passwort an.
    </p>
    <div class="bg-white py-8">
      <FormulateForm
        v-slot="{ isLoading }"
        v-model="credentials"
        name="login"
        class="space-y-6"
        @submit="resetPassword"
      >
        <FormulateInput
          label="Neues Passwort"
          placeholder="Passwort eingeben"
          name="password"
          help="Passwort soll mindestens einen Klein- und Großbuchstabe, eine Zahl und ein Zeichen enthalten."
          type="password"
          :validation="[
            ['required'],
            ['min', 4, 'length'],
            [
              'matches',
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.,(){}]).{4,}$/,
            ],
          ]"
          :validation-messages="{
            matches:
              'Passwort soll mindestens einen Klein- und Großbuchstabe, eine Zahl und ein Zeichen enthalten.',
          }"
        />

        <FormulateInput
          label="Passwort wiederholen"
          placeholder="Passwort wiederholen"
          name="password_confirm"
          type="password"
          validation="required|confirm"
        />

        <div>
          <FormulateInput
            type="submit"
            :label="
              isLoading
                ? 'Passwort wird zurückgesetzt...'
                : 'Passwort zurücksetzen'
            "
          />
        </div>
      </FormulateForm>
    </div>
  </div>
  <div v-else-if="response && response.success" key="success-notice">
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
          Passwort zurückgesetzt
        </h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500">
            Wir haben das Passwort erfolgreich zurückgesetzt.
          </p>
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
  <div v-else-if="response && !response.success" key="error-notice">
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
            Das Passwort konnte nicht zurückgesetzt haben. Fordern Sie einen
            neuen Code zum Rücksetzen an.
          </p>
        </div>
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

export default defineComponent({
  name: 'ResetPasswordPage',
  layout: 'auth',
  setup() {
    const store = useStore()
    const route = useRoute()
    const response = ref(null)

    const id = computed(() => route.value.params.id)
    const token = computed(() => route.value.params.token)
    const credentials = ref({
      token,
      id,
    })

    const resetPassword = async () => {
      response.value = await store.dispatch(
        'auth/resetPassword',
        credentials.value
      )
    }

    useMeta({ title: 'Passwort zurücksetzen | HackingPolitics' })
    return {
      credentials,
      resetPassword,
      response,
    }
  },
  head: {},
})
</script>
