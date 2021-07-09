<template>
  <div v-if="projects && projects.length > 0 && !isLoading" class="w-full">
    <ul class="w-full grid gap-4" :class="getCols()">
      <li
        v-for="(project, index) in projects"
        :key="index"
        class="
          flex flex-col
          bg-white
          rounded-lg
          shadow
          divide-y divide-gray-200
        "
      >
        <application-card :project="project"></application-card>
      </li>
    </ul>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <application-pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @changePage="setCurrentPage"
    ></application-pagination>
  </div>
  <div v-else-if="!isLoading && projects && projects.length === 0">
    <div class="flex flex-col text-center my-16">
      <div class="text-gray-400 mt-8 font-semibold text-lg">
        Keine Antragsprojekte vorhanden
      </div>
    </div>
  </div>
  <div v-else class="w-full py-16">
    <div class="flex flex-col text-center my-16">
      <loading-indicator v-if="isLoading"></loading-indicator>
      <div class="text-gray-400 mt-8 font-semibold text-lg">
        Projekte werden geladen...
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IProject } from '~/types/apiSchema'

export default defineComponent({
  props: {
    projects: {
      type: Array as PropType<IProject[] | null>,
      default: null,
    },
    cols: {
      type: Number,
      default: 2,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPages: {
      type: Number,
      default: 1,
    },
  },
  emits: ['changePage'],
  setup(props, { emit }) {
    const setCurrentPage = (page: number) => {
      emit('changePage', page)
    }
    const getCols = () => {
      switch (props.cols) {
        case 2:
          return 'grid-cols-1 sm:grid-cols-2'

        case 3:
          return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

        default:
          break
      }
    }
    return { getCols, setCurrentPage }
  },
})
</script>
