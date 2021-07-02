<template>
  <div class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
    <section aria-labelledby="payment_details_heading">
      <form action="#" method="POST">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="bg-white py-6 px-4 sm:p-6">
            <div>
              <h2
                id="payment_details_heading"
                class="text-lg leading-6 font-medium text-gray-900"
              >
                Plattformeinstellungen
              </h2>
              <p class="mt-1 text-sm text-gray-500">
                Update your billing information. Please note that updating your
                location could affect your tax rates.
              </p>
            </div>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',
  setup() {
    return {}
  },
})
</script>
