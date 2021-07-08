<template>
  <div>
    <menu-project-nav
      :title="
        routeBefore && routeBefore === '/'
          ? $t('menu.overview')
          : routeBefore && routeBefore === '/antraege'
          ? $t('page.myproposals.title')
          : $t('back')
      "
      :link-to="
        routeBefore && (routeBefore === '/antraege' || routeBefore === '/')
          ? routeBefore
          : '/'
      "
    ></menu-project-nav>
    <layouts-single-view
      v-if="!isLoading && project && !error"
      :title="project.title"
    >
      <application-header :project="project"></application-header>
      <modal ref="projectMemberShipModal">
        <project-memberships-apply-project-form
          :project="project"
          :user="user"
          @cancel="toggleModal()"
          @application-submitted="toggleModal()"
        />
      </modal>

      <div class="mt-6">
        <div class="flex justify-between rounded items-center">
          <div class="flex items-center">
            <h3 class="text-lg leading-6 font-medium text-gray-900 font-body">
              {{ $t('page.application.concept') }}
            </h3>
            <div class="flex ml-4">
              <progress-bar progress="10"></progress-bar>
            </div>
          </div>

          <div v-if="!canEdit">
            <button
              class="
                w-full
                flex
                justify-center
                py-2
                px-4
                text-sm
                font-medium
                rounded-md
                bg-purple-500
                text-white
                hover:text-white hover:bg-purple-600
                focus:outline-none
                focus:border-purple-700
                focus:shadow-outline-purple
                active:border-purple-700
                transition
                duration-150
                ease-in-out
              "
              @click="toggleModal()"
            >
              {{ $t('page.application.apply_project') }}
            </button>
          </div>
        </div>
        <div class="grid sm:grid-cols-3 gap-4 mt-4 auto-rows-fr">
          <div
            v-for="(applicationStep, index) in applicationSteps"
            :key="index"
            class="h-full"
          >
            <nuxt-link
              v-if="canEdit"
              :to="
                localePath({
                  name: applicationStep.href,
                  params: { id: projectId },
                })
              "
              class="flex-col justify-between flex h-full"
            >
              <application-edit-progress-card
                :application-step="applicationStep"
                :project-id="projectId"
                :step-number="index + 1"
              />
            </nuxt-link>
            <application-edit-progress-card
              v-else
              :application-step="applicationStep"
              :project-id="projectId"
              :step-number="index + 1"
            />
          </div>
        </div>
        <div v-if="false" class="pb-5 border-b border-gray-200 mb-8">
          <div
            class="
              -ml-2
              -mt-2
              mb-4
              flex flex-wrap
              items-baseline
              justify-between
            "
          >
            <h3 class="ml-2 leading-6 font-medium text-lg text-gray-900">
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
    <loading-indicator v-else-if="isLoading"></loading-indicator>
    <div v-else-if="error" class="mx-auto max-w-screen-xl">
      <div
        class="
          max-w-4xl
          flex
          items-center
          justify-center
          space-x-6
          mx-auto
          py-32
          font-semibold
        "
      >
        <div class="text-9xl text-purple-500 border-r-2 pr-8 border-gray-300">
          404
        </div>
        <div>
          <div class="text-6xl text-gray-800">
            {{ $t('errors.page.notFound') }}
          </div>
          <nuxt-link
            :to="localePath('/')"
            class="text-purple-500 text-base mt-4 block"
            >zurück zum Start</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
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

// only mockup interface for rendering and testing
interface ApplicationStep {
  title: string
  href: string
  step?: {
    total: number
  }
}

export default defineComponent({
  name: 'SingleViewProject',
  beforeRouteEnter(_, from, next) {
    const previousRoute = from.path || from.fullPath
    next((vm) => {
      // @ts-ignore
      vm.routeBefore = previousRoute
    })
  },
  setup() {
    const route = useRoute()

    const projectId = ref<string>(route.value.params.id)

    const store = useStore<RootState>()

    store.dispatch('projects/fetchProject', projectId.value)

    const project = computed(() => {
      return store.state.projects.project
    })

    const isLoading = computed(() => {
      return store.state.projects.isLoading
    })

    const error = computed(() => {
      return store.state.projects.error
    })

    const canEdit = computed(() => {
      return store.getters['projects/canEditProject'](project.value.id)
    })
    const context = useContext()

    const applicationSteps = computed<ApplicationStep[]>(() => [
      {
        title: context.i18n.t('page.application.topic').toString(),
        href: 'antraege-id-thema',
        step: {
          total: 4,
          done: project?.value?.categories?.length
            ? project?.value?.topic
              ? 2
              : 1
            : 1,
        },
      },
      {
        title: context.i18n.t('page.application.problems').toString(),
        href: 'antraege-id-problem',
        step: {
          total: 2,
          done: project?.value?.actionMandate
            ? project?.value?.problems
              ? 2
              : 1
            : project?.value?.problems?.length
            ? 1
            : 0,
        },
      },
      {
        title: context.i18n
          .t('page.application.arguments_counterarguments')
          .toString(),
        href: 'antraege-id-argumente',
      },
      {
        title: context.i18n.t('page.application.fraction').toString(),
        href: 'antraege-id-fraktion-interessen',
      },
      {
        title: context.i18n.t('page.application.strategy').toString(),
        href: 'antraege-id-strategie',
      },
    ])

    const user = computed(() => store.state.auth.user)

    const projectMemberShipModal = ref()

    const toggleModal = () => {
      projectMemberShipModal.value?.toggleModal()
    }

    return {
      applicationSteps,
      projectId,
      project,
      isLoading,
      canEdit,
      projectMemberShipModal,
      toggleModal,
      user,
      error,
    }
  },
  data() {
    return {
      routeBefore: null as null | string,
    }
  },
})
</script>
