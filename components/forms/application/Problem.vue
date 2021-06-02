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
              input-class="w-full form-input"
              @focusout="updateProblem($event.target.value, problem.id)"
            />
            <FormulateInput
              input-class="ml-4 form-button"
              type="button"
              @click="deleteProblem(problem.id)"
              ><outline-trash-icon class="h-4 w-4"
            /></FormulateInput>
          </div>
          <FormulateForm v-model="createProblemForm" @submit="createProblem()">
            <div class="inline-flex w-full justify-between">
              <FormulateInput
                type="text"
                name="description"
                validation="required"
                validation-name="Problembeschreibung"
              />
              <FormulateInput input-class="ml-4 form-button" type="submit"
                >+ Hinzufügen</FormulateInput
              >
            </div>
          </FormulateForm>
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

import { cloneDeep } from 'lodash'

interface ProblemForm {
  problems?: IProblem[]
  description?: string
  project?: string
}
export default defineComponent({
  name: 'Problem',
  setup() {
    const problems = ref<IProblem[]>([])
    const createProblemForm = ref<ProblemForm>({})

    const store = useStore<RootState>()
    const context = useContext()
    const project: ComputedRef<IProject | null> = computed(
      (): IProject | null => store.state.projects.project
    )
    onMounted(() => {
      if (project.value?.problems)
        problems.value = cloneDeep(project.value.problems)
    })

    watch(project, (currentValue) => {
      problems.value = cloneDeep(currentValue?.problems || [])
    })

    const createProblem = async () => {
      if (project.value) {
        const payload: ProblemForm = {
          description: createProblemForm.value.description,
          project: project.value['@id'],
        }
        await context.$axios.post('/problems', payload).then(() => {
          store.dispatch('projects/fetchProject', project.value?.id)
          createProblemForm.value = {}
        })
      }
    }
    const deleteProblem = async (id: number | string) => {
      await context.$axios.delete('/problems/' + id).then(() => {
        store.dispatch('projects/fetchProject', project.value?.id)
      })
    }

    const updateProblem = async (desc: string, id: number | string) => {
      const payload = {
        description: desc,
      }
      await context.$axios.put('/problems/' + id, payload).then(() => {
        store.dispatch('projects/fetchProject', project.value?.id)
      })
    }

    return {
      problems,
      createProblemForm,
      project,
      deleteProblem,
      createProblem,
      updateProblem,
    }
  },
})
</script>
