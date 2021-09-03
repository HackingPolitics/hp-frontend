<template>
  <div v-if="groupModel" class="w-full">
    <div class="grid lg:grid-cols-2">
      <div>
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
            <div
              class="
                p-2
                bg-white
                inline-flex
                items-center
                cursor-move
                rounded-lg
              "
            >
              <outline-menu-alt-4-icon
                class="w-5 h-5 text-gray-500"
              ></outline-menu-alt-4-icon>
            </div>
          </template>
        </forms-collaboration-input>
      </div>

      <div class="flex flex-col">
        <forms-collaboration-input
          v-for="sub in Array.isArray(subField)
            ? subField
            : typeof subField === 'string'
            ? groupModel[subField]
            : []"
          :key="sub.id"
          ref="subItems"
          :input-type="3"
          :model="sub.description"
          name="description"
          type="textarea"
          :validation-name="options.subValidationName"
          :placeholder="options.subPlaceholder"
          validation="required"
          @save="$emit('sub-focusout', { value: $event, id: sub.id })"
          @validation="validationNegations = $event"
          @delete="$emit('sub-delete', sub.id)"
        >
        </forms-collaboration-input>

        <div class="flex flex-col lg:ml-5">
          <forms-collaboration-input
            ref="counterArgument"
            :input-type="1"
            name="description"
            type="textarea"
            :validation-name="options.subValidationName"
            :placeholder="options.subValidationName"
            error-behavior="submit"
            @validation="validationNegations = $event"
            @focus="setFocusToCounterArgument"
          >
          </forms-collaboration-input>
          <div class="flex flex-row items-center justify-end">
            <div v-if="subItemError" class="text-red-500 text-sm -mt-3 mr-4">
              {{ $t('errors.validate.general.notBlank') }}
            </div>
            <div
              v-if="showCollaborationInputControls"
              class="-mt-3 self-end mb-4"
            >
              <div class="flex flex-row space-x-2">
                <button
                  class="
                    px-2.5
                    py-1.5
                    bg-gray-100
                    flex
                    items-center
                    rounded-md
                    cursor-pointer
                  "
                  @click="cancelAddSubItem($refs.counterArgument)"
                >
                  <outline-trash-icon class="w-4 h-4"></outline-trash-icon>
                </button>
                <button
                  class="
                    px-2.5
                    py-1.5
                    bg-green-700
                    text-white
                    flex
                    items-center
                    rounded-md
                    cursor-pointer
                  "
                  @click="addSubItem($refs.counterArgument)"
                >
                  <outline-check-icon class="w-4 h-4"></outline-check-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    const groupModel = ref({})
    const showCollaborationInputControls = ref(false)

    const setFocusToCounterArgument = () => {
      showCollaborationInputControls.value = true
    }
    const showEditControls = ref(false)
    const subItemError = ref(false)

    const addSubItem = (val) => {
      if (val.inputModel) {
        context.emit('add-focusout', { value: val.inputModel })
        val.inputModel = ''
        showCollaborationInputControls.value = false
        subItemError.value = false
      } else {
        subItemError.value = true
      }
    }

    const cancelAddSubItem = (val) => {
      val.inputModel = ''
      showCollaborationInputControls.value = false
      subItemError.value = false
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

    return {
      groupModel,
      addSubItem,
      cancelAddSubItem,
      setFocusToCounterArgument,
      showCollaborationInputControls,
      subItemError,
      showEditControls,
    }
  },
})
</script>
