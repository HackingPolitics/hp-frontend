<template>
  <div>
    <main class="relative">
      <header
        class="relative py-10 bg-purple-800 h-64"
        :style="
          featureImage
            ? `background-image: url(${featureImage}); background-size: cover; background-position: center center`
            : ''
        "
      >
        <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8"></div>
        <div
          v-if="canEdit"
          class="
            hidden
            sm:block
            absolute
            top-0
            right-0
            pt-4
            pr-4
            text-white
            opacity-75
            cursor-pointer
          "
          @click="isModalOpen = true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
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
        </div>
      </header>
      <div
        class="
          max-w-screen-xl
          mx-auto
          pb-6
          px-4
          sm:px-6
          lg:pb-16 lg:px-8
          -mt-8
          relative
        "
      >
        <slot />
      </div>
      <base-modal :is-modal-open="isModalOpen" @close="isModalOpen = false">
        <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
          <button
            type="button"
            class="
              bg-white
              rounded-md
              text-gray-400
              hover:text-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500
            "
            @click="isModalOpen = false"
          >
            <span class="sr-only">Close</span>
            <!-- Heroicon name: outline/x -->

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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <image-chooser @selectImage="selectImage"></image-chooser>
        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="
              w-full
              inline-flex
              justify-center
              rounded-md
              border border-transparent
              shadow-sm
              px-4
              py-2
              bg-purple-600
              text-base
              font-medium
              text-white
              hover:bg-purple-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-purple-500
              sm:ml-3 sm:w-auto sm:text-sm
            "
            @click="updateProjectImage"
          >
            Bild ändern
          </button>
          <button
            type="button"
            class="
              mt-3
              w-full
              inline-flex
              justify-center
              rounded-md
              border border-gray-300
              shadow-sm
              px-4
              py-2
              bg-white
              text-base
              font-medium
              text-gray-700
              hover:text-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500
              sm:mt-0 sm:w-auto sm:text-sm
            "
            @click="isModalOpen = false"
          >
            Abbrechen
          </button>
        </div>
      </base-modal>
    </main>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  computed,
  ref,
} from '@nuxtjs/composition-api'

import ImageChooser from '../ImageChooser.vue'
import { RootState } from '~/store'

interface Image {
  id: number
  urls: {
    regular: string
  }
}

export default defineComponent({
  name: 'SingleView',
  components: { ImageChooser },
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  setup() {
    const store = useStore<RootState>()
    const isModalOpen = ref(false)
    const featureImage = computed(() => {
      return store.state.projects.project.featureImage
    })

    const project = computed(() => {
      return store.state.projects.project
    })

    const canEdit = computed(() => {
      return store.getters['projects/canEditProject'](project.value.id)
    })
    const selectedImage = ref<Image | null>(null)

    const selectImage = (image: any) => {
      selectedImage.value = image
    }

    const updateProjectImage = () => {
      if (selectedImage?.value?.urls?.regular) {
        const payload = { featureImage: selectedImage?.value?.urls?.regular }
        store.dispatch('projects/updateProject', [project.value.id, payload])
        store.dispatch('projects/fetchProject', project.value.id)
      }
      isModalOpen.value = false
    }
    return {
      featureImage,
      updateProjectImage,
      isModalOpen,
      canEdit,
      selectImage,
      selectedImage,
    }
  },
})
</script>
