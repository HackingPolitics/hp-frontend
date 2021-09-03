<template>
  <div>
    <FormulateForm
      v-model="formData"
      class="flex flex-row justify-start items-start"
      @submit="submit()"
    >
      <div class="w-1/2">
        <FormulateInput
          :key="formKey"
          name="description"
          type="text"
          :placeholder="$t('forms.counter_arguments.placeholder.description')"
          :validation-name="$t('validation.name.counter_arguments.description')"
          validation="required"
          input-class="list-input-text "
        >
        </FormulateInput>
      </div>
      <div class="flex items-start justfiy-start">
        <button
          type="submit"
          class="
            mb-4
            ml-2
            px-3
            py-2.5
            bg-green-700
            text-white
            flex
            items-start
            rounded-md
            cursor-pointer
          "
        >
          <outline-check-icon class="w-5 h-5"></outline-check-icon>
        </button>
      </div>
    </FormulateForm>
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

    return { formData, submit }
  },
})
</script>
