<template>
  <div class="flex-grow">
    <MovieHeader
      :title="movie.title"
      :isFavorite="isFavorite"
      @toggle-favorite="$emit('toggle-favorite')"
    />

    <MovieMeta
      :releaseDate="movie.releaseDate"
      :runtime="movie.runtime"
      :voteAverage="movie.voteAverage"
    />

    <GenreList :genres="movie.genres" />

    <MovieOverview :overview="movie.overview" />

    <CastSection
      v-if="movie.cast && movie.cast.length > 0"
      :cast="movie.cast"
    />
  </div>
</template>

<script setup lang="ts">
import MovieHeader from "./MovieHeader.vue";
import MovieMeta from "./MovieMeta.vue";
import GenreList from "./GenreList.vue";
import MovieOverview from "./MovieOverview.vue";
import CastSection from "./CastSection.vue";
import type { MovieDetails } from "../../types/Movie";

defineProps<{
  movie: MovieDetails;
  isFavorite: boolean;
}>();

defineEmits<{
  (e: "toggle-favorite"): void;
}>();
</script>
