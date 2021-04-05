<template>
  <nav
    class="bg-transparent relative z-10 border-b border-teal-500 border-opacity-25 lg:bg-transparent lg:border-none"
  >
    <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div
        class="relative h-16 flex items-center justify-between lg:border-b lg:border-light-blue-800"
      >
        <div class="px-2 flex items-center lg:px-0">
          <div class="flex-shrink-0"></div>
          <div v-if="false" class="hidden lg:block lg:ml-6 lg:space-x-4">
            <div class="flex">
              <!-- Current: "bg-black bg-opacity-25", Default: "hover:bg-light-blue-800" -->
              <a
                href="#"
                class="bg-black bg-opacity-25 rounded-md py-2 px-3 text-sm font-medium text-white"
                >Dashboard</a
              >

              <a
                href="#"
                class="hover:bg-light-blue-800 rounded-md py-2 px-3 text-sm font-medium text-white"
                >Jobs</a
              >

              <a
                href="#"
                class="hover:bg-light-blue-800 rounded-md py-2 px-3 text-sm font-medium text-white"
                >Applicants</a
              >

              <a
                href="#"
                class="hover:bg-light-blue-800 rounded-md py-2 px-3 text-sm font-medium text-white"
                >Company</a
              >
            </div>
          </div>
        </div>
        <div class="flex lg:hidden">
          <!-- Mobile menu button -->
          <button
            type="button"
            class="p-2 rounded-md inline-flex items-center justify-center text-light-blue-200 hover:text-white hover:bg-light-blue-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <!--
                Icon when menu is closed.

                Heroicon name: outline/menu

                Menu open: "hidden", Menu closed: "block"
              -->
            <svg
              class="block flex-shrink-0 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!--
                Icon when menu is open.

                Heroicon name: outline/x

                Menu open: "block", Menu closed: "hidden"
              -->
            <svg
              class="hidden flex-shrink-0 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="hidden lg:block lg:ml-4">
          <div class="flex items-center">
            <nuxt-link
              :to="{ name: 'antraege' }"
              class="flex-shrink-0 rounded-full p-1 text-light-blue-200 hover:bg-light-blue-800 hover:text-white focus:outline-none focus:bg-light-blue-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-blue-900 focus:ring-white"
            >
              <span class="sr-only">View notifications</span>
              <!-- Heroicon name: outline/bell -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </nuxt-link>

            <!-- Profile dropdown -->
            <div
              v-click-outside="closeDropdown"
              class="relative flex-shrink-0 ml-4"
            >
              <div>
                <button
                  id="user-menu"
                  type="button"
                  class="rounded-full flex text-sm text-white focus:outline-none focus:bg-light-blue-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-blue-900 focus:ring-white"
                  aria-expanded="false"
                  aria-haspopup="true"
                  @click="toggleDropdown"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="rounded-full h-8 w-8"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=XuwRpuUDYo&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80"
                    alt=""
                  />
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
                  v-if="isDropdownOpen"
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <nuxt-link
                    to="/profil"
                    class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    >Dein Profil</nuxt-link
                  >

                  <nuxt-link
                    to="/einstellungen"
                    class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    >Einstellungen</nuxt-link
                  >

                  <a
                    href="#"
                    class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    >Ausloggen</a
                  >
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div v-if="false" id="mobile-menu" class="bg-light-blue-900 lg:hidden">
      <div class="pt-2 pb-3 px-2 space-y-1">
        <!-- Current: "bg-black bg-opacity-25", Default: "hover:bg-light-blue-800" -->
        <a
          href="#"
          class="bg-black bg-opacity-25 block rounded-md py-2 px-3 text-base font-medium text-white"
          >Dashboard</a
        >

        <a
          href="#"
          class="hover:bg-light-blue-800 block rounded-md py-2 px-3 text-base font-medium text-white"
          >Jobs</a
        >

        <a
          href="#"
          class="hover:bg-light-blue-800 block rounded-md py-2 px-3 text-base font-medium text-white"
          >Applicants</a
        >

        <a
          href="#"
          class="hover:bg-light-blue-800 block rounded-md py-2 px-3 text-base font-medium text-white"
          >Company</a
        >
      </div>
      <div class="pt-4 pb-3 border-t border-light-blue-800">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img
              class="rounded-full h-10 w-10"
              src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=XuwRpuUDYo&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80"
              alt=""
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-white">Debbie Lewis</div>
            <div class="text-sm font-medium text-light-blue-200">
              debbielewis@example.com
            </div>
          </div>
          <button
            class="ml-auto flex-shrink-0 rounded-full p-1 text-light-blue-200 hover:bg-light-blue-800 hover:text-white focus:outline-none focus:bg-light-blue-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-blue-900 focus:ring-white"
          >
            <span class="sr-only">View notifications</span>
            <!-- Heroicon name: outline/bell -->
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
        </div>
        <div class="mt-3 px-2">
          <a
            href="#"
            class="block rounded-md py-2 px-3 text-base font-medium text-light-blue-200 hover:text-white hover:bg-light-blue-800"
            >Dein Profil</a
          >

          <a
            href="#"
            class="block rounded-md py-2 px-3 text-base font-medium text-light-blue-200 hover:text-white hover:bg-light-blue-800"
            >Einstellungen</a
          >

          <a
            href="#"
            class="block rounded-md py-2 px-3 text-base font-medium text-light-blue-200 hover:text-white hover:bg-light-blue-800"
            >Ausloggen</a
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'MainNav',
  setup() {
    const isDropdownOpen = ref(false)
    const toggleDropdown = (): void => {
      isDropdownOpen.value = !isDropdownOpen.value
    }

    const closeDropdown = (): void => {
      isDropdownOpen.value = false
    }
    return {
      isDropdownOpen,
      closeDropdown,
      toggleDropdown,
    }
  },
})
</script>
