<template>
  <div class="w-full">
    <div
      class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0 justify-between mb-8"
    >
      <h2 class="text-2xl font-bold">Polecane filmy</h2>
      <RouterLink
        to="/movies"
        class="text-blue-500 hover:text-blue-600 flex items-center"
      >
        Zobacz wszystkie
        <i class="bx bx-chevron-right text-xl"></i>
      </RouterLink>
    </div>

    <div ref="carouselContainer" class="movie-carousel relative">
      <div
        ref="scrollContainer"
        class="overflow-x-auto hide-scrollbar snap-x snap-mandatory flex scroll-smooth px-4 py-2"
        @scroll="handleScroll"
      >
        <div
          v-for="movie in movies"
          :key="movie.id"
          class="movie-card snap-start"
        >
          <div
            class="h-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-all duration-300 mx-2 flex flex-col"
          >
            <RouterLink :to="`/movie/${movie.id}`" class="block relative">
              <!-- Poster -->
              <div class="aspect-[2/3] overflow-hidden">
                <img
                  v-if="movie.posterPath"
                  :src="movie.posterPath"
                  :alt="movie.title"
                  class="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  loading="lazy"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-700"
                >
                  <span class="text-slate-500 dark:text-slate-400 text-sm"
                    >Brak plakatu</span
                  >
                </div>

                <!-- Ocena -->
                <div
                  class="absolute top-2 right-2 bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-sm shadow-lg"
                >
                  {{ movie.voteAverage.toFixed(1) }}
                </div>
              </div>
            </RouterLink>

            <!-- Informacje -->
            <div class="p-4 flex flex-col flex-grow">
              <RouterLink :to="`/movie/${movie.id}`" class="block">
                <h3
                  class="font-medium text-gray-800 dark:text-gray-200 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {{ movie.title }}
                </h3>
              </RouterLink>

              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4">
                {{
                  movie.releaseDate
                    ? new Date(movie.releaseDate).getFullYear()
                    : "Brak daty"
                }}
              </p>

              <div class="mt-auto">
                <button
                  @click.prevent="toggleFavorite(movie)"
                  class="w-full flex items-center justify-center py-2 rounded text-sm transition-colors"
                  :class="[
                    store.isFavorite(movie.id)
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'border border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20',
                  ]"
                >
                  <i
                    :class="[
                      store.isFavorite(movie.id) ? 'bxs-heart' : 'bx-heart',
                      'bx mr-1',
                    ]"
                  ></i>
                  {{
                    store.isFavorite(movie.id)
                      ? "Usuń z ulubionych"
                      : "Dodaj do ulubionych"
                  }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Przyciski nawigacyjne -->
      <button
        v-if="canScrollLeft"
        @click="scrollTo('left')"
        class="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center bg-white/80 dark:bg-gray-800/80 shadow-lg rounded-full text-blue-600 dark:text-blue-400 border border-gray-200 dark:border-gray-700"
        aria-label="Przewiń w lewo"
      >
        <i class="bx bx-chevron-left text-2xl"></i>
      </button>

      <button
        v-if="canScrollRight"
        @click="scrollTo('right')"
        class="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center bg-white/80 dark:bg-gray-800/80 shadow-lg rounded-full text-blue-600 dark:text-blue-400 border border-gray-200 dark:border-gray-700"
        aria-label="Przewiń w prawo"
      >
        <i class="bx bx-chevron-right text-2xl"></i>
      </button>

      <!-- Suwak stron (tylko na większych ekranach) -->
      <div class="hidden md:flex justify-center mt-4 gap-1">
        <button
          v-for="page in pagesCount"
          :key="page"
          @click="scrollToPage(page - 1)"
          class="w-2 h-2 rounded-full transition-all duration-300"
          :class="[
            currentPage === page - 1
              ? 'bg-blue-600 w-6'
              : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500',
          ]"
          :aria-label="`Strona ${page}`"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useMoviesStore } from "../../stores/movies";
import { RouterLink } from "vue-router";
import type { Movie } from "../../types/Movie";

const props = defineProps<{
  movies: Movie[];
}>();

const store = useMoviesStore();
const scrollContainer = ref<HTMLElement | null>(null);
const carouselContainer = ref<HTMLElement | null>(null);
const currentPage = ref(0);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);

// Określenie, ile elementów na stronę w zależności od szerokości ekranu
const itemsPerPage = computed(() => {
  return itemsPerViewport.value;
});

