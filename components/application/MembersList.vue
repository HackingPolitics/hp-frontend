<template>
  <div class="overflow-hidden sm:rounded-md">
    <ul class="divide-y divide-gray-200 mt-4">
      <li v-for="member in activeMembers" :key="member.id">
        <div v-if="member.user" class="flex items-center py-4 relative">
          <div
            class="min-w-0 flex-1 space-x-6 flex justify-between items-center"
          >
            <div class="flex space-x-4">
              <base-avatar :user="member.user"></base-avatar>

              <div class="flex flex-col">
                <p class="text-sm text-gray-800 font-semibold truncate">
                  {{ member.user.firstName }}
                  {{ member.user.lastName }}
                </p>
                <p class="text-sm font-medium text-gray-600 truncate">
                  {{ member.user.username }}
                </p>
              </div>
            </div>
            <div
              class="
                rounded-full
                text-sm text-gray-600
                border border-gray-600
                p-1
                px-2
              "
            >
              {{ $t(`common.roles.${member.role}`) }}
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="applicants && applicants.length">
      <div class="mt-16">Bewerbungen</div>
      <ul class="divide-y divide-gray-200 mt-4">
        <li v-for="member in applicants" :key="member.id">
          <div
            v-if="member.user && member.role === 'applicant'"
            class="flex items-center py-4 relative"
          >
            <div
              class="min-w-0 flex-1 space-x-6 flex justify-between items-center"
            >
              <div class="flex space-x-4">
                <base-avatar :user="member.user"></base-avatar>

                <div class="flex flex-col">
                  <p class="text-sm text-gray-800 font-semibold truncate">
                    {{ member.user.firstName }}
                    {{ member.user.lastName }}
                  </p>
                  <p class="text-sm font-medium text-gray-600 truncate">
                    {{ member.user.username }}
                  </p>
                </div>
              </div>

              <div class="flex space-x-2">
                <FormulateInput
                  v-show="member.role === 'applicant'"
                  type="button"
                  @click="acceptApplication(member.user.id)"
                >
                  Annehmen
                </FormulateInput>
                <FormulateInput
                  v-show="member.role !== 'coordinator'"
                  type="button"
                  @click="deleteApplication(member.user.id)"
                >
                  <span class="text-red-500">{{
                    member.role === 'applicant'
                      ? $t('page.application.reject_application')
                      : $t('page.application.delete_membership')
                  }}</span>
                </FormulateInput>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  PropType,
  computed,
} from '@nuxtjs/composition-api'
import { cloneDeep } from 'lodash'
import { RootState } from '~/store'
import { IProjectMembership } from '~/types/apiSchema'

export default defineComponent({
  name: 'MembersList',
  props: {
    memberships: {
      type: Array as PropType<IProjectMembership[]>,
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

      store.dispatch('projects/fetchProject', props.projectId)
    }
    const deleteApplication = (userId: string) => {
      const projectMemberShipId = `project=${props.projectId};user=${userId}`
      store.dispatch('projects/deleteProjectMemberShip', projectMemberShipId)
    }

    const applicants = computed(() => {
      const members = cloneDeep(props.memberships)
      return members.filter((el) => el.role === 'applicant')
    })

    const activeMembers = computed(() => {
      const members = cloneDeep(props.memberships)
      return members.filter((el) => el.role != 'applicant')
    })

    return {
      acceptApplication,
      deleteApplication,
      applicants,
      activeMembers,
    }
  },
})
</script>
