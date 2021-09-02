<template>
  <div class="space-y-4">
    <forms-form-section
      :title="$t('forms.topic.mainTitle')"
      :subtitle="$t('forms.topic.mainTitleSubtitle')"
    >
      <forms-collaboration-input
        :model="project.title"
        type="text"
        validation="required"
        :disabled="fieldIsLocked('applicationTitle')"
        :help="setLockedFieldText('applicationTitle')"
        @validation="validation = $event"
        @focusout="updateProject({ title: $event.target.value })"
        @focus="setLockedField('applicationTitle')"
      >
      </forms-collaboration-input>
    </forms-form-section>
    <forms-form-section
      :title="$t('forms.topic.mainTopic')"
      :subtitle="$t('forms.topic.mainTopicSubtitle')"
    >
      <forms-collaboration-input
        :model="project.topic"
        type="textarea"
        rows="5"
        validation="required"
        :disabled="fieldIsLocked('applicationTopic')"
        :help="setLockedFieldText('applicationTopic')"
        @validation="validation = $event"
        @focusout="updateProject({ topic: $event.target.value })"
        @focus="setLockedField('applicationTopic')"
      >
      </forms-collaboration-input>
    </forms-form-section>

    <forms-form-section
      :title="$t('forms.topic.mainGoal')"
      :subtitle="$t('forms.topic.mainGoalSubtitle')"
    >
      <forms-collaboration-input
        :model="project.goal"
        type="textarea"
        rows="5"
        validation="required"
        :disabled="fieldIsLocked('applicationGoal')"
        :help="setLockedFieldText('applicationGoal')"
        @focus="setLockedField('applicationGoal')"
        @validation="validation = $event"
        @focusout="updateProject({ goal: $event.target.value })"
      >
      </forms-collaboration-input>
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

interface TopicFormData {
  topic?: string
  title: string
  goal: string
}

export default defineComponent({
  name: 'TopicForm',
  setup() {
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

    const updateProject = async (payload: any) => {
      if (!validation.value.hasErrors && project.value) {
        await store
          .dispatch('projects/updateProject', [project.value?.id, payload])
          .then(() => {
            setFieldUpdated()
          })
          .catch(() => {
            resetLockedField()
          })
      }
    }

    return {
      categories,
      categoryOptions,
      validation,
      project,
      updateProject,
      setLockedField,
      fieldIsLocked,
      setLockedFieldText,
    }
  },
})
</script>
