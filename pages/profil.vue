<template>
  <div>
    <layouts-header-title title="Mein Profil"> </layouts-header-title>
    <div
      class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 max-w-screen-xl mx-auto"
    >
      <FormulateForm v-model="formData">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Profile
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-3 sm:col-span-2">
                <FormulateInput
                  id="username"
                  type="text"
                  name="username"
                  label="Username"
                  validation="required"
                />
              </div>
            </div>
          </div>
          <div
            class="
              px-4
              py-3
              bg-gray-50
              text-right
              sm:px-6
              w-full
              flex
              justify-end
            "
          >
            <FormulateInput type="submit" label="Speichern" />
          </div>
        </div>
      </FormulateForm>

      <FormulateForm v-model="formData" @submit="updateUser">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Personal Information
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                Use a permanent address where you can recieve mail.
              </p>
            </div>

            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <FormulateInput
                  id="first_name"
                  label="Vorname"
                  type="text"
                  name="firstName"
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <FormulateInput
                  id="last_name"
                  label="Nachname"
                  type="text"
                  name="lastName"
                />
              </div>

              <div class="col-span-6 sm:col-span-4">
                <FormulateInput
                  id="email_address"
                  label="Email"
                  type="email"
                  name="email"
                  validation="required"
                />
              </div>
            </div>
          </div>
          <div
            class="
              px-4
              py-3
              bg-gray-50
              text-right
              sm:px-6
              w-full
              flex
              justify-end
            "
          >
            <FormulateInput type="submit" label="Speichern" />
          </div>
        </div>
      </FormulateForm>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useStore,
  computed,
  useContext,
} from '@nuxtjs/composition-api'
import { watch } from '@vue/runtime-core'
import { useAxios } from '~/composables/useAxios'
import { RootState } from '~/store'
import { IUser } from '~/types/apiSchema'

export default defineComponent({
  name: 'ProfilPage',
  setup() {
    const formData = ref<IUser | null>(null)
    const store = useStore<RootState>()
    const axios = useAxios()
    const context = useContext()
    const user = computed(() => {
      return store.state.auth.user
    })

    const setFormData = () => {
      if (user.value) {
        formData.value = user.value
      }
    }

    watch(
      () => user.value,
      () => {
        console.log('hi')
        setFormData()
      },
      {
        immediate: true,
      }
    )

    const updateUser = async () => {
      if (user && user.value) {
        const id = user.value.id
        const response = await axios.put(`/users/${id}`, formData.value)
        context.$auth.setUser(response.data)
        console.log(response)
      }
    }
    return { formData, updateUser, user }
  },
})
</script>
