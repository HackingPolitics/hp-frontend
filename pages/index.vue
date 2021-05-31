<template>
  <layouts-single-view title="Meine Anträge">
    <div class="sm:flex mt-4">
      <ul
        class="
          sm:grid sm:grid-cols-2
          gap-3
          sm:w-1/3
          sm:mr-8
          sm:h-64
          mb-4
          sm:mb-0
        "
      >
        <li
          class="
            col-span-2
            flex
            sm:flex-col
            text-center
            bg-white
            rounded-lg
            shadow
            divide-y divide-gray-200
          "
        >
          <div class="flex-1 flex flex-col p-2 sm:p-8">
            <img
              class="
                w-16
                h-16
                sm:w-32
                sm:h-32
                flex-shrink-0
                mx-auto
                bg-black
                rounded-full
              "
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=XuwRpuUDYo&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
              alt=""
            />
            <h3 class="mt-2 sm:mt-6 text-gray-900 text-sm font-medium">
              Willkommen
            </h3>
            <dl class="mt-1 flex-grow flex flex-col justify-between">
              <dt class="sr-only">Title</dt>
              <dd class="text-gray-500 text-sm">Lisa Reiser</dd>
              <dt class="sr-only">Role</dt>
              <dd class="mt-3">
                <span
                  class="
                    px-2
                    py-1
                    text-green-800 text-xs
                    font-medium
                    bg-green-100
                    rounded-full
                  "
                  >Profil bearbeiten</span
                >
              </dd>
            </dl>
          </div>
          <div>
            <div class="-mt-px flex-col divide-y divide-gray-200">
              <div class="flex-1 flex">
                <span
                  class="
                    relative
                    -mr-px
                    w-0
                    flex-1
                    inline-flex
                    items-center
                    justify-center
                    py-4
                    text-sm text-gray-700
                    font-medium
                    border border-transparent
                    rounded-bl-lg
                    hover:text-gray-500
                  "
                >
                  <span class="font-bold mr-2">3</span> Anträge
                </span>
              </div>
              <div class="-ml-px flex-1 flex">
                <span
                  class="
                    relative
                    w-0
                    flex-1
                    inline-flex
                    items-center
                    justify-center
                    py-4
                    text-sm text-gray-400
                    font-medium
                    border border-transparent
                    rounded-br-lg
                    hover:text-gray-500
                  "
                >
                  registriert seit 26.04.2021
                  <!-- Heroicon name: solid/phone -->
                </span>
              </div>
              <div class="-ml-px flex-1 flex py-4 justify-center">
                <nuxt-link to="antraege/erstellen">
                  <chip chip-class="text-green-800"
                    ><outline-plus-icon class="w-5 h-5" /> Antrag
                    hinzufügen</chip
                  >
                </nuxt-link>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="col-span-2"
        >
          <ul>
            <li
              class="
                flex flex-col
                bg-white
                rounded-lg
                shadow
                divide-y divide-gray-200
              "
            >
              <div class="flex-1">
                <nuxt-link
                  class="flex-1 flex flex-col"
                  :to="{ name: 'antraege-id', params: { id: project.id } }"
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
                        >{{ category }}</chip
                      >
                      <h3 class="text-gray-900 text-xl mt-4 font-medium">
                        {{ project.title }}
                      </h3>
                    </div>
                  </div>
                  <div>
                    <div class="-mt-px flex justify-between">
                      <div class="flex-1 flex p-4">
                        <avatar-group
                          :avatars="project.memberships"
                        ></avatar-group>
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
                          {{
                            $moment(project.updatedAt)
                              .subtract(1, 'days')
                              .calendar()
                          }}
                          <!-- Heroicon name: solid/phone -->
                        </span>
                      </div>
                    </div>
                  </div>
                </nuxt-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </layouts-single-view>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { IProject } from '~/types/apiSchema'

export default defineComponent({
  name: 'ApplicationsPage',
  setup() {
    const projects = ref<IProject[]>([])

    return { projects }
  },
  data() {
    return {
      defaultImg:
        'https://images.unsplash.com/photo-1527247043589-98e6ac08f56c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    }
  },
  async fetch() {
    try {
      const response = await this.$axios.get('/projects')
      this.projects = response.data['hydra:member']
    } catch (e) {
      console.log(e)
    }
  },
})
</script>
