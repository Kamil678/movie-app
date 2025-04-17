<template>
  <div
    :class="{ 'flex flex-col': isMobile, 'flex space-x-2': !isMobile }"
    role="navigation"
  >
    <RouterLink
      to="/"
      :class="[
        'flex items-center px-3 py-2 rounded-md font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
        isMobile ? 'text-base' : 'text-sm',
      ]"
      active-class="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
      @click="$emit('clickItemMenu')"
    >
      <i class="bx bx-home-alt text-lg mr-2" aria-hidden="true"></i>
      Strona główna
    </RouterLink>
    <RouterLink
      to="/movies"
      :class="[
        'flex items-center px-3 py-2 rounded-md font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
        isMobile ? 'text-base' : 'text-sm',
      ]"
      active-class="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
      @click="$emit('clickItemMenu')"
    >
      <i class="bx bx-movie-play text-lg mr-2" aria-hidden="true"></i>
      Filmy
    </RouterLink>
    <RouterLink
      to="/favorites"
      :class="[
        'flex items-center px-3 py-2 rounded-md font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
        isMobile ? 'text-base' : 'text-sm',
      ]"
      active-class="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
      @click="$emit('clickItemMenu')"
    >
      <i class="bx bx-heart text-lg mr-1" aria-hidden="true"></i>
      Ulubione
      <span
        v-if="store.favorites.length > 0"
        class="ml-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs rounded-full px-2 py-0.5"
        aria-label="Liczba ulubionych filmów"
      >
        {{ store.favorites.length }}
      </span>
    </RouterLink>

    <RouterLink
      to="/stats"
      :class="[
        'flex items-center px-3 py-2 rounded-md font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
        isMobile ? 'text-base' : 'text-sm',
      ]"
      active-class="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
      @click="$emit('clickItemMenu')"
    >
      <i class="bx bx-chart text-lg mr-1" aria-hidden="true"></i>
      Statystyki
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useMoviesStore } from "../../stores/movies";

const store = useMoviesStore();

defineProps<{
  isMobile?: boolean;
}>();

defineEmits<{
  clickItemMenu: [];
}>();
</script>
