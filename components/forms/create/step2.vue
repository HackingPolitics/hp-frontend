<template>
  <FormulateForm v-model="formData" @submit="$emit('submit', formData)">
    <FormulateInput
      :label="$t('forms.proposal.forms.topic.label')"
      :placeholder="$t('forms.proposal.forms.topic.placeholder')"
      :help="$t('forms.proposal.forms.topic.help')"
      type="textarea"
      name="topic"
      validation="required"
      :validation-messages="{
        required: `${$t(
          'forms.proposal.forms.topic.name'
        )} muss ausgefüllt sein`,
      }"
    />
    <FormulateInput
      :label="$t('forms.proposal.forms.description.label')"
      :placeholder="$t('forms.proposal.forms.description.placeholder')"
      :help="$t('forms.proposal.forms.description.help')"
      type="textarea"
      name="goal"
      validation="required"
      :validation-messages="{
        required: `${$t(
          'forms.proposal.forms.description.name'
        )} muss ausgefüllt sein`,
      }"
    />
    <div class="grid grid-cols-2 gap-6 w-full mb-4">
      <FormulateInput
        :label="$t('forms.proposal.forms.motivation.label')"
        :placeholder="$t('forms.proposal.forms.motivation.placeholder')"
        :help="$t('forms.proposal.forms.motivation.help')"
        type="text"
        name="motivation"
        validation="required|min:12,length"
        :validation-messages="{
          required: `${$t(
            'forms.proposal.forms.motivation.name'
          )} muss ausgefüllt sein`,
        }"
      />
      <FormulateInput
        :label="$t('forms.proposal.forms.skills.label')"
        :placeholder="$t('forms.proposal.forms.skills.placeholder')"
        :help="$t('forms.proposal.forms.skills.help')"
        type="text"
        name="skills"
        validation="required|min:12,length"
        :validation-messages="{
          required: `${$t(
            'forms.proposal.forms.skills.name'
          )} muss ausgefüllt sein`,
        }"
      />
    </div>
    <FormulateInput
      :aria-label="$t('forms.proposal.forms.category.label')"
      type="chipGroup"
      name="categories"
      limit="2"
      :label="$t('forms.proposal.forms.category.label')"
      :placeholder="$t('forms.proposal.forms.category.placeholder')"
      :help="$t('forms.proposal.forms.category.help')"
      :options="categoryOptions"
    />
    <div class="w-full flex justify-end mt-8">
      <FormulateInput
        type="submit"
        :label="$t('forms.proposal.steps.submitProject')"
      ></FormulateInput>
    </div>
  </FormulateForm>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useStore,
} from '@nuxtjs/composition-api'
import { RootState } from '~/store'
import { ICategory } from '~/types/apiSchema'

export default defineComponent({
  setup() {
    const formData = ref(null)

    const store = useStore<RootState>()
    const categories = computed(() => {
      return store.state.categories.categories?.['hydra:member']
    })

    store.dispatch('categories/fetchCategories')

    const categoryOptions = computed(() =>
      categories.value?.map((category: ICategory) => {
        return { value: category['@id'], label: category.name }
      })
    )
    return { formData, categoryOptions }
  },
})
</script>
