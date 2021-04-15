<template>
  <!--
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')

  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          'light-blue': colors.lightBlue,
        }
      }
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
-->
  <div>
    <nav class="bg-yellow-400" aria-label="Global">
      <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center px-2 lg:px-0">
            <div class="flex-shrink-0 flex items-center">
              <logo></logo>
            </div>
            <div class="hidden lg:ml-8 lg:flex lg:space-x-4">
              <a
                href="#"
                class="rounded-md py-2 px-3 text-sm font-medium text-white hover:bg-yellow-400"
              >
                Übersicht
              </a>

              <a
                href="#"
                class="rounded-md py-2 px-3 text-sm font-medium text-white hover:bg-yellow-500"
              >
                FAQ
              </a>
            </div>
          </div>

          <div class="flex items-center lg:hidden">
            <!-- Mobile menu button -->
            <button
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="sr-only">Open menu</span>
              <!--
            Icon when menu is closed.

            Heroicon name: outline/menu

            Menu open: "hidden", Menu closed: "block"
          -->
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <!--
            Icon when menu is open.

            Heroicon name: outline/x

            Menu open: "block", Menu closed: "hidden"
          -->
              <svg
                class="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="hidden lg:ml-4 lg:flex lg:items-center">
            <!-- Profile dropdown -->
            <div class="ml-4 relative flex-shrink-0">
              <div>
                <button
                  id="user-menu-button"
                  type="button"
                  class="bg-light-blue-500 rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-blue-500 focus:ring-white"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixqx=XuwRpuUDYo&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>

              <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          -->
              <div
                v-if="false"
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <!-- Active: "bg-gray-100", Not Active: "" -->
                <a
                  id="user-menu-item-0"
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  >Your Profile</a
                >

                <a
                  id="user-menu-item-1"
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  >Settings</a
                >

                <a
                  id="user-menu-item-2"
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  >Sign out</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div v-if="false" id="mobile-menu" class="lg:hidden">
        <div class="pt-2 pb-3 px-2 space-y-1">
          <a
            href="#"
            class="block rounded-md py-2 px-3 text-base font-medium text-white hover:text-white hover:bg-light-blue-400"
            >Übersicht</a
          >

          <a
            href="#"
            class="block rounded-md py-2 px-3 text-base font-medium text-white hover:text-white hover:bg-light-blue-400"
            >Jobs</a
          >

          <a
            href="#"
            class="block rounded-md py-2 px-3 text-base font-medium text-white hover:text-white hover:bg-light-blue-400"
            >Applicants</a
          >

          <a
            href="#"
            class="block rounded-md py-2 px-3 text-base font-medium text-white hover:text-white hover:bg-light-blue-400"
            >FAQ</a
          >
        </div>
        <div class="pt-4 pb-3 border-t border-light-blue-500">
          <div class="flex items-center px-4">
            <div class="flex-shrink-0">
              <img
                class="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixqx=XuwRpuUDYo&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-white">Floyd Miles</div>
              <div class="text-sm font-medium text-light-blue-200">
                floydmiles@example.com
              </div>
            </div>
            <button
              class="ml-auto flex-shrink-0 bg-light-blue-500 rounded-full p-1 text-light-blue-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-blue-500 focus:ring-white"
            >
              <span class="sr-only">View notifications</span>
              <!-- Heroicon name: outline/bell -->
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>
          <div class="mt-3 px-2">
            <a
              href="#"
              class="block rounded-md py-2 px-3 text-base font-medium text-light-blue-200 hover:text-white hover:bg-light-blue-400"
              >Your Profile</a
            >

            <a
              href="#"
              class="block rounded-md py-2 px-3 text-base font-medium text-light-blue-200 hover:text-white hover:bg-light-blue-400"
              >Settings</a
            >

            <a
              href="#"
              class="block rounded-md py-2 px-3 text-base font-medium text-light-blue-200 hover:text-white hover:bg-light-blue-400"
              >Sign out</a
            >
          </div>
        </div>
      </div>
    </nav>

    <!-- Breadcrumb -->
    <nav
      class="hidden bg-white border-b border-gray-200 lg:flex"
      aria-label="Breadcrumb"
    >
      <ol
        class="max-w-screen-xl w-full mx-auto px-4 flex space-x-4 sm:px-6 lg:px-8"
      >
        <li class="flex">
          <div class="flex items-center">
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <!-- Heroicon name: solid/home -->
              <svg
                class="flex-shrink-0 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                />
              </svg>
              <span class="sr-only">Home</span>
            </a>
          </div>
        </li>

        <li class="flex">
          <div class="flex items-center">
            <svg
              class="flex-shrink-0 w-6 h-full text-gray-200"
              preserveAspectRatio="none"
              viewBox="0 0 24 44"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <a
              href="#"
              class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >Anträge</a
            >
          </div>
        </li>

        <li class="flex">
          <div class="flex items-center">
            <svg
              class="flex-shrink-0 w-6 h-full text-gray-200"
              preserveAspectRatio="none"
              viewBox="0 0 24 44"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <a
              href="#"
              class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              aria-current="page"
              >Projekt 1</a
            >
          </div>
        </li>
      </ol>
    </nav>

    <main class="max-w-lg mx-auto pt-10 pb-12 px-4 lg:pb-16">
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

          <div>
            <label
              for="project_name"
              class="block text-sm font-medium text-gray-700"
            >
              Project Name
            </label>
            <div class="mt-1">
              <input
                id="project_name"
                v-model="title"
                type="text"
                name="project_name"
                class="block w-full shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm border-gray-300 rounded-md"
                @blur="blurEvent"
                @click="clickEvent"
                @input="changeEvent"
              />
            </div>
          </div>

          <div>
            <label
              for="description"
              class="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <div class="mt-1">
              <textarea
                id="description"
                name="description"
                rows="3"
                class="block w-full shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm border-gray-300 rounded-md"
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
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CollaborationPage',
  setup() {
    const testSocket = ref({})
    const title = ref('Project Nero')
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
    console.log(socket)
    const lock = () => {
      console.log('clicked', socket.emit)
      socket.emit('joinGroup', 'test', (resp: any) => {
        console.log('hallo', resp)
        /* handle resp */
      })
    }

    socket.on('updateUsers', (data: any) => {
      console.log(data)
    })

    socket.on('updateDocument', (data: any) => {
      console.log(data)
    })

    const blurEvent = () => {
      console.log('blurred')
      socket.emit('unlockField', { fieldID: 'title', fieldValue: title.value })
    }

    const clickEvent = () => {
      socket.emit('lockField', { fieldID: 'title', fieldValue: title.value })
      console.log('clicked')
    }

    const changeEvent = () => {
      socket.emit('updateField', { fieldID: 'title', fieldValue: title.value })
      console.log('changed', title.value)
    }
    // socket.emit('lockField', 'password')
    return {
      lock,
      testSocket,
      title,
      blurEvent,
      clickEvent,
      changeEvent,
    }
  },
})
</script>
