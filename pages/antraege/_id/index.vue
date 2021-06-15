<template>
  <layouts-single-view :title="project.title">
    <application-header :application="project"></application-header>
    <div class="space-y-16 mt-6">
      <div
        class="
          flex
          justify-between
          pb-5
          border-b border-gray-200
          mb-8
          bg-white
          p-4
          rounded
        "
      >
        <div class="-ml-2 -mt-2 flex items-baseline">
          <h3 class="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900">
            {{ $t('page.application.concept') }}
          </h3>
          <div class="flex ml-4">
            <progress-bar progress="10"></progress-bar>
          </div>
        </div>
        <div>
          <FormulateInput
            v-if="memberShipRole === 'coordinator'"
            key="publish"
            type="button"
            wrapper-class="w-56"
            @click="
              project.state === 'private'
                ? publishProject()
                : project.state === 'public'
                ? hideProject()
                : {}
            "
          >
            <transition
              enter-active-class="transition-opacity duration-100 opacity-0"
              leave-active-class="transition-opacity duration-100 opacity-0"
              mode="out-in"
            >
              <div
                v-if="project.state === 'private'"
                key="publish"
                class="inline-flex space-x-4"
              >
                <span>{{ $t('page.application.publish') }}</span>
                <outline-eye-icon class="h-5 w-5"></outline-eye-icon>
              </div>
              <div
                v-if="project.state === 'public'"
                key="hide"
                class="inline-flex space-x-4"
              >
                <span>{{ $t('page.application.hide') }}</span>
                <outline-eye-off-icon class="h-5 w-5"></outline-eye-off-icon>
              </div>
            </transition>
          </FormulateInput>
        </div>
      </div>
      <div class="grid sm:grid-cols-3 gap-8 pt-4">
        <div
          v-for="(applicationStep, index) in applicationSteps"
          :key="index"
          class="p-4 h-40 bg-gray-200 flex"
        >
          <application-edit-progress-card
            :application-step="applicationStep"
            :project-id="projectId"
            :step-number="index + 1"
          />
        </div>
      </div>
      <div class="pb-5 border-b border-gray-200 mb-8">
        <div
          class="-ml-2 -mt-2 mb-4 flex flex-wrap items-baseline justify-between"
        >
          <h3 class="ml-2 leading-6 font-medium text-lg text-gray-900">
            {{ $t('page.application.write') }}
          </h3>

          <button class="inline-flex items-center">
            <solid-eye-icon class="w-7 h-7 pr-2"></solid-eye-icon>
            <span class="font-medium text-lg">PDF-Vorschau</span>
          </button>
        </div>
        <nuxt-link
          :to="
            localePath({
              name: 'antraege-id-schreiben',
              params: { id: projectId },
            })
          "
        >
          <application-list></application-list>
        </nuxt-link>
      </div>
    </div>
  </layouts-single-view>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
  useRoute,
  useStore,
} from '@nuxtjs/composition-api'
import { RootState } from '~/store'
import { IProject, IProjectMembership } from '~/types/apiSchema'

// only mockup interface for rendering and testing
interface ApplicationStep {
  title: string
  step: {
    current?: number
    total: number
  }
  href: string
}

export default defineComponent({
  name: 'MeineAntraegePage',
  setup() {
    const route = useRoute()
    const projectId = ref<string>(route.value.params.id)
    const project = ref<IProject>({})
    const context = useContext()
    const store = useStore<RootState>()
    // only mockup data for rendering and testing
    const applicationSteps = ref<ApplicationStep[]>([
      {
        title: context.i18n.t('page.application.topic').toString(),
        step: {
          current: 1,
          total: 3,
        },
        href: 'antraege-id-thema',
      },
      {
        title: context.i18n.t('page.application.problems').toString(),
        step: {
          current: 0,
          total: 2,
        },
        href: 'antraege-id-problem',
      },
      {
        title: context.i18n.t('page.application.fraction').toString(),
        step: {
          current: 0,
          total: 2,
        },
        href: 'antraege-id-fraktion-interessen',
      },
      {
        title: context.i18n
          .t('page.application.arguments_counterarguments')
          .toString(),
        step: {
          current: 0,
          total: 2,
        },
        href: 'antraege-id-argumente',
      },
      {
        title: context.i18n.t('page.application.strategy').toString(),
        step: {
          current: 0,
          total: 6,
        },
        href: 'antraege-id-strategie',
      },
    ])

    const publishProject = async () => {
      const response = await store.dispatch('projects/updateProject', [
        projectId.value,
        { state: 'public' },
      ])
      project.value = response.data
    }

    const hideProject = async () => {
      const response = await store.dispatch('projects/updateProject', [
        projectId.value,
        { state: 'private' },
      ])
      project.value = response.data
    }

    const memberShipRole = computed((): string | undefined => {
      if (project.value.memberships) {
        return project.value.memberships.find(
          (membership: IProjectMembership) =>
            membership?.user?.id === store.state.auth.user?.id
        )?.role
      }
    })

    return {
      applicationSteps,
      projectId,
      project,
      publishProject,
      hideProject,
      memberShipRole,
    }
  },
  async fetch() {
    const id = this.$nuxt.context?.params?.id
    try {
      const response = await this.$axios.get('/projects/' + id)
      this.project = response.data
      this.$store.commit('projects/SET_PROJECT', response.data)
    } catch (e) {
      console.log(e)
    }
  },
})
</script>
