<template>
  <transition
    enter-active-class="transition ease-out duration-100"
    enter-class="transform opacity-0"
    enter-to-class="transform opacity-100"
    leave-active-class="transition ease-in duration-75"
    leave-class="transform opacity-100"
    leave-to-class="transform opacity-0"
  >
    <ul v-if="sidebarOpen">
      <li class="col-span-2 flex flex-col divide-y divide-gray-200">
        <div class="flex-1 flex flex-col pb-2">
          <div class="flex justify-around py-4 bg-purple-600 p-4">
            <div class="flex mr-3">
              <outline-puzzle-icon
                class="w-6 h-6 text-white"
              ></outline-puzzle-icon>
            </div>
            <div class="relative">
              <h3 class="text-lg font-medium text-white">Textbaustein</h3>
              <span class="text-white text-sm"
                >Hier findest du Formulierungen aus den Antragskonzepten wieder.
                Übernehme in dieses Dokument, ganz einfach per Copy Paste</span
              >
              <button
                class="focus:outline-none absolute right-0 top-0 text-white"
                @click="$emit('close-sidebar')"
              >
                <outline-x-icon class="w-5 h-5"></outline-x-icon>
              </button>
            </div>
          </div>

          <dl
            class="
              flex-grow flex flex-col
              justify-between
              divide-y divide-gray-400
            "
          >
            <dd>
              <accordion title="Titel" :step="1">
                <writing-module-card title="Titel" @copy="copy(project.title)">
                  {{ project.title }}
                </writing-module-card>
              </accordion>
            </dd>
            <dd>
              <accordion title="Probleme und Handlungsfelder" :step="2">
                <writing-module-card
                  v-for="problem in project.problems"
                  :key="problem.id"
                  @copy="copy(problem.description)"
                >
                  {{ problem.description }}
                </writing-module-card></accordion
              >
            </dd>
            <dd>
              <accordion title="Argumente und Gegenargumente" :step="3">
                <h3>Argumente</h3>
                <writing-module-card
                  v-for="argument in project.arguments"
                  :key="argument.id"
                  @copy="copy(argument.description)"
                >
                  {{ argument.description }}
                </writing-module-card>
                <h3>Gegenargumente</h3>
                <writing-module-card
                  v-for="counterArgument in project.counterArguments"
                  :key="counterArgument.id"
                  @copy="copy(counterArgument.description)"
                >
                  {{ counterArgument.description }}
                </writing-module-card>
              </accordion>
            </dd>
            <dd>
              <accordion title="Strategie" :step="4">TEst</accordion>
            </dd>
          </dl>
        </div>
      </li>
    </ul>
  </transition>
</template>

<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  useStore,
} from '@nuxtjs/composition-api'
import { RootState } from '~/store'
import { IProject } from '~/types/apiSchema'

export default defineComponent({
  name: 'WritingSidebar',
  props: {
    sidebarOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore<RootState>()

    const project: ComputedRef<IProject | null> = computed(
      (): IProject | null => store.state.projects.project
    )

    const copy = async (s) => {
      await navigator.clipboard.writeText(s)
    }

    return {
      project,
      copy,
    }
  },
})
</script>
