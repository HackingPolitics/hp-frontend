<template>
  <div class="flex relative z-0 overflow-hidden">
    <div
      v-for="(avatar, index) in avatars"
      :key="index"
      :class="index != 0 ? '-ml-3' : ''"
    >
      <img
        v-if="avatar.imageUrl"
        :key="index"
        class="relative z-0 inline-block h-8 w-8 rounded-full ring-2 ring-white"
        :style="{ zIndex: index * 10 }"
        :src="avatar.imageUrl"
        alt=""
      />
      <span
        v-else-if="avatar.user && avatar.user.firstName"
        class="inline-flex items-center justify-center h-8 w-8 rounded-full"
        :class="getRandomBgColor()"
      >
        <span class="text-xs font-medium leading-none text-white">{{
          avatar.user.firstName.charAt(0).toUpperCase()
        }}</span>
      </span>
      <span
        v-else
        class="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100"
        :class="getRandomBgColor()"
      >
        <svg
          class="h-full w-full text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </span>
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
