<template>
  <div class="relative pt-1">
    <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
      <div
        :style="{ width: progress + '%' }"
        class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
      ></div>
    </div>
    <div class="flex mb-2 items-center justify-between">
      <div>
        <span
          class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-500 bg-purple-200"
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
