<template>
  <div class="flex flex-wrap items-center justify-between mb-10 gap-4">
    <h2
      class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center"
    >
      <i
        class="bx bxs-heart text-red-500 mr-2 text-2xl md:text-3xl"
        aria-hidden="true"
      ></i>
      <span>Twoje ulubione filmy</span>
    </h2>

    <div
      class="text-sm md:text-base text-gray-500 dark:text-gray-400"
      aria-live="polite"
    >
      <span>Łącznie filmów: </span>
      <span aria-label="Liczba ulubionych filmów">{{ favoritesCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  favoritesCount: number;
}>();
</script>
