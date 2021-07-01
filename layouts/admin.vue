<template>
  <div class="bg-gray-200 h-screen flex flex-col">
    <main-nav></main-nav>
    <main
      class="
        max-w-screen-xl
        mx-auto
        pb-10
        lg:py-12 lg:px-8
        flex-1
        overflow-scroll
        w-full
      "
    >
      <div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
        <admin-sidebar></admin-sidebar>
        <nuxt />
      </div>
    </main>
    <base-footer></base-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AdminLayout',
  setup() {
    return {}
  },
})
</script>
