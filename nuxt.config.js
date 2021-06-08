export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'HackingPolitics Client',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/click-outside.js',
    '~/plugins/api.ts',
    // '~/plugins/notifications.js',
  ],

  env: {
    version: require('./package.json').version,
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
    '@braid/vue-formulate/nuxt',
    '@nuxt-hero-icons/solid/nuxt',
    '@nuxt-hero-icons/outline/nuxt',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/netlify-files',
    'nuxt-vite',
  ],

  vite: {
    optimizeDeps: {
      exclude: ['nuxt-i18n', 'vue-notification', 'plugins/notifications.js'],
    },
  },

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.js', dir: 'ltr' },
      { code: 'de', iso: 'de-US', file: 'de.js', dir: 'ltr' },
    ],
    defaultLocale: 'de',
    langDir: 'lang',
  },

  generate: {
    // choose to suit your project
    interval: 2000,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-socket-io',
    'nuxt-i18n',
  ],

  axios: {
    baseUrl: 'https://api-stage.hpo.vrok.de/',
  },

  io: {
    sockets: [
      {
        url: 'https://socket.hpo.vrok.de', // IO server lives here
      },
    ],
  },

  dateFns: {
    defaultLocale: 'de',
    locales: ['de'],
    format: 'dd.MM.yyyy',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
