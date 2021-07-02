<template>
  <layouts-header-title :title="$t('proposal.form.header')">
    <div class="bg-white rounded-lg shadow overflow-hidden p-8 mt-16">
      <forms-wizard-layout
        :title="currentStep !== 4 ? $t('page.proposal.createProposal') : ''"
        :steps="steps"
        :current-step="currentStep"
        no-concept-sidebar
        no-floating-sidebar
      >
        <forms-wizard-form-wrapper
          v-if="currentStep === 1"
          :title="$t('forms.proposal.steps.step1.title')"
          :description="$t('forms.proposal.steps.step1.description')"
        >
          <forms-create-step-1 @submit="submitStep1"></forms-create-step-1>
        </forms-wizard-form-wrapper>
        <forms-wizard-form-wrapper
          v-if="currentStep === 2"
          :title="$t('forms.proposal.steps.step2.title')"
          :description="$t('forms.proposal.steps.step2.description')"
        >
          <forms-create-step-2 @submit="submitStep2"></forms-create-step-2>
        </forms-wizard-form-wrapper>
        <div
          v-show="currentStep === 3"
          class="flex flex-col justify-center space-x-4"
        >
          <div
            class="
              mx-auto
              flex
              items-center
              justify-center
              h-12
              w-12
              rounded-full
              bg-purple-500
            "
          >
            <outline-check-icon class="h-6 w-6 text-white"></outline-check-icon>
            <!-- Heroicon name: outline/check -->
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <h3
              id="modal-title"
              class="text-lg leading-6 font-medium text-gray-900"
            >
              Fast Geschafft!
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                Logge dich ein oder registriere dich um loszustarten
              </p>
            </div>
          </div>
          <forms-login-or-register-buttons />
        </div>
      </forms-wizard-layout>
    </div>
  </layouts-header-title>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useRouter,
  useStore,
  useContext,
} from '@nuxtjs/composition-api'
import { RootState } from '~/store'

export default defineComponent({
  name: 'CreateNewProject',
  setup() {
    const context = useContext()
    const formData = ref({})
    const router = useRouter()
    const currentStep = ref(1)

    const steps = ref([
      {
        id: 1,
        name: context.localePath('proposal.form.title.name'),
        status: 'current',
      },
      { id: 2, name: 'Projektthema', status: 'incomplete' },
      { id: 3, name: 'Login', status: 'incomplete' },
    ])

    const store = useStore<RootState>()

    const isLoggedIn = computed(() => store.state.auth.loggedIn)

    const createProject = async () => {
      if (isLoggedIn.value) {
        await store
          .dispatch('projects/createProject', formData.value)
          .then((res) => {
            if (res?.data) router.push({ path: `/antraege/${res.data.id}` })
          })
      } else {
        store.commit('projects/SET_CREATED_PROJECT', formData.value)
        currentStep.value = 3
      }
    }

    const submitStep1 = (data: any) => {
      formData.value = {
        ...formData.value,
        ...data,
      }
      currentStep.value = 2
    }

    const submitStep2 = (data: any) => {
      formData.value = {
        ...formData.value,
        ...data,
      }
      createProject()
    }

    return {
      formData,
      steps,
      currentStep,
      createProject,
      isLoggedIn,
      submitStep1,
      submitStep2,
    }
  },
})
</script>
