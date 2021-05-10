import { de } from '@braid/vue-formulate-i18n'

export default {
  plugins: [de],
  locale: 'de',
  classes: {
    outer: 'mb-4',
    input(context) {
      switch (context.classification) {
        case 'button':
          return 'w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-400 hover:bg-purple-500 focus:outline-none focus:border-purple-600 focus:shadow-outline-purple active:bg-purple-600 transition duration-150 ease-in-out'
        case 'input':
          return 'shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md w-full'
        case 'box':
          return
        default:
          return 'shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md w-full'
      }
    },
    label: 'block text-sm font-medium text-gray-700 mb-4',
    help: 'mt-2 text-sm text-gray-500',
    error: 'mt-2 text-sm text-red-600',
    wrapper: 'block',
    formError: 'text-sm text-red-600',
    formErrors: 'text-sm text-red-600',
  },
}
