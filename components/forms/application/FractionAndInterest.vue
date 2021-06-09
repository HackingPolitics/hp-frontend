<template>
  <FormulateForm v-model="formData">
    <forms-layout title="Ratsmehrheit und Fraktionsinteressen">
      <div class="space-y-6">
        <forms-form-section title="Probleme">
          <FormulateInput
            type="group"
            :repeatable="true"
            name="problems"
            label="Welche Probleme hast du beobachtet und möchtest du anlegen?"
            add-label="+ Problem hinzufügen"
            remove-position="after"
          >
            <FormulateInput name="problem" type="text" />
          </FormulateInput>
        </forms-form-section>
        <forms-form-section
          title="Handlungsauftrag"
          subtitle="Was sollte die Stadtverwaltung tun, um das Problem anzugehen"
        >
          <FormulateInput
            type="group"
            :repeatable="true"
            name="callForAction"
            label="Der Stadtrat beauftrag den Oberbügermeister"
            remove-position="after"
            add-label="+ Maßnahme hinzufügen"
          >
            <FormulateInput name="problem" type="text" />
          </FormulateInput>
        </forms-form-section>
      </div>
    </forms-layout>
  </FormulateForm>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'FractionAndInterestForm',
  setup() {
    const formData = ref(null)

    return {
      formData,
    }
  },
})
</script>
