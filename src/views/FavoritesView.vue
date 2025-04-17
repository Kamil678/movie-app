<template>
  <section>
    <FavoritesHeader :favoritesCount="store.favorites.length" />

    <EmptyFavorites v-if="store.favorites.length === 0" />

    <FavoritesGrid v-else :favorites="store.favorites" />
  </section>
</template>

<script setup lang="ts">
import { useMoviesStore } from "../stores/movies";
import FavoritesHeader from "../components/favorites/FavoritesHeader.vue";
import EmptyFavorites from "../components/favorites/EmptyFavorites.vue";
import FavoritesGrid from "../components/favorites/FavoritesGrid.vue";

const store = useMoviesStore();
</script>
