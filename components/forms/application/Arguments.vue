<template>
  <FormulateForm>
    <forms-layout title="Argumente" no-actions>
      <div class="space-y-4">
        <forms-form-section title="Was spricht gegen dein Konzept?">
          <div v-if="counterArgumentations.length">
            <FormulateInput
              v-for="counterArgumentation in counterArgumentations"
              :key="counterArgumentation.id"
              type="textarea"
              rows="10"
              :value="counterArgumentation.description"
              @focusout="
                editCounterArgumentation(
                  $event.target.value,
                  counterArgumentation.id
                )
              "
            >
            </FormulateInput>
          </div>
          <FormulateInput
            v-else
            type="textarea"
            rows="10"
            @focusout="editCounterArgumentation($event.target.value)"
          >
          </FormulateInput>
        </forms-form-section>

        <forms-form-section
          title="Warum lohnt es sich trotzdem, das Konzept umzusetzen?"
        >
          <div v-if="argumentations.length">
            <FormulateInput
              v-for="argumation in argumentations"
              :key="argumation.id"
              type="textarea"
              rows="10"
              :value="argumation.description"
              @focusout="editArgumentation($event.target.value, argumation.id)"
            >
            </FormulateInput>
          </div>
          <FormulateInput
            v-else
            type="textarea"
            rows="10"
            @focusout="editArgumentation($event.target.value)"
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
  watch,
} from '@nuxtjs/composition-api'

import { cloneDeep } from 'lodash'

import { RootState } from '~/store'
import { IProject } from '~/types/apiSchema'

interface ArgumentParams {
  description: string
  project: string
}

export default defineComponent({
  name: 'Arguments',
  setup() {
    const argumentations = ref([])
    const counterArgumentations = ref([])

    const store = useStore<RootState>()
    const context = useContext()
    const project: ComputedRef<IProject | null> = computed(
      (): null => store.state.projects.project
    )

    onMounted(() => {
      if (project.value?.arguments)
        argumentations.value = cloneDeep(project.value.arguments)
      if (project.value?.counterArguments)
        counterArgumentations.value = cloneDeep(project.value.counterArguments)
    })

    watch(project, (currentValue) => {
      argumentations.value = cloneDeep(
        currentValue?.arguments || []
      )
      console.log()
      counterArgumentations.value = cloneDeep(
        currentValue?.counterArguments || []
      )
    })

    const editArgumentation = async (
      desc: string,
      id?: string | number
    ): void => {
      const payload: ArgumentParams = {
        description: desc,
        project: project.value['@id'],
      }
      if (project.value?.arguments?.length === 0)
        await context.$axios.post('/arguments', payload).then(() => {
          store.dispatch('projects/fetchProject', project.value.id)
        })
      else if (project.value?.arguments) {
        await context.$axios.put('/arguments/' + id, payload).then(() => {
          store.dispatch('projects/fetchProject', project.value.id)
        })
      }
    }

    const editCounterArgumentation = async (
      desc: string,
      id?: string | number
    ): void => {
      const payload: ArgumentParams = {
        description: desc,
        project: project.value['@id'],
      }
      if (project.value?.counterArguments?.length === 0)
        await context.$axios.post('/counter_arguments', payload).then(() => {
          store.dispatch('projects/fetchProject', project.value.id)
        })
      else if (project.value?.counterArguments) {
        await context.$axios
          .put('/counter_arguments/' + id, payload)
          .then(() => {
            store.dispatch('projects/fetchProject', project.value.id)
          })
      }
    }

    return {
      argumentations,
      counterArgumentations,
      editArgumentation,
      editCounterArgumentation,
    }
  },
})
</script>
