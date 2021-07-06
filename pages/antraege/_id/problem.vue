<template>
  <div>
    <h1 class="text-3xl font-normal text-blue-gray-900 mb-4">
      {{ $t('forms.problems.formTitle') }}
    </h1>
    <forms-project-problem></forms-project-problem>
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
