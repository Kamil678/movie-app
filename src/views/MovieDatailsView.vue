<!-- MovieDetails.vue -->
<template>
  <section class="relative">
    <button
      class="text-blue-500 hover:text-blue-600 mb-6 flex items-center"
      @click="goBack"
      aria-label="Powrót do poprzedniej strony"
    >
      <i class="bx bx-left-arrow-alt mr-2 text-lg" aria-hidden="true"></i>Powrót
    </button>

    <LoadingSpinner v-if="store.loading" />

    <div
      v-else-if="store.error"
      class="text-center py-8 bg-red-100 text-red-800 rounded-lg shadow-md"
      role="alert"
    >
      {{ store.error }}
    </div>

    <article
      v-else-if="store.currentMovie"
      class="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <MovieBackdrop :backdropPath="store.currentMovie.backdropPath" />

      <div class="flex flex-col md:flex-row p-6">
        <MoviePoster
          :posterPath="store.currentMovie.posterPath"
          :title="store.currentMovie.title"
        />

        <MovieDetails
          :movie="store.currentMovie"
          :isFavorite="store.isFavorite(store.currentMovie.id)"
          @toggle-favorite="toggleFavorite"
        />
      </div>
    </article>

    <div v-else class="text-center py-8 bg-white rounded-lg shadow-md">
      Film nie został znaleziony.
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMoviesStore } from "../stores/movies";
import LoadingSpinner from "../components/common/LoadingSpinner.vue";
import MovieBackdrop from "../components/movieDetails/MovieBackdrop.vue";
import MoviePoster from "../components/movieDetails/MoviePoster.vue";
import MovieDetails from "../components/movieDetails/MovieDetails.vue";

const route = useRoute();
const router = useRouter();
const store = useMoviesStore();

// SEO meta tags
const pageTitle = computed(() =>
  store.currentMovie
    ? `${store.currentMovie.title} - Szczegóły filmu`
    : "Film nie znaleziony"
);

const pageDescription = computed(
  () => store.currentMovie?.overview || "Szczegóły filmu"
);

// Ustawienie metadanych dla SEO
onMounted(() => {
  if (document) {
    document.title = pageTitle.value;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", pageDescription.value);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = pageDescription.value;
      document.head.appendChild(meta);
    }
  }
});

onMounted(async () => {
  const movieId = Number(route.params.id);
  if (isNaN(movieId)) {
    router.push("/");
    return;
  }

  await store.fetchMovieDetails(movieId);
});

function goBack() {
  router.back();
}

function toggleFavorite() {
  if (store.currentMovie) {
    store.toggleFavorite({
      id: store.currentMovie.id,
      title: store.currentMovie.title,
      posterPath: store.currentMovie.posterPath,
      releaseDate: store.currentMovie.releaseDate,
      voteAverage: store.currentMovie.voteAverage,
    });
  }
}
</script>
