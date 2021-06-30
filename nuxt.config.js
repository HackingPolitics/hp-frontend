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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inria+Sans:wght@300;400&family=Roboto+Slab:wght@300;400;500&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/click-outside.js',
    '~/plugins/api.ts',
    '~/plugins/lodash.js',
    '~/plugins/vue-draggable.js',
    '~/plugins/notifications.js',
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
    '@nuxtjs/date-fns',
  ],

  vite: {
    optimizeDeps: {
      exclude: ['nuxt-i18n', '@nuxt/date-fns'],
      include: ['vue-notification', 'cookie'],
    },
  },

  i18n: {
    locales: [
      //   { code: 'en', iso: 'en-US', file: 'en.json', dir: 'ltr' },
      { code: 'de', iso: 'de-US', file: 'de.json', dir: 'ltr' },
    ],
    defaultLocale: 'de',
    langDir: '~/lang/',
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
    baseUrl: process.env.API_URL,
  },

  io: {
    sockets: [
      {
        url: process.env.WS_URL, // IO server lives here
      },
    ],
  },

  dateFns: {
    defaultLocale: 'deLocale',
    locales: ['deLocale'],
    format: 'dd.MM.yyyy',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
