<template>
  <div
    class="flex flex-col sm:flex-row gap-3 mb-4 justify-between"
    aria-label="Opcje wyszukiwania i sortowania filmów"
  >
    <div class="relative flex-grow max-w-md">
      <SearchInput
        v-model="searchQuery"
        @update:modelValue="updateFilterQuery"
        placeholder="Szukaj filmów..."
        aria-label="Wyszukiwarka filmów"
      />
    </div>

    <div class="flex items-center" role="group" aria-labelledby="sort-label">
      <label
        id="sort-label"
        class="text-sm text-gray-500 dark:text-gray-400 mr-2"
        for="sort-dropdown"
      >
        Sortuj:
      </label>
      <FilterDropdown
        id="sort-dropdown"
        v-model="selectedSort"
        :options="sortOptions"
        @update:modelValue="updateSortBy"
        placeholder="Sortowanie"
        icon="bx-sort-alt-2"
        aria-labelledby="sort-label"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import SearchInput from "../common/SearchInput.vue";
import FilterDropdown from "../common/FilterDropdown.vue";

const props = defineProps<{
  sortBy: string;
  filterQuery: string;
}>();

const emit = defineEmits<{
  "update:sortBy": [value: string];
  "update:filterQuery": [value: string];
}>();

const searchQuery = ref(props.filterQuery);
const selectedSort = ref(props.sortBy);

watch(
  () => props.filterQuery,
  (newValue) => {
    searchQuery.value = newValue;
  }
);

watch(
  () => props.sortBy,
  (newValue) => {
    selectedSort.value = newValue;
  }
);

const updateFilterQuery = () => {
  emit("update:filterQuery", searchQuery.value);
};

const updateSortBy = () => {
  emit("update:sortBy", selectedSort.value);
};

const sortOptions = [
  { value: "title_asc", label: "Tytuł (A-Z)" },
  { value: "title_desc", label: "Tytuł (Z-A)" },
  { value: "year_desc", label: "Rok (najnowsze)" },
  { value: "year_asc", label: "Rok (najstarsze)" },
  { value: "rating_desc", label: "Ocena (najwyższa)" },
  { value: "rating_asc", label: "Ocena (najniższa)" },
];
</script>
