<template>
  <layouts-single-view title="Meine Anträge">
    <p class="text-white font-medium mb-2">Zuletzt besucht</p>
    <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <application-card
        title="Strategie"
        subtitle="Expressbuslinien zwischen Pieschen und Weißig"
        item-id="erster"
      />
      <application-card
        title="Argumente und Gegenargumente"
        subtitle="Expressbuslinien zwischen Pieschen und Weißig"
      />
      <application-card title="Strategie" subtitle="Dresden" />
    </ul>

    <div class="flex mt-4">
      <ul class="grid grid-cols-2 gap-3 w-1/3 mr-8 h-64">
        <li
          class="col-span-2 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
        >
          <div class="flex-1 flex flex-col p-8">
            <img
              class="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=XuwRpuUDYo&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
              alt=""
            />
            <h3 class="mt-6 text-gray-900 text-sm font-medium">
              Willkommen Zurück
            </h3>
            <dl class="mt-1 flex-grow flex flex-col justify-between">
              <dt class="sr-only">Title</dt>
              <dd class="text-gray-500 text-sm">Lisa Reiser</dd>
              <dt class="sr-only">Role</dt>
              <dd class="mt-3">
                <span
                  class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full"
                  >Profil bearbeiten</span
                >
              </dd>
            </dl>
          </div>
          <div>
            <div class="-mt-px flex-col divide-y divide-gray-200">
              <div class="flex-1 flex">
                <span
                  class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                >
                  <span class="font-bold mr-2">3</span> Anträge
                </span>
              </div>
              <div class="-ml-px flex-1 flex">
                <span
                  class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-400 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                >
                  registriert seit 26.04.2021
                  <!-- Heroicon name: solid/phone -->
                </span>
              </div>
              <div class="-ml-px flex-1 flex py-4 justify-center">
                <nuxt-link to="antraege/erstellen">
                  <chip chip-class="text-green-800"
                    ><outline-plus-icon class="w-5 h-5" /> Antrag
                    hinzufügen</chip
                  >
                </nuxt-link>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="w-full grid grid-cols-4 gap-4">
        <div
          v-for="(item, index) in sampleApplication"
          :key="index"
          class="col-span-2"
        >
          <ul>
            <li
              class="flex flex-col bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <div class="flex-1 flex flex-col">
                <nuxt-link class="flex-1 flex flex-col" to="/antraege/12">
                  <img
                    class="h-48 object-cover rounded-tl rounded-tr"
                    :src="item.imageUrl"
                    alt=""
                  />
                  <div class="px-4 pt-2 pb-4">
                    <div class="mt-4">
                      <chip
                        v-for="(category, categoryIndex) in item.categories"
                        :key="categoryIndex"
                        class="mr-2"
                        >{{ category }}</chip
                      >
                      <h3 class="text-gray-900 text-lg mt-4 font-medium">
                        {{ item.title }}
                      </h3>
                    </div>
                  </div>
                  <div>
                    <div class="-mt-px flex justify-between">
                      <div class="flex-1 flex p-4">
                        <avatar-group
                          :avatars="item.participants"
                        ></avatar-group>
                      </div>
                      <div class="-ml-px flex-1 flex">
                        <span
                          class="relative w-0 flex-1 inline-flex items-center justify-end py-4 pr-4 text-sm text-gray-400 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                        >
                          gestern, 14:56 Uhr
                          <!-- Heroicon name: solid/phone -->
                        </span>
                      </div>
                    </div>
                  </div>
                </nuxt-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </layouts-single-view>
</template>

<script lang="ts">
export default {
  data() {
    return {
      sampleApplication: [
        {
          title: 'Expressbuslinien zwischen Pieschen und Weißig',
          imageUrl:
            'https://images.unsplash.com/photo-1527247043589-98e6ac08f56c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          categories: ['Mobilität', 'Infrastruktur'],
          participants: [
            { name: 'Torsten' },
            { name: 'Gunther' },
            { name: 'Anna' },
          ],
        },
        {
          title: 'Goldene Hausnummer',
          imageUrl:
            'https://images.unsplash.com/photo-1494949649109-ecfc3b8c35df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80',
          categories: ['Bildung'],
          participants: [{ name: 'Torsten' }, { name: 'Anna' }],
        },
        {
          title: 'Mekong säubern',
          imageUrl:
            'https://images.unsplash.com/photo-1601991132561-2f3443b31fb6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80',
          categories: ['Umwelt', 'Mobilität', 'Kunst'],
          participants: [{ name: 'Frederika' }, { name: 'Anna' }],
        },
      ],
    }
  },
}
</script>
