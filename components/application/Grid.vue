<template>
  <ul
    v-if="projects && projects.length > 0 && !isLoading"
    class="w-full grid gap-4"
    :class="getCols()"
  >
    <li
      v-for="(project, index) in projects"
      :key="index"
      class="flex flex-col bg-white rounded-lg shadow divide-y divide-gray-200"
    >
      <div class="flex-1">
        <nuxt-link
          class="flex-1 flex flex-col"
          :to="
            localePath({
              name: 'antraege-id',
              params: { id: project.id },
            })
          "
        >
          <img
            v-if="project.imageUrl"
            class="h-48 object-cover rounded-tl rounded-tr"
            :src="project.imageUrl"
          />
          <div
            v-else
            class="
              h-48
              w-full
              flex
              items-center
              justify-center
              rounded-tl rounded-tr
              bg-gray-300
              text-center
            "
          >
            <span class="font-semibold text-xl text-gray-700"
              >Kein Bild vorhanden</span
            >
          </div>
          <div class="px-4 pt-2 pb-4">
            <div class="mt-4">
              <chip
                v-for="(category, categoryIndex) in project.categories"
                :key="categoryIndex"
                class="mr-2"
                >{{ category.name }}</chip
              >
              <h3 class="text-gray-900 text-xl mt-4 font-medium">
                {{ project.title }}
              </h3>
            </div>
          </div>
          <div>
            <div class="-mt-px flex justify-between">
              <div class="flex-1 flex p-4">
                <avatar-group :avatars="project.memberships"></avatar-group>
              </div>
              <div class="-ml-px flex-1 flex">
                <span
                  class="
                    relative
                    w-0
                    flex-1
                    inline-flex
                    items-center
                    justify-end
                    py-4
                    pr-4
                    text-sm text-gray-400
                    font-medium
                    border border-transparent
                    rounded-br-lg
                    hover:text-gray-500
                  "
                >
                  <!-- {{
                            project.updatedAt
                              ? $dateFns.format(
                                  parseISO(project.updatedAt),
                                  'dd.MM.yyyy',
                                  {
                                    locale: 'de',
                                  }
                                )
                              : null
                          }} -->
                  <!-- Heroicon name: solid/phone -->
                </span>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </li>
  </ul>
  <div v-else-if="projects && projects.length === 0">
    <div class="flex flex-col text-center my-16">
      <div class="text-gray-400 mt-8 font-semibold text-lg">
        Keine Antragsprojekte vorhanden
      </div>
    </div>
  </div>
  <div v-else>
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
  },
  setup(props) {
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
    return { getCols }
  },
})
</script>
