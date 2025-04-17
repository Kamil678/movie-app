<template>
  <section class="mb-16">
    <div
      class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0 justify-between mb-8"
    >
      <h2 class="text-2xl font-bold">{{ title }}</h2>
      <RouterLink
        :to="linkTo"
        class="text-blue-500 hover:text-blue-600 flex items-center"
      >
        Zobacz wszystkie
        <i class="bx bx-chevron-right text-xl"></i>
      </RouterLink>
    </div>
    <LoadingSpinner v-if="loading" />
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <MovieCardHome
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        :show-rating="showRatings"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import { type Movie } from "../../types/Movie";
import MovieCardHome from "../common/MovieCardHome.vue";
import LoadingSpinner from "../common/LoadingSpinner.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  linkTo: {
    type: String,
    required: true,
  },
  movies: {
    type: Array as () => Movie[],
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showRatings: {
    type: Boolean,
    default: true,
  },
});
</script>
