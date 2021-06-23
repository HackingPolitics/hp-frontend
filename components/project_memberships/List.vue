<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <ul class="divide-y divide-gray-200">
      <li
        v-for="projectMembership in projectMemberships"
        :key="projectMembership.id"
      >
        <a href="#" class="block hover:bg-gray-50">
          <div class="flex items-center px-4 py-4 sm:px-6 relative">
            <div
              class="
                min-w-0
                flex-1 flex
                items-center
                space-x-6
                grid grid-cols-6
              "
            >
              <div class="flex flex-shrink-0 col-span-1">
                <img
                  class="h-12 w-12 rounded-full"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <div class="ml-2">
                  <p class="text-sm font-medium text-indigo-600 truncate">
                    {{ `${projectMembership.user.username}` }}
                  </p>
                  <p class="mt-2 flex items-center text-sm text-gray-500">
                    <!-- Heroicon name: solid/mail -->
                    <outline-user-group-icon
                      class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    />
                    <span class="truncate">{{
                      `Rolle: ${projectMembership.role}`
                    }}</span>
                  </p>
                </div>
              </div>

              <div class="col-span-3 min-w-0 px-6 flex-1justify-center">
                <div class="hidden md:block">
                  <div>
                    <p class="text-sm text-gray-900">
                      Motivation:
                      {{ projectMembership.motivation }}
                    </p>
                    <p class="mt-2 flex items-center text-sm text-gray-500">
                      Fähigkeiten:
                      {{ projectMembership.skills }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-span-2 flex space-x-2">
                <FormulateInput
                  v-show="projectMembership.role === 'applicant'"
                  type="button"
                  @click="acceptApplication(projectMembership.user.id)"
                >
                  Bewerbung annehmen
                </FormulateInput>
                <FormulateInput
                  v-show="projectMembership.role !== 'coordinator'"
                  type="button"
                  @click="deleteApplication(projectMembership.user.id)"
                >
                  <span class="text-red-500">{{
                    projectMembership.role === 'applicant'
                      ? $t('page.application.reject_application')
                      : $t('page.application.delete_membership')
                  }}</span>
                </FormulateInput>
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api'
import { RootState } from '~/store'

export default defineComponent({
  name: 'ProjectMembershipList',
  props: {
    projectMemberships: {
      type: Array,
      default: () => [],
    },
    projectId: {
      type: [String, Number],
      default: '',
    },
  },
  setup(props) {
    const store = useStore<RootState>()

    const acceptApplication = (userId: string) => {
      const payload = {
        role: 'writer',
      }
      const projectMemberShipId = `project=${props.projectId};user=${userId}`
      store.dispatch('projects/updateProjectMemberShip', [
        projectMemberShipId,
        payload,
      ])
    }
    const deleteApplication = (userId) => {
      const projectMemberShipId = `project=${props.projectId};user=${userId}`
      store.dispatch('projects/deleteProjectMemberShip', projectMemberShipId)
    }

    return {
      acceptApplication,
      deleteApplication,
    }
  },
})
</script>
