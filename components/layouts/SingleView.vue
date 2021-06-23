<template>
  <div>
    <div class="relative">
      <main-nav></main-nav>
    </div>

    <main class="relative">
      <header class="relative py-10 bg-purple-800 h-64">
        <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8"></div>
      </header>
      <div
        class="
          max-w-screen-xl
          mx-auto
          pb-6
          px-4
          sm:px-6
          lg:pb-16 lg:px-8
          -mt-8
          relative
        "
      >
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'SingleView',
  props: {
    title: {
      type: String,
      default: null,
    },
  },
}
</script>
