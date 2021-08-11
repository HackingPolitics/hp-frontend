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
              <progress-bar :progress="projectProgress"></progress-bar>
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
                :online-users="onlineUsers"
                :area="applicationStep.area"
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
  useMeta,
} from '@nuxtjs/composition-api'
import { RootState } from '~/store'
import { AwarenessState } from '~/types/collaborations'

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
  meta: {
    area: 'Dashboard',
  },
  layout: 'collaboration',
  middleware: ['getCurrentArea'],
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
        area: 'Thema',
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
        area: 'Problem',
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
        area: 'Argumente',
        step: {
          total: 2,
          done: project?.value?.arguments?.length
            ? project?.value?.counterArguments?.length
              ? 2
              : 1
            : project?.value?.counterArguments?.length
            ? 1
            : 0,
        },
      },
      {
        title: context.i18n.t('page.application.fraction').toString(),
        href: 'antraege-id-fraktion-interessen',
        area: 'Fraktion',
        step: {
          total: 1,
          done: project?.value?.fractionDetails?.length ? 1 : 0,
        },
      },
      {
        title: context.i18n.t('page.application.strategy').toString(),
        href: 'antraege-id-strategie',
        area: 'Strategie',
        step: {
          total: 1,
          done: project?.value?.partners?.length ? 1 : 0,
        },
      },
    ])

    const user = computed(() => store.state.auth.user)

    const projectMemberShipModal = ref()

    const toggleModal = () => {
      projectMemberShipModal.value?.toggleModal()
    }

    const projectProgress = computed(() => {
      let progress = 0
      if (project.value?.title) {
        progress = progress + 10
      }
      if (project.value?.description) {
        progress = progress + 10
      }
      if (project.value?.topic) {
        progress = progress + 10
      }
      if (project.value?.categories?.length) {
        progress = progress + 10
      }
      if (project.value?.arguments?.length) {
        progress = progress + 10
      }
      if (project.value?.counterArguments?.length) {
        progress = progress + 10
      }
      if (project.value?.problems?.length) {
        progress = progress + 10
      }
      if (project.value?.actionMandates?.length) {
        progress = progress + 10
      }
      if (project.value?.partners?.length) {
        progress = progress + 10
      }
      if (project.value?.fractionDetails?.length) {
        progress = progress + 10
      }
      return progress
    })

    const onlineUsers = computed(() => {
      return store.state.collaboration.awarenessStates.map(
        (state: AwarenessState) => state.user
      )
    })

    useMeta({
      title: `${
        project.value?.title ? project.value?.title : 'Antrag'
      } | HackingPolitics`,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: project.value?.description
            ? project.value?.description
            : 'Antrag',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: project.value?.featureImage
            ? project.value?.featureImage
            : null,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: project.value?.title ? project.value?.title : 'Antrag',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: project.value?.description
            ? project.value?.description
            : null,
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'HackingPolitics',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: project.value?.featureImage
            ? project.value?.featureImage
            : null,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: project.value?.description
            ? project.value?.description
            : null,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'HackingPolitics',
        },
      ],
    })

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
      projectProgress,
      onlineUsers,
    }
  },
  data() {
    return {
      routeBefore: null as null | string,
    }
  },
  head: {},
})
</script>
