<template>
  <div v-if="membershipRole === 'coordinator'">
    <transition
      enter-active-class="transition-opacity duration-100 opacity-0"
      leave-active-class="transition-opacity duration-100 opacity-0"
      mode="out-in"
    >
      <FormulateInput
        v-if="projectState === 'private'"
        key="publish"
        type="button"
        wrapper-class="w-64"
        @click="$emit('publish')"
        @mouseover="privateStateText = $t('page.application.publishing')"
        @mouseleave="privateStateText = $t('page.application.not_published')"
      >
        <span>{{
          privateStateText
            ? privateStateText
            : $t('page.application.not_published')
        }}</span>
      </FormulateInput>
      <FormulateInput
        v-if="projectState === 'public'"
        key="hide"
        type="button"
        wrapper-class="w-64"
        @click="$emit('hide')"
        @mouseover="publicStateText = $t('page.application.hide')"
        @mouseleave="publicStateText = $t('page.application.publish')"
      >
        <span>{{
          publicStateText ? publicStateText : $t('page.application.publish')
        }}</span>
      </FormulateInput>
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PublishProjectButton',
  props: {
    membershipRole: {
      type: String,
      default: '',
    },
    projectState: {
      type: String,
      default: '',
    },
  },
  setup() {
    const privateStateText = ref < String > ''
    const publicStateText = ref < String > ''

    return { privateStateText, publicStateText }
  },
})
</script>
