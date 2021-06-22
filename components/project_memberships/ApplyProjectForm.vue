<template>
  <FormulateForm v-model="formData" @submit="applyForProject()">
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
</template>

<script lang="ts">
import { defineComponent, useStore, ref } from '@nuxtjs/composition-api'
import { RootState } from '~/store'

export default defineComponent({
  name: 'ApplyProjectButton',
  props: {
    userIri: {
      type: String,
      default: null,
      required: true,
    },
    projectIri: {
      type: String,
      default: null,
      required: true,
    },
  },
  setup(props, context) {
    const formData = ref({})

    const store = useStore()

    const applyForProject = async () => {
      const payload = {
        ...formData.value,
        user: props.userIri,
        project: props.projectIri,
        role: 'applicant',
      }
      await store.dispatch('projects/applyForProject', payload).then(() => {
        context.emit('application-submitted')
      })
    }
    return {
      formData,
      applyForProject,
    }
  },
})
</script>
