<template>
  <div class="space-y-2 flex flex-col justify-center mt-6">
    <div v-if="editMode" class="w-full flex justify-end">
      <FormulateInput
        label="Status"
        class="col-span-5"
        type="toggle"
        validation="required"
        name="active"
        :value="fraction ? fraction.active : null"
      />
    </div>
    <div class="grid grid-cols-12 gap-4">
      <FormulateInput
        type="color"
        class="col-span-1"
        name="color"
        label="Farbe"
        validation="required"
        :input-class="['']"
        :value="
          fraction ? (fraction.color ? `#${fraction.color}` : null) : null
        "
      ></FormulateInput>
      <FormulateInput
        label="Fraktionsname"
        class="col-span-3"
        type="text"
        name="name"
        help="help"
        validation="required"
        placeholder="Name angeben"
        :value="fraction ? fraction.name : null"
      />
      <FormulateInput
        label="Mitglieder"
        type="number"
        class="col-span-2"
        name="memberCount"
        help="help"
        validation="required"
        placeholder="Anzahl angeben"
        :value="fraction ? fraction.memberCount : null"
      />
      <FormulateInput
        label="Website"
        class="col-span-5"
        type="text"
        name="url"
        :value="fraction ? fraction.url : null"
      />
    </div>

    <div class="flex justify-between w-full"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IFraction } from '~/types/apiSchema'

export default defineComponent({
  props: {
    fraction: {
      type: Object as PropType<IFraction>,
      default: () => {},
    },
    editMode: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {}
  },
})
</script>
