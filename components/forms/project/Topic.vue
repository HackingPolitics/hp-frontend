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
        :disabled="fieldIsLocked('applicationTitle')"
        :help="setLockedFieldText('applicationTitle')"
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
        :disabled="fieldIsLocked('applicationTopic')"
        :help="setLockedFieldText('applicationTopic')"
        @validation="validation = $event"
        @focusout="updateProject()"
        @focus="setLockedField('applicationTopic')"
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
        :disabled="fieldIsLocked('applicationGoal')"
        :help="setLockedFieldText('applicationGoal')"
        @focus="setLockedField('applicationGoal')"
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
  watch,
} from '@nuxtjs/composition-api'
import { RootState } from '~/store'
import { IProject } from '~/types/apiSchema'
import { IValidation } from '~/types/vueFormulate'

import collaborations from '~/composables/collaborations'

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

    const {
      setLockedField,
      fieldIsLocked,
      setLockedFieldText,
      setFieldUpdated,
      resetLockedField,
    } = collaborations()

    const store = useStore<RootState>()
    store.dispatch('categories/fetchCategories')
    const categoryOptions = computed(() => {
      return store.getters['categories/categoryOptions']
    })

    const project: ComputedRef<IProject | null> = computed(
      (): IProject | null => {
        return store.state.projects.project
      }
    )

    const validation = ref<IValidation>({ hasErrors: false })

    /*
     *const lockFiled  (welches Field wird gerade lokal bearbeitet)
     *beim update wird werden die neue Daten au fetch Project geholt
     *Das Feld, was sich nicht ändert wird nicht beschrieben
     * */
    const fillForm = () => {
      if (topic.value !== project.value?.topic)
        topic.value = project.value?.topic
      if (title.value !== project.value?.title)
        title.value = project.value?.title
      if (goal.value !== project.value?.goal) goal.value = project.value?.goal
      categories.value = []
      project.value?.categories?.forEach((category) => {
        if (category['@id']) categories?.value?.push(category['@id'])
      })
    }

    watch(
      () => project.value,
      () => {
        fillForm()
      },
      {
        deep: true,
        immediate: true,
      }
    )

    const updateProject = async () => {
      if (!validation.value.hasErrors) {
        await store
          .dispatch('projects/updateProject', [
            project.value?.id,
            {
              title: title.value,
              topic: topic.value,
              categories: categories.value,
              goal: goal.value,
            },
          ])
          .then(() => {
            setFieldUpdated()
          })
          .catch(() => {
            resetLockedField()
          })
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
      fieldIsLocked,
      setLockedFieldText,
    }
  },
})
</script>
