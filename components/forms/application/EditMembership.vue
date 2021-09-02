<template>
  <FormulateForm v-model="formData" @submit="saveMembership()">
    <div class="py-5 space-y-4">
      <div>
        <h3 class="leading-6 font-medium text-gray-900">Nutzername</h3>
        <p>
          {{ membership.user.username }}
        </p>
      </div>
      <FormulateInput
        type="select"
        :options="membershipRoles"
        :value="membership.role"
        name="role"
        label="Rolle"
      >
        <template #label>
          <h3 class="leading-6 font-medium text-gray-900">Rolle</h3>
        </template>
      </FormulateInput>
      <div>
        <h3 class="leading-6 font-medium text-gray-900">Mietglied löschen</h3>
        <div class="mt-2 max-w-xl text-sm text-gray-500">
          <p>
            Nach der Löschung, musst das Mitglied sich bei dem Projekt
            neubewerben
          </p>
        </div>
        <div class="mt-2">
          <base-button
            type="button"
            class="
              inline-flex
              items-center
              justify-center
              border border-transparent
              font-medium
              rounded-md
              text-red-700
              bg-red-100
              hover:bg-red-200
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-red-500
              sm:text-sm
            "
            @click="deleteMembership()"
          >
            Mitglied löschen
          </base-button>
        </div>
      </div>
      <div class="flex mt-6 space-x-2 justify-end">
        <FormulateInput type="button" @click="$emit('close')"
          ><span class="text-gray-600"> Zurück </span>
        </FormulateInput>
        <FormulateInput type="submit"> Speichern </FormulateInput>
      </div>
    </div>
  </FormulateForm>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  useStore,
} from '@nuxtjs/composition-api'
import { MemberShipsRoles } from '~/types/apiSchema'

export default defineComponent({
  name: 'EditMembership',
  props: {
    membership: {
      type: Object,
      default: null,
    },
    projectId: {
      type: [Number, String],
      default: null,
    },
  },
  setup(props, context) {
    const instanceContext = useContext()
    const store = useStore()

    const formData = ref({})

    const membershipRoles = ref(
      Object.values(MemberShipsRoles).map((role) => {
        return {
          value: role,
          label: instanceContext.i18n.t(`common.roles.${role}`),
        }
      })
    )

    const deleteMembership = () => {
      const projectMemberShipId = `project=${props.projectId};user=${props.membership.user.id}`
      store.dispatch('projects/deleteProjectMemberShip', projectMemberShipId)
      store.dispatch('projects/fetchProject', props.projectId)
      context.emit('close')
    }

    const saveMembership = () => {
      const payload = formData.value
      const projectMemberShipId = `project=${props.projectId};user=${props.membership.user.id}`
      store.dispatch('projects/updateProjectMemberShip', [
        projectMemberShipId,
        payload,
      ])

      store.dispatch('projects/fetchProject', props.projectId)
    }

    return {
      membershipRoles,
      deleteMembership,
      saveMembership,
      formData,
    }
  },
})
</script>
