<template>
  <section class="relative mb-16 rounded-lg overflow-hidden">
    <div class="relative z-10 text-center px-4">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">
        MovieApp - Twoja biblioteka filmowa
      </h1>
      <p class="text-xl max-w-2xl mx-auto mb-8">
        Odkryj najlepsze filmy, zapisz ulubione tytuły i bądź na bieżąco z
        nowościami filmowymi.
      </p>
      <div
        class="flex flex-col items-center sm:flex-row justify-center gap-4 mb-8"
      >
        <LinkBtn link="/movies" text="Przeglądaj filmy" />
        <button
          @click="$emit('openSearch')"
          class="text-blue-600 border border-blue-600 hover:bg-blue-600/10 font-medium py-2 px-6 rounded-md transition duration-300 flex items-center justify-center"
        >
          <span class="mr-2">Szybkie wyszukiwanie</span>
          <i class="bx bx-search text-xl leading-none"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import LinkBtn from "../common/LinkBtn.vue";
defineEmits(["openSearch"]);
</script>
