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
      {{ project.fractionDetails }}
      <div class="flex mt-12 justify-center items-center space-x-12">
        <div class="w-1/2 flex flex-col justify-center">
          <charts-base-pie-chart
            :data="data"
            @dataClick="setActiveFraction"
          ></charts-base-pie-chart>
          <div v-if="neededVotes > 0" class="w-56 py-8 text-center mx-auto">
            Noch
            <span class="text-green-500 text-xl"
              >{{ neededVotes }} {{ $t('forms.fractioninterests.votes') }}</span
            >
            für ein mehrheitliches Interesse
          </div>
          <div v-else class="w-56 py-8 text-center mx-auto">
            Die Stimmen reichen für eine Mehrheit aus
          </div>
        </div>
        <div class="w-1/2">
          <div
            v-for="(fraction, i) in fractions"
            :key="fraction.id"
            class="flex space-x-4 mb-4 items-center"
          >
            <fraction-list-item
              :fraction="fraction"
              :selected-fractions="selectedFractions"
              :is-active="
                activeFraction ? activeFraction.id === fraction.id : false
              "
              @changeActive="setActiveFraction(i)"
              @select="setSelection"
            ></fraction-list-item>
          </div>
        </div>
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
import { IFraction } from '~/types/apiSchema'
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

    const selectedFractions = ref<Fraction[] | null>([
      { id: 2, name: 'CDU', memberCount: 14, color: '#000000' },
      { id: 3, name: 'FDP', memberCount: 5, color: '#fbd601' },
    ])

    const axios = useAxios()

    const projectId = computed(() => {
      return store.state.projects.project?.['@id']
    })

    const createFractionDetail = async () => {
      if (projectId.value && fractions.value) {
        try {
          const response = await axios.post('/fraction_details', {
            contactName: 'Udo Möller',
            project: projectId.value,
            fraction: '/fractions/10',
          })

          console.log(response)
        } catch (error) {}
      }
    }

    // watch(
    //   () => fractions.value,
    //   () => {
    //     if (fractions.value) {
    //       createFractionDetail()
    //     }
    //   },
    //   { immediate: true }
    // )

    // const isSelected = (fractionId: number) => {
    //   const fraction = selectedFractions.value?.find(
    //     (el: Fraction) => el.id === fractionId
    //   )
    //   return !!fraction
    // }

    const orderedFractions = computed(() => {
      if (fractions.value) {
        const clonedFractions = cloneDeep(fractions.value)
        return clonedFractions.sort((a: Fraction, _: Fraction) => {
          if (selectedFractions.value?.find((el) => el.id === a.id)) {
            return -1
          }
          return 1
        })
      }
      return []
    })

    const setSelection = (list: Fraction[]) => {
      selectedFractions.value = list
    }

    const totalSeats = computed(() => {
      console.log(fractions.value)
      if (fractions.value) {
        let sum = 0
        fractions.value.forEach((el) => (sum = sum + el.memberCount))
        return sum
      }
      return 0
    })

    const votesCount = computed(() => {
      let count = 0
      selectedFractions.value?.forEach((el) => {
        count = count + el.memberCount
      })
      return count
    })

    const neededVotes = computed(() => {
      const votes = council.members / 2 + 1 - votesCount.value
      return votes > 0 ? votes : 0
    })

    const activeFraction = ref<Fraction | null>(null)

    const setActiveFraction = (index: number): void => {
      activeFraction.value = fractions.value[index]
    }

    const data = computed(() => {
      return {
        labels: orderedFractions.value.map((el: Fraction) => el.name),
        datasets: [
          {
            label: council.name,
            data: orderedFractions.value.map((el: Fraction) => el.memberCount),
            backgroundColor: orderedFractions.value.map((el: Fraction) => {
              if (el.id === activeFraction.value?.id) {
                return '#7c3aed'
              }
              return el.color
            }),
          },
        ],
      }
    })

    return {
      formData,
      data,
      fractions,
      selectedFractions,
      activeFraction,
      council,
      neededVotes,
      votesCount,
      setSelection,
      setActiveFraction,
      parseISO,
      format,
      totalSeats,
      createFractionDetail,
      project,
    }
  },
})
</script>
