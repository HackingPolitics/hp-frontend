<template>
  <div>
    <div class="relative">
      <main-nav></main-nav>
    </div>

    <main class="relative">
      <header class="relative py-10 bg-purple-800">
        <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-normal text-white max-w-2xl">{{ title }}</h1>
        </div>
      </header>
      <div class="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'HeaderTitle',
  props: {
    title: {
      type: String,
      default: null,
    },
  },
}
</script>
