<template>
  <FormulateInput
    v-if="inputType === 1"
    v-model="inputModel"
    v-bind="$attrs"
    validation="required"
    outer-class="mb-4 border-0"
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
      <div class="inline-flex items-center space-x-2 pr-4 handle cursor-move">
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
    element-class="inline-flex w-full items-center"
    input-class="border-0 w-full"
    outer-class="p-2 w-full mb-4 border-0"
    v-on="$listeners"
  >
    <template #prefix>
      <div class="inline-flex items-center space-x-2 px-4">
        <outline-chat-alt-2-icon class="w-5 h-5"></outline-chat-alt-2-icon>
      </div>
    </template>
    <slot></slot>
    <template #suffix>
      <remove-button
        input-class="flex items-center ml-4"
        type="button"
        @click="$emit('delete')"
        ><solid-x-icon class="h-5 w-5"
      /></remove-button>
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
        inputModel.value = newVal
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
