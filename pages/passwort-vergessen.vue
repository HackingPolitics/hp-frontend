<template>
  <div>
    <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
      Passwort zurücksetzen
    </h2>
    <p class="mt-2 text-sm text-gray-600 max-w">
      Geben Sie bitte Ihr Nutzername an. Sie bekommen danach eine E-Mail mit
      weiteren Informationen.
    </p>

    <div class="bg-white py-8">
      <FormulateForm
        v-model="credentials"
        name="login"
        class="space-y-6 mb-6"
        @submit="passwordResetRequest"
      >
        <FormulateInput
          v-if="!loading"
          label="Nutzername"
          placeholder="Nutzername eingeben"
          name="username"
          validation="required"
        />
        <loading-indicator v-if="loading"></loading-indicator>
        <span
          v-if="!loading && error"
          class="text-center mt-2 text-sm text-red-600"
        >
          Ihr Nutzername konnte nicht bestätigt werden. Bitte versuchen Sie es
          erneut.
        </span>
        <span
          v-if="!loading && !error && success"
          class="text-center mt-2 text-sm text-green-600"
        >
          Die Abfrage war erfolgreich. Bitte überprüfen Sie Ihr E-Mail Postfach
          für die weitere Informationen.
        </span>
        <FormulateInput
          type="submit"
          :label="loading ? 'Lädt...' : 'Passwort zurücksetzen'"
        />
      </FormulateForm>
      <nuxt-link
        :to="localePath('/login')"
        class="
          mt-6
          text-sm text-purple-400
          max-w
          font-medium
          hover:text-purple-500
        "
      >
        Zurück zum Login
      </nuxt-link>
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
} from '@nuxtjs/composition-api'

import { AuthState } from '~/store/auth_old'

interface State {
  auth: AuthState
}

export default defineComponent({
  name: 'ForgotPasswordPage',
  layout: 'auth',
  setup() {
    const store = useStore<State>()
    const credentials = ref({
      username: '',
      validationUrl: `${window.location.origin}/reset-password/{{id}}/{{token}}`,
    })
    const passwordResetRequest = () => {
      store.dispatch('auth/passwordResetRequest', credentials.value)
    }
    useMeta({ title: 'Passwort zurücksetzen | HackingPolitics' })
    return {
      loading: computed(() => store.state.auth.isLoading),
      error: computed(() => store.state.auth.errors),
      success: computed(() => store.state.auth.passwordResetRequestSuccess),
      credentials,
      passwordResetRequest,
    }
  },
  head: {},
})
</script>
