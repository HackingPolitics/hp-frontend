<template>
  <div>
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

    const id = computed(() => route.value.params.id)
    const token = computed(() => route.value.params.token)
    const hasParams = ref(false)
    const credentials = ref({})

    console.log(id, token)
    const resetPassword = () => {
      store.dispatch('auth/resetPassword', credentials.value)
    }

    useMeta({ title: 'Passwort zurücksetzen | HackingPolitics' })
    return {
      credentials,
      resetPassword,
      hasParams,
    }
  },
  head: {},
})
</script>
