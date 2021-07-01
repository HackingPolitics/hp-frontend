<template>
  <FormulateForm v-model="formData" @submit="$emit('submit', formData)">
    <div>
      <div class="mt-3 sm:mt-5">
        <h3
          id="modal-title"
          class="text-lg leading-6 font-medium text-gray-900"
        >
          Neues Parlament
        </h3>
        <div class="space-y-6 flex flex-col justify-center mt-6">
          <FormulateInput
            label="In welchen Bundesland ist das Parlament?"
            type="select"
            name="federalState"
            :options="stateOptions"
          />
          <FormulateInput
            label="Der Name deine Stadt oder Gemeinde"
            type="text"
            name="name"
            help="help"
            placeholder="Bundesland wählen"
          />
          <FormulateInput
            label="Um welche politische Ebene handelt es sich?"
            type="radio"
            name="politic_ground"
            :options="{
              city: 'Stadt',
              village: 'Dorf',
              others: 'Andere',
            }"
          />
          <div class="flex justify-between w-full">
            <FormulateInput
              label="Wie heißt der Verwaltungschef?"
              type="text"
              wrapper-class="w-4/5"
            />
            <FormulateInput
              label="Wie heißt das lokale Parlament?"
              type="text"
              wrapper-class="w-4/5"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="
        mt-5
        sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense
      "
    >
      <FormulateInput type="submit" class="w-full"> Erstellen </FormulateInput>
      <button
        type="button"
        class="
          mt-3
          w-full
          inline-flex
          justify-center
          rounded-md
          border border-gray-300
          shadow-sm
          px-4
          py-2
          bg-white
          text-base
          font-medium
          text-gray-700
          hover:bg-gray-50
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
          sm:mt-0 sm:col-start-1 sm:text-sm
        "
        @click="$emit('close')"
      >
        Abbrechen
      </button>
    </div>
  </FormulateForm>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import { watch } from '@vue/runtime-core'
import { useAxios } from '~/composables/useAxios'

export default defineComponent({
  name: 'ParliamentForm',
  setup() {
    const formData = ref(null)
    const axios = useAxios()
    const states = ref<any[] | null>(null)
    const stateOptions = computed(() =>
      states.value?.map((state) => {
        return { value: state['@id'], label: state.name }
      })
    )
    const isLoading = ref(false)
    const paginationData = ref(null)
    const currentPage = ref(1)
    const currentLimit = ref(15)
    const totalItems = ref<number | null>(null)
    const fetchData = async () => {
      isLoading.value = true
      try {
        const response = await axios.get(
          `/federal_states?page=${currentPage.value}`
        )
        totalItems.value = response.data['hydra:totalItems']
        paginationData.value = response.data['hydra:view']
        states.value = response.data['hydra:member']
        isLoading.value = false
      } catch (error) {
        isLoading.value = false
      }
    }
    fetchData()

    watch(
      () => totalItems.value,
      () => {
        console.log('hi', totalItems.value, states.value?.length)
        if (totalItems && states.value) {
          if (states.value?.length !== totalItems.value) {
            currentPage.value = currentPage.value + 1
          }
        }
      },
      { immediate: true }
    )
    return { formData, currentLimit, stateOptions }
  },
})
</script>
