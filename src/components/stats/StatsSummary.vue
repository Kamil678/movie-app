<!-- StatsSummary.vue -->
<template>
  <div
    class="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
  >
    <h3
      class="text-base font-medium text-gray-700 dark:text-gray-300 mb-6 flex items-center"
    >
      <i class="bx bx-spreadsheet text-blue-500 text-2xl mr-2"></i>
      Podsumowanie
    </h3>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <StatCard
        icon="bx bx-heart"
        iconColor="text-blue-600 dark:text-blue-400"
        bgColor="bg-blue-100 dark:bg-blue-900/30"
        :value="totalFavorites"
        valueColor="text-blue-600 dark:text-blue-400"
        label="Ulubione filmy"
      />

      <StatCard
        icon="bx bx-star"
        iconColor="text-yellow-500"
        bgColor="bg-yellow-100 dark:bg-yellow-900/30"
        :value="averageRating.toFixed(1)"
        valueColor="text-yellow-500"
        label="Średnia ocena"
      />

      <StatCard
        icon="bx bx-calendar"
        iconColor="text-purple-500"
        bgColor="bg-purple-100 dark:bg-purple-900/30"
        :value="mostCommonYear || 'Brak'"
        valueColor="text-purple-500"
        label="Najpopularniejszy rok"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import StatCard from "./StatCard.vue";

defineProps<{
  totalFavorites: number;
  averageRating: number;
  mostCommonYear: string | null;
}>();
</script>
