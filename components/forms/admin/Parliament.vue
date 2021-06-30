<template>
  <div
    v-show="currentStep === 3"
    class="space-y-6 flex flex-col justify-center"
  >
    <FormulateInput
      label="Der Titel des Parliaments"
      type="select"
      name="council"
      :options="councilOptions"
      :validation="currentStep === 3 ? 'required' : ''"
    />
    <FormulateInput label="Der Name deine Stadt oder Gemeinde" type="text" />
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
</template>

<script>
export default {}
</script>
