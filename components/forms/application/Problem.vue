<template>
  <FormulateForm>
    <forms-layout title="Probleme und Handlungsfelder" no-actions>
      <div class="space-y-6">
        <forms-form-section
          title="Welche Probleme hast du beobachtet und möchtest angeben?"
          subtitle="Gebe den Problemen eine Gewichtung indem du ihre Reihenfolge änderst."
        >
          <div
            v-for="problem in problems"
            :key="problem.id"
            class="inline-flex w-full justify-between"
          >
            <FormulateInput
              :value="problem.description"
              name="description"
              type="text"
              @focusout="updateProblem($event.target.value, problem.id)"
            />
            <FormulateInput
              input-class="ml-4 form-button"
              type="button"
              @click="deleteProblem(problem.id)"
              ><outline-x-icon class="h-4 w-4"
            /></FormulateInput>
          </div>
          <div class="inline-flex w-full justify-between">
            <FormulateInput v-model="problemCreateDesc" type="text" />
            <FormulateInput
              input-class="ml-4 form-button"
              type="button"
              @click="createProblem"
              >Hinzufügen</FormulateInput
            >
          </div>

          <!--          <FormulateInput
            type="group"
            :repeatable="true"
            name="problems"
            aria-label="Welche Probleme hast du beobachtet und möchtest du anlegen?"
            add-label="+ Problem hinzufügen"
            remove-position="after"
          >
            <FormulateInput name="description" type="text" />
          </FormulateInput>-->
        </forms-form-section>
        <forms-form-section
          title="Handlungsauftrag"
          subtitle="Was sollte die Stadtverwaltung tun, um das Problem anzugehen"
        >
          <div class="inline-flex w-full justify-between">
            <FormulateInput name="description" type="text" />
            <FormulateInput input-class="ml-4 form-button" type="button"
              ><outline-x-icon class="h-4 w-4"
            /></FormulateInput>
          </div>
          <div class="inline-flex w-full justify-between">
            <FormulateInput type="text" />
            <FormulateInput input-class="ml-4 form-button" type="button"
              >Hinzufügen</FormulateInput
            >
          </div>
        </forms-form-section>
      </div>
    </forms-layout>
  </FormulateForm>
</template>

<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  onMounted,
  useContext,
  watch,
  ref,
  useStore,
} from '@nuxtjs/composition-api'
import { IProblem, IProject } from '~/types/apiSchema'
import { RootState } from '~/store'

interface ProblemForm {
  problems?: IProblem[]
  description: string
}
export default defineComponent({
  name: 'Problem',
  setup() {
    const problems = ref<IProblem[]>([])
    const problemCreateDesc = ref<string>('')

    const store = useStore<RootState>()
    const context = useContext()
    const project: ComputedRef<IProject | null> = computed(
      (): IProject | null => store.state.projects.project
    )
    onMounted(() => {
      if (project.value?.problems)
        problems.value = context.$_.cloneDeep(project.value.problems)
    })
    watch(project, (currentValue, oldValue) => {
      problems.value = context.$_.cloneDeep(currentValue?.problems || [])
    })
    const createProblem = async () => {
      const payload = {
        description: problemCreateDesc.value,
        project: project.value['@id'],
      }
      await context.$axios.post('/problems', payload).then(() => {
        store.dispatch('projects/fetchProject', project.value.id)
        problemCreateDesc.value = ''
      })
    }
    const deleteProblem = async (id: number | string) => {
      await context.$axios.delete('/problems/' + id).then(() => {
        store.dispatch('projects/fetchProject', project.value.id)
      })
    }

    const updateProblem = async (desc, id) => {
      const payload = {
        description: desc,
      }
      await context.$axios.put('/problems/' + id, payload).then(() => {
        store.dispatch('projects/fetchProject', project.value.id)
      })
    }

    return {
      problems,
      problemCreateDesc,
      project,
      deleteProblem,
      createProblem,
      updateProblem,
    }
  },
})
</script>
