<template>
  <div>
    <FormulateForm
      v-if="formIsOpen"
      v-model="formData"
      class="flex items-center"
      @submit="submit()"
    >
      <FormulateInput
        :key="formKey"
        name="description"
        type="text"
        :placeholder="$t('forms.counter_arguments.placeholder.description')"
        :validation-name="$t('validation.name.counter_arguments.description')"
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
    <base-button
      v-if="!formIsOpen"
      class="
        bg-white
        text-red-500
        border border-gray-400
        flex
        items-center
        hover:text-white hover:bg-red-500
      "
      @click="toggleForm"
    >
      <outline-thumb-down-icon class="h-4 w-4 mr-2" />
      Gegenargument hinzufügen</base-button
    >
    <div
      v-if="formIsOpen"
      class="text-red-500 text-sm cursor-pointer text-right"
      @click="toggleForm"
    >
      Abbrechen
    </div>
  </div>
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
    const formIsOpen = ref(false)

    const toggleForm = () => {
      formIsOpen.value = !formIsOpen.value
    }
    return { formData, formIsOpen, toggleForm, submit }
  },
})
</script>
