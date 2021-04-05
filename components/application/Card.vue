<template>
  <li class="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
    <nuxt-link :to="{ name: 'antraege-id', params: { id: 'erster' } }">
      <div class="w-full flex items-center justify-between p-6 space-x-6">
        <div class="flex-1 truncate">
          <div class="flex items-center space-x-3">
            <h3 class="text-gray-900 text-sm font-medium truncate">
              Expresslinie
            </h3>
            <span
              class="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full"
              >Admin</span
            >
          </div>
          <p class="mt-1 text-gray-500 text-sm truncate">Dresden</p>
        </div>
      </div>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  name: 'ApplicationCard',
}
</script>
