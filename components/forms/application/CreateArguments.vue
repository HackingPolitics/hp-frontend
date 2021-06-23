<template>
  <FormulateForm v-model="formData" @submit="submit()">
    <FormulateInput
      :key="formKey"
      name="description"
      type="text"
      :placeholder="$t('forms.arguments.placeholder.description')"
      :validation-name="$t('validation.name.arguments.description')"
      input-class="border-0 focus:ring-0  bg-gray-200 w-full"
      validation="required"
    >
    </FormulateInput>
    <!--    <FormulateInput
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
          <span class="">{{
            $t('forms.arguments.add_inspiration_source')
          }}</span>
        </FormulateInput>
      </template>
      <FormulateInput
        name="source"
        type="text"
        element-class="inline-flex w-full items-center mt-2"
        input-class="border-0 w-full"
        outer-class="w-full"
        :placeholder="$t('forms.arguments.placeholder.inspiration_source')"
      >
        <template #prefix>
          <div class="inline-flex items-center space-x-2 px-4">
            <outline-link-icon class="w-5 h-5"></outline-link-icon>
          </div>
        </template>
      </FormulateInput>
    </FormulateInput>-->
    <FormulateInput type="submit">
      <outline-thumb-up-icon class="h-5 w-5 text-green-500" />
      <span class="text-green-500 pl-4">{{ $t('forms.arguments.add') }}</span>
    </FormulateInput>
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
