<template>
  <div>
    <ul
      v-if="movies.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      aria-label="Lista filmów"
    >
      <li v-for="movie in movies" :key="movie.id" class="h-full">
        <MovieCard :movie="movie" class="h-full" />
      </li>
    </ul>

    <div v-else class="text-center py-12" role="status" aria-live="polite">
      <i
        class="bx bx-search text-6xl text-gray-300 dark:text-gray-600 mb-4"
        aria-hidden="true"
      ></i>
      <p class="text-xl text-gray-500 dark:text-gray-400">
        {{ emptyMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from "../../types/Movie";
import MovieCard from "../common/MovieCard.vue";

defineProps<{
  movies: Movie[];
  emptyMessage?: string;
}>();
</script>