const itemsPerViewport = ref(4); // domyślna wartość
const cardWidth = ref(250); // szerokość karty w px

const pagesCount = computed(() => {
  return Math.ceil(props.movies.length / itemsPerPage.value);
});

// Obsługa przewijania
function scrollTo(direction: "left" | "right") {
  if (!scrollContainer.value) return;

  const scrollAmount =
    direction === "left"
      ? -cardWidth.value * itemsPerPage.value
      : cardWidth.value * itemsPerPage.value;

  scrollContainer.value.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
}

function scrollToPage(page: number) {
  if (!scrollContainer.value) return;

  const scrollPosition = page * cardWidth.value * itemsPerPage.value;
  scrollContainer.value.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  });

  currentPage.value = page;
}

// Obsługa zdarzenia przewijania
function handleScroll() {
  if (!scrollContainer.value) return;

  const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;

  // Aktualizuj, czy można przewijać w lewo/prawo
  canScrollLeft.value = scrollLeft > 10;
  canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 10;

  // Aktualizuj bieżącą stronę
  const newPage = Math.round(
    scrollLeft / (cardWidth.value * itemsPerPage.value)
  );
  if (newPage !== currentPage.value) {
    currentPage.value = newPage;
  }
}

// Obsługa zmiany rozmiaru ekranu
function updateResponsiveLayout() {
  if (!carouselContainer.value) return;

  const containerWidth = carouselContainer.value.clientWidth;

  // Dostosuj liczbę wyświetlanych elementów w zależności od szerokości
  if (containerWidth < 640) {
    itemsPerViewport.value = 1;
    cardWidth.value = containerWidth - 32; // 2rem padding
  } else if (containerWidth < 768) {
    itemsPerViewport.value = 2;
    cardWidth.value = (containerWidth - 32) / 2;
  } else if (containerWidth < 1024) {
    itemsPerViewport.value = 3;
    cardWidth.value = (containerWidth - 32) / 3;
  } else if (containerWidth < 1280) {
    itemsPerViewport.value = 4;
    cardWidth.value = (containerWidth - 32) / 4;
  } else {
    itemsPerViewport.value = 5;
    cardWidth.value = (containerWidth - 32) / 5;
  }

  // Aktualizuj styl kart
  if (scrollContainer.value) {
    const cards = scrollContainer.value.querySelectorAll(
      ".movie-card"
    ) as NodeListOf<HTMLElement>;
    cards.forEach((card) => {
      card.style.width = `${cardWidth.value}px`;
      card.style.flexShrink = "0";
    });
  }
}

function toggleFavorite(movie: Movie) {
  store.toggleFavorite(movie);
}

// Obsługa klawiszy
function handleKeydown(e: KeyboardEvent) {
  if (e.key === "ArrowLeft") {
    scrollTo("left");
  } else if (e.key === "ArrowRight") {
    scrollTo("right");
  }
}

// Obsługa gestów na urządzeniach mobilnych
let touchStartX = 0;

function handleTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0].clientX;
}

function handleTouchEnd(e: TouchEvent) {
  const touchEndX = e.changedTouches[0].clientX;
  const diff = touchEndX - touchStartX;

  // Próg czułości
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      scrollTo("left");
    } else {
      scrollTo("right");
    }
  }
}

onMounted(() => {
  window.addEventListener("resize", updateResponsiveLayout);
  window.addEventListener("keydown", handleKeydown);

  if (scrollContainer.value) {
    scrollContainer.value.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    scrollContainer.value.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });
  }

  // Ustaw początkowy układ
  updateResponsiveLayout();

  // Użyj ResizeObserver dla bardziej responsywnego zachowania
  if (carouselContainer.value) {
    const resizeObserver = new ResizeObserver(updateResponsiveLayout);
    resizeObserver.observe(carouselContainer.value);
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", updateResponsiveLayout);
  window.removeEventListener("keydown", handleKeydown);

  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener("touchstart", handleTouchStart);
    scrollContainer.value.removeEventListener("touchend", handleTouchEnd);
  }
});
</script>

<style scoped>
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Responsywne style dla płynnych przejść */
@media (max-width: 640px) {
  .movie-carousel {
    margin: 0 -0.5rem;
  }
}

@media (min-width: 641px) {
  .movie-card {
    transition: transform 0.3s ease;
  }

  .movie-card:hover {
    transform: translateY(-8px);
  }
}
</style>
