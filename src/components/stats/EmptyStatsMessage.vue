<template>
  <div
    class="flex flex-col items-center py-10 text-gray-500 dark:text-gray-400 bg-slate-50 dark:bg-gray-700 rounded-lg"
  >
    <i
      class="bx bx-movie-play text-gray-400 dark:text-gray-500 text-6xl mb-4 mx-auto"
    ></i>
    <p class="text-lg mb-4">
      Dodaj filmy do ulubionych, aby zobaczyć statystyki
    </p>
    <LinkBtn link="/movies" text="Przeglądaj filmy" class="w-fit" />
  </div>
</template>

<script setup lang="ts">
import LinkBtn from "../common/LinkBtn.vue";
</script>
