<template>
  <header
    class="fixed w-full z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
    role="banner"
  >
    <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 2xl:px-0">
      <div class="flex justify-between h-16 w-full">
        <div class="flex items-center justify-between w-full">
          <AppLogo />

          <nav
            class="hidden md:ml-6 md:flex md:space-x-2"
            aria-label="Menu główne"
          >
            <NavLinks />
          </nav>

          <button
            @click="toggleMobileMenu"
            class="md:hidden flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            :aria-expanded="isMobileMenuOpen"
            aria-controls="mobile-menu"
            aria-label="Przełącz menu główne"
          >
            <i
              v-if="!isMobileMenuOpen"
              class="bx bx-menu text-2xl"
              aria-hidden="true"
            ></i>
            <i v-else class="bx bx-x text-2xl" aria-hidden="true"></i>
            <span class="sr-only">{{
              isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"
            }}</span>
          </button>
        </div>
      </div>
    </div>

    <div
      v-show="isMobileMenuOpen"
      id="mobile-menu"
      class="md:hidden border-t border-gray-200 dark:border-gray-700"
    >
      <nav
        class="flex flex-col px-2 pt-2 pb-3 space-y-1"
        aria-label="Menu mobilne"
      >
        <NavLinks isMobile @click-item-menu="closeMobileMenu" />
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppLogo from "./AppLogo.vue";
import NavLinks from "./NavLinks.vue";

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>
