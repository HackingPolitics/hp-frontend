<template>
  <div v-if="$store.state.auth.user">
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
            @click="logout"
          >
            Ausloggen
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useRouter,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ProfileDropdown',
  setup() {
    const store = useStore()
    const router = useRouter()
    const isDropdownOpen = ref(false)
    const toggleDropdown = (): void => {
      isDropdownOpen.value = !isDropdownOpen.value
    }
    const closeDropdown = (): void => {
      isDropdownOpen.value = false
    }

    const logout = () => {
      store.dispatch('auth/logout')
      router.push('/')
    }
    return {
      isDropdownOpen,
      closeDropdown,
      toggleDropdown,
      logout,
    }
  },
})
</script>
