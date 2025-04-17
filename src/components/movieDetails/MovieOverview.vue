<template>
  <div class="mb-6">
    <h3 class="text-xl font-medium text-gray-800 mb-2">Opis</h3>
    <p class="text-gray-700" itemprop="description">
      {{ overview || "Brak opisu" }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  overview?: string;
}>();
</script>
