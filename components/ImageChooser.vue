<template>
  <div class="mt-4">
    <label class="block font-medium text-gray-700 mb-2"
      >Wähle ein thematisches Projektbild</label
    >
    <input
      id="email"
      v-model="searchTerm"
      type="text"
      name="email"
      class="
        shadow-sm
        focus:ring-indigo-500 focus:border-indigo-500
        block
        w-1/3
        bg-gray-100
        border-0
        sm:text-sm
        rounded-md
      "
      placeholder="Nach Kategorien suchen..."
    />
    <div v-if="isLoading" class="py-16 text-center text-gray-400">
      <loading-indicator></loading-indicator>
      <p class="mt-4">Bilder werden geladen</p>
    </div>
    <div
      v-else-if="
        !isLoading && images && images.results && images.results.length
      "
      class="grid grid-cols-5 gap-4 mt-4 cy_imgs"
    >
      <div
        v-for="image in images.results"
        :key="image.id"
        class="
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          group
          block
          w-full
          aspect-w-4 aspect-h-3
          rounded-lg
          bg-gray-100
          overflow-hidden
        "
        :class="
          selectedImage && selectedImage.id === image.id
            ? 'ring-2 ring-offset-2 ring-indigo-500'
            : ''
        "
        @click="selectImage(image)"
      >
        <!-- Current: "", Default: "group-hover:opacity-75" -->
        <img
          :src="image.urls.small"
          alt=""
          class="object-cover pointer-events-none"
        />
        <button type="button" class="absolute inset-0 focus:outline-none">
          <span class="sr-only">View details for IMG_4985.HEIC</span>
        </button>
      </div>
    </div>
    <div v-else-if="true" class="py-16 text-center text-gray-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8 text-gray-300 mx-auto transform rotate-12 mb-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      Keine Bilder für den Suchbegriff gefunden
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'
import { useAxios } from '~/composables/useAxios'

export default defineComponent({
  emits: ['selectImage'],
  setup(_, { emit }) {
    const images = ref(null)
    const isLoading = ref(true)
    const searchTerm = ref(null)
    const $axios = useAxios()
    const useUnsplash = async () => {
      try {
        isLoading.value = true
        const response = await $axios.get(
          `https://api.unsplash.com/search/photos?page=1&per_page=10&query=${
            searchTerm.value ? searchTerm.value : 'future'
          }&client_id=hMuPe_y9Zi2RD7j9KoPiBBuOhHc-pa5ocywPLKHY9kc`
        )
        images.value = response.data
        isLoading.value = false
        console.log(response)
      } catch (error) {
        isLoading.value = false
      }
    }
    useUnsplash()
    const selectedImage = ref(null)
    const selectImage = (image: any) => {
      selectedImage.value = image
      emit('selectImage', image)
    }

    watch(
      () => searchTerm.value,
      () => {
        useUnsplash()
      }
    )
    return {
      selectImage,
      images,
      isLoading,
      selectedImage,
      searchTerm,
    }
  },
})
</script>
