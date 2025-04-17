<template>
  <div>
    <h3 class="text-xl font-medium text-gray-800 mb-4">Obsada</h3>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="actor in cast"
        :key="actor.id"
        class="flex flex-col items-center"
        itemprop="actor"
        itemscope
        itemtype="http://schema.org/Person"
      >
        <div
          class="w-20 h-20 md:w-28 md:h-28 mb-2 rounded-full overflow-hidden bg-gray-300 text-center"
        >
          <img
            v-if="actor.profilePath"
            :src="actor.profilePath"
            :alt="actor.name"
            class="w-full object-cover"
            itemprop="image"
          />
          <div
            v-else
            class="w-full h-full bg-gray-300 flex items-center justify-center"
            aria-label="Brak zdjęcia"
          >
            Brak zdjęcia
          </div>
        </div>
        <div class="font-semibold text-gray-800" itemprop="name">
          {{ actor.name }}
        </div>
        <div class="text-sm text-gray-600" itemprop="characterName">
          {{ actor.character }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Actor } from "../../types/Actor";

defineProps<{
  cast: Actor[];
}>();
</script>
