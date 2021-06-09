<template>
  <div v-if="fraction" class="flex items-center space-x-6">
    <base-toggle v-model="isSelected"></base-toggle>
    <div
      class="
        group
        hover:font-semibold
        hover:text-purple-500
        cursor-pointer
        flex
        space-x-6
        transition
        text-gray-500
      "
      @click="$emit('changeActive')"
    >
      <div
        class="
          rounded-full
          h-6
          w-6
          bg-gray-100
          flex
          justify-center
          items-center
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400"
          :class="
            isActive
              ? 'text-purple-500'
              : isSelected
              ? 'text-gray-800'
              : 'text-gray-400'
          "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
      <div
        class="w-4 text-right"
        :class="
          isActive
            ? 'font-semibold text-purple-500'
            : isSelected
            ? 'font-semibold text-gray-800'
            : ''
        "
      >
        {{ fraction.memberCount }}
      </div>
      <div
        class=""
        :class="
          isActive
            ? 'font-semibold text-purple-500'
            : isSelected
            ? 'font-semibold text-gray-800'
            : ''
        "
      >
        {{ fraction.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { watch } from '@vue/runtime-core'
import { cloneDeep } from 'lodash'
import { Fraction } from '../forms/application/FractionAndInterest.vue'

export default defineComponent({
  name: 'FractionListItem',
  props: {
    fraction: {
      type: Object as PropType<Fraction | null>,
      default: null,
    },
    selectedFractions: {
      type: Array as PropType<Fraction[] | null>,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const isSelected = ref(false)

    const checkSelection = () => {
      const item = props.selectedFractions?.find(
        (el) => el.id === props.fraction?.id
      )
      if (item) {
        isSelected.value = true
      }
    }

    watch(
      () => props.selectedFractions,
      () => {
        checkSelection()
      },
      { deep: true, immediate: true }
    )
    return { isSelected }
  },
  watch: {
    isSelected(newVal, _) {
      if (newVal) {
        const list = cloneDeep(this.selectedFractions)
        list.push(this.fraction)
        this.$emit('select', list)
        return
      }
      const filteredList = this.selectedFractions?.filter(
        (el) => el.id !== this.fraction?.id
      )
      this.$emit('select', filteredList)
    },
  },
})
</script>
