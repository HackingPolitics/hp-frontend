<template>
  <layouts-header-title :title="$t('proposal.form.header')">
    <div class="bg-white rounded-lg shadow overflow-hidden p-8">
      <forms-project-create></forms-project-create>
    </div>
  </layouts-header-title>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Erstellen',
})
</script>
