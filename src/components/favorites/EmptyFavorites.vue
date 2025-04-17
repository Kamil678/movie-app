<template>
  <div
    class="text-center py-12 md:py-16 px-4 md:px-8"
    lang="pl"
    aria-labelledby="no-favorites-heading"
  >
    <div class="flex flex-col items-center max-w-md mx-auto">
      <div
        class="w-16 h-16 md:w-20 md:h-20 mb-6 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center"
        aria-hidden="true"
      >
        <i
          class="bx bx-heart text-3xl md:text-4xl text-red-500"
          aria-label="Serce"
        ></i>
      </div>

      <h3
        id="no-favorites-heading"
        class="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-200 mb-2"
      >
        Nie masz jeszcze ulubionych filmów
      </h3>

      <p
        class="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-6 text-center"
      >
        Dodaj filmy do ulubionych, klikając ikonę serca przy filmie. Twoje
        ulubione będą widoczne tutaj.
      </p>
      <LinkBtn
        link="/"
        text="Przeglądaj popularne filmy"
        icon="bx-movie-play"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import LinkBtn from "../common/LinkBtn.vue";
</script>
