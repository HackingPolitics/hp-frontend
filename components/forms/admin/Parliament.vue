<template>
  <FormulateForm v-model="formData" @submit="$emit('submit', formData)">
    <div>
      <div class="mt-3 sm:mt-5">
        <h3
          id="modal-title"
          class="text-lg leading-6 font-medium text-gray-900"
        >
          Neues Parlament
        </h3>
        <div v-if="errors">
          <div
            v-for="violation in errors.violations"
            :key="violation.code"
            class="text-red-500 mt-4 text-sm"
          >
            {{ violation.propertyPath }}: {{ violation.message }}
          </div>
        </div>
        <forms-admin-parliament-field></forms-admin-parliament-field>
      </div>
    </div>
    <div
      class="
        mt-5
        sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense
      "
    >
      <FormulateInput type="submit" class="w-full"> Erstellen </FormulateInput>
      <button
        type="button"
        class="
          mt-3
          w-full
          inline-flex
          justify-center
          rounded-md
          border border-gray-300
          shadow-sm
          px-4
          py-2
          bg-white
          text-base
          font-medium
          text-gray-700
          hover:bg-gray-50
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
          sm:mt-0 sm:col-start-1 sm:text-sm
        "
        @click="$emit('close')"
      >
        Abbrechen
      </button>
    </div>
  </FormulateForm>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'

import { IErrors } from '~/types/apiSchema'

export default defineComponent({
  name: 'ParliamentForm',
  props: {
    errors: {
      type: Object as PropType<IErrors>,
      default: null,
    },
  },
  setup() {
    const formData = ref(null)

    return { formData }
  },
})
</script>
