<template>
  <div class="w-full">
    <forms-collaboration-input
      :model="groupModel.description"
      name="description"
      type="text"
      :input-type="2"
      :placeholder="options.primaryPlaceholder"
      :validation-name="options.primaryValidationName"
      validation="required"
      @validation="$emit('primary-validation', $event)"
      @focus="$emit('primary-focus')"
      @focusout="$emit('primary-focusout', $event.target.value)"
      @delete="$emit('primary-delete', groupModel.id)"
    >
      <template #prefix>
        <div class="inline-flex items-center space-x-2 pr-4 handle cursor-move">
          <outline-menu-alt-4-icon
            class="w-5 h-5 bg-white rounded-sm text-gray-500"
          ></outline-menu-alt-4-icon>
          <outline-thumb-down-icon
            class="w-5 h-5 text-red-500"
          ></outline-thumb-down-icon>
          <span class="text-red-500">{{
            $t('forms.counter_arguments.cons')
          }}</span>
        </div>
      </template>
    </forms-collaboration-input>

    <forms-collaboration-input
      v-for="(sub, index) in Array.isArray(subField)
        ? subField
        : typeof subField === 'string'
        ? groupModel[subField]
        : []"
      :key="sub.id"
      :input-type="3"
      :model="sub.description"
      name="description"
      type="text"
      :validation-name="options.subValidationName"
      :placeholder="options.subPlaceholder"
      validation="required"
      @validation="validationNegations = $event"
      @focus="$emit('sub-focus')"
      @focusout="
        $emit('sub-focusout', { value: $event.target.value, id: sub.id })
      "
      @delete="$emit('sub-delete', sub.id)"
    >
      <template #prefix>
        <div class="inline-flex items-center space-x-2 px-4">
          <outline-chat-alt-2-icon class="w-5 h-5"></outline-chat-alt-2-icon>
        </div>
      </template>
    </forms-collaboration-input>

    <forms-collaboration-input
      v-if="createFormIsOpen"
      :input-type="2"
      name="description"
      type="text"
      :validation-name="options.subValidationName"
      :placeholder="options.subPlaceholder"
      validation="required"
      @validation="validationNegations = $event"
      @focusout="addSubItem($event.target.value)"
      @focus="$emit('add-focus')"
      @delete="toggleCreateForm"
    >
      <template #prefix>
        <div class="items-center space-x-2 px-4">
          <outline-chat-alt-2-icon class="w-5 h-5"></outline-chat-alt-2-icon>
        </div>
      </template>
    </forms-collaboration-input>

    <FormulateInput
      input-class="flex space-x-2  mt-4 text-purple-500"
      type="button"
      @click="toggleCreateForm"
    >
      <outline-plus-icon class="w-6 h-6"></outline-plus-icon>
      <span class="">{{ $t('forms.counter_arguments.add_counter') }}</span>
    </FormulateInput>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CollaborationGroupInput',
  props: {
    model: {
      type: Object,
      default: () => {},
    },
    subField: {
      type: [String, Array],
      default: () => [],
    },
    options: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const createFormIsOpen = ref(false)
    const groupModel = ref({})

    const toggleCreateForm = () =>
      (createFormIsOpen.value = !createFormIsOpen.value)

    const addSubItem = (val) => {
      context.emit('add-focusout', { value: val })
      toggleCreateForm()
    }

    watch(
      () => props.model,
      (newVal) => {
        groupModel.value = newVal
      },
      {
        deep: true,
        immediate: true,
      }
    )

    return { createFormIsOpen, groupModel, toggleCreateForm, addSubItem }
  },
})
</script>
