<template>
  <FormulateForm v-model="formData">
    <forms-layout title="Ratsmehrheit und Fraktionsinteressen">
      <div class="bg-gray-200 py-4">
        <div class="flex justify-between px-6">
          <div class="font-semibold">Stadtrat Dresden</div>
          <div class="">Stand: 20.05.2021</div>
        </div>
      </div>
      <div class="px-6 bg-white py-4">
        <div class="flex space-x-6 mt-4">
          <div><span class="font-semibold">5</span> Fraktionen</div>
          <div><span class="font-semibold">70</span> Sitze</div>
          <div class="text-green-500">
            <span class="font-semibold">32</span> Partnerstimmen
          </div>
        </div>
        <!-- This example requires Tailwind CSS v2.0+ -->
        <div class="relative mt-4">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300"></div>
          </div>
        </div>
        <div class="flex mt-12">
          <div class="w-1/2 flex flex-col justify-center">
            <div class="w-56 py-8 text-center mx-auto">
              Noch <span class="text-green-500 text-xl">4 Stimmen</span> für ein
              mehrheitliches Interesse
            </div>
          </div>
          <div class="w-1/2">
            <div v-for="item in 6" class="flex space-x-4 mb-4 items-center">
              <!-- This example requires Tailwind CSS v2.0+ -->
              <button
                type="button"
                class="
                  flex-shrink-0
                  group
                  relative
                  rounded-full
                  inline-flex
                  items-center
                  justify-center
                  h-5
                  w-10
                  cursor-pointer
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                "
                role="switch"
                aria-checked="false"
              >
                <span class="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  class="
                    pointer-events-none
                    absolute
                    bg-white
                    w-full
                    h-full
                    rounded-md
                  "
                ></span>
                <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
                <span
                  aria-hidden="true"
                  class="
                    bg-gray-200
                    pointer-events-none
                    absolute
                    h-4
                    w-9
                    mx-auto
                    rounded-full
                    transition-colors
                    ease-in-out
                    duration-200
                  "
                ></span>
                <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                <span
                  aria-hidden="true"
                  class="
                    translate-x-0
                    pointer-events-none
                    absolute
                    left-0
                    inline-block
                    h-5
                    w-5
                    border border-gray-200
                    rounded-full
                    bg-white
                    shadow
                    transform
                    ring-0
                    transition-transform
                    ease-in-out
                    duration-200
                  "
                ></span>
              </button>
              <div class="">36</div>
              <div>Fraktion 1</div>
            </div>
          </div>
        </div>
        <div class="py-4"></div>
      </div>
      <div class="mt-8">
        <h3 class="font-semibold text-gray-800 text-xl">Eigeninteressen</h3>
        <p class="text-sm text-gray-500 mt-2">
          Wähle eine Fraktion aus, um die Eigeninteressen zu formulieren und
          anzuzeigen.
        </p>
      </div>
    </forms-layout>
  </FormulateForm>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'FractionAndInterestForm',
  setup() {
    const formData = ref(null)

    return {
      formData,
    }
  },
})
</script>
