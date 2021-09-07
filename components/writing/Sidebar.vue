<template>
  <transition
    enter-active-class="transition ease-out duration-100"
    enter-class="transform opacity-0"
    enter-to-class="transform opacity-100"
    leave-active-class="transition ease-in duration-75"
    leave-class="transform opacity-100"
    leave-to-class="transform opacity-0"
  >
    <ul v-if="sidebarOpen" class="">
      <li class="col-span-2 flex flex-col divide-y divide-gray-200">
        <div class="flex-1 flex flex-col pb-2">
          <div class="flex py-4 bg-purple-600 p-4">
            <div v-if="!selectedTab" class="flex mr-3">
              <outline-puzzle-icon
                class="w-6 h-6 text-white"
              ></outline-puzzle-icon>
            </div>
            <div class="relative">
              <h3 class="text-lg flex text-left font-medium text-white">
                <button
                  v-if="selectedTab"
                  class="focus:outline-none mr-4 text-white flex-col"
                  @click="selectTab(null)"
                >
                  <outline-chevron-left-icon
                    class="w-6 h-6"
                  ></outline-chevron-left-icon>
                </button>
                <span>{{
                  selectedTab ? selectedTab.title : 'Textbaustein'
                }}</span>
              </h3>
              <span class="text-white text-sm">
                {{
                  selectedTab
                    ? ''
                    : 'Hier findest du Formulierungen aus den Antragskonzepten wieder. Übernehme in dieses Dokument, ganz einfach per Copy Paste'
                }}
              </span>
              <button
                v-if="!selectedTab"
                class="focus:outline-none absolute right-0 top-0 text-white"
                @click="$emit('close-sidebar')"
              >
                <outline-x-icon class="w-5 h-5"></outline-x-icon>
              </button>
            </div>
          </div>

          <transition
            enter-active-class="ease-out duration-300"
            enter-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="ease-in duration-200"
            leave-class="opacity-100"
            leave-to-class="opacity-0"
            mode="out-in"
          >
            <dl
              v-if="!selectedTab"
              class="
                flex-grow flex flex-col
                justify-between
                divide-y divide-gray-400
              "
            >
              <dd v-for="(tab, index) in tabs" :key="index">
                <div
                  class="flex flex-grow justify-between p-4 cursor-pointer"
                  @click="selectTab(tab)"
                >
                  <div class="inline-flex">
                    <div
                      class="
                        rounded-full
                        border border-black
                        flex
                        w-6
                        h-6
                        items-center
                        justify-center
                        mr-3
                      "
                    >
                      {{ tab.number }}
                    </div>
                    <h2 class="sr-only">{{ tab.title }}</h2>
                    <h2 class="text-black">{{ tab.title }}</h2>
                  </div>
                  <span>
                    <outline-chevron-right-icon
                      class="w-5 h-5 ml-4"
                    ></outline-chevron-right-icon
                  ></span>
                </div>
              </dd>
            </dl>
            <div v-if="selectedTab && selectedTab.name === 'topic'">
              <writing-sidebar-tab-section title="Projektitel">
                <writing-module-card>
                  {{ project.title }}
                </writing-module-card></writing-sidebar-tab-section
              >

              <writing-sidebar-tab-section title="Thema">
                <writing-module-card>
                  {{ project.topic }}
                </writing-module-card>
              </writing-sidebar-tab-section>

              <writing-sidebar-tab-section title="Ziel">
                <writing-module-card>
                  {{ project.goal }}
                </writing-module-card>
              </writing-sidebar-tab-section>
            </div>
            <div v-if="selectedTab && selectedTab.name === 'problems'">
              <writing-sidebar-tab-section title="Probleme">
                <writing-module-card
                  v-for="problem in project.problems"
                  :key="problem.id"
                  :active="!!findUsed('usedProblems', problem['@id'])"
                  @click="createOrDeleteUsed('usedProblems', problem['@id'])"
                >
                  {{ problem.description }}
                </writing-module-card>
              </writing-sidebar-tab-section>

              <writing-sidebar-tab-section title="Handlungsauftrag">
                <writing-module-card
                  v-for="actionMandate in project.actionMandates"
                  :key="actionMandate.id"
                  :active="
                    !!findUsed('usedActionMandates', actionMandate['@id'])
                  "
                  @click="
                    createOrDeleteUsed(
                      'usedActionMandates',
                      actionMandate['@id']
                    )
                  "
                >
                  {{ actionMandate.description }}
                </writing-module-card>
              </writing-sidebar-tab-section>
            </div>
            <div
              v-if="selectedTab && selectedTab.name === 'fraction_interests'"
            >
              <div
                v-for="fractionDetail in project.fractionDetails"
                :key="fractionDetail.id"
                class="mb-8"
              >
                <writing-sidebar-tab-section
                  :title="fractionDetail.fraction.name"
                >
                  <writing-module-card
                    v-if="!fractionDetail.interests.length"
                    sub
                    no-check-icon
                  >
                    Keine Interessen
                  </writing-module-card>
                  <writing-module-card
                    v-for="interest in fractionDetail.interests"
                    v-else
                    :key="interest.id"
                    :active="
                      !!findUsed('usedFractionInterests', interest['@id'])
                    "
                    :subtitle="
                      format(parseISO(interest.updatedAt), 'dd.MM.yyyy')
                    "
                    @click="
                      createOrDeleteUsed(
                        'usedFractionInterests',
                        interest['@id']
                      )
                    "
                  >
                    {{ interest.description }}
                  </writing-module-card>
                </writing-sidebar-tab-section>
              </div>
            </div>
            <div
              v-if="
                selectedTab &&
                selectedTab.name === 'arguments_counter_arguments'
              "
            >
              <writing-sidebar-tab-section title="Gegenargumente">
                <div
                  v-for="(counterArgument, index) in project.counterArguments"
                  :key="counterArgument.id"
                  class="mb-8"
                >
                  <writing-module-card
                    :active="
                      !!findUsed('usedCounterArguments', counterArgument['@id'])
                    "
                    :subtitle="
                      format(parseISO(counterArgument.updatedAt), 'dd.MM.yyyy')
                    "
                    :title="index + 1"
                    @click="
                      createOrDeleteUsed(
                        'usedCounterArguments',
                        counterArgument['@id']
                      )
                    "
                  >
                    {{ counterArgument.description }}
                  </writing-module-card>
                  <writing-module-card
                    v-if="!counterArgument.negations.length"
                    sub
                    no-check-icon
                  >
                    Keine Trotzdem Begründung
                  </writing-module-card>
                  <writing-module-card
                    v-for="negation in counterArgument.negations"
                    v-else
                    sub
                    :active="!!findUsed('usedNegations', negation['@id'])"
                    @click="
                      createOrDeleteUsed('usedNegations', negation['@id'])
                    "
                  >
                    {{ negation.description }}
                  </writing-module-card>
                </div>
              </writing-sidebar-tab-section>

              <writing-sidebar-tab-section title="Argumente">
                <writing-module-card
                  v-for="argument in project.arguments"
                  :key="argument.id"
                  :active="!!findUsed('usedArguments', argument['@id'])"
                  :subtitle="format(parseISO(argument.updatedAt), 'dd.MM.yyyy')"
                  @click="createOrDeleteUsed('usedArguments', argument['@id'])"
                >
                  {{ argument.description }}
                </writing-module-card>
              </writing-sidebar-tab-section>
            </div>
            <div v-if="selectedTab && selectedTab.name === 'strategies'">
              <writing-sidebar-tab-section title="Partnern">
                <div
                  v-for="partner in project.partners"
                  :key="partner.id"
                  class="mb-8"
                >
                  <writing-module-card
                    :title="partner.name"
                    :subtitle="
                      format(parseISO(partner.updatedAt), 'dd.MM.yyyy')
                    "
                    no-check-icon
                    @click="
                      createOrDeleteUsed('usedArguments', argument['@id'])
                    "
                  >
                  </writing-module-card>

                  <writing-module-card
                    sub
                    no-check-icon
                    subtitle="Kontakt-Name"
                  >
                    {{ partner.contactName }}
                  </writing-module-card>
                  <writing-module-card
                    sub
                    no-check-icon
                    subtitle="Kontakt-Email"
                  >
                    {{ partner.contactEmail }}
                  </writing-module-card>
                  <writing-module-card
                    sub
                    no-check-icon
                    subtitle="Kontakt-Telefon"
                  >
                    {{ partner.contactPhone }}
                  </writing-module-card>
                </div>
              </writing-sidebar-tab-section>
            </div>
          </transition>
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
  ref,
  useRoute,
  useStore,
} from '@nuxtjs/composition-api'
import { parseISO, format } from 'date-fns'
import { RootState } from '~/store'
import { IProject } from '~/types/apiSchema'
import { useAxios } from '~/composables/useAxios'

