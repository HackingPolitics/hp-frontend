<template>
  <forms-form-section
    :title="$t('forms.fractioninterests.interests.title')"
    :subtitle="$t('forms.fractioninterests.interests.description')"
    :locked="fieldIsLocked('fraction-interest')"
    :locked-text="setLockedFieldText('fraction-interest')"
  >
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
          v-for="(interest, index) in fractionInterests"
          :key="interest.id"
          v-model="interestDescription[index]"
          :wrapper-class="['border-l-4']"
          type="textarea"
          @focusout="updateInterest($event, interest.id)"
          @focus="setLockedField('fraction-interest')"
        >
        </FormulateInput>
      </div>
      <div v-else class="w-full text-center text-gray-500 py-6">
        {{ $t('forms.fractioninterests.interests.noInterests') }}
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
      <FormulateInput type="submit">
        <i18n path="forms.fractioninterests.interests.addInterest" tag="span">
          <template #fraction>
            {{ activeFraction.name }}
          </template>
        </i18n>
      </FormulateInput>
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
      @click="openFractionInterestForm"
    >
      {{ $t('forms.fractioninterests.interests.newInterest') }}</base-button
    >
    <div
      v-if="newInterestForm"
      class="text-red-500 text-sm cursor-pointer text-right"
      @click="closeFractionInterestForm"
    >
      {{ $t('cancel') }}
    </div>
  </forms-form-section>
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
import collaborations from '~/composables/collaborations'

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
    const interestDescription = ref([])

    const context = useContext()
    const store = useStore<RootState>()
    const route = useRoute()

    const projectId = computed(() => {
      return store.state.projects.project?.['@id']
    })

    const {
      recentProjectSaved,
      projectSaved,
      setLockedField,
      fieldIsLocked,
      setLockedFieldText,
      resetLockedField,
      setFieldUpdated,
    } = collaborations()

    const createFractionDetail = async () => {
      if (projectId.value && activeFraction.value) {
        try {
          const response =
            // @ts-ignore
            await context.$api.fractionDetails.createFractionDetails({
              project: projectId.value,
              fraction: activeFraction.value?.['@id'],
            })
          return response
        } catch (error) {
          resetLockedField()
        }
      }
    }

    const createFractionInterest = async () => {
      if (activeFractionDetails.value) {
        if (activeFraction.value) {
          try {
            await axios
              .post('/fraction_interests', {
                description: formData?.value?.description,
                fractionDetails: activeFractionDetails.value?.['@id'],
              })
              .then(() => {
                setFieldUpdated()
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
            resetLockedField()
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
          await axios
            .post('/fraction_interests', {
              description: formData?.value?.description,
              fractionDetails: fractionDetails?.data?.['@id'],
            })
            .then(() => {
              resetLockedField()
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
          if (activeFraction && activeFraction.value && detail?.fraction) {
            return activeFraction.value.id === detail.fraction.id
          }
          return undefined
        })
      }
      return null
    })

    const fractionInterests = computed(() => {
      if (activeFractionDetails.value) {
        interestDescription.value = activeFractionDetails.value?.interests?.map(
          (interest) => interest.description
        )
        return activeFractionDetails.value?.interests
      }
      return null
    })

    const updateInterest = async (event: any, id: number | string) => {
      try {
        await axios
          .put(`/fraction_interests/${id}`, {
            description: event.target.value,
          })
          .then(() => {
            setFieldUpdated()
          })

        // @ts-ignore
        context.$notify({
          title: 'Interesse aktualisierut',
          duration: 300,
          type: 'success',
        })
        store.dispatch('projects/fetchProject', route.value.params.id)
      } catch (error) {
        resetLockedField()
        // @ts-ignore
        context.$notify({
          title: 'Interesse konnte nicht erstellt werden',
          duration: 300,
          type: 'warn',
        })
      }
    }

    const openFractionInterestForm = () => {
      setLockedField('fraction-interest')
      newInterestForm.value = true
    }

    const closeFractionInterestForm = () => {
      resetLockedField()
      newInterestForm.value = false
    }

    return {
      createFractionInterest,
      activeFraction,
      formData,
      fractionInterests,
      newInterestForm,
      activeFractionDetails,
      updateInterest,
      recentProjectSaved,
      projectSaved,
      setLockedField,
      fieldIsLocked,
      setLockedFieldText,
      openFractionInterestForm,
      closeFractionInterestForm,
      interestDescription,
    }
  },
})
</script>
