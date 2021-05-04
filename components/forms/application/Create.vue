<template>
  <div>
    <nav aria-label="Progress" class="mb-16">
      <ol class="space-y-4 md:flex md:space-y-0 md:space-x-8">
        <li v-for="step in steps" :key="step.name" class="md:flex-1">
          <a
            v-if="step.status === 'complete'"
            class="group pl-4 py-2 flex flex-col border-l-4 border-indigo-600 hover:border-indigo-800 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
          >
            <span
              class="text-xs text-indigo-600 font-semibold tracking-wide uppercase group-hover:text-indigo-800"
              >{{ step.id }}</span
            >
            <span class="text-sm font-medium">{{ step.name }}</span>
          </a>
          <a
            v-else-if="step.status === 'current'"
            class="pl-4 py-2 flex flex-col border-l-4 border-indigo-600 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
            aria-current="step"
          >
            <span
              class="text-xs text-indigo-600 font-semibold tracking-wide uppercase"
              >{{ step.id }}</span
            >
            <span class="text-sm font-medium">{{ step.name }}</span>
          </a>
          <a
            v-else
            class="group pl-4 py-2 flex flex-col border-l-4 border-gray-200 hover:border-gray-300 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
          >
            <span
              class="text-xs text-gray-500 font-semibold tracking-wide uppercase group-hover:text-gray-700"
              >{{ step.id }}</span
            >
            <span class="text-sm font-medium">{{ step.name }}</span>
          </a>
        </li>
      </ol>
    </nav>
    <FormulateForm>
      <forms-layout title="Antrag erstellen">
        <div v-show="currentStep === 1" class="space-y-6">
          <FormSection title="Probleme">
            <FormulateInput label="Projekttitel" type="text" />
          </FormSection>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api'
import FormSection from '@/components/forms/Section'

export default defineComponent({
  name: 'Create',
  components: {
    FormSection,
  },
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
      steps.value.find((step) => step.id === currentStep.value).status =
        'complete'
      currentStep.value++
      steps.value.find((step) => step.id === currentStep.value).status =
        'current'
    }
    function prevStep() {
      steps.value.find((step) => step.id === currentStep.value).status =
        'incomplete'
      currentStep.value--
      steps.value.find((step) => step.id === currentStep.value).status =
        'current'
    }
    return { steps, currentStep, nextStep, prevStep }
  },
})
</script>
