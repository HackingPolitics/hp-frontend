<template>
  <FormulateForm
    v-model="formData"
    class="flex items-center"
    @submit="submit()"
  >
    <FormulateInput
      :key="formKey"
      name="description"
      type="text"
      :placeholder="$t('forms.arguments.placeholder.description')"
      :validation-name="$t('validation.name.arguments.description')"
      validation="required"
    >
    </FormulateInput>
    <button type="submit" class="w-12 mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-green-500 mx-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </button>
  </FormulateForm>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CreateArguments',
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
