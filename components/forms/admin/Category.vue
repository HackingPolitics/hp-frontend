<template>
  <FormulateForm v-model="formData" @submit="$emit('submit', formData)">
    <div>
      <div class="mt-3 sm:mt-5">
        <h3
          id="modal-title"
          class="text-lg leading-6 font-medium text-gray-900"
        >
          Neue Kategorie
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
        <FormulateInput
          name="name"
          type="text"
          label="Kategorienname"
          help="help"
          placeholder="Hier Name eingeben"
          class="mt-8"
          validation="required|min:4,length"
        />
      </div>
    </div>
    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse justify-start">
      <FormulateInput type="submit" class="sm:ml-3">
        {{ item ? 'Bearbeiten' : 'Erstellen' }}
      </FormulateInput>
      <button
        type="button"
        class="
          mt-3
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

import { ICategory, IErrors } from '~/types/apiSchema'

export default defineComponent({
  name: 'CategoryForm',
  props: {
    errors: {
      type: Object as PropType<IErrors>,
      default: null,
    },
    item: {
      type: Object as PropType<ICategory>,
      default: null,
    },
  },
  setup(props) {
    const formData = ref<ICategory | null>(null)

    const setFormData = () => {
      if (props.item) {
        formData.value = props.item
      }
    }

    setFormData()

    return { formData }
  },
})
</script>
