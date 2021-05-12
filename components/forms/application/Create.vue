<template>
  <FormulateForm>
    <forms-layout
      title="Antrag erstellen"
      :steps="steps"
      no-concept-sidebar
      no-floating-sidebar
    >
      <div v-show="currentStep === 1" class="space-y-6">
        <FormulateInput label="Projekttitel" type="text" />
        <FormulateInput
          type="image"
          name="headshot"
          label="Select an image to upload"
          help="Select a png, jpg or gif to upload."
          validation="mime:image/jpeg,image/png,image/gif"
        />
      </div>
      <div v-show="currentStep === 2" class="space-y-6">
        <FormSection
          title="Projektthema"
          subtitle="Du hast auch später die Möglichkeit, diesen Teil auszufüllen"
        >
          <FormulateInput
            label="Was ist das Thema. mit dem sich euer Antrag befasst?"
            type="textarea"
          />
          <FormulateInput
            label="In welche Kategorie passt euer Thema?"
            type="select"
          />
        </FormSection>
      </div>
      <div v-show="currentStep === 3" class="space-y-6">
        <FormSection
          title="Politik"
          subtitle="Du hast auch später die Möglichkeit, diesen Teil auszufüllen"
        >
          <FormulateInput
            label="Der Name deine Stadt oder Gemeinde"
            type="textarea"
          />
          <FormulateInput
            label="Um welche Politische Ebene handelt es sich?"
            type="radio"
            :options="{ city: 'Stadt', village: 'Dorf', others: 'Andere' }"
          />
          <div class="flex justify-between">
            <FormulateInput
              label="Wie heißt der Verwaltungschef?"
              type="text"
            />
            <FormulateInput
              label="Wie heißt das lokale Parlament?"
              type="text"
            />
          </div>
        </FormSection>
      </div>
      <template #actions>
        <div class="flex justify-end">
          <button
            v-show="currentStep > 1"
            type="button"
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
            @click="prevStep()"
          >
            Zurück
          </button>
          <button
            v-if="currentStep < 3"
            type="submit"
            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-light-blue-500 hover:bg-light-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
            @click="nextStep()"
          >
            Weiter
          </button>

          <button
            v-else
            type="submit"
            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-light-blue-500 hover:bg-light-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
            @click="nextStep()"
          >
            Projekt anlegen
          </button>
        </div>
      </template>
    </forms-layout>
  </FormulateForm>
</template>

<script lang="ts">
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Create',
  setup() {
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
    return { steps, currentStep, nextStep, prevStep }
  },
})
</script>
