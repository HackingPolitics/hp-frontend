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
        href: 'https://fonts.googleapis.com/css2?family=Inria+Sans:wght@300;400&family=Roboto+Slab:wght@300;400;500;600&display=swap',
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
    // @todo Philipp: Warum ist das nicht in den Vue Componentes als process.env.WS_URL verfügbar?
    // mit der publicRuntimeConfig bekomm ich's zumindest in this.$conf
    WS_URL: process.env.WS_URL,
  },
  publicRuntimeConfig: {
    WS_URL: process.env.WS_URL,
    API_URL: process.env.API_URL,
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
    '@nuxtjs/axios',
    'nuxt-i18n',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxt/content',
  ],

  axios: {
    baseUrl: process.env.API_URL,
  },

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'token',
          maxAge: 300, // nuxt-auth-auto-refresh ignores this and refreshes at 75% TTL
          global: true,
          type: 'Bearer',
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30,
        },
        user: false,
        endpoints: {
          login: { url: '/authentication_token', method: 'post' },
          refresh: { url: '/refresh_token', method: 'post' },
          user: false,
          logout: false,
        },
        // autoLogout: false
      },
    },
    plugins: [
      // without this nuxt/auth would only refresh on (axios) requests which would lead to
      // disconnects from the WS server, who needs a valid token too
      { src: 'node_modules/nuxt-auth-auto-refresh/dist/index.js', ssr: false },
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
