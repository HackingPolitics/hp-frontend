<template>
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
      <FormulateInput
        v-model="impact"
        type="textarea"
        rows="5"
        :help="$t('forms.problems.impact.help')"
        :placeholder="$t('forms.problems.impact.placeholder')"
        validation="required"
        @validation="validation = $event"
        @focusout="updateProject()"
      >
      </FormulateInput>
    </forms-form-section>
  </div>
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

export default defineComponent({
  name: 'Problem',
  layout: 'formWithSidebar',
  middleware: 'isProjectMember',
  setup() {
    const impact = ref<String | undefined>('')
    const store = useStore<RootState>()

    const project: ComputedRef<IProject | null> = computed(
      (): IProject | null => store.state.projects.project
    )

    watch(
      () => project.value,
      () => {
        if (project.value) {
          impact.value = project.value?.impact
        }
      },
      { immediate: true }
    )

    const validation = ref<IValidation>({ hasErrors: false })

    const updateProject = () => {
      if (!validation.value.hasErrors) {
        store.dispatch('projects/updateProject', [
          project.value?.id,
          {
            impact: impact.value,
          },
        ])
      }
    }
    return { impact, updateProject, validation }
  },
})
</script>
