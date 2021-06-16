import { de } from '@braid/vue-formulate-i18n'
import GroupRemoveButton from '~/components/GroupRemoveButton'
import ChipGroup from '~/components/ChipGroup'

export default {
  plugins: [de],
  locale: 'de',
  classes: {
    outer(context) {
      switch (context.classification) {
        case 'box':
          return 'mb-4'
        case 'file':
          return ''
        case 'text':
          return 'mb-8 flex-1'
        case 'textarea':
          return 'mb-8 flex-1'
        case 'group':
          return 'w-full'
        default:
          return ''
      }
    },
    input(context) {
      switch (context.classification) {
        case 'text':
          return 'shadow-sm focus:ring-purple-500 focus:border-purple-500 block sm:text-sm border-gray-300 rounded-md w-full'
        case 'select':
          return 'shadow-sm focus:ring-purple-500 focus:border-purple-500 block sm:text-sm border-gray-300 rounded-md w-full'
        case 'box':
          return 'h-4 w-4 cursor-pointer text-purple-600 border-gray-300 focus:ring-purple-500'
        case 'textarea':
          return 'shadow-sm w-full focus:ring-purple-500 focus:border-purple-500 sm:text-sm border-gray-300 rounded-md'
      }

      switch (context.type) {
        case 'submit':
          return "mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-purple-500 border-gray-400 hover:border-purple-600 hover:text-600 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple active:border-purple-700 transition duration-150 ease-in-out'"
        case 'button':
          return 'mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-purple-500 border-gray-400 hover:border-purple-600 hover:text-600 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple active:border-purple-700 transition duration-150 ease-in-out'
      }
    },
    wrapper(context) {
      switch (context.classification) {
        case 'box':
          return 'inline-flex items-baseline'
        default:
          return 'block'
      }
    },
    label(context) {
      let validationClass = ''
      if (context?.validation && typeof context.validation === 'string') {
        switch (true) {
          case context.validation.includes('required'):
            validationClass = 'required'
            break
        }
      }
      switch (context.classification) {
        case 'box':
          return (
            'block text-sm font-medium text-gray-900 ml-2 ' + validationClass
          )
        default:
          return 'block font-medium text-gray-700 ' + validationClass
      }
    },
    help: 'mt-2 text-sm text-gray-500',
    error: 'mt-2 text-sm text-red-600',
    formError: 'text-sm text-red-600',
    formErrors: 'text-sm text-red-600',
    groupRepeatable: 'flex items-center',
    groupRepeatableRemove: 'ml-2',
  },
  slotComponents: {
    remove: 'GroupRemoveButton',
  },
  library: {
    chipGroup: {
      classification: 'chip',
      component: 'ChipGroup',
    },
  },
}
