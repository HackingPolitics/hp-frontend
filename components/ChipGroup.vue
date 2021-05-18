<template>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type}`"
    :data-type="context.type"
  >
    <button
      v-for="(option, index) in context.options"
      :key="index"
      v-bind="context.attributes"
      class="focus:outline-none"
      @click="setValue(option.value)"
    >
      <chip :chip-class="setActiveClass(option.value)" class="mr-2 mb-4">{{
        option.label
      }}</chip>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ChipGroup',
  props: {
    context: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const selectedValues: Ref<string[]> = ref([])

    const setValue = (value: string): void => {
      if (selectedValues.value.find((v) => v === value)) {
        selectedValues.value.splice(selectedValues.value.indexOf(value), 1)
      } else if (
        !props.context.limit ||
        selectedValues.value.length < props.context.limit
      ) {
        selectedValues.value.push(value)
      }
      // eslint-disable-next-line
      props.context.model = selectedValues
    }

    function setActiveClass(value: any): string {
      return selectedValues.value.find((v) => {
        return v === value
      })
        ? 'bg-purple-200'
        : 'bg-gray-200'
    }

    return {
      setValue,
      setActiveClass,
    }
  },
})
</script>
