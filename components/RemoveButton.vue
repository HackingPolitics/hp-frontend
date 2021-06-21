<template>
  <button @click="$emit('click')">
    <div class="group-remove-button group">
      <solid-x-icon
        class="w-4 h-4 text-gray-400 group-hover:text-white hover:text-white"
      ></solid-x-icon>
    </div>
  </button>
</template>

<script>
export default {
  name: 'RemoveButton',
}
</script>
