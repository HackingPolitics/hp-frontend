<template>
  <aside class="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
    <nav class="space-y-1">
      <admin-nav-link to="/admin/general" title="Allgemein">
        <!-- Heroicon name: outline/cog -->
        <svg
          class="
            text-gray-400
            group-hover:text-gray-500
            flex-shrink-0
            -ml-1
            mr-3
            h-6
            w-6
            icon
          "
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
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </admin-nav-link>
      <admin-nav-link to="/admin/users" title="Nutzer">
        <svg
          class="
            text-gray-400
            group-hover:text-gray-500
            flex-shrink-0
            -ml-1
            mr-3
            h-6
            w-6
            icon
          "
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
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </admin-nav-link>

      <admin-nav-link to="/admin/projects" title="Projekte">
        <!-- Heroicon name: outline/cog -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="
            text-gray-400
            group-hover:text-gray-500
            flex-shrink-0
            -ml-1
            mr-3
            h-6
            w-6
            icon
          "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
          />
        </svg>
      </admin-nav-link>

      <admin-nav-link to="/admin/parliaments" title="Parlamente">
        <!-- Heroicon name: outline/cog -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="
            text-gray-400
            group-hover:text-gray-500
            flex-shrink-0
            -ml-1
            mr-3
            h-6
            w-6
            icon
          "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
          />
        </svg>
      </admin-nav-link>

      <admin-nav-link to="/admin/categories" title="Kategorien">
        <!-- Heroicon name: outline/key -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="
            text-gray-400
            group-hover:text-gray-500
            flex-shrink-0
            -ml-1
            mr-3
            h-6
            w-6
            icon
          "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      </admin-nav-link>

      <admin-nav-link to="/admin/states" title="Bundesländer">
        <!-- Heroicon name: outline/bell -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="
            text-gray-400
            group-hover:text-gray-500
            flex-shrink-0
            -ml-1
            mr-3
            h-6
            w-6
            icon
          "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
          />
        </svg>
      </admin-nav-link>
    </nav>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AdminSidebar',
  setup() {
    return {}
  },
})
</script>
