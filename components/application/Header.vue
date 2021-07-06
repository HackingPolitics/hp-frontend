<template>
  <div class="rounded-lg bg-white overflow-hidden shadow mb-16">
    <h2 id="project-title" class="sr-only">Project Title</h2>
    <div class="bg-white p-8">
      <div class="sm:flex sm:justify-between">
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
                  :value="project.title"
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
                {{ project && project.title }}
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
              <p class="text-sm font-medium text-gray-600">
                {{ project.council.location }}
              </p>
              <outline-location-marker-icon
                class="w-5 h-5 ml-1 mr-4 text-gray-500"
              ></outline-location-marker-icon>
              <chip
                v-for="category in project.categories"
                :key="category.id"
                class="mr-2"
                >{{ category.name }}</chip
              >
            </div>
            <div v-if="project && project.memberships" class="mt-4">
              <span class="pb-2 text-sm text-gray-500 text-center">
                Mitglieder</span
              >
              <div class="flex items-center mt-2">
                <avatar-group :avatars="project.memberships"> </avatar-group>
                <div
                  class="
                    rounded-full
                    border-2 border-gray-300
                    h-8
                    w-8
                    flex
                    justify-center
                    items-center
                    text-xl text-gray-400
                    hover:border-purple-500 hover:text-purple-500
                    cursor-pointer
                  "
                  :class="project.memberships ? '-ml-2' : ''"
                  @click="isModalOpen = true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <toggle-visability-button
            v-if="isCoordinator"
            :state="project.state === 'public' ? true : false"
            @toggle="changeProjectState"
          ></toggle-visability-button>
        </div>
      </div>
    </div>
    <base-modal :is-modal-open="isModalOpen" @close="isModalOpen = false">
      <div class="relative">
        <h2>Projektmitlieder</h2>
        <div
          class="absolute top-0 right-0 text-gray-500 cursor-pointer"
          @click="isModalOpen = false"
        >
          x
        </div>
        <application-members-list
          :memberships="project.memberships"
        ></application-members-list>
      </div>
    </base-modal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useStore,
  PropType,
  toRefs,
} from '@nuxtjs/composition-api'
import ToggleVisabilityButton from './ToggleVisabilityButton.vue'
import { RootState } from '~/store'
import { IProject, IProjectMembership } from '~/types/apiSchema'

interface ProjectForm {
  title: string
}

export default defineComponent({
  name: 'ApplicationHeader',
  components: { ToggleVisabilityButton },
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
    project: {
      type: Object as PropType<IProject>,
      default: null,
    },
  },
  setup(props) {
    const { project } = toRefs(props)
    const editMode = ref(false)
    const projectForm = ref<ProjectForm>({ title: '' })
    const store = useStore<RootState>()

    const updateProjectTitle = () => {
      store.dispatch('projects/updateProject', [
        props.project.value?.id,
        {
          title: projectForm.value.title,
        },
      ])
      editMode.value = false
    }

    const isCoordinator = computed(() => {
      if (project.value.memberships) {
        const check = project.value.memberships.find(
          (member: IProjectMembership) =>
            member.user?.id === store.state.auth.user?.id &&
            member.role === 'coordinator'
        )
        return !!check
      }
      return false
    })

    const userMembershipRole = computed((): string | undefined => {
      if (project.value.memberships) {
        return project.value.memberships.find(
          (membership: IProjectMembership) =>
            membership?.user?.id === store.state.auth.user?.id
        )?.role
      }
    })

    const changeProjectState = (flag: boolean) => {
      if (flag) {
        publishProject()
        return
      }
      hideProject()
    }

    const publishProject = async () => {
      const response = await store.dispatch('projects/updateProject', [
        project.value.id,
        { state: 'public' },
      ])
      store.dispatch('projects/setProject', response.data)
    }

    const hideProject = async () => {
      const response = await store.dispatch('projects/updateProject', [
        project.value.id,
        { state: 'private' },
      ])
      store.dispatch('projects/setProject', response.data)
    }

    const isModalOpen = ref(false)
    const addUser = () => {
      isModalOpen.value = true
    }

    return {
      projectForm,
      editMode,
      updateProjectTitle,
      publishProject,
      hideProject,
      userMembershipRole,
      isCoordinator,
      changeProjectState,
      addUser,
      isModalOpen,
    }
  },
})
</script>
