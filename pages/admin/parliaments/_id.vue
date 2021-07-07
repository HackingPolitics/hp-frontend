<template>
  <div class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
    <div v-if="parliament" class="w-full flex justify-between">
      <nuxt-link
        :to="localePath({ name: 'admin-parliaments' })"
        class="
          rounded-full
          w-10
          h-10
          bg-gray-50
          shadow-sm
          flex
          items-center
          justify-center
          cursor-pointer
          hover:bg-white hover:shadow
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </nuxt-link>
    </div>

    <loading-indicator v-if="isLoading"></loading-indicator>

    <section v-if="parliament" aria-labelledby="parliament_heading">
      <div class="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
        <FormulateForm v-model="formData" @submit="updateParliament">
          <div class="py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Parlament: {{ parliament.title }}
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                Daten für das Parlament bearbeiten
              </p>
            </div>
            <forms-admin-parliament-field></forms-admin-parliament-field>
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
            <FormulateInput type="submit"> Speichern </FormulateInput>
          </div>
        </FormulateForm>
      </div>
    </section>

    <section v-if="parliament" aria-labelledby="parliament_heading">
      <div class="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
        <div class="py-6 px-4 space-y-6 sm:p-6">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Fraktionen
            </h3>
            <p class="mt-1 text-sm text-gray-500">Fraktionen bearbeiten</p>
          </div>
        </div>
        <div v-if="parliament.fractions && parliament.fractions.length">
          <admin-fraction-list
            :fractions="parliament.fractions"
            @update-fraction="updateFraction($event)"
          ></admin-fraction-list>
          <div class="py-6 px-4 space-y-6 sm:p-6">
            <base-button
              v-if="!newFraktionForm"
              class="mt-4"
              @click="newFraktionForm = true"
              >weitere Fraktion erstellen</base-button
            >
          </div>
        </div>
        <div class="py-6 px-4 space-y-6 sm:p-6">
          <div
            v-if="
              !newFraktionForm &&
              parliament.fractions &&
              parliament.fractions.length === 0
            "
            class="text-center flex flex-col items-center py-6"
          >
            <div class="text-gray-500 text-sm">
              Noch keine Fraktionen erstellt
            </div>
            <base-button class="mt-4" @click="newFraktionForm = true"
              >Neue Fraktion erstellen</base-button
            >
          </div>
          <FormulateForm
            v-if="newFraktionForm"
            v-model="fractionFormData"
            class="bg-gray-50 p-2 rounded-md"
            @submit="createFraction"
          >
            <forms-admin-fraction-field></forms-admin-fraction-field>
            <div class="w-full flex justify-end items-center space-x-4">
              <div
                class="
                  text-gray-600 text-sm
                  hover:text-purple-500
                  cursor-pointer
                "
                @click="newFraktionForm = false"
              >
                Abbrechen
              </div>
              <FormulateInput type="submit">Fraktion erstellen</FormulateInput>
            </div>
          </FormulateForm>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  useRoute,
  useStore,
} from '@nuxtjs/composition-api'
import { useAxios } from '~/composables/useAxios'
import { IFraction, IParliament } from '~/types/apiSchema'

export default defineComponent({
  name: 'AdminParlaments',
  layout: 'admin',
  setup() {
    const formData = ref(null)
    const axios = useAxios()
    const parliament = ref<IParliament | null>(null)
    const isLoading = ref(false)

    const store = useStore()

    const route = useRoute()
    const fetchData = async () => {
      isLoading.value = true
      try {
        const response = await axios.get(`/councils/${route.value.params.id}`)
        console.log(response)

        parliament.value = response.data
        formData.value = response.data
        // @ts-ignore
        if (formData?.value && formData?.value?.federalState) {
          // @ts-ignore
          formData.value.federalState = response.data.federalState['@id']
        }
        isLoading.value = false
      } catch (error) {
        isLoading.value = false
      }
    }
    fetchData()

    const context = useContext()

    const updateParliament = async () => {
      isLoading.value = true
      try {
        await axios.put(`/councils/${route.value.params.id}`, formData.value)
        fetchData()

        // @ts-ignore
        context.$notify({
          title: 'Parlament aktualisiert',
          duration: 300,
          type: 'success',
        })
        isLoading.value = false
      } catch (error) {
        isLoading.value = false
        // @ts-ignore
        context.$notify({
          title: 'Parlament konnte nicht aktualisiert werden',
          duration: 300,
          type: 'warn',
        })
      }

      console.log(formData.value)
    }

    const newFraktionForm = ref(false)
    const fractionFormData = ref<IParliament | null>(null)
    const errors = ref(null)

    const createFraction = async () => {
      try {
        const payload = {
          ...fractionFormData.value,
          memberCount: fractionFormData.value
            ? parseInt(fractionFormData.value.memberCount)
            : 0,
          council: parliament.value ? parliament.value['@id'] : null,
          color: fractionFormData.value
            ? fractionFormData.value.color.slice(1)
            : '000000',
        }
        await axios.post('/fractions', payload)
        newFraktionForm.value = false
        fetchData()
        // @ts-ignore
        context.$notify({
          title: 'Fraktion erstellt',
          duration: 300,
          type: 'success',
        })
      } catch (error) {
        errors.value = error.response.data
        // @ts-ignore
        context.$notify({
          title: 'Parlament konnte nicht erstellt werden',
          duration: 300,
          type: 'error',
        })
      }
    }

    const updateFraction = async (el: { id: string; payload: IFraction }) => {
      await store.dispatch('fractions/updateFraction', { ...el }).then(() => {
        fetchData()
      })
    }

    return {
      errors,
      parliament,
      isLoading,
      formData,
      updateParliament,
      newFraktionForm,
      createFraction,
      updateFraction,
      fractionFormData,
    }
  },
})
</script>
