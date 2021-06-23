<template>
  <div class="flex flex-col h-screen">
    <menu-project-nav :title="title" :link-to="linkTo"></menu-project-nav>

    <main class="relative flex-1">
      <slot />
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
    linkTo: {
      type: [String, Object],
      default: '/',
    },
  },
}
</script>
