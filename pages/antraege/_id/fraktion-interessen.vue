<template>
  <layouts-form-with-sidebar>
    <div>
      <h1 class="text-3xl font-normal text-blue-gray-900 mb-4">
        {{ $t('forms.fractioninterests.formTitle') }}
      </h1>
      <p class="text-lg font-normal text-gray-600 mb-2 leading-6">
        {{ $t('forms.fractioninterests.formDescription') }}
      </p>
      <forms-project-fraction-and-interest
        class="mt-12"
      ></forms-project-fraction-and-interest>
    </div>
  </layouts-form-with-sidebar>
</template>

<script>
export default {
  name: 'FractionForm',
  meta: {
    area: 'Fraktion',
  },
  layout: 'collaboration',
  middleware: ['isProjectMember', 'getCurrentArea'],
}
</script>
