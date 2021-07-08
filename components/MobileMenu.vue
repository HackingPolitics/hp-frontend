<template>
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
        <nav-link
          v-for="link in links"
          :key="link.title"
          type="mobile"
          :to="localePath(link.to)"
          >{{ $t(link.title) }}</nav-link
        >
      </div>
      <div class="pt-4 pb-3 border-t border-purple-500">
        <div v-if="user" class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixqx=XuwRpuUDYo&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-white">
              {{ user.firstName + ' ' + user.lastName }}
            </div>
            <div class="text-sm font-medium text-purple-200">
              {{ user.email }}
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
              hover:text-white hover:bg-purple-400
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
              hover:text-white hover:bg-purple-400
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
              hover:text-white hover:bg-purple-400
            "
            @click="$auth.logout()"
          >
            {{ $t('common.auth.logout') }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  useStore,
  computed,
} from '@nuxtjs/composition-api'
import { IUser } from '~/types/apiSchema'

interface NavLink {
  title: string
  to: string
}

export default defineComponent({
  props: {
    links: {
      type: Array as PropType<NavLink[]>,
      default: null,
    },
    isMobileDropdownOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore<any>()
    const user = computed<IUser>(() => {
      return store.state.auth.user
    })
    return {
      user,
    }
  },
})
</script>
