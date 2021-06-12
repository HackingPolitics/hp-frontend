<template>
  <div class="mx-2">
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="relative inline-block text-left">
      <div class="flex justify-center items-center space-x-2">
        <div class="font-semibold text-3xl text-purple-500">
          {{ value }}
        </div>
        <button
          id="menu-button"
          v-click-outside="closeDropdown"
          type="button"
          class="
            bg-gray-100
            rounded-full
            flex
            items-center
            text-gray-400
            hover:text-gray-600
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-offset-gray-100
            focus:ring-purple-500
          "
          aria-expanded="true"
          aria-haspopup="true"
          @click="toggleDropdown"
        >
          <span class="sr-only">Open options</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-purple-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-if="dropdownOpen"
          class="
            origin-top-right
            absolute
            right-0
            mt-2
            w-56
            rounded-md
            shadow-lg
            bg-white
            ring-1 ring-black ring-opacity-5
            focus:outline-none
            z-20
          "
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          <div class="py-1" role="none">
            <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
            <div
              v-for="(option, i) in options"
              :key="i"
              class="
                text-gray-700
                block
                px-4
                py-2
                text-sm
                hover:bg-purple-300 hover:text-purple-800
                cursor-pointer
              "
              role="menuitem"
              tabindex="-1"
              @click="$emit('input', option)"
            >
              {{ option }}
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'InlineDropdown',
  props: {
    value: {
      type: [String, Object],
      default: null,
    },
    options: {
      type: Array,
      default: null,
    },
  },
  setup() {
    const dropdownOpen = ref(false)
    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value
    }

    const closeDropdown = () => {
      dropdownOpen.value = false
    }

    return { dropdownOpen, toggleDropdown, closeDropdown }
  },
})
</script>
