<template>
  <div>
    <h1 class="text-3xl font-normal text-blue-gray-900 mb-4">
      {{ $t('forms.topic.formTitle') }}
    </h1>
    <forms-project-topic></forms-project-topic>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Topic',
  layout: 'formWithSidebar',
})
</script>
