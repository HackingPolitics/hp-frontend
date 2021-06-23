<template>
  <div class="min-h-screen bg-white flex">
    <div class="flex-1 flex flex-col lg:flex-none">
      <div class="pt-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <logo colored></logo>
      </div>
      <div
        class="
          flex-1 flex flex-col
          justify-center
          py-12
          px-4
          sm:px-6
          lg:px-20
          xl:px-24
        "
      >
        <div class="mx-auto w-full max-w-sm lg:w-96">
          <nuxt></nuxt>
        </div>
      </div>
    </div>
    <div class="hidden lg:block relative w-0 flex-1">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1511044676171-fa1c680222c4?ixlib=rb-1.2.1&ixqx=XuwRpuUDYo&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt=""
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AuthLayout',
}
</script>
