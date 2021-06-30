<template>
  <div>
    <h1 class="text-3xl font-normal text-blue-gray-900 mb-4">
      {{ $t('forms.fractioninterests.formTitle') }}
    </h1>
    <forms-project-fraction-and-interest></forms-project-fraction-and-interest>
  </div>
</template>

<script>
export default {
  name: 'FractionForm',
  layout: 'formWithSidebar',
  middleware: 'isProjectMember',
}
</script>
