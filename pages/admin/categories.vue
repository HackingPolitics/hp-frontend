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
                    <tr
                      v-for="category in categories"
                      :key="category.id"
                      class="hover:bg-gray-50"
                    >
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
                          flex
                          items-center
                          space-x-4
                          justify-end
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
                          @click="openEditModal(category)"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="
                            h-4
                            w-4
                            text-gray-500
                            hover:text-red-500
                            cursor-pointer
                          "
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          @click="openDeleteModal(category)"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
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
        @close="closeModal"
        @submit="createOrUpdateCategory"
      ></forms-admin-category>
    </base-modal>
    <base-modal
      :is-modal-open="isDeleteModalOpen"
      @close="isDeleteModalOpen = false"
    >
      <div v-if="selectedCategory">
        <div class="sm:flex sm:items-start">
          <div
            class="
              mx-auto
              flex-shrink-0 flex
              items-center
              justify-center
              h-12
              w-12
              rounded-full
              bg-red-100
              sm:mx-0 sm:h-10 sm:w-10
            "
          >
            <!-- Heroicon name: outline/exclamation -->
            <svg
              class="h-6 w-6 text-red-600"
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              id="modal-title"
              class="text-lg leading-6 font-medium text-gray-900"
            >
              Kategorie löschen
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                Möchtest du wirklich die Kategorie
                <span class="text-gray-800 font-semibold">{{
                  selectedCategory.name
                }}</span>
                löschen? Der Vorgang kann nicht rückgängig gemacht werden.
              </p>
            </div>
          </div>
        </div>
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
              bg-red-600
              text-base
              font-medium
              text-white
              hover:bg-red-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-red-500
              sm:ml-3 sm:w-auto sm:text-sm
            "
            @click="deleteCategory(selectedCategory.id)"
          >
            Löschen
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
              hover:bg-gray-50
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500
              sm:mt-0 sm:w-auto sm:text-sm
            "
            @click="closeDeleteModal"
          >
            Abbrechen
          </button>
        </div>
      </div>
    </base-modal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  useStore,
  computed,
} from '@nuxtjs/composition-api'
import { RootState } from '~/store'
import { ICategory } from '~/types/apiSchema'

interface CategoryData {
  name: string
  id?: string
}

export default defineComponent({
  name: 'AdminCategories',
  layout: 'admin',
  setup() {
    const store = useStore<RootState>()

    const categories = computed(() => {
      return store.state.categories.categories?.['hydra:member']
    })
    // const paginationData = computed(() => {
    //   return store.state.categories.categories?.['hydra:view']
    // })
    const currentPage = ref(1)
    const currentLimit = ref(15)
    const totalItems = computed(() => {
      return store.state.categories.categories?.['hydra:totalItems']
    })

    const isLoading = ref(false)
    const fetchData = async () => {
      isLoading.value = true
      await store.dispatch('categories/fetchCategories', currentPage.value)
      isLoading.value = false
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
    }
    const closeModal = () => {
      selectedCategory.value = null
      isModalOpen.value = false
    }
    const selectedCategory = ref<ICategory | null>(null)
    const openEditModal = (category: ICategory) => {
      selectedCategory.value = category
      isModalOpen.value = true
    }

    const isDeleteModalOpen = ref(false)
    const openDeleteModal = (category: ICategory) => {
      selectedCategory.value = category
      isDeleteModalOpen.value = true
    }

    const closeDeleteModal = () => {
      selectedCategory.value = null
      isDeleteModalOpen.value = false
    }

    const errors = computed(() => {
      return store.state.categories.error
    })

    const createOrUpdateCategory = async (categoryData: CategoryData) => {
      if (selectedCategory.value) {
        await store.dispatch('categories/updateCategory', {
          id: categoryData.id,
          payload: categoryData,
        })
        if (!errors.value) {
          isModalOpen.value = false
          selectedCategory.value = null
          await store.dispatch('categories/fetchCategories')
        }
      } else {
        await store.dispatch('categories/createCategory', categoryData)
        if (!errors.value) {
          isModalOpen.value = false
          await store.dispatch('categories/fetchCategories')
        }
      }
    }

    const deleteCategory = async (id: string) => {
      await store.dispatch('categories/deleteCategory', id)
      await store.dispatch('categories/fetchCategories')
      isDeleteModalOpen.value = false
      selectedCategory.value = null
    }

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
      deleteCategory,
      openEditModal,
      isDeleteModalOpen,
      openDeleteModal,
      closeDeleteModal,
      closeModal,
    }
  },
})
</script>
