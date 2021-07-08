<template>
  <div class="space-y-6 flex flex-col justify-center mt-6">
    <FormulateInput
      label="In welchen Bundesland ist das Parlament?"
      type="select"
      name="federalState"
      :options="stateOptions"
      validation="required"
      placeholder="Bundesland wählen"
    />
    <div class="grid grid-cols-2 gap-4">
      <FormulateInput
        label="Postleitzahl"
        type="text"
        name="zipArea"
        help="help"
        validation="required"
        placeholder="Postleitzahl angeben"
      />
      <FormulateInput
        label="Name Stadt oder Gemeinde"
        type="text"
        name="location"
        help="help"
        validation="required"
        placeholder="Name angeben"
      />
    </div>

    <FormulateInput
      label="Wie heißt das lokale Parlament?"
      type="text"
      validation="required"
      name="title"
    />
    <div class="grid grid-cols-2 gap-4">
      <FormulateInput
        label="Wie heißt der Verwaltungschef?"
        type="text"
        validation="required"
        name="headOfAdministration"
      />
      <FormulateInput
        label="Titel des Verwaltungschef"
        type="text"
        name="headOfAdministrationTitle"
        help="help"
        validation="required"
        placeholder="Name angeben"
      />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <FormulateInput
        label="Website"
        type="text"
        name="url"
        help="help"
        placeholder="Name angeben"
      />

      <FormulateInput
        label="Wikipedia URL"
        type="text"
        name="wikipediaUrl"
        help="help"
        placeholder="Name angeben"
      />
    </div>
    <!-- <FormulateInput
            label="Um welche politische Ebene handelt es sich?"
            type="radio"
            name="politic_ground"
            :options="{
              city: 'Stadt',
              village: 'Dorf',
              others: 'Andere',
            }"
          /> -->
    <div class="flex justify-between w-full"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from '@nuxtjs/composition-api'
import { useAxios } from '~/composables/useAxios'

export default defineComponent({
  setup() {
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
    return { stateOptions, currentLimit }
  },
})
</script>
