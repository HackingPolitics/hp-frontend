<template>
  <div>
    <main-nav></main-nav>
    <breadcrumps-bar></breadcrumps-bar>
    <main class="max-w-lg mx-auto pt-10 pb-12 px-4 lg:pb-16">
      <div class="w-full flex justify-end">
        <div class="flex -space-x-1 overflow-hidden">
          <div
            v-for="user in users"
            :key="user.userID"
            class="flex items-center justify-center bg-blue-500 text-white text-xs font-semibold h-8 w-8 rounded-full ring-2 ring-white"
          >
            {{ user.name }}
          </div>
        </div>
      </div>
      <form @submit.prevent>
        <div class="space-y-6">
          <div>
            <h1 class="text-lg leading-6 font-medium text-gray-900">
              Project Settings
            </h1>
            <p class="mt-1 text-sm text-gray-500">
              Let’s get started by filling in the information below to create
              your new project.
            </p>
          </div>

          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-light-blue-500 hover:bg-light-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
            @click="lock"
          >
            Join Group
          </button>

          <div>
            <label
              for="project_name"
              class="block text-sm font-medium text-gray-700"
            >
              Projekttitel
            </label>

            <div class="mt-1">
              <input
                id="project_title"
                v-model="title"
                type="text"
                name="project_name"
                class="block w-full shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm border-gray-300 rounded-md"
                @blur="blurEvent('title', title)"
                @click="clickEvent('title', title)"
                @input="changeEvent('title', title)"
              />
            </div>
          </div>

          <div>
            <label
              for="description"
              class="block text-sm font-medium text-gray-700"
            >
              Projektbeschreibung
            </label>
            <div class="mt-1">
              <textarea
                id="project_description"
                v-model="description"
                name="description"
                rows="3"
                class="block w-full shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm border-gray-300 rounded-md"
                @blur="blurEvent('description', description)"
                @click="clickEvent('description', description)"
                @input="changeEvent('description', description)"
              ></textarea>
            </div>
          </div>

          <div class="space-y-2">
            <div class="space-y-1">
              <label
                for="add_team_members"
                class="block text-sm font-medium text-gray-700"
              >
                Add Team Members
              </label>
              <p id="add_team_members_helper" class="sr-only">
                Search by email address
              </p>
              <div class="flex">
                <div class="flex-grow">
                  <input
                    id="add_team_members"
                    type="text"
                    name="add_team_members"
                    class="block w-full shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Email address"
                    aria-describedby="add_team_members_helper"
                  />
                </div>
                <span class="ml-3">
                  <button
                    type="button"
                    class="bg-white inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                  >
                    <!-- Heroicon name: solid/plus -->
                    <svg
                      class="-ml-2 mr-1 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>Add</span>
                  </button>
                </span>
              </div>
            </div>

            <div class="border-b border-gray-200">
              <ul class="divide-y divide-gray-200">
                <li class="py-4 flex">
                  <img
                    class="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixqx=XuwRpuUDYo&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div class="ml-3 flex flex-col">
                    <span class="text-sm font-medium text-gray-900"
                      >Calvin Hawkins</span
                    >
                    <span class="text-sm text-gray-500"
                      >calvin.hawkins@example.com</span
                    >
                  </div>
                </li>

                <li class="py-4 flex">
                  <img
                    class="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixqx=XuwRpuUDYo&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div class="ml-3 flex flex-col">
                    <span class="text-sm font-medium text-gray-900"
                      >Bessie Richards</span
                    >
                    <span class="text-sm text-gray-500"
                      >bessie.richards@example.com</span
                    >
                  </div>
                </li>

                <li class="py-4 flex">
                  <img
                    class="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixqx=XuwRpuUDYo&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div class="ml-3 flex flex-col">
                    <span class="text-sm font-medium text-gray-900"
                      >Floyd Black</span
                    >
                    <span class="text-sm text-gray-500"
                      >floyd.black@example.com</span
                    >
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <fieldset>
            <legend class="text-sm font-medium text-gray-900">Privacy</legend>

            <div class="mt-1 bg-white rounded-md shadow-sm -space-y-px">
              <!-- Checked: "bg-light-blue-50 border-light-blue-200 z-10", Not Checked: "border-gray-200" -->
              <label
                class="border-gray-200 rounded-tl-md rounded-tr-md relative border p-4 flex cursor-pointer"
              >
                <input
                  type="radio"
                  name="privacy_setting"
                  value="Public access"
                  class="h-4 w-4 mt-0.5 cursor-pointer text-light-blue-600 border-gray-300 focus:ring-light-blue-500"
                  aria-labelledby="privacy-setting-0-label"
                  aria-describedby="privacy-setting-0-description"
                />
                <div class="ml-3 flex flex-col">
                  <!-- Checked: "text-light-blue-900", Not Checked: "text-gray-900" -->
                  <span
                    id="privacy-setting-0-label"
                    class="text-gray-900 block text-sm font-medium"
                  >
                    Public access
                  </span>
                  <!-- Checked: "text-light-blue-700", Not Checked: "text-gray-500" -->
                  <span
                    id="privacy-setting-0-description"
                    class="text-gray-500 block text-sm"
                  >
                    This project would be available to anyone who has the link
                  </span>
                </div>
              </label>

              <!-- Checked: "bg-light-blue-50 border-light-blue-200 z-10", Not Checked: "border-gray-200" -->
              <label
                class="border-gray-200 relative border p-4 flex cursor-pointer"
              >
                <input
                  type="radio"
                  name="privacy_setting"
                  value="Private to Project Members"
                  class="h-4 w-4 mt-0.5 cursor-pointer text-light-blue-600 border-gray-300 focus:ring-light-blue-500"
                  aria-labelledby="privacy-setting-1-label"
                  aria-describedby="privacy-setting-1-description"
                />
                <div class="ml-3 flex flex-col">
                  <!-- Checked: "text-light-blue-900", Not Checked: "text-gray-900" -->
                  <span
                    id="privacy-setting-1-label"
                    class="text-gray-900 block text-sm font-medium"
                  >
                    Private to Project Members
                  </span>
                  <!-- Checked: "text-light-blue-700", Not Checked: "text-gray-500" -->
                  <span
                    id="privacy-setting-1-description"
                    class="text-gray-500 block text-sm"
                  >
                    Only members of this project would be able to access
                  </span>
                </div>
              </label>

              <!-- Checked: "bg-light-blue-50 border-light-blue-200 z-10", Not Checked: "border-gray-200" -->
              <label
                class="border-gray-200 rounded-bl-md rounded-br-md relative border p-4 flex cursor-pointer"
              >
                <input
                  type="radio"
                  name="privacy_setting"
                  value="Private to you"
                  class="h-4 w-4 mt-0.5 cursor-pointer text-light-blue-600 border-gray-300 focus:ring-light-blue-500"
                  aria-labelledby="privacy-setting-2-label"
                  aria-describedby="privacy-setting-2-description"
                />
                <div class="ml-3 flex flex-col">
                  <!-- Checked: "text-light-blue-900", Not Checked: "text-gray-900" -->
                  <span
                    id="privacy-setting-2-label"
                    class="text-gray-900 block text-sm font-medium"
                  >
                    Private to you
                  </span>
                  <!-- Checked: "text-light-blue-700", Not Checked: "text-gray-500" -->
                  <span
                    id="privacy-setting-2-description"
                    class="text-gray-500 block text-sm"
                  >
                    You are the only one able to access this project
                  </span>
                </div>
              </label>
            </div>
          </fieldset>

          <div>
            <label for="tags" class="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <input
              id="tags"
              type="text"
              name="tags"
              class="mt-1 block w-full shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div class="flex justify-end">
            <button
              type="button"
              class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-light-blue-500 hover:bg-light-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
              @click="lock"
            >
              Create this project
            </button>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  onUnmounted,
  ref,
  Ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CollaborationPage2',
  setup() {
    const testSocket = ref({})

    const title = ref('Project Nero')
    const description = ref('Project Nero')
    // Here, we want Nuxt context instead.
    const ctx: any = useContext()
    console.log(ctx)
    // Setup context:
    // For example, nuxt-socket-io has a built-in
    // teardown feature which will need the onUnmounted hook
    ctx.onUnmounted = onUnmounted

    // And finally, we can get the socket like before:
    // (instead of "this", it's "ctx" because that's the
    // context here)
    const socket = ctx.$nuxtSocket({
      reconnection: false,
      auth: {
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MTU3OTgxMzEsImV4cCI6MTY0NzMzNDEzMSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIm5hbWUiOiJKUyIsInVzZXJJRCI6IjEiLCJncm91cElEIjoiMSJ9.qmaJLpHXWTZae24T781IJBYjjLcYfF-hXmlH7Qx_JVM',
      },
    })

    const lock = () => {
      socket.emit('joinGroup', 'test')
    }

    socket.emit('joinGroup', 'test')

    const users = ref([])
    socket.on('updateUsers', (data: any) => {
      users.value = data
    })

    const lockedFields = ref([])
    socket.on('updateDocument', (data: any) => {
      const fields = Object.keys(data)
      const lockedFieldsArray = fields.map((element: any) => {
        if (data[element].lockedByUserID) {
          return data[element]
        }
        return null
      })
      console.log(data)
      console.log(lockedFieldsArray)
      console.log(fields)
      // title.value = data.title.fieldValue
    })

    const blurEvent = (field: string, ref: Ref) => {
      socket.emit('unlockField', { fieldID: field, fieldValue: ref })
    }

    const clickEvent = (field: string, ref: Ref) => {
      socket.emit('lockField', { fieldID: field, fieldValue: ref })
    }

    const changeEvent = (field: string, ref: Ref) => {
      socket.emit('updateField', { fieldID: field, fieldValue: ref })
    }

    onUnmounted(() => {
      socket.emit('leaveGroup', 'test')
    })

    return {
      lock,
      testSocket,
      title,
      blurEvent,
      clickEvent,
      changeEvent,
      users,
      lockedFields,
      description,
    }
  },
})
</script>
