<template>
  <nav class="bg-purple-500" aria-label="Global">
    <div
      class="
        max-w-screen-xl
        mx-auto
        px-2
        sm:px-4
        lg:px-8
        flex
        justify-between
        py-4
      "
    >
      <nuxt-link
        :to="localePath(linkTo)"
        class="
          text-white
          flex
          items-center
          space-x-6
          text-3xl
          font-medium font-display
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <h1>{{ title }}</h1>
      </nuxt-link>
      <div>
        <div class="flex space-x-4 items-center">
          <div
            v-if="false"
            class="
              rounded-full
              h-8
              w-8
              bg-green-500
              text-white text-sm
              flex
              justify-center
              items-center
            "
          >
            PG
          </div>
          <svg
            v-if="false"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-white cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          <menu-profile-dropdown v-if="user"></menu-profile-dropdown>
          <nuxt-link
            v-else
            :to="localePath('/login')"
            class="
              items-center
              px-4
              py-2
              border border-transparent
              text-base
              shadow
              font-medium
              rounded-md
              text-purple-500
              bg-white
              hover:bg-gray-50
            "
          >
            Login
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, useStore, computed } from '@nuxtjs/composition-api'

export default defineComponent({
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
  setup() {
    const store = useStore<any>()
    const user = computed(() => {
      return store.state.auth.user
    })
    return { user }
  },
})
</script>
