<template>
  <FormulateForm v-model="formData">
    <forms-layout title="Ratsmehrheit und Fraktionsinteressen">
      <div class="bg-gray-200 py-4">
        <div class="flex justify-between px-6">
          <div class="font-semibold">{{ council.name }}</div>
          <div class="">Stand: 20.05.2021</div>
        </div>
      </div>
      <div class="px-6 bg-white py-4">
        <div class="flex space-x-6 mt-4">
          <div><span class="font-semibold">5</span> Fraktionen</div>
          <div>
            <span class="font-semibold">{{ council.members }}</span> Sitze
          </div>
          <div class="text-green-500">
            <span class="font-semibold">{{ votesCount }}</span> Partnerstimmen
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
            <div class="w-56 py-8 text-center mx-auto">
              Noch
              <span class="text-green-500 text-xl"
                >{{ neededVotes }} Stimmen</span
              >
              für ein mehrheitliches Interesse
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
    </forms-layout>
  </FormulateForm>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'

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
    const fractions = ref<Fraction[]>([
      { id: 1, name: 'AfD', memberCount: 12, color: '#0096d1' },
      { id: 2, name: 'CDU', memberCount: 14, color: '#000000' },
      { id: 3, name: 'FDP', memberCount: 5, color: '#fbd601' },
      { id: 4, name: 'SPD', memberCount: 6, color: '#e30613' },
      {
        id: 5,
        name: 'B\u00FCndnis 90/ Die Gr\u00FCne',
        memberCount: 15,
        color: '#94c11e',
      },
      { id: 6, name: 'Linke', memberCount: 12, color: '#df0203' },
      { id: 7, name: 'Freie W\u00E4hler', memberCount: 4, color: '#b7b7b7' },
      { id: 8, name: 'fraktionslos', memberCount: 2, color: '#a79a00' },
    ])

    const selectedFractions = ref<Fraction[] | null>([
      { id: 2, name: 'CDU', memberCount: 14, color: '#000000' },
      { id: 3, name: 'FDP', memberCount: 5, color: '#fbd601' },
    ])

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
        labels: fractions.value.map((el: Fraction) => el.name),
        datasets: [
          {
            label: council.name,
            data: fractions.value.map((el: Fraction) => el.memberCount),
            backgroundColor: fractions.value.map((el: Fraction) => {
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
