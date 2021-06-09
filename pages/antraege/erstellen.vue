<template>
  <layouts-single-view :title="$t('proposal.form.header')">
    <div class="bg-white rounded-lg shadow overflow-hidden p-8">
      <forms-application-create></forms-application-create>
    </div>
  </layouts-single-view>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Erstellen',
})
</script>
