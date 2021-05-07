<template>
  <div class="h-screen flex flex-col justify-between">
    <div class="relative bg-gray-50 overflow-hidden">
      <layouts-single-view title="Meine Anträge">
        <p class="text-purple-400 font-medium mb-2">Zuletzt besucht</p>
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
                </div>
              </div>
            </li>
          </ul>
          <div class="w-full grid grid-cols-4 gap-4">
            <div v-for="item in 4" :key="item" class="col-span-2">
              <ul>
                <li
                  class="flex flex-col bg-white rounded-lg shadow divide-y divide-gray-200"
                >
                  <nuxt-link class="flex-1 flex flex-col" to="/antraege/12">
                    <img
                      class="h-48 object-cover rounded-tl rounded-tr"
                      src="https://images.unsplash.com/photo-1527247043589-98e6ac08f56c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                      alt=""
                    />
                    <div class="px-4 pt-2 pb-4">
                      <div class="mt-4">
                        <p class="text-gray-500 text-sm">Mobilität</p>
                        <h3 class="text-gray-900 text-lg font-medium">
                          Expressbuslinien zwischen Pieschen und Weißig
                        </h3>
                      </div>
                    </div>
                    <div>
                      <div class="-mt-px flex justify-between">
                        <div class="flex-1 flex p-4">
                          <div
                            class="flex -space-x-2 relative z-0 overflow-hidden"
                          >
                            <img
                              class="relative z-30 inline-block h-8 w-8 rounded-full ring-2 ring-white"
                              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixqx=XuwRpuUDYo&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                            <img
                              class="relative z-20 inline-block h-8 w-8 rounded-full ring-2 ring-white"
                              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </div>
                        </div>
                        <div class="-ml-px flex-1 flex">
                          <span
                            class="relative w-0 flex-1 inline-flex items-center justify-end py-4 pr-4 text-sm text-gray-400 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                          >
                            gerstern,14 Uhr
                            <!-- Heroicon name: solid/phone -->
                          </span>
                        </div>
                      </div>
                    </div>
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </layouts-single-view>
    </div>
    <footer class="bg-white">
      <div
        class="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8"
      >
        <div class="flex justify-center space-x-6 md:order-2">
          <a
            target="_blank"
            href="https://github.com/HackingPolitics"
            class="text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">GitHub</span>
            <svg
              class="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
        <div class="mt-8 md:mt-0 md:order-1">
          <p class="text-center text-base text-gray-400">
            &copy; 2021 HackingPolitics Gbr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
