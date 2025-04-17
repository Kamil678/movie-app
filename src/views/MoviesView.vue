<template>
  <h1 class="sr-only">
    {{ pageTitle }}
  </h1>
  <section
    class="flex flex-col md:flex-row md:items-center md:justify-between mb-10"
  >
    <MoviesFilters
      v-model:searchQuery="searchQuery"
      v-model:category="selectedCategory"
      v-model:sortOption="sortOption"
      v-model:year="selectedYear"
      v-model:rating="selectedRating"
      :categories="store.categories"
      :years="availableYears"
      :ratings="availableRatings"
    />
  </section>

  <LoadingSpinner v-if="loading" />
  <section v-else>
    <h2 class="font-medium text-lg mb-4">Filmy</h2>
    <MoviesGrid :movies="filteredMovies" :empty-message="emptyResultsMessage" />
    <div class="flex items-center justify-end mt-10">
      <Pagination
        v-if="totalPages > 1"
        :current-page="currentPage"
        :total-pages="totalPages"
        @change-page="changePage"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMoviesStore } from "../stores/movies";
import type { Category } from "../types/Category";
import MoviesFilters from "../components/movies/MoviesFilters.vue";
import MoviesGrid from "../components/movies/MoviesGrid.vue";
import LoadingSpinner from "../components/common/LoadingSpinner.vue";
import Pagination from "../components/common/Pagination.vue";
import { useMoviesFilter } from "../composables/useMoviesFilter";

const store = useMoviesStore();
const route = useRoute();
const router = useRouter();
const loading = ref(true);
const isInternalNavigation = ref(false);

const searchQuery = ref("");
const selectedCategory = ref("");
const sortOption = ref("popularity_desc");
const selectedYear = ref("");
const selectedRating = ref("");
const currentPage = ref(1);
const itemsPerPage = 20;

const availableYears = computed(() => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i >= 1900; i--) {
    years.push(i);
  }
  return years;
});

const availableRatings = [
  { value: "9", label: "9+ Wybitne" },
  { value: "8", label: "8+ Bardzo dobre" },
  { value: "7", label: "7+ Dobre" },
  { value: "6", label: "6+ Powyżej przeciętnej" },
  { value: "5", label: "5+ Przeciętne" },
];

const pageTitle = computed(() => {
  if (selectedCategory.value) {
    const category: Category | undefined = store.categories.find(
      (c: Category) => c.id === selectedCategory.value
    );
    return category ? `Filmy: ${category.name}` : "Wszystkie filmy";
  }
  if (selectedYear.value) {
    return `Filmy z roku ${selectedYear.value}`;
  }
  if (selectedRating.value) {
    return `Filmy z oceną ${selectedRating.value}+`;
  }
  if (searchQuery.value) {
    return `Wyniki wyszukiwania: "${searchQuery.value}"`;
  }
  return "Wszystkie filmy";
});

const emptyResultsMessage = computed(() => {
  if (searchQuery.value) {
    return `Nie znaleziono filmów pasujących do wyszukiwania "${searchQuery.value}"`;
  }
  if (selectedCategory.value || selectedYear.value || selectedRating.value) {
    return "Nie znaleziono filmów pasujących do wybranych filtrów";
  }
  return "Nie znaleziono filmów";
});

const { filteredMovies, totalPages, applyServerFilters } = useMoviesFilter(
  store,
  searchQuery,
  selectedCategory,
  sortOption,
  selectedYear,
  selectedRating,
  currentPage,
  itemsPerPage
);

async function updateUrlFromFilters(shouldFetchData = true): Promise<void> {
  const query: Record<string, string | number> = {};

  if (searchQuery.value) query.search = searchQuery.value;
  if (selectedCategory.value) query.category = selectedCategory.value;
  if (sortOption.value && sortOption.value !== "popularity.desc")
    query.sort = sortOption.value;
  if (selectedYear.value) query.year = selectedYear.value;
  if (selectedRating.value) query.rating = selectedRating.value;
  if (currentPage.value > 1) query.page = currentPage.value;

  isInternalNavigation.value = true;

  await router.push({ query });

  if (shouldFetchData) {
    loading.value = true;
    try {
      await applyServerFilters();
    } finally {
      loading.value = false;
    }
  }

  isInternalNavigation.value = false;
}

function updateFiltersFromUrl() {
  const query = route.query;

  searchQuery.value = query.search?.toString() || "";
  selectedCategory.value = query.category?.toString() || "";
  sortOption.value = query.sort?.toString() || "popularity.desc";
  selectedYear.value = query.year?.toString() || "";
  selectedRating.value = query.rating?.toString() || "";

  const pageParam = query.page?.toString();
  currentPage.value = pageParam ? parseInt(pageParam) : 1;

  if (isNaN(currentPage.value) || currentPage.value < 1) {
    currentPage.value = 1;
  }
}

async function changePage(page: number) {
  if (page === currentPage.value) return;

  currentPage.value = page;
  await updateUrlFromFilters(true);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

watch(
  [searchQuery, selectedCategory, sortOption, selectedYear, selectedRating],
  async () => {
    currentPage.value = 1;
    await updateUrlFromFilters(true);
  }
);

watch(
  () => route.query,
  async () => {
    if (!isInternalNavigation.value) {
      loading.value = true;

      try {
        updateFiltersFromUrl();
        await applyServerFilters();
      } finally {
        loading.value = false;
      }
    }
  },
  { deep: true }
);

onMounted(async () => {
  loading.value = true;

  try {
    await store.fetchCategories();
    updateFiltersFromUrl();
    await applyServerFilters();
  } finally {
    loading.value = false;
  }
});
</script>
