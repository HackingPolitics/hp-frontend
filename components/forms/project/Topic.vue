<template>
  <div class="space-y-4">
    <forms-form-section
      :title="$t('forms.topic.mainTitle')"
      :subtitle="$t('forms.topic.mainTopicSubtitle')"
    >
      <FormulateInput
        v-model="title"
        type="text"
        validation="required"
        @validation="validation = $event"
        @focusout="updateProject()"
      >
      </FormulateInput>
    </forms-form-section>
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
      :title="$t('forms.topic.mainGoal')"
      :subtitle="$t('forms.topic.mainGoalSubtitle')"
    >
      <FormulateInput
        v-model="description"
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
import { IProject } from '~/types/apiSchema'
import { IValidation } from '~/types/vueFormulate'

interface TopicForm {
  topic: string
}

export default defineComponent({
  name: 'TopicForm',
  setup() {
    const formData = ref<TopicForm>({ topic: '' })
    const topic = ref<String | undefined>('')
    const description = ref<String | undefined>('')
    const title = ref<String | undefined>('')
    const categories = ref<string[]>([])

    const store = useStore<RootState>()
    store.dispatch('categories/fetchCategories')
    const categoryOptions = computed(() => {
      return store.getters['categories/categoryOptions']
    })

    const project: ComputedRef<IProject | null> = computed(
      (): IProject | null => store.state.projects.project
    )

    const validation = ref<IValidation>({ hasErrors: false })

    onBeforeMount(() => {
      topic.value = project.value?.topic
      title.value = project.value?.title
      description.value = project.value?.description
      project.value?.categories?.forEach((category) => {
        if (category['@id']) categories?.value?.push(category['@id'])
      })
    })

    const updateProject = () => {
      if (!validation.value.hasErrors) {
        store.dispatch('projects/updateProject', [
          project.value?.id,
          {
            title: title.value,
            topic: topic.value,
            categories: categories.value,
            description: description.value,
          },
        ])
      }
    }
    return {
      formData,
      title,
      topic,
      description,
      categories,
      categoryOptions,
      validation,
      updateProject,
    }
  },
})
</script>
