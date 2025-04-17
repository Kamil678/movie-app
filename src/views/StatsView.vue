<template>
  <section>
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
      Twoje statystyki filmowe
    </h1>

    <div class="grid grid-cols-1 gap-6">
      <MovieStats />
    </div>
  </section>
</template>

<script setup lang="ts">
import MovieStats from "../components/stats/MovieStats.vue";
</script>
