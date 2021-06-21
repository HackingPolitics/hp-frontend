<template>
  <FormulateInput
    v-bind="$attrs"
    element-class="inline-flex w-full  items-center"
    input-class="list-input-text"
    outer-class="list-input-outer"
    @validation="$emit('validation', $event)"
    @focusout="$emit('focusout', $event.target.value)"
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
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ListItem',
})
</script>
