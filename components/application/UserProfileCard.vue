_
<template>
  <li
    class="
      col-span-2
      flex
      sm:flex-col
      text-center
      bg-white
      rounded-lg
      shadow
      divide-y divide-gray-200
    "
  >
    <div class="flex-1 flex flex-col p-2 sm:p-8">
      <img
        v-if="user.image"
        class="
          w-16
          h-16
          sm:w-32 sm:h-32
          flex-shrink-0
          mx-auto
          bg-black
          rounded-full
        "
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=XuwRpuUDYo&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
        alt=""
      />
      <span
        v-else
        class="
          inline-block
          h-16
          w-16
          sm:w-32 sm:h-32
          rounded-full
          overflow-hidden
          mx-auto
          bg-gray-100
        "
      >
        <svg
          class="h-full w-full text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </span>
      <h3 class="mt-2 sm:mt-6 text-gray-900 text-sm font-medium">
        {{ $t('page.myproposals.heading') }}
      </h3>
      <dl class="mt-1 flex-grow flex flex-col justify-between">
        <dt class="sr-only">Title</dt>
        <dd
          v-if="user.firstname && user.lastname"
          class="text-gray-500 text-sm"
        >
          {{ user.firstname + ' ' + user.lastname }}
        </dd>
        <dd v-else class="text-gray-500 text-sm">
          {{ user.username }}
        </dd>
        <dt class="sr-only">Role</dt>
        <dd class="mt-3">
          <span
            class="
              px-2
              py-1
              text-green-800 text-xs
              font-medium
              bg-green-100
              rounded-full
            "
            >{{ $t('goto.userProfile') }}</span
          >
        </dd>
      </dl>
    </div>
    <div>
      <div class="-mt-px flex-col divide-y divide-gray-200">
        <div class="flex-1 flex">
          <span
            class="
              relative
              -mr-px
              w-0
              flex-1
              inline-flex
              items-center
              justify-center
              py-4
              text-sm text-gray-700
              font-medium
              border border-transparent
              rounded-bl-lg
              hover:text-gray-500
            "
          >
            <span class="font-bold mr-2">{{
              user.createdProjects && user.projectMemberships.length
                ? user.projectMemberships.length
                : 0
            }}</span>
            {{ $t('page.myproposals.proposals') }}
          </span>
        </div>
        <div class="-ml-px flex-1 flex">
          <span
            class="
              relative
              w-0
              flex-1
              inline-flex
              items-center
              justify-center
              py-4
              text-sm text-gray-400
              font-medium
              border border-transparent
              rounded-br-lg
              hover:text-gray-500
            "
          >
            {{ $t('page.myproposals.registeredSince') }}
            <!-- {{
                      user.createdAt
                        ? $dateFns.format(
                            parseISO(user.createdAt),
                            'dd.MM.yyyy',
                            {
                              locale: 'de',
                            }
                          )
                        : null
                    }} -->
            <!-- Heroicon name: solid/phone -->
          </span>
        </div>
        <div class="-ml-px flex-1 flex py-4 justify-center">
          <nuxt-link :to="localePath('/antraege/erstellen')">
            <chip chip-class="text-green-800"
              ><outline-plus-icon class="w-5 h-5" />
              {{ $t('goto.createProposal') }}</chip
            >
          </nuxt-link>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
})
</script>
