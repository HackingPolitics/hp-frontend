<template>
  <div class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
    <div class="w-full flex justify-between">
      <div></div>
      <base-button @click="openModal">Neue Kategorie</base-button>
    </div>
    <section aria-labelledby="category_heading">
      <div class="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 sm:px-6">
          <h2
            id="category_heading"
            class="text-lg leading-6 font-medium text-gray-900"
          >
            Kategorien
          </h2>
        </div>
        <div class="mt-6 flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
              class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
            >
              <div class="overflow-hidden border-t border-gray-200">
                <table
                  v-if="categories"
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
                        Name
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
                    <tr v-for="category in categories" :key="category.id">
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
                        <div>{{ category.name }}</div>
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
                        <button
                          class="text-purple-600 hover:text-purple-900"
                          @click="openEditModal(category)"
                        >
                          Bearbeiten
                        </button>
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
    <base-modal :is-modal-open="isModalOpen" @close="isModalOpen = false">
      <forms-admin-category
        :item="selectedCategory"
        :errors="errors"
        @close="isModalOpen = false"
        @submit="createOrUpdateCategory"
      ></forms-admin-category>
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
import { ICategory } from '~/types/apiSchema'

interface CategoryData {
  name: string
  id?: string
}

export default defineComponent({
  name: 'AdminCategories',
  layout: 'admin',
  setup() {
    const axios = useAxios()
    const categories = ref<ICategory[] | null>(null)
    const isLoading = ref(false)
    const paginationData = ref(null)
    const currentPage = ref(1)
    const currentLimit = ref(15)
    const totalItems = ref(null)
    const fetchData = async () => {
      isLoading.value = true
      try {
        const response = await axios.get(
          `/categories?page=${currentPage.value}`
        )
        console.log(response)
        totalItems.value = response.data['hydra:totalItems']
        paginationData.value = response.data['hydra:view']
        categories.value = response.data['hydra:member']
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

    const isModalOpen = ref(false)
    const openModal = () => {
      isModalOpen.value = true
      errors.value = null
    }
    const selectedCategory = ref<ICategory | null>(null)
    const openEditModal = (category) => {
      selectedCategory.value = category
      isModalOpen.value = true
    }

    const context = useContext()
    // @ts-ignore
    const { $axios, $notify } = context
    const createOrUpdateCategory = async (categoryData: CategoryData) => {
      if (selectedCategory.value) {
        try {
          const response = await $axios.put(
            `/categories/${categoryData.id}`,
            categoryData
          )

          if (response) {
            fetchData()
            // @ts-ignore
            $notify({
              title: 'Kategorie geändert',
              duration: 300,
              type: 'success',
            })
          }
          isModalOpen.value = false
        } catch (error) {
          console.log(error)
          // @ts-ignore
          $notify({
            title: 'Kategorie konnte nicht geändert werden',
            duration: 300,
            type: 'warn',
          })
        }
      } else {
        try {
          const response = await $axios.post('/categories', categoryData)

          if (response) {
            fetchData()
            // @ts-ignore
            $notify({
              title: 'Kategorie erstellt',
              duration: 300,
              type: 'success',
            })
          }
          isModalOpen.value = false
        } catch (error) {
          console.log(error)
          // @ts-ignore
          $notify({
            title: 'Kategorie konnte nicht erstellt werden',
            duration: 300,
            type: 'error',
          })
        }
        console.log('create')
      }
    }

    const updateCategory = () => {
      console.log('update')
    }

    const deleteCategory = () => {
      console.log('delete')
    }

    const errors = ref(null)
    return {
      categories,
      totalItems,
      currentPage,
      currentLimit,
      nextPage,
      prevPage,
      openModal,
      isModalOpen,
      errors,
      selectedCategory,
      createOrUpdateCategory,
      updateCategory,
      deleteCategory,
      openEditModal,
    }
  },
})
</script>
