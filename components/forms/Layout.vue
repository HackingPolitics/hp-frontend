<template>
  <div>
    <main class="max-w-lg mx-auto pt-10 pb-12 px-4 lg:pb-16">
      <h1 class="text-3xl font-extrabold text-blue-gray-900 mb-4">{{ title }}</h1>
      <slot> </slot>
      <div class="pt-8 flex justify-end">
        <slot name="actions"></slot>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
