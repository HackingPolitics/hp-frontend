<template>
  <forms-layout title="Thema" no-actions>
    <div class="space-y-4">
      <forms-form-section
        title="Was ist das Thema, mit dem sich euer Auftrag beschäftigt"
        subtitle="Schreiben Sie etwas zu dem Projekt auf"
      >
        <FormulateInput
          type="textarea"
          rows="5"
          v-model="topic"
          @focusout="updateProject()"
        >
        </FormulateInput>
      </forms-form-section>

      <forms-form-section
        title="In welche Thema passt euer Thema"
        subtitle="Wähle bis zu 2 Möglichkeiten aus"
      >
        <FormulateInput
          aria-label="In welche Thema passt euer Thema"
          type="chipGroup"
          name="category"
          limit="2"
          :options="[
            { label: 'Bildung und Soziales', value: 'education_social' },
            { label: 'Mobilität', value: 'mobility' },
            { label: 'Umwelt', value: 'environment' },
            { label: 'Infrastruktur', value: 'infrastructure' },
            { label: 'Freizeit', value: 'leisure' },
            { label: 'Kunst und Kultur', value: 'art_culture' },
          ]"
        />
      </forms-form-section>
    </div>
  </forms-layout>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  ref,
  onMounted,
  computed,
  ComputedRef,
  useContext,
} from '@nuxtjs/composition-api'
import { isEqual } from 'lodash'
import { RootState } from '~/store'
import { ICategory, IProject } from '~/types/apiSchema'

interface TopicForm {
  topic: string
}

export default defineComponent({
  name: 'ApplicationFormTheme',
  setup() {
    const formData = ref<TopicForm>({ topic: '' })
    const topic = ref<String | undefined>('')
    const categories = ref<ICategory[] | undefined>([])

    const store = useStore<RootState>()
    const project: ComputedRef<IProject | null> = computed(
      (): IProject | null => store.state.projects.project
    )

    onMounted(() => {
      topic.value = project.value?.topic
      categories.value = project.value?.categories
    })

    const updateProject = () => {
      if (!isEqual(project.value?.topic, topic.value)) {
        store.dispatch('projects/updateProject', [
          project.value?.id,
          { topic: topic.value },
        ])
      }
    }
    return {
      formData,
      topic,
      categories,
      updateProject,
    }
  },
})
</script>
