<template>
  <div class="py-12 relative">
    <nav class="concept-sidebar sticky top-6" aria-label="sidebar-menu">
      <ol class="space-y-8">
        <li
          v-for="(concept, index) in concepts"
          :key="index"
          class="mb-8 inline flex"
        >
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
          <div
            v-for="(user, i) in onlineUsers"
            :key="i"
            class="text-gray-500 mt-4 inline-flex"
          >
            <div
              v-if="user.area === concept.area && user.name !== userName"
              class="mr-1"
            >
              <base-avatar tool-tip :user="user"></base-avatar>
            </div>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useRoute,
  useStore,
} from '@nuxtjs/composition-api'
import { AwarenessState } from '~/types/collaborations'
import { RootState } from '~/store'

export default defineComponent({
  name: 'ConceptSidebar',
  setup() {
    const route = useRoute()
    const store = useStore<RootState>()
    const projectId = ref<string>(route.value.params.id)

    const onlineUsers = computed(() => {
      return store.state.collaboration.awarenessStates.map(
        (state: AwarenessState) => state.user
      )
    })

    const userName = computed(() => {
      return store.state.auth.user?.username
    })

    return { projectId, onlineUsers, userName }
  },
  data() {
    return {
      concepts: [
        {
          text: `1. ${this.$t('forms.topic.formTitle')}`,
          link: 'antraege-id-thema',
          area: 'Thema',
        },
        {
          text: `2. ${this.$t('forms.problems.formTitle')}`,
          link: 'antraege-id-problem',
          area: 'Problem',
        },
        {
          text: `3. ${this.$t('forms.arguments.formTitle')}`,
          link: 'antraege-id-argumente',
          area: 'Argumente',
        },
        {
          text: `4. ${this.$t('forms.fractioninterests.formTitle')}`,
          link: 'antraege-id-fraktion-interessen',
          area: 'Fraktion',
        },
        {
          text: `5. ${this.$t('forms.strategy.formTitle')}`,
          link: 'antraege-id-strategie',
          area: 'Strategie',
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
