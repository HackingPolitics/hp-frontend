<template>
  <div class="">
    <div v-if="accountIsActivated" class="text-green-500">
      Ihr Konto ist nun aktiviert. Sie können sich ab sofort einloggen.
    </div>
    <div v-if="errorOnActivation" class="text-red-500">
      Fehler bei der Aktivierung.
    </div>
    <div>
      <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Anmelden</h2>
      <p class="mt-2 text-sm text-gray-600 max-w">
        Oder
        <nuxt-link
          to="/registrieren"
          class="font-medium text-purple-400 hover:text-purple-500"
        >
          einen neuen Account anlegen
        </nuxt-link>
      </p>
    </div>

    <div class="mt-8">
      <div class="mt-6">
        <FormulateForm
          v-slot="{ isLoading }"
          v-model="credentials"
          name="login"
          class="space-y-6"
          :form-errors="formErrors"
          :errors="inputErrors"
          @submit="handleLogin"
        >
          <FormulateInput
            label="Username oder E-Mail"
            placeholder="Username oder E-Mail eingeben"
            name="username"
            type="text"
            validation="required"
            :validation-messages="{
              required: 'Username oder E-Mail eingeben',
            }"
          />

          <div class="space-y-1">
            <FormulateInput
              label="Passwort"
              placeholder="Passwort eingeben"
              name="password"
              type="password"
              validation="required"
              :validation-messages="{
                required: 'Passwort prüfen',
              }"
            />
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center"></div>

            <div class="text-sm">
              <nuxt-link
                to="/passwort-vergessen"
                class="font-medium text-purple-400 hover:text-purple-500"
              >
                Passwort vergessen
              </nuxt-link>
            </div>
          </div>

          <div>
            <FormulateInput
              type="submit"
              :label="isLoading ? 'Sie werden eingeloggt...' : 'Einloggen'"
            />
          </div>
        </FormulateForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  Ref,
  ref,
  useMeta,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LoginPage',
  layout: 'auth',
  setup() {
    const formErrors: Ref<string[]> = ref([])
    const inputErrors = ref({})
    const credentials = ref(null)
    const accountIsActivated = ref(false)
    const errorOnActivation = ref(false)
    const store = useStore()

    const handleLogin = async () => {
      const response = await store.dispatch('auth/login', credentials.value)
      if (response && response.response && response.response.status) {
        switch (response.response.status) {
          case 422:
            inputErrors.value = response.response.data.errors // assign field errors
            formErrors.value.push(response.response.data.message)
            return
          case 401:
            if (response.response.data.message === 'Invalid credentials') {
              formErrors.value = ['Logindaten überprüfen']
              return
            }
            inputErrors.value = response.response.data.errors // assign field errors
            formErrors.value.push(response.response.data.message)
        }
      }
    }

    useMeta({ title: 'Login | HackingPolitics' })
    return {
      credentials,
      handleLogin,
      accountIsActivated,
      errorOnActivation,
      inputErrors,
      formErrors,
    }
  },
  head: {},
})
</script>
