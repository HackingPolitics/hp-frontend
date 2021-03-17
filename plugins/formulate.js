import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'

Vue.use(VueFormulate, {
  classes: {
    outer: 'mb-4',
    input:
      'border border-gray-400 rounded px-3 py-2 leading-none focus:border-green-500 outline-none border-box w-full mb-1',
    label: 'font-medium text-sm',
    help: 'text-xs mb-1 text-gray-600',
    error: 'text-red-700 text-xs mb-1',
  },
})
