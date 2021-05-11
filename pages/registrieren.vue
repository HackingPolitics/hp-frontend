<template>
  <div class="mx-auto w-full max-w-sm lg:w-96">
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-class="transform opacity-0 translate-y-16"
      enter-to-class="transform opacity-100 "
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 "
      leave-to-class="transform opacity-0 "
    >
      <div v-if="!formSent" key="register-form">
        <div>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Registrieren
          </h2>
          <p class="mt-2 text-sm text-gray-600 max-w">
            Oder
            <nuxt-link
              to="/login"
              class="font-medium text-purple-400 hover:text-purple-500"
            >
              mit bereits vorhandenem Account einloggen
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
              @submit="createAccount"
            >
              <FormulateInput
                label="Username"
                placeholder="Username eingeben"
                name="username"
                validation="required"
              />
              <FormulateInput
                label="Vorname"
                placeholder="Vorname eingeben"
                name="firstname"
                validation="required"
              />
              <FormulateInput
                label="Nachname"
                placeholder="Nachname eingeben"
                name="lastname"
                validation="required"
              />
              <FormulateInput
                label="E-Mail-Adresse"
                placeholder="E-Mail-Adresse eingeben"
                name="email"
                type="email"
                validation="required|email"
              />

              <FormulateInput
                label="Passwort"
                placeholder="Passwort eingeben"
                name="password"
                type="password"
                help="Passwort soll mindestens einen Klein- und Großbuchstabe, eine Zahl und ein Zeichen enthalten."
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
                    isLoading ? 'Account wird erstellt...' : 'Account erstellen'
                  "
                />
              </div>
            </FormulateForm>
          </div>
        </div>
      </div>
      <div v-else key="success-notice">
        <div class="my-8">
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-black"
          >
            <!-- Heroicon name: outline/check -->
            <svg
              class="h-6 w-6 text-purple-400"
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
              Account erstellt
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                Wir haben an die angegebene Emailadresse eine Nachricht
                geschickt. Bitte überprüfe deine Inbox.
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
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
  name: 'RegisterPage',
  layout: 'auth',
  setup() {
    const credentials = ref({
      validationUrl: `${window.location.origin}/confirm-account/{{id}}/{{token}}`,
    })
    const formErrors = ref([])
    const inputErrors = ref({})
    const store = useStore()
    const formSent = ref(false)

    const createAccount = async () => {
      formSent.value = await store.dispatch('auth/register', credentials.value)
      // TODO: handle form errors
    }
    useMeta({ title: 'Account anlegen | HackingPolitics' })
    return {
      credentials,
      createAccount,
      formSent,
      inputErrors,
      formErrors,
    }
  },
  head: {},
})
</script>
