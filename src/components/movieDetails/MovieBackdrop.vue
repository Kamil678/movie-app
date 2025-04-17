<template>
  <div
    class="relative h-[30rem] bg-cover bg-top"
    :style="backdropPath ? `background-image: url(${backdropPath})` : ''"
    aria-hidden="true"
  >
    <div
      class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  backdropPath?: string;
}>();
</script>
