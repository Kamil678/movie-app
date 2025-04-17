<template>
  <div
    class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
  >
    <h3
      class="text-base font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center"
    >
      <i :class="[iconClass, iconColor, 'text-2xl mr-2']"></i>
      {{ title }}
    </h3>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  iconClass: string;
  iconColor: string;
}>();
</script>
