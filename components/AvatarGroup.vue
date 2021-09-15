<template>
  <div class="flex relative z-0 overflow-hidden">
    <div
      v-for="(avatar, index) in avatars"
      :key="index"
      :class="index != 0 ? '-ml-3' : ''"
    >
      <base-avatar :user="avatar.user" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IProjectMembership } from '~/types/apiSchema'
import { getRandomBgColor } from '~/utils/randomColors'

export default defineComponent({
  name: 'AvatarGroup',
  props: {
    avatars: {
      type: Array as PropType<IProjectMembership[]>,
      default: () => [],
    },
  },
  setup() {
    return {
      getRandomBgColor,
    }
  },
})
</script>
