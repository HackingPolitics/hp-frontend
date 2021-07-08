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
      <image-chooser @selectImage="selectImage"></image-chooser>
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
import { defineComponent, computed, ref } from '@nuxtjs/composition-api'
import { useAxios } from '~/composables/useAxios'
import { IParliament } from '~/types/apiSchema'

export default defineComponent({
  setup() {
    const formData = ref({
      featureImage: '',
    })

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

    const selectImage = (image: any) => {
      if (image?.urls?.regular) {
        formData.value.featureImage = image?.urls?.regular
      }
    }

    return {
      councilOptions,
      formData,
      selectImage,
    }
  },
})
</script>
