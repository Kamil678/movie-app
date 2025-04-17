<template>
  <div class="flex items-start justify-between mb-3">
    <h1 class="text-2xl font-semibold text-gray-800" itemprop="name">
      {{ title }}
    </h1>
    <button
      class="text-2xl text-gray-500 hover:text-red-500 transition-transform duration-200"
      :class="{
        'text-red-500': isFavorite,
      }"
      @click="$emit('toggle-favorite')"
      :aria-label="isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'"
    >
      <span v-if="isFavorite">
        <i class="bx bxs-heart text-red-600" aria-hidden="true"></i>
      </span>
      <span v-else>
        <i class="bx bx-heart text-red-600" aria-hidden="true"></i>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  isFavorite: boolean;
}>();

defineEmits<{
  (e: "toggle-favorite"): void;
}>();
</script>
