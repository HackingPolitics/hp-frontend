<template>
  <div class="min-h-screen bg-white flex">
    <div
      class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Anmelden</h2>
          <p class="mt-2 text-sm text-gray-600 max-w">
            Oder
            <nuxt-link
              to="/registrieren"
              class="font-medium text-yellow-400 hover:text-yellow-500"
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
              @submit="handleLogin"
            >
              <FormulateInput
                label="E-Mail-Adresse"
                placeholder="E-Mail-Adresse eingeben"
                name="username"
                type="email"
                validation="required|email"
              />

              <div class="space-y-1">
                <FormulateInput
                  label="Passwort"
                  placeholder="Passwort eingeben"
                  name="password"
                  type="password"
                  validation="required"
                />
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center"></div>

                <div class="text-sm">
                  <nuxt-link
                    to="/passwort-vergessen"
                    class="font-medium text-yellow-400 hover:text-yellow-500"
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
    </div>
    <div class="hidden lg:block relative w-0 flex-1">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1511044676171-fa1c680222c4?ixlib=rb-1.2.1&ixqx=XuwRpuUDYo&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt=""
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useMeta,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const credentials = ref(null)
    const store = useStore()

    const handleLogin = () => {
      store.dispatch('auth/login', credentials.value)
    }
    useMeta({ title: 'Login | HackingPolitics' })
    return {
      credentials,
      handleLogin,
    }
  },
  head: {},
})
</script>
