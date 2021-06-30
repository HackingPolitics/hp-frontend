<template>
  <nav class="bg-purple-500 main-nav" aria-label="Global">
    <div class="max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-8">
      <div class="flex justify-between h-20">
        <div class="flex items-center px-2 lg:px-0">
          <div class="flex-shrink-0 flex items-center">
            <logo></logo>
          </div>
          <div class="hidden lg:ml-8 lg:flex lg:space-x-4">
            <nav-link
              v-for="link in navLinks"
              :key="link.title"
              type="desktop"
              :to="localePath(link.to)"
              >{{ $t(link.title) }}</nav-link
            >
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
              hover:text-white hover:bg-purple-500
              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white
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
          <menu-profile-dropdown></menu-profile-dropdown>
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

    <mobile-menu
      :links="navLinks"
      :is-mobile-dropdown-open="isMobileDropdownOpen"
    ></mobile-menu>
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

export default defineComponent({
  name: 'MainNav',
  components: { NavLink },
  setup() {
    const store = useStore<any>()
    const user = computed(() => {
      return store.state.auth.user
    })

    // Nav Links

    const navLinks = ref([
      {
        title: 'menu.overview',
        to: '/',
      },
      {
        title: 'menu.faq',
        to: '/faq',
      },
    ])

    // Dropdown
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
      navLinks,
    }
  },
})
</script>

<style lang="postcss" scoped>
.main-nav .nav-link.nuxt-link-exact-active {
  @apply text-white font-semibold;
}
</style>
