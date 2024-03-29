<template>
  <div>
    <div class="bg-gray-300 py-4">
      <div v-if="council" class="flex justify-between px-6">
        <div class="font-semibold">{{ council.title }}</div>
        <div class="">
          {{ $t('forms.fractioninterests.parliamentProfileUpdatedAt') }}:
          {{
            council.updatedAt
              ? format(parseISO(council.updatedAt), 'dd.MM.yyyy')
              : null
          }}
        </div>
      </div>
    </div>
    <div class="px-6 bg-white py-4">
      <div v-if="council" class="flex space-x-6 mt-4">
        <div>
          <span class="font-semibold">{{ council.fractions.length }}</span>
          {{ $t('forms.fractioninterests.fractions') }}
        </div>
        <div>
          <span class="font-semibold">{{ totalSeats }}</span>
          {{ $t('forms.fractioninterests.mandates') }}
        </div>
        <div class="text-green-500">
          <span class="font-semibold">{{ votesCount }}</span>
          {{ $t('forms.fractioninterests.partnerMandates') }}
        </div>
      </div>
      <!-- This example requires Tailwind CSS v2.0+ -->
      <div class="relative mt-4">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-300"></div>
        </div>
      </div>

      <div class="flex mt-12 justify-center items-center space-x-12">
        <div class="flex flex-col justify-center">
          <div class="relative">
            <charts-base-pie-chart :data="data"></charts-base-pie-chart>
            <div
              class="w-1 h-full bg-green-500 absolute top-0 z-30 inset-x-1/2"
            ></div>
          </div>
          <i18n
            v-if="neededVotes > 0"
            path="forms.fractioninterests.votesCounter"
            tag="div"
            class="w-56 py-8 text-center mx-auto"
          >
            <template #votes>
              <span class="text-green-500 text-xl"
                >{{ neededVotes }}
                {{ $t('forms.fractioninterests.votes') }}</span
              >
            </template>
          </i18n>
          <div v-else class="w-56 py-8 text-center mx-auto">
            {{ $t('forms.fractioninterests.enoughVotes') }}
          </div>
        </div>
        <!-- <div class="w-1/2">
          <div
            v-for="fraction in fractions"
            :key="fraction.id"
            class="flex space-x-4 mb-4 items-center"
          >
            <fraction-list-item
              :fraction="fraction"
              :fraction-details="getFractioDetails(fraction)"
            ></fraction-list-item>
          </div>
        </div> -->
      </div>
    </div>
    <forms-project-fraction-interest
      :fractions="fractions"
      :fraction-details="
        project && project.fractionDetails ? project.fractionDetails : null
      "
    ></forms-project-fraction-interest>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useStore,
  watch,
} from '@nuxtjs/composition-api'
import { cloneDeep } from 'lodash'
import { parseISO, format } from 'date-fns'
import { RootState } from '~/store'
import { IFraction, IFractionDetails } from '~/types/apiSchema'
import { useAxios } from '~/composables/useAxios'

export interface Fraction {
  id: number
  name: string
  memberCount: number
  color: string
}

export default defineComponent({
  name: 'FractionAndInterestForm',
  setup() {
    const formData = ref(null)

    const store = useStore<RootState>()

    const councilId = computed(() => {
      return store.state.projects.project?.council?.id
    })

    const project = computed(() => {
      return store.state.projects?.project
    })

    const council = computed(() => {
      return store.state.councils.council
    })

    watch(
      () => councilId.value,
      () => {
        if (councilId.value) {
          store.dispatch('councils/getCouncilById', councilId.value)
        }
      },
      { immediate: true }
    )

    const fractions = computed<IFraction[] | null>(() => {
      return store.state.councils?.council?.fractions.map((el: IFraction) => {
        return { ...el, color: `#${el.color}` }
      })
    })

    const axios = useAxios()

    const projectId = computed(() => {
      return store.state.projects.project?.['@id']
    })

    const fractionDetails = computed(() => {
      return store.state.projects.project?.fractionDetails
    })

    const selectedFractions = computed(() => {
      if (fractionDetails.value && fractionDetails.value.length) {
        const details = cloneDeep(fractionDetails.value)
        return details
          .filter((el: IFractionDetails) => el.possiblePartner)
          .map((el: IFractionDetails) => {
            return {
              ...el.fraction,
              memberCount: fractions.value?.find(
                (fraction) => fraction.id === el.fraction?.id
              )?.memberCount,
            }
          })
      }
      return []
    })

    const createFractionDetail = async () => {
      if (projectId.value && fractions.value) {
        try {
          await axios.post('/fraction_details', {
            project: projectId.value,
            fraction: '/fractions/10',
          })
        } catch (error) {}
      }
    }

    const orderedFractions = computed(() => {
      if (fractions.value) {
        const clonedFractions = cloneDeep(fractions.value)
        return clonedFractions.sort((a: Fraction, _: Fraction) => {
          if (
            selectedFractions.value?.find((el: IFraction) => el.id === a.id)
          ) {
            return -1
          }
          return 1
        })
      }
      return []
    })

    const totalSeats = computed(() => {
      if (fractions.value) {
        let sum = 0
        fractions.value.forEach((el) => (sum = sum + el.memberCount))
        return sum
      }
      return 0
    })

    const votesCount = computed(() => {
      let count = 0
      selectedFractions.value?.forEach((el: IFraction) => {
        count = count + el.memberCount
      })
      return count
    })

    const neededVotes = computed(() => {
      const votes = totalSeats.value / 2 + 1 - votesCount.value
      return votes > 0 ? votes : 0
    })

    const getFractioDetails = (fraction: IFraction) => {
      return fractionDetails.value.find(
        (el: IFractionDetails) => fraction.id === el.fraction?.id
      )
    }

    const hexToRgbA = (hex: string, alpha: number = 1) => {
      let c
      console.log(hex)
      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('')
        if (c.length === 3) {
          c = [c[0], c[0], c[1], c[1], c[2], c[2]]
        }
        c = '0x' + c.join('')
        const result = `rgba(${[
          (parseInt(c) >> 16) & 255,
          (parseInt(c) >> 8) & 255,
          parseInt(c) & 255,
        ].join(',')},${alpha})`
        console.log(result)
        return result
      }
      return hex
    }

    const data = computed(() => {
      return {
        labels: orderedFractions.value.map((el: Fraction) => el.name),

        datasets: [
          {
            label: council.value?.title,
            data: orderedFractions.value.map((el: Fraction) => el.memberCount),
            backgroundColor: orderedFractions.value.map((el: Fraction) => {
              if (
                selectedFractions.value.find(
                  (fraction: IFraction) => fraction.id === el.id
                )
              ) {
                return el.color
              }
              return hexToRgbA(el.color, 0.25)
            }),
            borderColor: '#fff',
            borderWidth: 4,
          },
        ],
      }
    })

    return {
      formData,
      data,
      fractions,
      selectedFractions,
      council,
      neededVotes,
      votesCount,
      parseISO,
      format,
      totalSeats,
      createFractionDetail,
      project,
      fractionDetails,
      getFractioDetails,
    }
  },
})
</script>
