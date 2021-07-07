<template>
  <div class="mt-6 flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden border-t border-gray-200">
          <table v-if="fractions" class="min-w-full divide-y divide-gray-200">
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
                  Mitglieder
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
                  URL
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
            <tbody
              v-for="fraction in fractions"
              :key="fraction.id"
              class="bg-white divide-y divide-gray-200"
            >
              <tr>
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
                  <div class="flex items-center">
                    <div
                      class="rounded-full w-4 h-4 mr-2"
                      :style="{ 'background-color': `#${fraction.color}` }"
                    ></div>
                    {{ fraction.name }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ fraction.active ? 'aktiv' : 'inaktiv' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ fraction.memberCount }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ fraction.url }}
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
                  <FormulateInput
                    type="button"
                    input-class="text-purple-600 hover:text-purple-900"
                    @click="toggleExpand(fraction.id)"
                    >Bearbeiten</FormulateInput
                  >
                </td>
              </tr>
              <tr v-if="show.find((e) => e === fraction.id)">
                <td colspan="12">
                  <FormulateForm
                    v-slot="values"
                    class="bg-gray-50 p-4 rounded-md"
                  >
                    <forms-admin-fraction-field
                      :edit-mode="true"
                      :fraction="fraction"
                    ></forms-admin-fraction-field>
                    <div class="w-full flex justify-end items-center space-x-4">
                      <div
                        class="
                          text-gray-600 text-sm
                          hover:text-purple-500
                          cursor-pointer
                        "
                        @click="toggleExpand(fraction.id)"
                      >
                        Abbrechen
                      </div>
                      <FormulateInput
                        type="button"
                        @click="
                          submitUpdate({
                            id: fraction.id,
                            payload: values.value,
                          })
                        "
                        >Speichern</FormulateInput
                      >
                    </div>
                  </FormulateForm>
                </td>
              </tr>
              <!-- More payments... -->
            </tbody>
          </table>
          <!-- <nav
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
                </nav> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { IFraction } from '~/types/apiSchema'

interface FractionFormData {
  color: string
  memberCount: string | number
  name: string
  active: boolean
}

export default defineComponent({
  name: 'FractionList',
  props: {
    fractions: {
      type: Array as PropType<IFraction[] | null>,
      default: null,
    },
  },
  setup(_, context) {
    const show = ref<string[]>([])

    const toggleExpand = (e: string) => {
      if (show.value.find((val) => val === e)) {
        const index = show.value.indexOf(e)
        if (show.value.length > 1) {
          show.value.splice(index, index)
        } else {
          show.value.shift()
        }
      } else {
        show.value.push(e)
      }
    }

    const submitUpdate = (e: { id: string; payload: FractionFormData }) => {
      const mCount: string = e.payload.memberCount.toString()
      e.payload.memberCount = parseInt(mCount)
      e.payload.color = e.payload.color.substring(1)
      context.emit('update-fraction', e)
    }

    return { show, submitUpdate, toggleExpand }
  },
})
</script>
