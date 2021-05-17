<template>
  <div class="rounded-lg bg-white overflow-hidden shadow mb-16">
    <h2 id="profile-overview-title" class="sr-only">Profile Overview</h2>
    <div class="bg-white p-6">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="sm:flex sm:space-x-5">
          <div class="text-center sm:mt-0 sm:pt-1 sm:text-left">
            <h3 class="text-xl font-bold text-gray-900 sm:text-2xl pb-2">
              Expresslinie
            </h3>
            <div class="inline-flex items-center">
              <p class="text-sm font-medium text-gray-600">Dresden</p>
              <outline-location-marker-icon
                class="w-5 h-5 ml-1 mr-4"
              ></outline-location-marker-icon>
              <chip class="mr-2">Infrastruktur</chip>
              <chip>Mobilität</chip>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-center">
          <span class="pb-2 text-teal-500 text-center">
            {{ avatars.length }} Mitglieder</span
          >
          <avatar-group :avatars="avatars"> </avatar-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApplicationHeader',
  data() {
    return {
      avatars: [
        {
          imageUrl:
            'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixqx=XuwRpuUDYo&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
          imageUrl:
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
          imageUrl:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixqx=XuwRpuUDYo&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
        },
        {
          imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=XuwRpuUDYo&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      ],
    }
  },
}
</script>
