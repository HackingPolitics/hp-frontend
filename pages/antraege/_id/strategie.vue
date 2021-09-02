<template>
  <layouts-form-with-sidebar>
    <div>
      <h1 class="text-3xl font-normal text-blue-gray-900 mb-4">
        {{ $t('forms.strategy.formTitle') }}
      </h1>
      <p class="text-lg font-normal text-gray-600 mb-2 leading-6">
        {{ $t('forms.strategy.formDescription') }}
      </p>
      <forms-project-strategy></forms-project-strategy>
    </div>
  </layouts-form-with-sidebar>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Strategy',
  meta: {
    area: 'Strategie',
  },
  layout: 'collaboration',
  middleware: ['isProjectMember', 'getCurrentArea'],
})
</script>
