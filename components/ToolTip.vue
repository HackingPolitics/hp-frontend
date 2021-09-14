<template>
  <div
    class="tooltip-box"
    @mouseover="toggleToolTip(true)"
    @mouseleave="toggleToolTip(false)"
  >
    <slot></slot>
    <div
      v-if="active && toolTipOn"
      class="tooltip bg-purple-500 text-white p-2"
    >
      {{ toolTipText }}
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'ToolTip',
  props: {
    toolTipText: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const toolTipOn = ref(false)

    const toggleToolTip = (val) => {
      toolTipOn.value = val
    }

    return {
      toggleToolTip,
      toolTipOn,
    }
  },
})
</script>

<style scoped>
.tooltip {
  min-width: 8rem;
  text-align: center;
  top: calc(100% + 11px);
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
}
.tooltip-box {
  position: relative;
}
</style>
