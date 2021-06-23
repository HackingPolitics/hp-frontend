<template>
  <div class="inline-flex justify-center items-baseline mt-8">
    <div class="flex items-center mr-4">
      <nuxt-link
        :to="localePath('/registrieren')"
        class="
          items-center
          px-4
          py-2
          w-32
          text-center
          border border-transparent
          text-base
          font-medium
          rounded-md
          text-white
          bg-purple-500
          hover:bg-purple-300
        "
        >{{ $t('register') }}</nuxt-link
      >
    </div>
    <div class="flex items-center">
      <nuxt-link
        :to="localePath('/login')"
        class="
          items-center
          px-4
          py-2
          w-32
          text-center
          border border-transparent
          text-base
          font-medium
          rounded-md
          text-white
          bg-purple-500
          hover:bg-purple-300
        "
      >
        {{ $t('login') }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginOrRegisterButtons',
}
</script>
