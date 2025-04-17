<template>
  <div class="flex space-x-4 text-sm text-gray-600 mb-3">
    <span v-if="releaseDate" itemprop="datePublished">
      {{ new Date(releaseDate).getFullYear() }}
    </span>
    <span v-if="runtime" itemprop="duration">
      {{ Math.floor(runtime / 60) }}g {{ runtime % 60 }}min
    </span>
    <span class="font-semibold text-yellow-400">
      <i class="bx bxs-star"></i>
      <span>{{ voteAverage.toFixed(1) }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  releaseDate?: string;
  runtime?: number;
  voteAverage: number;
}>();
</script>
