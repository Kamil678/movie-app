<template>
  <div class="flex flex-wrap gap-2 mb-6">
    <span
      v-for="(genre, index) in genres"
      :key="index"
      class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium"
      itemprop="genre"
    >
      {{ genre }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  genres: string[];
}>();
</script>
