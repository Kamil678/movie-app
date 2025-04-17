<template>
  <div
    class="flex flex-col h-full bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
  >
    <!-- Movie Poster -->
    <div
      class="h-full overflow-hidden bg-slate-100 flex items-center justify-center"
    >
      <img
        v-if="movie.posterPath"
        :src="`https://image.tmdb.org/t/p/w500${movie.posterPath}`"
        :alt="`Plakat filmu ${movie.title}`"
        class="w-full transition-transform duration-300 hover:scale-105"
        loading="lazy"
      />
      <div v-else class="text-slate-400 text-sm">Brak plakatu</div>
    </div>

    <!-- Movie Info -->
    <div class="p-4 flex flex-col flex-grow">
      <h3 class="text-base font-semibold text-slate-800 truncate mb-1">
        {{ movie.title }}
      </h3>

      <div class="text-sm text-slate-500 flex justify-between mb-4">
        <span
          v-if="movie.releaseDate"
          :aria-label="`Rok wydania: ${new Date(
            movie.releaseDate
          ).getFullYear()}`"
        >
          {{ new Date(movie.releaseDate).getFullYear() }}
        </span>
        <span class="font-semibold text-amber-500" aria-label="Średnia ocena">
          ★ {{ movie.voteAverage?.toFixed(1) }}
        </span>
      </div>

      <div class="mt-auto flex items-center justify-between gap-2">
        <LinkBtn :link="`/movie/${movie.id}`" text="Szczegóły" />
        <button
          @click="handleFavoriteClick"
          :class="[
            'w-9 h-9 flex items-center justify-center rounded-lg transition text-xl',
            store.isFavorite(movie.id)
              ? 'text-red-500 hover:text-red-600'
              : 'text-slate-400 hover:text-slate-600',
          ]"
          :aria-pressed="store.isFavorite(movie.id)"
          :aria-label="
            store.isFavorite(movie.id)
              ? `Usuń ${movie.title} z ulubionych`
              : `Dodaj ${movie.title} do ulubionych`
          "
        >
          <i
            :class="
              store.isFavorite(movie.id)
                ? 'bx bxs-heart text-red-600'
                : 'bx bx-heart'
            "
            aria-hidden="true"
          ></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useMoviesStore } from "../../stores/movies";
import type { Movie } from "../../types/Movie";
import LinkBtn from "./LinkBtn.vue";

const props = defineProps<{
  movie: Movie;
}>();

const store = useMoviesStore();

function handleFavoriteClick() {
  store.toggleFavorite(props.movie);
}
</script>
