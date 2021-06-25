<template>
  <div class="space-y-4">
    <forms-form-section
      :title="$t('forms.topic.mainTopic')"
      :subtitle="$t('forms.topic.mainTopicSubtitle')"
    >
      <FormulateInput
        v-model="topic"
        type="textarea"
        rows="5"
        validation="required"
        @validation="validation = $event"
        @focusout="updateProject()"
      >
      </FormulateInput>
    </forms-form-section>

    <forms-form-section
      :title="$t('forms.topic.category')"
      :subtitle="$t('forms.topic.categorySubtitle')"
    >
      <FormulateInput
        v-model="categories"
        :aria-label="$t('forms.topic.category')"
        type="chipGroup"
        name="category"
        limit="2"
        :options="categoryOptions"
        @change="updateProject()"
      />
    </forms-form-section>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  ref,
  computed,
  ComputedRef,
  onBeforeMount,
} from '@nuxtjs/composition-api'
import { RootState } from '~/store'
import { ICategory, IProject } from '~/types/apiSchema'
import { IValidation } from '~/types/vueFormulate'

interface TopicForm {
  topic: string
}

export default defineComponent({
  name: 'TopicForm',
  setup() {
    const formData = ref<TopicForm>({ topic: '' })
    const topic = ref<String | undefined>('')
    const categories = ref<string[]>([])
    const categoryOptions = ref<{ label: string; value: string }[]>([])

    const store = useStore<RootState>()
    const project: ComputedRef<IProject | null> = computed(
      (): IProject | null => store.state.projects.project
    )

    const validation = ref<IValidation>({ hasErrors: false })

    onBeforeMount(() => {
      topic.value = project.value?.topic
      project.value?.categories?.forEach((category) => {
        if (category['@id']) categories.value.push(category['@id'])
      })
    })

    const updateProject = () => {
      if (!validation.value.hasErrors) {
        store.dispatch('projects/updateProject', [
          project.value?.id,
          { topic: topic.value, categories: categories.value },
        ])
      }
    }
    return {
      formData,
      topic,
      categories,
      categoryOptions,
      validation,
      updateProject,
    }
  },
  async fetch() {
    await this.$axios.get('/categories').then((res) => {
      const data = res.data['hydra:member']
      this.categoryOptions = data
        ? data.map((e: ICategory) => {
            return {
              label: e.name,
              value: e['@id'],
            }
          })
        : []
    })
  },
})
</script>