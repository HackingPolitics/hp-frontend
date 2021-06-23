<template>
  <layouts-single-view :title="project.title">
    <application-header :application="project"></application-header>
    <div class="mt-6">
      <div class="flex justify-between rounded">
        <div class="flex items-baseline mb-4">
          <h3 class="text-lg leading-6 font-medium text-gray-900 font-body">
            {{ $t('page.application.concept') }}
          </h3>
          <div class="flex ml-4">
            <progress-bar progress="10"></progress-bar>
          </div>
        </div>
        <div>
          <project-memberships-publish-project-button
            :membership-role="membershipRole"
            :project-state="project.state"
            @hide="hideProject()"
            @publish="publishProject()"
          />
        </div>
      </div>
      <div class="grid sm:grid-cols-3 gap-4">
        <div
          v-for="(applicationStep, index) in applicationSteps"
          :key="index"
          class="p-4 bg-white flex rounded"
        >
          <application-edit-progress-card
            :application-step="applicationStep"
            :project-id="projectId"
            :step-number="index + 1"
          />
        </div>
      </div>
      <div class="pb-5 border-b border-gray-200 mt-16">
        <div class="mb-4 flex flex-wrap items-baseline justify-between">
          <h3 class="leading-6 font-medium text-lg text-gray-900">
            {{ $t('page.application.write') }}
          </h3>

          <button class="inline-flex items-center">
            <solid-eye-icon class="w-7 h-7 pr-2"></solid-eye-icon>
            <span class="font-medium text-lg">{{ $t('pdfPreview') }}</span>
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

    const membershipRole = computed((): string | undefined => {
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
      membershipRole,
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
