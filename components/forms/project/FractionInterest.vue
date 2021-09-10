<template>
  <div class="bg-white p-4 mt-8">
    <div class="">
      <p class="text-sm text-gray-500 my-2">
        {{ $t('forms.fractioninterests.interests.description') }}
      </p>
      <div class="grid grid-cols-3 gap-8">
        <div class="mt-4">
          <!-- <div class="sm:hidden">
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
          </div> -->
          <div class="hidden sm:block">
            <nav class="space-y-4" aria-label="Tabs">
              <div
                v-for="fraction in fractions"
                :key="fraction.id"
                class="
                  px-3
                  py-2
                  font-semibold
                  border-l-4
                  hover:bg-gray-100
                  cursor-pointer
                  flex
                  items-center
                "
                :class="
                  activeFraction && activeFraction.id === fraction.id
                    ? 'bg-purple-200 text-purple-700'
                    : 'text-gray-700 hover:text-gray-700'
                "
                :style="`border-color: ${fraction.color}`"
                @click="activeFraction = fraction"
              >
                <span
                  class="rounded-full h-2 w-2 mr-4"
                  :class="
                    checkSelected(fraction) ? 'bg-green-500' : 'bg-gray-400'
                  "
                ></span>
                {{ fraction.memberCount }} {{ fraction.name }}
              </div>
            </nav>
          </div>
        </div>
        <div class="mt-4 col-span-2">
          <div class="w-full flex justify-between items-center mb-4">
            <h3 class="font-semibold text-gray-800 text-xl">
              {{ $t('forms.fractioninterests.interests.title') }}
            </h3>
            <div class="text-sm flex items-center text-gray-500 space-x-2">
              <span>Als Partnerstimme markieren</span>
              <base-toggle
                :value="
                  activeFractionDetails
                    ? activeFractionDetails.possiblePartner
                    : false
                "
                @input="togglePartnerStatus(activeFractionDetails)"
              ></base-toggle>
            </div>
          </div>

          <div v-if="fractionInterests && fractionInterests.length">
            <FormulateInput
              v-for="interest in fractionInterests"
              :key="interest.id"
              :value="interest.description"
              type="textarea"
              :input-class="[
                `border-l-4 shadow-none rounded-none border-t-0 border-b-0 border-r-0 bg-[${activeFraction.color}]`,
              ]"
              @focusout="updateInterest($event, interest.id)"
            >
            </FormulateInput>
          </div>
          <div v-else class="w-full text-sm text-gray-500 py-6">
            {{ $t('forms.fractioninterests.interests.noInterests') }}
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
              <i18n
                path="forms.fractioninterests.interests.addInterest"
                tag="span"
              >
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
            @click="newInterestForm = true"
          >
            {{
              $t('forms.fractioninterests.interests.newInterest')
            }}</base-button
          >
          <div
            v-if="newInterestForm"
            class="text-red-500 text-sm cursor-pointer text-right"
            @click="newInterestForm = false"
          >
            {{ $t('cancel') }}
          </div>
        </div>
      </div>
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
            return activeFraction.value.id === detail.fraction?.id
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

    const updateInterest = async (event: any, id: number | string) => {
      try {
        await axios.put(`/fraction_interests/${id}`, {
          description: event.target.value,
        })

        // @ts-ignore
        context.$notify({
          title: 'Interesse aktualisiert',
          duration: 300,
          type: 'success',
        })
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

    const checkSelected = (fraction: IFraction) => {
      const check = props?.fractionDetails?.find(
        (el: IFractionDetails) => el.fraction?.id === fraction.id
      )
      return check ? check.possiblePartner : false
    }

    const togglePartnerStatus = async (fraction: IFractionDetails) => {
      if (fraction) {
        // fraction exists, update possible partner status
        try {
          // @ts-ignore
          await context.$api.fractionDetails.updateFractionDetails(
            fraction.id,
            {
              possiblePartner: !fraction.possiblePartner,
            }
          )
          await store.dispatch('projects/fetchProject', route.value.params.id)
        } catch (error) {}
      } else {
        // fraction didn't exists on project, create fraction and set partner status to true
        try {
          // create fraction details
          const response = await createFractionDetail()
          // @ts-ignore
          await context.$api.fractionDetails.updateFractionDetails(
            response?.data.id,
            {
              possiblePartner: true,
            }
          )
          await store.dispatch('projects/fetchProject', route.value.params.id)
        } catch (error) {}
      }
    }
    return {
      createFractionInterest,
      activeFraction,
      formData,
      fractionInterests,
      newInterestForm,
      activeFractionDetails,
      updateInterest,
      checkSelected,
      togglePartnerStatus,
    }
  },
})
</script>
