<template>
  <div class="flex -space-x-2 relative z-0 overflow-hidden">
    <img
      v-for="(avatar, index) in avatars"
      :key="index"
      class="relative z-0 inline-block h-8 w-8 rounded-full ring-2 ring-white"
      :style="{ zIndex: index * 10 }"
      :src="avatar.imageUrl"
      alt=""
    />
  </div>
</template>

<script>
export default {
  name: 'AvatarGroup',
  props: {
    avatars: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
