<template>
  <FormulateForm
    v-if="!authRequestIsActive"
    v-model="formData"
    @submit="applyForProject()"
  >
    <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
      {{
        `${$t('forms.project_memberships.title')}:  ${project && project.title}`
      }}
    </h3>
    <FormulateInput
      type="textarea"
      name="motivation"
      rows="3"
      :label="$t('forms.project_memberships.motivation')"
      :placeholder="$t('forms.project_memberships.placeholder.motivation')"
      validation="required"
    />
    <FormulateInput
      type="textarea"
      name="skills"
      rows="3"
      :label="$t('forms.project_memberships.skills')"
      :placeholder="$t('forms.project_memberships.placeholder.skills')"
      validation="required"
    />
    <div class="pt-2">
      <FormulateInput type="submit">{{
        $t('forms.project_memberships.send_apply')
      }}</FormulateInput>
      <FormulateInput type="button" @click="$emit('cancel')">{{
        $t('back')
      }}</FormulateInput>
    </div>
  </FormulateForm>
  <div v-else-if="authRequestIsActive">
    <div
      class="
        mx-auto
        flex
        items-center
        justify-center
        h-12
        w-12
        rounded-full
        bg-green-100
      "
    >
      <!-- Heroicon name: outline/check -->
      <svg
        class="h-6 w-6 text-green-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
    <div class="mt-3 text-center sm:mt-5">
      <h3 id="modal-title" class="text-lg leading-6 font-medium text-gray-900">
        Fast geschafft!
      </h3>
      <div class="mt-2">
        <p class="text-sm text-gray-500">
          Bitte logge dich ein oder registriere dich, damit deine Bewerbung
          abgeschlossen ist.
        </p>
      </div>
      <forms-login-or-register-buttons />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore, ref } from '@nuxtjs/composition-api'
import { RootState } from '~/store'

export default defineComponent({
  name: 'ApplyProjectButton',
  props: {
    project: {
      type: Object,
      default: null,
      required: true,
    },
    user: {
      type: Object,
      default: null,
      required: true,
    },
  },
  setup(props, context) {
    const formData = ref({})

    const store = useStore<RootState>()
    const authRequestIsActive = ref<Boolean>(false)

    const applyForProject = async () => {
      const payload = {
        ...formData.value,
        project: props.project['@id'],
        role: 'applicant',
      }
      if (props.user) {
        payload.user = props.user && props.user['@id']
        await store.dispatch('projects/applyForProject', payload).then(() => {
          context.emit('application-submitted')
        })
      } else {
        store.commit('projects/SET_CREATED_PROJECT_MEMBERSHIP', payload)
        authRequestIsActive.value = true
      }
    }
    return {
      formData,
      applyForProject,
      authRequestIsActive,
    }
  },
})
</script>