interface SidebarTab {
  number: number
  name: string
  title: string
}

export default defineComponent({
  name: 'WritingSidebar',
  props: {
    sidebarOpen: {
      type: Boolean,
      default: false,
    },
    proposalIri: {
      type: String,
      default: '',
    },
  },
  setup() {
    const store = useStore<RootState>()
    const $axios = useAxios()
    const project: ComputedRef<IProject | null> = computed(
      (): IProject | null => store.state.projects.project
    )
    const proposal = computed(() => {
      return project.value?.proposals.find(
        (proposal: any) =>
          proposal.id.toString() === route.value.params.proposalId
      )
    })

    const route = useRoute()

    const tabs = ref<SidebarTab[]>([
      { name: 'topic', number: 1, title: 'Thema' },
      { name: 'problems', number: 2, title: 'Probleme und Handlungsfelder' },
      {
        name: 'fraction_interests',
        number: 3,
        title: 'Ratsmehrheiten und Fraktionsinteressen',
      },
      {
        name: 'arguments_counter_arguments',
        number: 4,
        title: 'Argumente und Gegenargumente',
      },
      { name: 'strategies', number: 5, title: 'Strategie' },
    ])

    const selectedTab = ref<SidebarTab | null>(null)

    const createOrDeleteUsed = async (used: string, iri: string) => {
      let url: string = ''

      switch (used) {
        case 'usedActionMandates':
          url = 'used_action_mandates'
          break
        case 'usedArguments':
          url = 'used_arguments'
          break
        case 'usedCounterArguments':
          url = 'used_counter_arguments'
          break
        case 'usedNegations':
          url = 'used_negations'
          break
        case 'usedFractionInterests':
          url = 'used_fraction_interests'
          break
        case 'usedProblems':
          url = 'used_problems'
          break
      }

      if (url && !!findUsed(used, iri)) {
        await $axios.delete(url + '/' + findUsed(used, iri).id)
      } else {
        await $axios.post(url, {
          [getProposalKey(used)]: iri,
          proposal: route.value.params.proposalIri,
        })
      }
      await store.dispatch('projects/fetchProject', route.value.params.id)
    }

    const findUsed = (used: string, iri: string | number) => {
      if (used && proposal.value?.[used])
        return proposal.value[used].find(
          (e: any) => e[getProposalKey(used)]['@id'] === iri
        )
    }

    const getProposalKey = (used: string): string => {
      let projectKey: string = ''

      switch (used) {
        case 'usedActionMandates':
          projectKey = 'actionMandate'
          break
        case 'usedArguments':
          projectKey = 'argument'
          break
        case 'usedCounterArguments':
          projectKey = 'counterArgument'
          break
        case 'usedNegations':
          projectKey = 'negation'
          break
        case 'usedProblems':
          projectKey = 'problem'
          break
        case 'usedFractionInterests':
          projectKey = 'fractionInterest'
      }
      return projectKey
    }

    const selectTab = (tab: SidebarTab | null): void => {
      if (!selectedTab.value) {
        selectedTab.value = tab
      } else if (!tab || tab.name === selectedTab.value?.name)
        selectedTab.value = null
    }
    return {
      project,
      proposal,
      tabs,
      findUsed,
      createOrDeleteUsed,
      selectedTab,
      selectTab,
      parseISO,
      format,
    }
  },
})
</script>
