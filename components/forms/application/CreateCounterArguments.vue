<template>
  <FormulateForm v-model="formData" @submit="submit()">
    <FormulateInput
      name="description"
      type="text"
      :placeholder="$t('forms.counter_arguments.placeholder.description')"
      :validation-name="$t('validation.name.arguments.description')"
      input-class="border-0 focus:ring-0  bg-gray-200 w-full"
      outer-class="mb-4"
      validation="required"
    >
    </FormulateInput>
    <FormulateInput
      type="group"
      remove-position="after"
      :repeatable="true"
      minimum="1"
    >
      <template #addmore="{ addMore }">
        <FormulateInput
          input-class="flex space-x-2 items-center mt-4 text-purple-500"
          type="button"
          @click="addMore()"
        >
          <outline-plus-icon class="w-6 h-6"></outline-plus-icon>
          <span class="">{{ $t('forms.counter_arguments.add_counter') }}</span>
        </FormulateInput>
      </template>
      <FormulateInput
        name="counter"
        type="text"
        element-class="inline-flex w-full items-center mt-2"
        input-class="border-0 w-full"
        outer-class="w-full"
        validation="required"
        :placeholder="$t('forms.counter_arguments.placeholder.counter')"
      >
        <template #prefix>
          <div class="inline-flex items-center space-x-2 px-4">
            <outline-chat-alt-2-icon class="w-5 h-5"></outline-chat-alt-2-icon>
          </div>
        </template>
      </FormulateInput>
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
const { defineComponent, ref } = require('@nuxtjs/composition-api')

export default defineComponent({
  name: 'CreateCounterArguments',
  setup(_, context) {
    const formData = ref({})
    const submit = () => context.emit('submit', formData)
    return { formData, submit }
  },
})
</script>
