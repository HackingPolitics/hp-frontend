<template>
  <div class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
    <div class="w-full flex justify-between">
      <div></div>
      <base-button @click="openModal">Neues Parlament</base-button>
    </div>

    <section aria-labelledby="billing_history_heading">
      <div class="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 sm:px-6">
          <h2
            id="billing_history_heading"
            class="text-lg leading-6 font-medium text-gray-900"
          >
            Parlamente
          </h2>
        </div>
        <div class="mt-6 flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
              class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
            >
              <div class="overflow-hidden border-t border-gray-200">
                <table
                  v-if="parliaments"
                  class="min-w-full divide-y divide-gray-200"
                >
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="
                          px-6
                          py-3
                          text-left text-xs
                          font-medium
                          text-gray-500
                          uppercase
                          tracking-wider
                        "
                      >
                        Titel
                      </th>
                      <th
                        scope="col"
                        class="
                          px-6
                          py-3
                          text-left text-xs
                          font-medium
                          text-gray-500
                          uppercase
                          tracking-wider
                        "
                      >
                        Standort
                      </th>
                      <th
                        scope="col"
                        class="
                          px-6
                          py-3
                          text-left text-xs
                          font-medium
                          text-gray-500
                          uppercase
                          tracking-wider
                        "
                      >
                        Fraktionen
                      </th>
                      <th
                        scope="col"
                        class="
                          px-6
                          py-3
                          text-left text-xs
                          font-medium
                          text-gray-500
                          uppercase
                          tracking-wider
                        "
                      >
                        Status
                      </th>
                      <!--
                                `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                              -->
                      <th
                        scope="col"
                        class="
                          relative
                          px-6
                          py-3
                          text-left text-xs
                          font-medium
                          text-gray-500
                          uppercase
                          tracking-wider
                        "
                      >
                        <span class="sr-only">View receipt</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="parlament in parliaments" :key="parlament.id">
                      <td
                        class="
                          px-6
                          py-4
                          whitespace-nowrap
                          text-sm
                          font-medium
                          text-gray-900
                        "
                      >
                        <div>{{ parlament.title }}</div>
                      </td>
                      <td
                        class="
                          px-6
                          py-4
                          whitespace-nowrap
                          text-sm text-gray-500
                        "
                      >
                        {{ parlament.zipArea }}, {{ parlament.location }}
                      </td>
                      <td
                        class="
                          px-6
                          py-4
                          whitespace-nowrap
                          text-sm text-gray-500
                        "
                      >
                        {{ parlament.fractions.length }}
                      </td>
                      <td
                        class="
                          px-6
                          py-4
                          whitespace-nowrap
                          text-sm text-gray-500
                        "
                      >
                        {{ parlament.active ? 'aktiv' : 'inaktiv' }}
                      </td>
                      <td
                        class="
                          px-6
                          py-4
                          whitespace-nowrap
                          text-right text-sm
                          font-medium
                        "
                      >
                        <nuxt-link
                          v-if="parlament"
                          :to="
                            localePath({
                              name: 'admin-parliaments-id',
                              params: {
                                id:
                                  parlament && parlament.id
                                    ? parlament.id.toString()
                                    : '',
                              },
                            })
                          "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="
                              h-4
                              w-4
                              text-gray-500
                              hover:text-purple-500
                              cursor-pointer
                            "
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            /></svg
                        ></nuxt-link>
                      </td>
                    </tr>

                    <!-- More payments... -->
                  </tbody>
                </table>
                <nav
                  class="
                    bg-white
                    px-4
                    py-3
                    flex
                    items-center
                    justify-between
                    border-t border-gray-200
                    sm:px-6
                  "
                  aria-label="Pagination"
                >
                  <div class="hidden sm:block">
                    <p class="text-sm text-gray-700">
                      Ergebnis
                      <span class="font-medium">1</span>
                      bis
                      <span class="font-medium">10</span>
                      von
                      <span class="font-medium">{{ totalItems }}</span>
                    </p>
                  </div>
                  <div class="flex-1 flex justify-between sm:justify-end">
                    <button
                      v-if="currentPage != 1"
                      class="
                        relative
                        inline-flex
                        items-center
                        px-4
                        py-2
                        border border-gray-300
                        text-sm
                        font-medium
                        rounded-md
                        text-gray-700
                        bg-white
                        hover:bg-gray-50
                      "
                      @click="prevPage"
                    >
                      Vorherige
                    </button>
                    <button
                      v-if="currentLimit < totalItems"
                      class="
                        ml-3
                        relative
                        inline-flex
                        items-center
                        px-4
                        py-2
                        border border-gray-300
                        text-sm
                        font-medium
                        rounded-md
                        text-gray-700
                        bg-white
                        hover:bg-gray-50
                      "
                      @click="nextPage"
                    >
                      Weitere
                    </button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <base-modal
      :is-modal-open="newParliamentModal"
      @close="newParliamentModal = false"
    >
      <forms-admin-parliament
        :errors="errors"
        @close="newParliamentModal = false"
        @submit="createParliament"
      ></forms-admin-parliament>
    </base-modal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  useContext,
} from '@nuxtjs/composition-api'
import { useAxios } from '~/composables/useAxios'
import { IParliament } from '~/types/apiSchema'

export default defineComponent({
  name: 'AdminParlaments',
  layout: 'admin',
  setup() {
    const axios = useAxios()
    const parliaments = ref<IParliament[] | null>(null)
    const isLoading = ref(false)
    const paginationData = ref(null)
    const currentPage = ref(1)
    const currentLimit = ref(15)
    const totalItems = ref(null)
    const fetchData = async () => {
      isLoading.value = true
      try {
        const response = await axios.get(`/councils?page=${currentPage.value}`)
        console.log(response)
        totalItems.value = response.data['hydra:totalItems']
        paginationData.value = response.data['hydra:view']
        parliaments.value = response.data['hydra:member']
        isLoading.value = false
      } catch (error) {
        isLoading.value = false
      }
    }
    fetchData()

    watch(
      () => currentPage.value,
      () => {
        console.log('changed')
        fetchData()
      }
    )

    const nextPage = () => {
      currentPage.value = currentPage.value + 1
      currentLimit.value = currentLimit.value + 15
    }

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value = currentPage.value - 1
        currentLimit.value = currentLimit.value - 15
      }
    }

    const newParliamentModal = ref(false)

    const openModal = () => {
      newParliamentModal.value = true
      errors.value = null
    }

    const context = useContext()

    const errors = ref(null)

    const createParliament = async (data: any) => {
      try {
        const response = await axios.post('/councils', data)
        console.log(response)
        fetchData()
        // @ts-ignore
        context.$notify({
          title: 'Parlament erstellt',
          duration: 300,
          type: 'success',
        })
        newParliamentModal.value = false
      } catch (error) {
        console.log(error)
        errors.value = error.response.data
        // @ts-ignore
        context.$notify({
          title: 'Parlament konnte nicht erstellt werden',
          duration: 300,
          type: 'error',
        })
      }
    }

    return {
      parliaments,
      totalItems,
      currentPage,
      currentLimit,
      nextPage,
      prevPage,
      newParliamentModal,
      createParliament,
      errors,
      openModal,
    }
  },
})
</script>
