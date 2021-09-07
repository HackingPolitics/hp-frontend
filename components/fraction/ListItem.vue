<template>
  <div v-if="fraction" class="flex items-center space-x-6">
    <base-toggle
      :value="fractionDetails ? fractionDetails.possiblePartner : false"
      @input="togglePartnerStatus"
    ></base-toggle>
    <div
      class="
        group
        hover:font-semibold hover:text-purple-500
        cursor-pointer
        flex
        space-x-6
        transition
        text-gray-500
      "
      @click="$emit('changeActive')"
    >
      <div
        class="
          rounded-full
          h-6
          w-6
          bg-gray-100
          flex
          justify-center
          items-center
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400"
          :class="isSelected ? 'text-gray-800' : 'text-gray-400'"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
      <div
        class="w-4 text-right"
        :class="isSelected ? 'font-semibold text-gray-800' : ''"
      >
        {{ fraction.memberCount }}
      </div>
      <div class="" :class="isSelected ? 'font-semibold text-gray-800' : ''">
        {{ fraction.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  useContext,
  useRoute,
  useStore,
} from '@nuxtjs/composition-api'
import { IFraction, IFractionDetails } from '~/types/apiSchema'
import { RootState } from '~/store'

export default defineComponent({
  name: 'FractionListItem',
  props: {
    fraction: {
      type: Object as PropType<IFraction | null>,
      default: null,
    },
    fractionDetails: {
      type: Object as PropType<IFractionDetails>,
      default: null,
    },
  },
  setup(props) {
    const isSelected = computed(() => {
      if (props.fractionDetails) {
        return props.fractionDetails.possiblePartner
      }
      return false
    })

    const store = useStore<RootState>()
    const route = useRoute()
    const context = useContext()

    const projectId = computed(() => {
      return store.state.projects.project?.['@id']
    })

    const createFractionDetail = async () => {
      if (
        typeof projectId.value !== 'undefined' &&
        projectId.value !== null &&
        props.fraction
      ) {
        try {
          // @ts-ignore
          return await context.$api.fractionDetails.createFractionDetails({
            project: projectId.value,
            fraction: props.fraction?.['@id'],
          })
        } catch (error) {}
      }
    }

    const togglePartnerStatus = async () => {
      if (props.fractionDetails?.possiblePartner) {
        try {
          // @ts-ignore
          await context.$api.fractionDetails.updateFractionDetails(
            props.fractionDetails.id,
            {
              possiblePartner: !props.fractionDetails.possiblePartner,
            }
          )
          await store.dispatch('projects/fetchProject', route.value.params.id)
        } catch (error) {}
      } else {
        try {
          // create fraction details
          const response = await createFractionDetail()
          // @ts-ignore
          await context.$api.fractionDetails.updateFractionDetails(
            response?.data.id,
            {
              possiblePartner: true,
            }
          )
          await store.dispatch('projects/fetchProject', route.value.params.id)
        } catch (error) {}
      }
    }
    return { isSelected, togglePartnerStatus }
  },
})
</script>
