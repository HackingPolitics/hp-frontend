<template>
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
        v-if="project.featureImage"
        class="h-48 object-cover rounded-tl rounded-tr"
        :src="project.featureImage"
      />
      <div
        v-else-if="rndInt === 1"
        class="
          h-48
          w-full
          rounded-tl rounded-tr
          bg-white
          overflow-hidden
          relative
          group
        "
      >
        <div
          class="
            h-64
            w-64
            filter
            rounded-full
            transform
            transition
            duration-500
            ease-in-out
            group-hover:-translate-x-2
            mix-blend-multiply
            bg-gradient-to-t
            from-yellow-400
            to-red-400
            absolute
            -bottom-12
            left-8
            rotate-45
          "
        ></div>
        <div
          class="
            h-48
            w-48
            rounded-full
            transform
            transition
            duration-500
            ease-in-out
            group-hover:scale-110
            mix-blend-multiply
            bg-gradient-to-r
            from-blue-400
            to-purple-500
            absolute
            -top-12
            right-8
            rotate-45
          "
        ></div>
      </div>
      <div
        v-else-if="rndInt === 2"
        class="
          h-48
          w-full
          rounded-tl rounded-tr
          bg-white
          overflow-hidden
          relative
          group
        "
      >
        <div
          class="
            h-48
            w-48
            filter
            transform
            transition
            duration-500
            ease-in-out
            group-hover:-translate-x-2
            mix-blend-multiply
            bg-gradient-to-t
            from-yellow-400
            to-red-400
            absolute
            -top-12
            left-8
            rotate-45
          "
        ></div>
        <div
          class="
            h-48
            w-48
            rounded-full
            transform
            transition
            duration-500
            ease-in-out
            group-hover:scale-110
            mix-blend-multiply
            bg-gradient-to-r
            from-blue-400
            to-purple-500
            absolute
            -top-12
            right-8
            rotate-45
          "
        ></div>
      </div>
      <!-- <div
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
          </div> -->
      <div class="px-4 pt-2 pb-4">
        <div class="mt-4">
          <chip
            v-for="(category, categoryIndex) in project.categories"
            :key="categoryIndex"
            class="mr-2 mb-2"
            >{{ category.name }}</chip
          >
          <h3 class="text-gray-900 text-xl mt-4 font-medium">
            {{ project.title }}
          </h3>
          <p class="text-gray-600 text-base mt-2">
            {{ project.description }}
          </p>
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
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IProject } from '~/types/apiSchema'

export default defineComponent({
  name: 'ApplicationCard',
  props: {
    project: {
      type: Object as PropType<IProject>,
      default: null,
    },
  },
  setup() {
    const rndInt = Math.floor(Math.random() * 2) + 1
    return {
      rndInt,
    }
  },
})
</script>
