<template>
  <div
    class="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition duration-300 shadow"
  >
    <RouterLink
      :to="`/movie/${movie.id}`"
      class="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
      :aria-label="`Szczegóły filmu ${movie.title}`"
    >
      <div class="aspect-[2/3] bg-gray-700 relative">
        <img
          v-if="movie.posterPath"
          :src="movie.posterPath"
          :alt="`Plakat filmu ${movie.title}`"
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <div v-else class="w-full h-full flex items-center justify-center">
          <span class="text-gray-400">Brak plakatu</span>
        </div>
        <div
          v-if="showRating"
          class="absolute top-2 right-2 bg-yellow-500 text-gray-900 rounded-full w-10 h-10 flex items-center justify-center font-bold"
          :aria-label="`Ocena filmu: ${movie.voteAverage.toFixed(1)}`"
        >
          {{ movie.voteAverage.toFixed(1) }}
        </div>
        <button
          @click.prevent="store.toggleFavorite(movie)"
          :aria-pressed="store.isFavorite(movie.id)"
          :aria-label="
            store.isFavorite(movie.id)
              ? `Usuń ${movie.title} z ulubionych`
              : `Dodaj ${movie.title} do ulubionych`
          "
          class="w-10 h-10 absolute top-2 left-2 flex items-center justify-center bg-gray-800/80 p-2 rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          :class="
            store.isFavorite(movie.id)
              ? 'text-red-600 hover:bg-gray-700'
              : 'text-gray-400 hover:text-red-600 hover:bg-gray-700'
          "
        >
          <i
            :class="
              store.isFavorite(movie.id)
                ? 'bx bxs-heart text-lg'
                : 'bx bx-heart text-lg'
            "
            aria-hidden="true"
          ></i>
        </button>

        <slot name="overlay"></slot>
      </div>
      <div class="p-4">
        <h3 class="font-bold text-lg truncate">{{ movie.title }}</h3>
        <p class="text-sm text-gray-400">
          {{
            movie.releaseDate
              ? new Date(movie.releaseDate).getFullYear()
              : "Brak daty"
          }}
        </p>
        <slot name="content"></slot>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useMoviesStore } from "../../stores/movies";
import type { Movie } from "../../types/Movie";

const store = useMoviesStore();

defineProps<{
  movie: Movie;
  showRating?: boolean;
}>();
</script>
