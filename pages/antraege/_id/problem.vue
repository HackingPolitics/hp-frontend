<template>
  <layouts-form-with-sidebar>
    <div>
      <h1 class="text-3xl font-normal text-gray-900 mb-4">
        {{ $t('forms.problems.formTitle') }}
      </h1>
      <p class="text-lg font-normal text-gray-600 mb-2 leading-6">
        {{ $t('forms.problems.formDescription') }}
      </p>
      <forms-project-problem></forms-project-problem>
      <forms-project-action-mandate></forms-project-action-mandate>
      <forms-form-section
        :title="$t('forms.problems.impact.name')"
        :subtitle="$t('forms.problems.impact.label')"
      >
        <forms-collaboration-input
          :model="project.impact"
          type="textarea"
          rows="5"
          :placeholder="$t('forms.problems.impact.placeholder')"
          validation="required"
          :disabled="fieldIsLocked('problem-impact')"
          :help="setLockedFieldText('problem-impact')"
          @focus="setLockedField('problem-impact')"
          @validation="validation = $event"
          @focusout="updateProject($event.target.value)"
        >
        </forms-collaboration-input>
      </forms-form-section>
    </div>
  </layouts-form-with-sidebar>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useStore,
  ComputedRef,
  computed,
} from '@nuxtjs/composition-api'
import { watch } from '@vue/runtime-core'
import { IProject } from '~/types/apiSchema'
import { IValidation } from '~/types/vueFormulate'
import { RootState } from '~/store'
import collaborations from '~/composables/collaborations'

export default defineComponent({
  name: 'Problem',
  meta: {
    area: 'Problem',
  },
  layout: 'collaboration',
  middleware: ['isProjectMember', 'getCurrentArea'],
  setup() {
    const store = useStore<RootState>()

    const {
      recentProjectSaved,
      projectSaved,
      setLockedField,
      fieldIsLocked,
      setLockedFieldText,
      setFieldUpdated,
    } = collaborations()

    const validation = ref<IValidation>({ hasErrors: false })

    const project: ComputedRef<IProject | null> = computed(
      (): IProject | null => {
        return store.state.projects.project
      }
    )

    const updateProject = (val: string) => {
      if (!validation.value.hasErrors) {
        store.dispatch('projects/updateProject', [
          project.value?.id,
          {
            impact: val,
          },
        ])
        setFieldUpdated()
      }
    }

    return {
      project,
      updateProject,
      validation,
      recentProjectSaved,
      projectSaved,
      setLockedField,
      fieldIsLocked,
      setLockedFieldText,
    }
  },
})
</script>
