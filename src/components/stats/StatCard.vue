<!-- StatCard.vue -->
<template>
  <div
    class="bg-slate-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col items-center justify-center"
  >
    <div
      class="w-12 h-12 flex items-center justify-center"
      :class="bgColor + ' p-3 rounded-full mb-3'"
    >
      <i :class="[icon, iconColor, 'text-2xl']"></i>
    </div>
    <div class="text-3xl font-bold mb-1" :class="valueColor">
      {{ value }}
    </div>
    <div class="text-sm text-gray-600 dark:text-gray-400">
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
  iconColor: string;
  bgColor: string;
  value: string | number;
  valueColor: string;
  label: string;
}>();
</script>
