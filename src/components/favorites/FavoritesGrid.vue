<template>
  <div aria-labelledby="favorites-heading">
    <h2 id="favorites-heading" class="sr-only">Filmy ulubione</h2>

    <div class="mb-8">
      <FavoritesFilters
        v-model:sortBy="sortBy"
        v-model:filterQuery="filterQuery"
      />
    </div>

    <p
      v-if="filteredAndSortedFavorites.length === 0"
      class="text-center py-8 text-gray-500 dark:text-gray-400"
      role="status"
    >
      Nie znaleziono filmów pasujących do wyszukiwania "{{ filterQuery }}"
    </p>

    <ul
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
      aria-label="Lista ulubionych filmów"
    >
      <li v-for="movie in filteredAndSortedFavorites" :key="movie.id">
        <MovieCard :movie="movie" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import MovieCard from "../common/MovieCard.vue";
import FavoritesFilters from "./FavoritesFilters.vue";
import type { Movie } from "../../types/Movie";

const props = defineProps<{
  favorites: Array<Movie>;
}>();

const filterQuery = ref("");
const sortBy = ref("title_asc");

const filteredAndSortedFavorites = computed(() => {
  let result = [...props.favorites];

  if (filterQuery.value) {
    const query = filterQuery.value.toLowerCase();
    result = result.filter((movie) =>
      movie.title.toLowerCase().includes(query)
    );
  }

  switch (sortBy.value) {
    case "title_asc":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;

    case "title_desc":
      result.sort((a, b) => b.title.localeCompare(a.title));
      break;

    case "year_desc":
      result.sort((a, b) => {
        const yearA = new Date(a.releaseDate).getFullYear();
        const yearB = new Date(b.releaseDate).getFullYear();
        return yearB - yearA;
      });
      break;

    case "year_asc":
      result.sort((a, b) => {
        const yearA = new Date(a.releaseDate).getFullYear();
        const yearB = new Date(b.releaseDate).getFullYear();
        return yearA - yearB;
      });
      break;

    case "rating_desc":
      result.sort((a, b) => b.voteAverage - a.voteAverage);
      break;

    case "rating_asc":
      result.sort((a, b) => a.voteAverage - b.voteAverage);
      break;

    default:
      break;
  }

  return result;
});
</script>
