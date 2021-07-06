<template>
  <div class="mt-8">
    <h3 class="font-semibold text-gray-800 text-xl">Eigeninteressen</h3>
    <p class="text-sm text-gray-500 mt-2">
      Wähle eine Fraktion aus, um die Eigeninteressen zu formulieren und
      anzuzeigen.
    </p>
    <div class="mt-4">
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select a tab</label>
        <select
          id="tabs"
          name="tabs"
          class="
            block
            w-full
            focus:ring-indigo-500 focus:border-indigo-500
            border-gray-300
            rounded-md
          "
        >
          <option v-for="fraction in fractions" :key="fraction.id">
            {{ fraction.name }}
          </option>
        </select>
      </div>
      <div class="hidden sm:block">
        <nav class="flex space-x-4" aria-label="Tabs">
          <button
            v-for="fraction in fractions"
            :key="fraction.id"
            class="px-3 py-2 font-medium rounded-md"
            :class="
              activeFraction && activeFraction.id === fraction.id
                ? 'bg-purple-200 text-purple-700'
                : 'text-gray-500 hover:text-gray-700'
            "
            @click="activeFraction = fraction"
          >
            {{ fraction.name }}
          </button>
        </nav>
      </div>
    </div>
    <div class="mt-4">
      <div v-if="fractionInterests && fractionInterests.length">
        <FormulateInput
          v-for="interest in fractionInterests"
          :key="interest.id"
          :value="interest.description"
          :wrapper-class="['border-l-4']"
          type="textarea"
        >
        </FormulateInput>
      </div>
      <div v-else class="w-full text-center text-gray-500 py-6">
        Noch keine Interessen für diese Fraktion angelegt
      </div>
    </div>

    <FormulateForm
      v-if="activeFraction && newInterestForm"
      v-model="formData"
      class="mt-4"
      @submit="createFractionInterest"
    >
      <FormulateInput
        type="textarea"
        name="description"
        validation="required"
      />
      <FormulateInput type="submit"
        >Interesse für {{ activeFraction.name }} hinzufügen</FormulateInput
      >
    </FormulateForm>
    <base-button
      v-if="!newInterestForm"
      class="
        bg-white
        mt-8
        text-purple-500
        border border-gray-400
        flex
        items-center
        hover:text-white hover:bg-purple-500
      "
      @click="newInterestForm = true"
    >
      Fraktionsinteresse hinzufügen</base-button
    >
    <div
      v-if="newInterestForm"
      class="text-red-500 text-sm cursor-pointer text-right"
      @click="newInterestForm = false"
    >
      Abbrechen
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  watch,
  computed,
  useContext,
  useStore,
  useRoute,
} from '@nuxtjs/composition-api'
import { useAxios } from '~/composables/useAxios'
import { RootState } from '~/store'
import { IFraction, IFractionDetails } from '~/types/apiSchema'

export default defineComponent({
  props: {
    fractions: {
      type: Array as PropType<IFraction[]>,
      default: null,
    },
    fractionDetails: {
      type: Array as PropType<IFractionDetails[]>,
      default: null,
    },
  },
  setup(props) {
    const activeFraction = ref<IFraction | null>(null)
    watch(
      () => props.fractions,
      () => {
        if (props.fractions && props.fractions.length) {
          activeFraction.value = props.fractions[0]
        }
      },
      {
        immediate: true,
      }
    )
    const formData = ref({ description: null })
    const axios = useAxios()

    const newInterestForm = ref(false)

    const context = useContext()
    const store = useStore<RootState>()
    const route = useRoute()

    const projectId = computed(() => {
      return store.state.projects.project?.['@id']
    })

    const createFractionDetail = async () => {
      if (projectId.value && activeFraction.value) {
        try {
          const response = await axios.post('/fraction_details', {
            project: projectId.value,
            fraction: activeFraction.value?.['@id'],
          })

          console.log(response)
          return response
        } catch (error) {}
      }
    }

    const createFractionInterest = async () => {
      if (activeFractionDetails.value) {
        if (activeFraction.value) {
          try {
            await axios.post('/fraction_interests', {
              description: formData?.value?.description,
              fractionDetails: activeFractionDetails.value?.['@id'],
            })

            // @ts-ignore
            context.$notify({
              title: 'Neues Fraktionsinteresse erstellt',
              duration: 300,
              type: 'success',
            })
            formData.value.description = null
            newInterestForm.value = false
            store.dispatch('projects/fetchProject', route.value.params.id)
          } catch (error) {
            // @ts-ignore
            context.$notify({
              title: 'Interesse konnte nicht erstellt werden',
              duration: 300,
              type: 'warn',
            })
          }
        }
      } else {
        const fractionDetails = await createFractionDetail()
        // create new details and add interest
        try {
          await axios.post('/fraction_interests', {
            description: formData?.value?.description,
            fractionDetails: fractionDetails?.data?.['@id'],
          })

          // @ts-ignore
          context.$notify({
            title: 'Neues Fraktionsinteresse erstellt',
            duration: 300,
            type: 'success',
          })
          formData.value.description = null
          newInterestForm.value = false
          store.dispatch('projects/fetchProject', route.value.params.id)
        } catch (error) {
          // @ts-ignore
          context.$notify({
            title: 'Interesse konnte nicht erstellt werden',
            duration: 300,
            type: 'warn',
          })
        }
      }
    }

    const activeFractionDetails = computed(() => {
      if (activeFraction && activeFraction.value && props.fractionDetails) {
        return props.fractionDetails.find((detail: IFractionDetails) => {
          if (activeFraction && activeFraction.value) {
            return activeFraction.value.id === detail.fraction.id
          }
          return undefined
        })
      }
      return null
    })

    const fractionInterests = computed(() => {
      if (activeFractionDetails.value) {
        return activeFractionDetails.value?.interests
      }
      return null
    })

    return {
      createFractionInterest,
      activeFraction,
      formData,
      fractionInterests,
      newInterestForm,
      activeFractionDetails,
    }
  },
})
</script>