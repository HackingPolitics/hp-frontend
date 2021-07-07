<template>
  <div class="">
    <div v-if="errors">
      <div class="text-red-500 mt-4 text-sm">
        {{ $t(`errors.${errors.message}`) }}
      </div>
    </div>
    <div>
      <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Anmelden</h2>
      <p class="mt-2 text-sm text-gray-600 max-w">
        Oder
        <nuxt-link
          :to="localePath('/registrieren')"
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
                :to="localePath('/passwort-vergessen')"
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
  ref,
  useContext,
  useMeta,
  useRouter,
  useStore,
} from '@nuxtjs/composition-api'

import jwtDecode from 'jwt-decode'
import formErrorsHandling from '~/composables/formErrorsHandling'
import { useAxios } from '~/composables/useAxios'
import { RootState } from '~/store'
import { JwtPayloadWithUser } from '~/store/authentication'

export default defineComponent({
  name: 'LoginPage',
  layout: 'auth',
  setup() {
    const { formErrors, inputErrors, handleStatusErrors } = formErrorsHandling()

    const credentials = ref(null)
    const accountIsActivated = ref(false)
    const errorOnActivation = ref(false)
    const store = useStore<RootState>()
    const errors = ref(null)

    const context = useContext()
    const axios = useAxios()

    const router = useRouter()

    const handleLogin = async () => {
      try {
        const response = await context.$auth.loginWith('local', {
          data: credentials.value,
        })
        // @todo Philipp: remove debug, try/catch around jwtDecode
        console.log(response)
        // @ts-ignore
        const decoded = jwtDecode<JwtPayloadWithUser>(response.data.token)
        try {
          const user = await axios.get(`/users/${decoded.id}`)
          context.$auth.setUser(user.data)

          if (store.state.projects.createdProject) {
            await store.dispatch(
              'projects/createProject',
              store.state.projects.createdProject
            )
          }

          router.push('/antraege')
          console.log(user)
        } catch (error) {
          console.log('user', error.response.data)
        }
      } catch (error) {
        errors.value = error.response.data
        console.log('login', error.response.data)
      }

      //   handleStatusErrors(response)
    }

    useMeta({ title: 'Login | HackingPolitics' })
    return {
      credentials,
      handleLogin,
      accountIsActivated,
      errorOnActivation,
      inputErrors,
      formErrors,
      errors,
    }
  },
  head: {},
})
</script>
