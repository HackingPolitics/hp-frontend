<template>
  <div class="space-y-4">
    <forms-form-section
      :title="$t('forms.topic.mainTitle')"
      :subtitle="$t('forms.topic.mainTitleSubtitle')"
    >
      <FormulateInput
        v-model="title"
        type="text"
        validation="required"
        @validation="validation = $event"
        @focusout="updateProject()"
        @focus="setLockedField('applicationTitle')"
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
        v-model="goal"
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
    const goal = ref<String | undefined>('')
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

    /*
     *const lockFiled  (welches Field wird gerade lokal bearbeitet)
     *beim update wird werden die neue Daten au fetch Project geholt
     *Das Feld, was sich nicht ändert wird nicht beschrieben
     * */

    onBeforeMount(() => {
      topic.value = project.value?.topic
      title.value = project.value?.title
      goal.value = project.value?.goal
      project.value?.categories?.forEach((category) => {
        if (category['@id']) categories?.value?.push(category['@id'])
      })
    })

    const setLockedField = (fieldName: string) => {
      store.commit('collaboration/SET_LOCKED_FIELD', fieldName)
      store.commit('collaboration/SET_LOCKED_SINCE', Date.now())
    }

    const updateProject = () => {
      if (!validation.value.hasErrors) {
        store.dispatch('projects/updateProject', [
          project.value?.id,
          {
            title: title.value,
            topic: topic.value,
            categories: categories.value,
            goal: goal.value,
          },
        ])
        store.commit('collaboration/SET_PROJECT_SAVED', Date.now())
      }
    }
    return {
      formData,
      title,
      topic,
      goal,
      categories,
      categoryOptions,
      validation,
      updateProject,
      setLockedField,
    }
  },
})
</script>
