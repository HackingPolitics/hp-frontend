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
          v-model="categories"
          aria-label="In welche Thema passt euer Thema"
          type="chipGroup"
          name="category"
          limit="2"
          :options="categoryOptions"
          @change="updateProject()"
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
  computed,
  ComputedRef,
  onBeforeMount,
} from '@nuxtjs/composition-api'
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
    const categoryOptions = ref<{ label: string; value: string }>([])

    const store = useStore<RootState>()
    const project: ComputedRef<IProject | null> = computed(
      (): IProject | null => store.state.projects.project
    )

    onBeforeMount(() => {
      topic.value = project.value?.topic
      categories.value =
        project.value?.categories?.map((category) => category['@id']) || []
    })

    const updateProject = () => {
      store.dispatch('projects/updateProject', [
        project.value?.id,
        { topic: topic.value, categories: categories.value },
      ])
    }
    return {
      formData,
      topic,
      categories,
      categoryOptions,
      updateProject,
    }
  },
  async fetch() {
    await this.$axios.get('/categories').then((res) => {
      const data = res.data['hydra:member']
      this.categoryOptions = data
        ? data.map((e) => {
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
