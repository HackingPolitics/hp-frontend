<template>
  <FormulateForm
    v-slot="{ hasErrors }"
    v-model="formData"
    @submit="createProject()"
  >
    <forms-layout
      :title="currentStep !== 4 ? 'Antrag erstellen' : ''"
      :steps="steps"
      no-concept-sidebar
      no-floating-sidebar
    >
      <div class="space-y-6">
        <div class="py-5 sm:rounded-lg">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div v-if="currentStep < 4" class="md:col-span-1">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                {{
                  currentStep === 2
                    ? 'Projektthema'
                    : currentStep === 3
                    ? 'Politik'
                    : 'Projektitel'
                }}
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                Alle nicht benötigten Federn kannst du auch später auszufüllen
              </p>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <div
                v-show="currentStep === 1"
                class="space-y-6 flex flex-col justify-center"
              >
                <FormulateInput
                  label="Wie nennst du dein Projekt?"
                  placeholder="Projektitel"
                  type="text"
                  name="title"
                  validation="required"
                />
                <div class="sm:pt-5">
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <div
                      class="
                        flex
                        justify-center
                        items-center
                        px-6
                        pt-5
                        pb-6
                        border-2 border-gray-300 border-dashed
                        rounded-md
                      "
                    >
                      <div class="flex text-sm text-gray-600 text-center">
                        <label
                          class="
                            relative
                            cursor-pointer
                            bg-white
                            rounded-md
                            font-medium
                            text-indigo-600
                            hover:text-indigo-500
                            focus-within:outline-none
                            focus-within:ring-2
                            focus-within:ring-offset-2
                            focus-within:ring-indigo-500
                          "
                        >
                          <svg
                            class="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <span>Titelbild hinzufügen</span>
                          <FormulateInput
                            type="image"
                            name="project_image"
                            validation="mime:image/jpeg,image/png,image/gif"
                            input-class="sr-only"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-show="currentStep === 2"
                class="space-y-6 flex flex-col justify-center"
              >
                <FormulateInput
                  label="Wie würdet ihr euer Projekt beschreiben?"
                  type="textarea"
                  name="description"
                  :validation="currentStep === 2 ? 'required' : ''"
                />
                <div class="flex justify-between w-full">
                  <FormulateInput
                    label="Was treibt euch an?"
                    type="text"
                    name="motivation"
                    :validation="currentStep === 2 ? 'required' : ''"
                    wrapper-class="w-4/5"
                  />
                  <FormulateInput
                    label="Welche Fähigkeiten habt ihr?"
                    type="text"
                    name="skills"
                    :validation="currentStep === 2 ? 'required' : ''"
                    wrapper-class="w-4/5"
                  />
                </div>
                <FormulateInput
                  label="Was ist das Thema mit dem sich euer Antrag befasst?"
                  type="textarea"
                  name="topic"
                  :validation="currentStep === 2 ? 'required' : ''"
                />
                <FormulateInput
                  aria-label="In welche Thema passt euer Thema"
                  type="chipGroup"
                  name="category"
                  limit="2"
                  label="In Welche Kategorie passt euer Thema"
                  :options="[
                    {
                      label: 'Bildung und Soziales',
                      value: 'education_social',
                    },
                    { label: 'Mobilität', value: 'mobility' },
                    { label: 'Umwelt', value: 'environment' },
                    { label: 'Infrastruktur', value: 'infrastructure' },
                    { label: 'Freizeit', value: 'leisure' },
                    { label: 'Kunst und Kultur', value: 'art_culture' },
                  ]"
                />
              </div>
              <div
                v-show="currentStep === 3"
                class="space-y-6 flex flex-col justify-center"
              >
                <FormulateInput
                  label="Der Titel des Parliaments"
                  type="select"
                  name="parliament"
                  :options="parliamentsOptions"
                  :validation="currentStep === 3 ? 'required' : ''"
                />
                <FormulateInput
                  label="Der Name deine Stadt oder Gemeinde"
                  type="text"
                />
                <FormulateInput
                  label="Um welche Politische Ebene handelt es sich?"
                  type="radio"
                  name="politic_ground"
                  :options="{
                    city: 'Stadt',
                    village: 'Dorf',
                    others: 'Andere',
                  }"
                />
                <div class="flex justify-between w-full">
                  <FormulateInput
                    label="Wie heißt der Verwaltungschef?"
                    type="text"
                    wrapper-class="w-4/5"
                  />
                  <FormulateInput
                    label="Wie heißt das lokale Parlament?"
                    type="text"
                    wrapper-class="w-4/5"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            v-show="currentStep === 4"
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
              <outline-check-icon
                class="h-6 w-6 text-white"
              ></outline-check-icon>
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
            <div class="inline-flex justify-center items-baseline mt-8">
              <div class="flex items-center mr-4">
                <nuxt-link
                  to="/registrieren"
                  class="
                    items-center
                    px-4
                    py-2
                    w-32
                    text-center
                    border border-transparent
                    text-base
                    font-medium
                    rounded-md
                    text-white
                    bg-purple-500
                    hover:bg-purple-300
                  "
                >
                  Registrieren
                </nuxt-link>
              </div>
              <div class="flex items-center">
                <nuxt-link
                  to="/login"
                  class="
                    items-center
                    px-4
                    py-2
                    w-32
                    text-center
                    border border-transparent
                    text-base
                    font-medium
                    rounded-md
                    text-white
                    bg-purple-500
                    hover:bg-purple-300
                  "
                >
                  Login
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #actions>
        <div class="flex justify-end space-x-4">
          <FormulateInput
            v-show="currentStep > 1 && currentStep < 4"
            type="button"
            @click="prevStep()"
          >
            Zurück
          </FormulateInput>
          <FormulateInput
            v-if="currentStep < 3"
            :disable-errors="hasErrors"
            :disabled="hasErrors"
            type="button"
            @click.prevent="nextStep()"
          >
            Weiter
          </FormulateInput>

          <FormulateInput
            v-if="currentStep === 3"
            type="submit"
            wrapper-class="w-40"
          >
            Projekt anlegen
          </FormulateInput>
        </div>
      </template>
    </forms-layout>
  </FormulateForm>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useRouter,
  useStore,
} from '@nuxtjs/composition-api'

