<template>
  <div class="flex-shrink-0 md:h-96 md:mr-10 mb-10 md:mb-0">
    <img
      v-if="posterPath"
      :src="posterPath"
      :alt="title"
      class="w-1/2 mx-auto md:w-full md:mx-0 md:h-full object-cover rounded-lg shadow-lg"
      itemprop="image"
    />
    <div
      v-else
      class="w-full h-52 md:h-full md:min-w-52 bg-slate-300 flex items-center justify-center text-slate-500 rounded-lg"
      aria-label="Brak plakatu"
    >
      Brak plakatu
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  posterPath?: string;
  title: string;
}>();
</script>
