<template>
  <div>
    <div class="relative bg-purple-800 pb-44 overflow-hidden">
      <!-- Menu open: "bg-light-blue-900", Menu closed: "bg-transparent" -->
      <main-nav></main-nav>
      <!-- Menu open: "bottom-0", Menu closed: "inset-y-0" -->
      <!--      <div
        class="inset-y-0 absolute flex justify-center inset-x-0 left-1/2 transform -translate-x-1/2 w-full overflow-hidden lg:inset-y-0"
        aria-hidden="true"
      >
        <div class="flex-grow bg-light-blue-900 bg-opacity-75"></div>
        <svg
          class="flex-shrink-0"
          width="1750"
          height="308"
          viewBox="0 0 1750 308"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity=".75"
            d="M1465.84 308L16.816 0H1750v308h-284.16z"
            fill="#075985"
          />
          <path
            opacity=".75"
            d="M1733.19 0L284.161 308H0V0h1733.19z"
            fill="#0c4a6e"
          />
        </svg>
        <div class="flex-grow bg-light-blue-800 bg-opacity-75"></div>
      </div>-->
    </div>

    <main class="relative -mt-44">
      <header class="relative py-10">
        <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-bold text-white">{{ title }}</h1>
        </div>
      </header>
      <div class="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'SingleView',
  props: {
    title: {
      type: String,
      default: null,
    },
  },
}
</script>
