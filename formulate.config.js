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
        default:
          return 'mb-8 flex-1'
      }
    },
    input(context) {
      switch (context.classification) {
        case 'button':
          if (context.disableErrors) {
            return 'w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400'
          } else
            return 'w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-400 hover:bg-purple-500 focus:outline-none focus:border-purple-600 focus:shadow-outline-purple active:bg-purple-600 transition duration-150 ease-in-out'
        case 'input':
          return 'shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md w-full'
        case 'box':
          return
        case 'chip':
          return
        default:
          return 'focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md w-full'
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
          return 'block font-medium text-gray-700 mb-3 ' + validationClass
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
