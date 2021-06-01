<template>
  <FormulateForm v-model="formData">
    <forms-layout title="Thema" no-actions>
      <div class="space-y-4">
        <forms-form-section
          title="Was ist das Thema, mit dem sich euer Auftrag beschäftigt"
          subtitle="Schreiben Sie etwas zu dem Projekt auf"
        >
          <FormulateInput
            type="textarea"
            rows="5"
            name="topic"
            @focusout="sendForm()"
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
  </FormulateForm>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  ref,
  onMounted,
  useContext,
  computed,
  ComputedRef,
} from '@nuxtjs/composition-api'
import { RootState } from '~/store'
import { IProject } from '~/types/apiSchema'

interface TopicForm {
  topic?: string
}

export default defineComponent({
  name: 'ApplicationFormTheme',
  setup() {
    const formData = ref<TopicForm>({ topic: '' })
    const store = useStore<RootState>()
    const project: ComputedRef<IProject | null> = computed(
      (): IProject | null => store.state.projects.project
    )
    onMounted(() => {
      formData.value.topic = project.value?.topic
    })
    const sendForm = () => {
      store.dispatch('projects/updateProject', [
        project.value?.id,
        formData.value,
      ])
    }
    return { formData, sendForm }
  },
})
</script>
