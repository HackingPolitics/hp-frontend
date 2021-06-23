<template>
  <FormulateForm v-model="formData">
    <div class="bg-gray-200 py-4">
      <div class="flex justify-between px-6">
        <div class="font-semibold">{{ council.name }}</div>
        <div class="">
          {{ $t('forms.fractioninterests.parliamentProfileUpdatedAt') }}:
          20.05.2021
        </div>
      </div>
    </div>
    <div class="px-6 bg-white py-4">
      <div class="flex space-x-6 mt-4">
        <div>
          <span class="font-semibold">5</span>
          {{ $t('forms.fractioninterests.fractions') }}
        </div>
        <div>
          <span class="font-semibold">{{ council.members }}</span>
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
      <div class="py-4"></div>
    </div>
    <div class="mt-8">
      <h3 class="font-semibold text-gray-800 text-xl">Eigeninteressen</h3>
      <p class="text-sm text-gray-500 mt-2">
        Wähle eine Fraktion aus, um die Eigeninteressen zu formulieren und
        anzuzeigen.
      </p>
      <FormulateInput
        name="interests"
        type="group"
        class="mt-6"
        remove-position="after"
        :repeatable="true"
        add-label="Stichpunkte hinzufügen"
      >
        <FormulateInput
          class="w-full"
          element-class="inline-flex w-full"
          type="textarea"
          name="interest"
        />
      </FormulateInput>
    </div>
  </FormulateForm>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'
import { cloneDeep } from 'lodash'

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

    const council = {
      members: 70,
      name: 'Stadtrat Dresden',
    }
    const selectedFractions = ref<Fraction[] | null>([
      { id: 2, name: 'CDU', memberCount: 14, color: '#000000' },
      { id: 3, name: 'FDP', memberCount: 5, color: '#fbd601' },
    ])

    const isSelected = (fractionId: number) => {
      const fraction = selectedFractions.value?.find(
        (el: Fraction) => el.id === fractionId
      )
      return !!fraction
    }

    console.log(isSelected(1))
    const fractions = computed<Fraction[]>(() => [
      {
        id: 1,
        name: 'AfD',
        memberCount: 12,
        color: isSelected(1) ? '#0096d1' : '#bce8f9',
      },
      {
        id: 2,
        name: 'CDU',
        memberCount: 14,
        color: isSelected(2) ? '#000000' : '#7c7c7c',
      },
      {
        id: 3,
        name: 'FDP',
        memberCount: 5,
        color: isSelected(3) ? '#fbd601' : '#feef96',
      },
      {
        id: 4,
        name: 'SPD',
        memberCount: 6,
        color: isSelected(4) ? '#e30613' : '#e48389',
      },
      {
        id: 5,
        name: 'B\u00FCndnis 90/ Die Gr\u00FCne',
        memberCount: 15,
        color: isSelected(5) ? '#94c11e' : '#c2d397',
      },
      {
        id: 6,
        name: 'Linke',
        memberCount: 12,
        color: isSelected(6) ? '#df0203' : '#e07d7d',
      },
      {
        id: 7,
        name: 'Freie W\u00E4hler',
        memberCount: 4,
        color: isSelected(7) ? '#b7b7b7' : '#d5d3d3',
      },
      {
        id: 8,
        name: 'fraktionslos',
        memberCount: 2,
        color: isSelected(8) ? '#a79a00' : '#bfba81',
      },
    ])

    const orderedFractions = computed(() => {
      const clonedFractions = cloneDeep(fractions.value)
      return clonedFractions.sort((a: Fraction, _: Fraction) => {
        if (selectedFractions.value?.find((el) => el.id === a.id)) {
          return -1
        }
        return 1
      })
    })

    const setSelection = (list: Fraction[]) => {
      selectedFractions.value = list
    }

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
    }
  },
})
</script>
