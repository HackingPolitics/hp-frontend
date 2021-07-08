<template>
  <div>
    <h1 class="text-3xl font-normal text-gray-900 mb-4">
      {{ $t('forms.problems.formTitle') }}
    </h1>
    <p class="text-lg font-normal text-gray-600 mb-2 leading-6">
      {{ $t('forms.problems.formDescription') }}
    </p>
    <forms-project-problem></forms-project-problem>
    <forms-project-action-mandate></forms-project-action-mandate>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Problem',
  layout: 'formWithSidebar',
  middleware: 'isProjectMember',
})
</script>
