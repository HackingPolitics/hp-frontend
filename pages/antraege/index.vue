<template>
  <layouts-single-view title="Meine Anträge">
    <p class="text-white font-medium mb-2">Zuletzt besucht</p>
    <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <application-card>
        <template content="">
          <div class="flex items-center space-x-3">
            <h3 class="text-gray-900 text-sm font-medium truncate">
              'Strategie'
            </h3>
          </div>
          <p class="mt-1 text-gray-500 text-sm truncate">'Dresden'</p>
        </template>
      </application-card>
      <application-card>
        <template>
          <div class="flex items-center space-x-3">
            <h3 class="text-gray-900 text-sm font-medium truncate">
              'Argumente und Gegenargumente'
            </h3>
          </div>
          <p class="mt-1 text-gray-500 text-sm truncate">'Dresden'</p>
        </template>
      </application-card>
      <application-card>
        <template>
          <div class="flex items-center space-x-3">
            <h3 class="text-gray-900 text-sm font-medium truncate">
              'Strategie'
            </h3>
          </div>
          <p class="mt-1 text-gray-500 text-sm truncate">'Dresden'</p>
        </template>
      </application-card>
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
        <div class="col-span-2" v-for="item in 4">
          <ul>
            <li
              class="flex flex-col bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <div class="flex-1 flex flex-col">
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
                      <div class="flex -space-x-2 relative z-0 overflow-hidden">
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
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </layouts-single-view>
</template>

<script>
export default {
  name: 'MeineAntraegePage',
}
</script>
