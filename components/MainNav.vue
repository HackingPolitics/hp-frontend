<template>
  <nav class="bg-purple-500" aria-label="Global">
    <div class="max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-8">
      <div class="flex justify-between h-20">
        <div class="flex items-center px-2 lg:px-0">
          <div class="flex-shrink-0 flex items-center">
            <logo></logo>
          </div>
          <div class="hidden lg:ml-8 lg:flex lg:space-x-4">
            <nav-link type="desktop" :to="localePath('/')">{{
              $t('menu.overview')
            }}</nav-link>
            <nav-link type="desktop" :to="localePath('/faq')">{{
              $t('menu.faq')
            }}</nav-link>
            <nav-link type="desktop" :to="localePath('/collaboration')">{{
              $t('menu.collaboration')
            }}</nav-link>

            <language-switcher></language-switcher>
          </div>
        </div>

        <div class="flex items-center lg:hidden">
          <!-- Mobile menu button -->
          <button
            type="button"
            class="
              inline-flex
              items-center
              justify-center
              p-2
              rounded-md
              text-black
              hover:text-white
              hover:bg-purple-500
              focus:outline-none
              focus:ring-2 focus:ring-inset focus:ring-white
            "
            aria-controls="mobile-menu"
            aria-expanded="false"
            @click="toggleMobileDropdown"
          >
            <span class="sr-only">Open menu</span>
            <!--
            Icon when menu is closed.
          -->
            <svg
              class="h-6 w-6 text-white"
              :class="isMobileDropdownOpen ? 'hidden' : 'block'"
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
          -->
            <svg
              class="h-6 w-6 text-white"
              :class="isMobileDropdownOpen ? 'block' : 'hidden'"
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
        <div v-if="user" class="hidden lg:ml-4 lg:flex lg:items-center">
          <nuxt-link
            :to="localePath('/antraege')"
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
            Meine Anträge
          </nuxt-link>
          <div>
            <!-- Profile dropdown -->
            <div class="ml-4 relative flex-shrink-0">
              <div>
                <button
                  id="user-menu-button"
                  type="button"
                  class="
                    bg-purple-500
                    rounded-full
                    flex
                    text-sm
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-offset-purple-500
                    focus:ring-white
                  "
                  aria-expanded="false"
                  aria-haspopup="true"
                  @click="toggleDropdown"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixqx=XuwRpuUDYo&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>

              <!--
            Dropdown menu, show/hide based on menu state.
          -->
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
                  class="
                    origin-top-right
                    absolute
                    right-0
                    mt-2
                    w-48
                    rounded-md
                    shadow-lg
                    py-1
                    bg-white
                    ring-1 ring-black ring-opacity-5
                    focus:outline-none
                    z-20
                  "
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabindex="-1"
                >
                  <!-- Active: "bg-gray-100", Not Active: "" -->
                  <a
                    id="user-menu-item-0"
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    >Profil</a
                  >

                  <a
                    id="user-menu-item-1"
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    >Einstellungen</a
                  >

                  <div
                    id="user-menu-item-2"
                    class="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                    role="menuitem"
                    tabindex="-1"
                    @click="$store.dispatch('auth/logout')"
                  >
                    Ausloggen
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div v-else class="flex items-center">
          <nuxt-link
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

    <!-- Mobile menu, show/hide based on menu state. -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-if="isMobileDropdownOpen" id="mobile-menu" class="lg:hidden z-10">
        <div class="pt-2 pb-3 px-2 space-y-1">
          <nav-link type="mobile" :to="localePath('/')">{{
            $t('menu.overview')
          }}</nav-link>
          <nav-link type="mobile" :to="localePath('/faq')">{{
            $t('menu.faq')
          }}</nav-link>
          <nav-link type="mobile" :to="localePath('/collaboration')">{{
            $t('menu.collaboration')
          }}</nav-link>
        </div>
        <div class="pt-4 pb-3 border-t border-purple-500">
          <div class="flex items-center px-4">
            <div class="flex-shrink-0">
              <img
                class="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixqx=XuwRpuUDYo&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-white">Floyd Miles</div>
              <div class="text-sm font-medium text-purple-200">
                floydmiles@example.com
              </div>
            </div>
            <button
              class="
                ml-auto
                flex-shrink-0
                bg-purple-500
                rounded-full
                p-1
                text-purple-200
                hover:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-offset-purple-500
                focus:ring-white
              "
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
              class="
                block
                rounded-md
                py-2
                px-3
                text-base
                font-medium
                text-purple-200
                hover:text-white
                hover:bg-purple-400
              "
              >Profil</a
            >

            <a
              href="#"
              class="
                block
                rounded-md
                py-2
                px-3
                text-base
                font-medium
                text-purple-200
                hover:text-white
                hover:bg-purple-400
              "
              >Einstellungen</a
            >

            <div
              class="
                block
                rounded-md
                py-2
                px-3
                text-base
                font-medium
                text-purple-200
                hover:text-white
                hover:bg-purple-400
              "
              @click="$store.dispatch('auth/logout')"
            >
              {{ $t('general.logout') }}
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useStore,
  computed,
} from '@nuxtjs/composition-api'
import NavLink from './NavLink.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

export default defineComponent({
  name: 'MainNav',
  components: { NavLink, LanguageSwitcher },
  setup() {
    const store = useStore<any>()
    const user = computed(() => {
      return store.state.auth.user
    })
    const isDropdownOpen = ref(false)
    const toggleDropdown = (): void => {
      isDropdownOpen.value = !isDropdownOpen.value
    }
    const closeDropdown = (): void => {
      isDropdownOpen.value = false
    }
    // Mobile Dropdown
    const isMobileDropdownOpen = ref(false)
    const toggleMobileDropdown = (): void => {
      isMobileDropdownOpen.value = !isMobileDropdownOpen.value
    }
    const closeMobileDropdown = (): void => {
      isDropdownOpen.value = false
    }
    return {
      isDropdownOpen,
      closeDropdown,
      toggleDropdown,
      isMobileDropdownOpen,
      toggleMobileDropdown,
      closeMobileDropdown,
      user,
    }
  },
})
</script>
