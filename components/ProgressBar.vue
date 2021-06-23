<template>
  <div class="relative flex space-x-4 items-center">
    <div class="overflow-hidden h-2 text-xs flex rounded bg-white w-32">
      <div
        :style="{ width: progress + '%' }"
        class="
          shadow-none
          flex flex-col
          text-center
          whitespace-nowrap
          text-white
          justify-center
          bg-purple-500
        "
      ></div>
    </div>
    <div class="flex items-center justify-between">
      <div>
        <span
          class="
            text-xs
            font-semibold
            inline-block
            py-1
            px-2
            uppercase
            rounded-full
            text-purple-500
            bg-white
          "
        >
          {{ `${progress}% Klarheit` }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    progress: {
      type: [Number, String],
      default: 0,
    },
  },
}
</script>
