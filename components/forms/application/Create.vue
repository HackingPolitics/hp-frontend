<template>
  <FormulateForm v-model="formData">
    <forms-layout
      title="Antrag erstellen"
      :steps="steps"
      no-concept-sidebar
      no-floating-sidebar
    >
      <div class="max-w-2xl mx-auto pt-8">
        <div
          v-show="currentStep === 1"
          class="space-y-6 flex flex-col justify-center"
        >
          <FormulateInput
            label="Wie nennst du dein Projekt?"
            placeholder="Projektitel"
            type="text"
            name="title"
          />
          <div class="sm:pt-5 relativ">
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <div
                class="
                  flex
                  justify-center
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
          <FormSection
            title="Projektthema"
            subtitle="Du hast auch später die Möglichkeit, diesen Teil auszufüllen"
            name="topic"
          >
            <FormulateInput
              label="Was ist das Thema mit dem sich euer Antrag befasst?"
              type="textarea"
              name="thema"
            />
            <FormulateInput
              aria-label="In welche Thema passt euer Thema"
              type="chipGroup"
              name="category"
              limit="2"
              label="In Welche Kategorie passt euer Thema"
              :options="[
                { label: 'Bildung und Soziales', value: 'education_social' },
                { label: 'Mobilität', value: 'mobility' },
                { label: 'Umwelt', value: 'environment' },
                { label: 'Infrastruktur', value: 'infrastructure' },
                { label: 'Freizeit', value: 'leisure' },
                { label: 'Kunst und Kultur', value: 'art_culture' },
              ]"
            />
          </FormSection>
        </div>
        <div
          v-show="currentStep === 3"
          class="space-y-6 flex flex-col justify-center"
        >
          <FormSection
            title="Politik"
            subtitle="Du hast auch später die Möglichkeit, diesen Teil auszufüllen"
          >
            <FormulateInput
              label="Der Name deine Stadt oder Gemeinde"
              type="text"
            />
            <FormulateInput
              label="Um welche Politische Ebene handelt es sich?"
              type="radio"
              :options="{ city: 'Stadt', village: 'Dorf', others: 'Andere' }"
            />
            <div class="flex justify-between w-full">
              <FormulateInput
                label="Wie heißt der Verwaltungschef?"
                type="text"
                wrapper-class="w-3/4"
              />
              <FormulateInput
                label="Wie heißt das lokale Parlament?"
                type="text"
                wrapper-class="w-3/4"
              />
            </div>
          </FormSection>
        </div>
      </div>
      <template #actions>
        <div class="flex justify-end space-x-4">
          <FormulateInput
            v-show="currentStep > 1"
            type="button"
            @click="prevStep()"
          >
            Zurück
          </FormulateInput>
          <FormulateInput
            v-if="currentStep < 3"
            type="button"
            @click="nextStep()"
          >
            Weiter
          </FormulateInput>

          <FormulateInput v-else type="submit">
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
  useRouter,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Create',
  setup() {
    const formData = ref({})
    const router = useRouter()
    const currentStep = ref(1)
    const steps = ref([
      { id: 1, name: 'Projekttitel', status: 'current' },
      { id: 2, name: 'Projektthema', status: 'incomplete' },
      { id: 3, name: 'Politik', status: 'incomplete' },
    ])

    function nextStep() {
      if (currentStep.value === 3) {
        router.push('/antraege/erster')
      }
      const currStep = steps.value.find((step) => step.id === currentStep.value)
      if (currStep) currStep.status = 'complete'

      currentStep.value++

      const nextStep = steps.value.find((step) => step.id === currentStep.value)
      if (nextStep) nextStep.status = 'current'
    }
    function prevStep() {
      const currStep = steps.value.find((step) => step.id === currentStep.value)
      if (currStep) currStep.status = 'incomplete'
      currentStep.value--

      const prevStep = steps.value.find((step) => step.id === currentStep.value)
      if (prevStep) prevStep.status = 'current'
    }
    return { formData, steps, currentStep, nextStep, prevStep }
  },
})
</script>
