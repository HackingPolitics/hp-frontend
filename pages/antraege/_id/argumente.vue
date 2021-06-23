<template>
  <div>
    <h1 class="text-3xl font-normal text-blue-gray-900 mb-4">
      {{ $t('forms.arguments.formTitle') }}
    </h1>
    <forms-project-arguments></forms-project-arguments>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ApplicationArguments',
  layout: 'formWithSidebar',
})
</script>
