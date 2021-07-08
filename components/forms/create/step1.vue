<template>
  <div>
    <FormulateForm v-model="formData" @submit="$emit('submit', formData)">
      <FormulateInput
        :label="$t('forms.proposal.forms.title.label')"
        :placeholder="$t('forms.proposal.forms.title.placeholder')"
        :help="$t('forms.proposal.forms.title.help')"
        type="text"
        name="title"
        validation="required"
        :validation-messages="{
          required: `${$t(
            'forms.proposal.forms.title.name'
          )} muss ausgefüllt sein`,
        }"
      />

      <FormulateInput
        :label="$t('forms.proposal.forms.parliament.label')"
        :placeholder="$t('forms.proposal.forms.parliament.placeholder')"
        :help="$t('forms.proposal.forms.parliament.help')"
        type="select"
        name="council"
        :options="councilOptions"
        validation="required"
        :validation-messages="{
          required: `${$t(
            'forms.proposal.forms.parliament.name'
          )} muss ausgefüllt sein`,
        }"
      />
      <div class="mt-4">
        <input
          id="email"
          v-model="searchTerm"
          type="text"
          name="email"
          class="
            shadow-sm
            focus:ring-indigo-500 focus:border-indigo-500
            block
            w-1/3
            bg-gray-100
            border-0
            sm:text-sm
            rounded-md
          "
          placeholder="Nach Kategorien suchen..."
        />
        <div v-if="images" class="grid grid-cols-5 gap-4 mt-4">
          <div
            v-for="image in images.results"
            :key="image.id"
            class="
              focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              group
              block
              w-full
              aspect-w-4 aspect-h-3
              rounded-lg
              bg-gray-100
              overflow-hidden
            "
            :class="
              selectedImage && selectedImage.id === image.id
                ? 'ring-2 ring-offset-2 ring-indigo-500'
                : ''
            "
            @click="selectImage(image)"
          >
            <!-- Current: "", Default: "group-hover:opacity-75" -->
            <img
              :src="image.urls.small"
              alt=""
              class="object-cover pointer-events-none"
            />
            <button type="button" class="absolute inset-0 focus:outline-none">
              <span class="sr-only">View details for IMG_4985.HEIC</span>
            </button>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-end">
        <FormulateInput
          type="submit"
          class="mt-4"
          :label="$t('forms.proposal.steps.next')"
        ></FormulateInput>
      </div>
    </FormulateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from '@nuxtjs/composition-api'
import { useAxios } from '~/composables/useAxios'
import { IParliament } from '~/types/apiSchema'

export default defineComponent({
  setup() {
    const formData = ref(null)
    const searchTerm = ref(null)
    const councils = ref<IParliament[]>([])
    const $axios = useAxios()
    const fetchCouncils = async () => {
      try {
        const response = await $axios.get('/councils')
        councils.value = response.data['hydra:member']
      } catch (error) {}
    }

    fetchCouncils()
    const councilOptions = computed(() =>
      councils.value.map((parliament) => {
        return { value: parliament['@id'], label: parliament.title }
      })
    )

    const images = ref(null)

    const useUnsplash = async () => {
      try {
        const response = await $axios.get(
          `https://api.unsplash.com/search/photos?page=1&per_page=10&query=${searchTerm.value}&client_id=hMuPe_y9Zi2RD7j9KoPiBBuOhHc-pa5ocywPLKHY9kc`
        )
        images.value = response.data
        console.log(response)
      } catch (error) {}
    }
    useUnsplash()
    const selectedImage = ref(null)
    const selectImage = (image: any) => {
      selectedImage.value = image
    }

    watch(
      () => searchTerm.value,
      () => {
        useUnsplash()
      }
    )
    return {
      councilOptions,
      formData,
      images,
      searchTerm,
      selectImage,
      selectedImage,
    }
  },
})
</script>
