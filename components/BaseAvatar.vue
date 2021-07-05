<template>
  <span
    class="
      rounded-full
      overflow-hidden
      flex
      items-center
      justify-center
      bg-white
      text-purple-500
      font-semibold
      text-sm
      hover:bg-purple-100
      uppercase
      border-2 border-purple-700
    "
    :class="getAvatarSize(size)"
  >
    {{ user && user.username ? user.username.slice(0, 1) : 'k.a.' }}
  </span>
</template>
<script lang="ts">
export default {
  name: 'BaseAvatar',
  props: {
    user: {
      type: Object,
      required: true,
    },
    size: {
      type: String,
      default: 'base',
      validator: (value: string) => {
        return ['xs', 'sm', 'base', 'md', 'lg', 'xl'].includes(value)
      },
    },
    styling: {
      type: String,
      default: 'light',
      validator: (value: string) => {
        return ['light', 'dark'].includes(value)
      },
    },
  },
  methods: {
    getAvatarSize(size: string) {
      switch (size) {
        case 'xs':
          return 'w-6 h-6'

        case 'sm':
          return 'w-8 h-8'

        case 'base':
          return 'w-10 h-10'

        case 'md':
          return 'w-12 h-12'

        case 'lg':
          return 'w-14 h-14'

        case 'xl':
          return 'w-20 h-20'

        default:
          return 'w-10 h-10'
      }
    },
  },
}
</script>
