<template>
  <HeaderComponent />
  <main
    class="max-w-screen-2xl mx-auto pb-20 pt-28 lg:pt-30 px-4 sm:px-6 lg:px-10 2xl:px-0"
  >
    <router-view />
  </main>
</template>

<script setup lang="ts">
import HeaderComponent from "./components/header/HeaderComponent.vue";
</script>
