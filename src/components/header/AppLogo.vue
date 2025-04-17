<template>
  <div>
    <RouterLink
      to="/"
      class="flex-shrink-0 flex items-center"
      aria-label="Strona główna MovieApp"
    >
      <i
        class="bx bx-movie-play text-2xl text-blue-600 dark:text-blue-400 mr-2"
        aria-hidden="true"
      ></i>
      <span class="font-bold text-gray-800 dark:text-gray-200 text-lg">
        MovieApp
      </span>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
