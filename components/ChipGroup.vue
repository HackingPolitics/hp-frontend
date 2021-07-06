<template>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type} space-y-2`"
    :data-type="context.type"
  >
    <button
      v-for="(option, index) in context.options"
      :key="index"
      v-bind="context.attributes"
      class="focus:outline-none"
      @click.prevent="setValue(option.value)"
    >
      <chip :chip-class="setActiveClass(option.value)" class="mr-2">{{
        option.label
      }}</chip>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ChipGroup',
  props: {
    context: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const selectedValues: Ref<string[]> = ref([])

    onMounted(() => {
      if (props.context.classification === 'chip' && props.context.model) {
        selectedValues.value = props.context.model
      }
    })

    const setValue = (value: string): void => {
      if (selectedValues.value.find((v) => v === value)) {
        selectedValues.value.splice(selectedValues.value.indexOf(value), 1) // unselect
      } else if (
        !props.context.limit ||
        selectedValues.value.length < props.context.limit
      ) {
        selectedValues.value.push(value)
      }
      // eslint-disable-next-line
      props.context.model = selectedValues.value
      context.emit('change')
    }

    function setActiveClass(value: string | number): string {
      return selectedValues.value.find((v) => {
        return v === value
      })
        ? 'bg-purple-500 text-purple-50'
        : 'bg-gray-200'
    }

    return {
      setValue,
      setActiveClass,
    }
  },
})
</script>
