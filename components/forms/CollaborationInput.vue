<template>
  <FormulateInput
    v-if="inputType === 1"
    v-model="inputModel"
    v-bind="$attrs"
    validation="required"
    v-on="$listeners"
  >
  </FormulateInput>

  <FormulateInput
    v-else-if="inputType === 2"
    v-model="inputModel"
    v-bind="$attrs"
    element-class="inline-flex w-full  items-center"
    input-class="list-input-text"
    outer-class="list-input-outer"
    v-on="$listeners"
  >
    <template #prefix>
      <div class="inline-flex items-center space-x-2 handle cursor-move">
        <slot name="prefix"></slot>
      </div>
    </template>
    <slot></slot>
    <template #suffix>
      <FormulateInput
        input-class="flex items-center ml-4"
        type="button"
        @click="$emit('delete')"
        ><solid-x-icon class="h-5 w-5"
      /></FormulateInput>
    </template>
  </FormulateInput>

  <FormulateInput
    v-else-if="inputType === 3"
    v-model="inputModel"
    v-bind="$attrs"
    element-class="flex flex-col w-full items-center pr-1.5"
    input-class="border-0 w-full "
    outer-class="lg:px-2 py-0 w-full lg:ml-3 mb-4 border-0"
    v-on="$listeners"
  >
    <slot></slot>
    <template #suffix>
      <div class="flex flex-row w-full items-center justify-end mt-4 space-x-2">
        <button
          class="
            px-2.5
            py-1.5
            bg-gray-100
            flex
            items-center
            rounded-md
            cursor-pointer
          "
          @click="$emit('delete')"
        >
          <outline-trash-icon class="w-4 h-4"></outline-trash-icon>
        </button>
        <button
          class="
            px-2.5
            py-1.5
            bg-green-700
            text-white
            flex
            items-center
            rounded-md
            cursor-pointer
          "
          @click="$emit('save', inputModel)"
        >
          <outline-check-icon class="w-4 h-4"></outline-check-icon>
        </button>
      </div>
    </template>
  </FormulateInput>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ListItem',
  props: {
    model: {
      type: [String, Number, Array],
      default: '',
    },
    inputType: {
      type: Number,
      default: 1,
    },
    showRemoveButton: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const inputModel = ref('')

    watch(
      () => props.model,
      (newVal) => {
        inputModel.value = newVal.toString()
      },
      {
        deep: true,
        immediate: true,
      }
    )

    return {
      inputModel,
    }
  },
})
</script>
