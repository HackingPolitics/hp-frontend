<template>
  <div class="rounded-lg bg-white overflow-hidden shadow mb-16">
    <h2 id="profile-overview-title" class="sr-only">Profile Overview</h2>
    <div class="bg-white p-6">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="sm:flex sm:space-x-5">
          <div class="text-center sm:mt-0 sm:pt-1 sm:text-left">
            <FormulateForm
              v-if="editable && editMode"
              v-model="projectForm"
              @submit="updateProjectTitle()"
            >
              <div class="flex">
                <FormulateInput
                  name="title"
                  :value="application.title"
                  validation="required"
                  type="text"
                >
                </FormulateInput>
                <FormulateInput
                  type="submit"
                  outer-class="w-8 ml-4 flex justify-center"
                >
                  <outline-check-icon class="w-5 h-5"></outline-check-icon>
                </FormulateInput>
              </div>
            </FormulateForm>

            <div v-else class="flex">
              <h3 class="text-xl font-bold text-gray-900 sm:text-2xl pb-2">
                {{ application && application.title }}
              </h3>
              <button
                v-if="editable"
                class="p-2 mb-1"
                @click="editMode = !editMode"
              >
                <outline-pencil-icon
                  v-if="!editMode"
                  class="w-5 h-5"
                ></outline-pencil-icon>
              </button>
            </div>
            <div class="inline-flex items-center">
              <p class="text-sm font-medium text-gray-600">Dresden</p>
              <outline-location-marker-icon
                class="w-5 h-5 ml-1 mr-4"
              ></outline-location-marker-icon>
              <chip class="mr-2">Infrastruktur</chip>
              <chip>Mobilität</chip>
            </div>
          </div>
        </div>
        <div
          v-if="application && application.memberships"
          class="flex flex-col justify-center"
        >
          <span class="pb-2 text-teal-500 text-center">
            {{ application.memberships.length }} Mitglieder</span
          >
          <avatar-group :avatars="application.memberships"> </avatar-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useStore,
} from '@nuxtjs/composition-api'
import { RootState } from '~/store'

interface ProjectForm {
  title: string
}

export default defineComponent({
  name: 'ApplicationHeader',
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const editMode = ref(false)
    const projectForm = ref<ProjectForm>({ title: '' })
    const store = useStore<RootState>()

    const updateProjectTitle = () => {
      store.dispatch('projects/updateProject', [
        application.value?.id,
        {
          title: projectForm.value.title,
        },
      ])
      editMode.value = false
    }
    const application = computed(() => {
      return store.state.projects.project
    })
    return { application, projectForm, editMode, updateProjectTitle }
  },
})
</script>
