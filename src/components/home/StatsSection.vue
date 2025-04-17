<template>
  <section>
    <div
      class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 shadow-lg"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
        <div class="p-4">
          <div class="text-4xl font-bold mb-2">
            {{ formattedTotalMovies }} +
          </div>
          <p class="text-lg">Filmów w bazie</p>
        </div>
        <div class="p-4">
          <div class="text-4xl font-bold mb-2">{{ categoriesCount }}</div>
          <p class="text-lg">Gatunków filmowych</p>
        </div>
        <div class="p-4">
          <div class="text-4xl font-bold mb-2">
            {{ favoritesCount }}
          </div>
          <p class="text-lg">Twoich ulubionych</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { formatNumber } from "../../utils/formatters";

const props = defineProps({
  totalMovies: {
    type: Number,
    required: true,
  },
  categoriesCount: {
    type: Number,
    required: true,
  },
  favoritesCount: {
    type: Number,
    required: true,
  },
});

const formattedTotalMovies = computed(() => {
  return formatNumber(props.totalMovies);
});
</script>
