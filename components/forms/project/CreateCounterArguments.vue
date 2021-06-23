<template>
  <FormulateForm v-model="formData" @submit="submit()">
    <FormulateInput
      :key="formKey"
      name="description"
      type="text"
      :placeholder="$t('forms.counter_arguments.placeholder.description')"
      :validation-name="$t('validation.name.counter_arguments.description')"
      input-class="list-input-text"
      validation="required"
    >
    </FormulateInput>
    <FormulateInput type="submit">
      <outline-thumb-down-icon class="h-5 w-5 text-red-500" />
      <span class="text-red-500 pl-4">{{
        $t('forms.counter_arguments.add')
      }}</span>
    </FormulateInput>
  </FormulateForm>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CreateCounterArguments',
  props: {
    formKey: {
      type: Number,
      default: 1,
    },
  },
  setup(_, context) {
    const formData = ref({})
    const submit = () => context.emit('submit', formData)
    return { formData, submit }
  },
})
</script>
