<template>
  <FormulateForm v-model="formData">
    <forms-layout title="Thema" no-actions>
      <div class="space-y-4">
        <forms-form-section title="Was spricht gegehn dein Konzept?">
          <FormulateInput
            type="textarea"
            rows="10"
            name="arguments"
            @focusout="sendForm()"
          >
          </FormulateInput>
        </forms-form-section>

        <forms-form-section
          title="Warum lohnt es sich trotzdem, das Konzept umzusetzen?"
        >
          <FormulateInput
            type="textarea"
            rows="10"
            name="topic"
            @focusout="sendForm()"
          >
          </FormulateInput>
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
  name: 'Arguments',
  setup() {
    const formData = ref<TopicForm>({ topic: '' })
    const store = useStore<RootState>()
    const context = useContext()
    const project: ComputedRef<IProject | null> = computed(
      (): IProject | null => store.state.projects.project
    )
    onMounted(() => {
      formData.value.topic = project.value?.topic
    })
    const sendForm = () => {
      if (!context.$_.isEqual(project.value?.topic, formData.value?.topic)) {
        store.dispatch('projects/updateProject', [
          project.value?.id,
          formData.value,
        ])
      }
    }
    return { formData, sendForm }
  },
})
</script>
