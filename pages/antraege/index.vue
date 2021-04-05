<template>
  <layouts-single-view title="Meine Anträge">
    <div class="bg-white rounded-lg shadow overflow-hidden p-8">
      <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <application-card
          v-for="(item, i) in 10"
          :key="i"
          :application="item"
        ></application-card>
      </ul>
    </div>
  </layouts-single-view>
</template>

<script>
export default {
  name: 'MeineAntraegePage',
}
</script>