import { IParliament } from '~/types/apiSchema'

export default defineComponent({
  name: 'Create',
  setup() {
    const formData = ref({})
    const router = useRouter()
    const currentStep = ref(1)
    const parliaments = ref<IParliament[]>([])
    const steps = ref([
      { id: 1, name: 'Projekttitel', status: 'current' },
      { id: 2, name: 'Projektthema', status: 'incomplete' },
      { id: 3, name: 'Politik', status: 'incomplete' },
    ])
    const store = useStore()

    const isLoggedIn = computed(() => store.getters['auth/isLoggedIn'])
    const parliamentsOptions = computed(() =>
      parliaments.value.map((parliament) => {
        return { value: parliament['@id'], label: parliament.title }
      })
    )

    const nextStep = () => {
      if (currentStep.value === 3) {
        router.push('/antraege/erster')
      }
      const currStep = steps.value.find((step) => step.id === currentStep.value)
      if (currStep) currStep.status = 'complete'

      currentStep.value++

      const nextStep = steps.value.find((step) => step.id === currentStep.value)
      if (nextStep) nextStep.status = 'current'
    }

    const prevStep = () => {
      const currStep = steps.value.find((step) => step.id === currentStep.value)
      if (currStep) currStep.status = 'incomplete'
      currentStep.value--

      const prevStep = steps.value.find((step) => step.id === currentStep.value)
      if (prevStep) prevStep.status = 'current'
    }

    const createProject = async () => {
      if (isLoggedIn.value) {
        router.push({ path: `/antraege/${res.data.id}` })
        await store
          .dispatch('projects/createProject', formData.value)
          .then((res) => {
            router.push({ path: `/antraege/${res.data.id}` })
          })
      } else {
        store.commit('projects/SET_CREATED_PROJECT', formData.value)
        currentStep.value = 4
      }
    }
    return {
      formData,
      steps,
      currentStep,
      nextStep,
      prevStep,
      createProject,
      parliaments,
      parliamentsOptions,
      isLoggedIn,
    }
  },
  async fetch() {
    const response = await this.$axios.get('/parliaments')
    this.parliaments = response.data['hydra:member']
  },
})
</script>
