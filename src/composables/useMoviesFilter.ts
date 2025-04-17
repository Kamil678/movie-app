import { ref, computed } from "vue";

export function useMoviesFilter(
  store,
  searchQuery,
  selectedCategory,
  sortOption,
  selectedYear,
  selectedRating,
  currentPage,
  itemsPerPage
) {
  // Ten composable zarządza logiką filtrowania, zarówno po stronie klienta jak i serwera

  const filteredMovies = ref([]);
  const totalFilteredCount = ref(0);

  // Całkowita liczba stron po zastosowaniu filtrów
  // Całkowita liczba stron po zastosowaniu filtrów
  const totalPages = computed(() => {
    return Math.min(
      500,
      Math.max(1, Math.ceil(totalFilteredCount.value / itemsPerPage))
    );
  });

  // Funkcja do filtrowania na serwerze
  async function applyServerFilters() {
    try {
      // Na prawdziwym API powinniśmy przekazać wszystkie parametry
      const filterParams = {
        page: currentPage.value,
        perPage: itemsPerPage,
        search: searchQuery.value,
        categoryId: selectedCategory.value,
        sort: sortOption.value,
        year: selectedYear.value,
        minRating: selectedRating.value,
      };
      console.log(filterParams);

      const result = await store.fetchFilteredMovies(filterParams);

      filteredMovies.value = result.movies;
      totalFilteredCount.value = result.total;

      return result;
    } catch (error) {
      console.error("Error applying filters:", error);
      filteredMovies.value = [];
      totalFilteredCount.value = 0;
      return { movies: [], total: 0 };
    }
  }

  // Zastosuj lokalne filtrowanie (używane tylko gdy nie mamy połączenia z API)
  function applyLocalFilters() {
    let result = [...store.movies];

    // Filtrowanie po kategorii
    if (selectedCategory.value) {
      result = result.filter((movie) =>
        movie.categories?.includes(selectedCategory.value)
      );
    }

    // Filtrowanie po roku
    if (selectedYear.value) {
      const year = parseInt(selectedYear.value);
      result = result.filter((movie) => movie.year === year);
    }

    // Filtrowanie po ocenie
    if (selectedRating.value) {
      const minRating = parseFloat(selectedRating.value);
      result = result.filter((movie) => movie.rating >= minRating);
    }

    // Filtrowanie po zapytaniu wyszukiwania
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(
        (movie) =>
          movie.title.toLowerCase().includes(query) ||
          movie.description?.toLowerCase().includes(query)
      );
    }

    // Sortowanie
    switch (sortOption.value) {
      case "popularity_desc":
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      case "title_asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title_desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "year_desc":
        result.sort((a, b) => b.year - a.year);
        break;
      case "year_asc":
        result.sort((a, b) => a.year - b.year);
        break;
      case "rating_desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "rating_asc":
        result.sort((a, b) => a.rating - b.rating);
        break;
    }

    // Zapisz całkowitą liczbę wyników filtrowania
    totalFilteredCount.value = result.length;

    // Zastosuj paginację
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return result.slice(startIndex, endIndex);
  }

  return {
    filteredMovies,
    totalPages,
    applyServerFilters,
    applyLocalFilters,
  };
}
