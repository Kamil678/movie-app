<template>
  <div
    class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-2xl">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold">Szybkie wyszukiwanie</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-black">
          <i class="bx bx-x text-2xl"></i>
        </button>
      </div>
      <div class="relative">
        <input
          :value="modelValue"
          @input="
            $emit(
              'update:modelValue',
              ($event.target as HTMLInputElement).value
            );
            $emit('input');
          "
          type="text"
          placeholder="Wpisz tytuł filmu..."
          class="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div
          v-if="searchResults.length > 0"
          class="absolute left-0 right-0 mt-2 bg-gray-200 rounded-md shadow-lg max-h-96 overflow-y-auto"
        >
          <div
            v-for="movie in searchResults"
            :key="movie.id"
            class="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
            @click="$emit('select', movie.id)"
          >
            <div v-if="movie.posterPath" class="w-12 h-16 rounded mr-3">
              <img
                :src="movie.posterPath"
                :alt="movie.title"
                class="w-full h-full object-cover rounded"
              />
            </div>
            <div
              v-else
              class="w-12 h-16 bg-gray-600 rounded mr-3 flex items-center justify-center"
            >
              <span class="text-sm text-gray-400">Brak</span>
            </div>
            <div>
              <p class="font-medium text-black">{{ movie.title }}</p>
              <p class="text-sm text-gray-700">
                {{
                  movie.releaseDate
                    ? new Date(movie.releaseDate).getFullYear()
                    : "Brak daty"
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from "../../types/Movie";

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  searchResults: {
    type: Array as () => Movie[],
    default: () => [],
  },
});

defineEmits(["close", "select", "update:modelValue", "input"]);
</script>
