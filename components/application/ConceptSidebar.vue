<template>
  <div class="py-12">
    <nav class="concept-sidebar" aria-label="sidebar-menu">
      <ol class="space-y-8">
        <li v-for="(concept, index) in concepts" :key="index" class="mb-8">
          <nuxt-link
            :to="localePath({ name: concept.link, params: { id: projectId } })"
            class="
              border-l-4 border-gray-400
              hover
              :border-purple-500
              pb-4
              flex
              w-52
              h-16
              text-gray-500
              hover:text-purple-500
            "
          >
            <span class="ml-3 font-medium group-hover:text-gray-900">{{
              concept.text
            }}</span>
          </nuxt-link>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ConceptSidebar',
  setup() {
    const route = useRoute()
    const projectId = ref<string>(route.value.params.id)

    return { projectId }
  },
  data() {
    return {
      concepts: [
        {
          text: `1. ${this.$t('forms.topic.formTitle')}`,
          link: 'antraege-id-thema',
        },
        {
          text: `2. ${this.$t('forms.problems.formTitle')}`,
          link: 'antraege-id-problem',
        },
        {
          text: `3. ${this.$t('forms.arguments.formTitle')}`,
          link: 'antraege-id-argumente',
        },
        {
          text: `4. ${this.$t('forms.fractioninterests.formTitle')}`,
          link: 'antraege-id-fraktion-interessen',
        },
        {
          text: `5. ${this.$t('forms.strategy.formTitle')}`,
          link: 'antraege-id-strategie',
        },
      ],
    }
  },
})
</script>

<style lang="postcss">
.concept-sidebar .nuxt-link-exact-active {
  @apply border-purple-500 text-purple-500;
}
</style>
