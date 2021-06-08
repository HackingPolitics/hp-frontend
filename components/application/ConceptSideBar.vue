<template>
  <div class="py-12">
    <nav class="flex justify-center" aria-label="Progress">
      <ol class="space-y-8">
        <li v-for="(concept, index) in concepts" :key="index" class="mb-8">
          <nuxt-link
            :to="localePath({ name: concept.link, params: { id: projectId } })"
            class="
              border-l-4
              hover
              :border-purple-500
              pb-4
              flex
              w-52
              h-16
              text-gray-500
              hover:text-purple-500
            "
            :class="isActive(concept.link)"
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
  name: 'ConceptSideBar',
  setup() {
    const route = useRoute()
    const projectId = ref(route.value.params.id)
    const concepts = ref([
      { text: '1. Thema', link: 'antraege-id-thema' },
      { text: '2. Probleme und Handlungsfelder', link: 'antraege-id-problem' },
      {
        text: '3. Ratsmehrheiten und Fraktionsinteressen',
        link: 'antraege-id-interessen',
      },
      {
        text: '4. Argumente und Gegenargumente',
        link: 'antraege-id-argumente',
      },
      { text: '5. Strategie', link: 'antraege-id-strategie' },
    ])
    function isActive(name: string): object {
      return {
        'border-purple-500 text-purple-500': route.value.name === name,
      }
    }
    return { concepts, projectId, isActive }
  },
})
</script>
