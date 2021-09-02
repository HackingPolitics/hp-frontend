<template>
  <layouts-form-with-sidebar>
    <div>
      <h1 class="text-3xl font-normal text-blue-gray-900 mb-4">
        {{ $t('forms.arguments.formTitle') }}
      </h1>
      <p class="text-lg font-normal text-gray-600 mb-2 leading-6">
        {{ $t('forms.arguments.formDescription') }}
      </p>
      <forms-project-arguments></forms-project-arguments>
    </div>
  </layouts-form-with-sidebar>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ApplicationArguments',
  meta: {
    area: 'Argumente',
  },
  layout: 'collaboration',
  middleware: ['isProjectMember', 'getCurrentArea'],
})
</script>
