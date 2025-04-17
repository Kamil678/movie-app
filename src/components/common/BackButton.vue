<template>
  <button
    class="text-blue-500 hover:text-blue-600 mb-4 md:mb-6 flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
    @click="$emit('click')"
    aria-label="back"
  >
    <i class="bx bx-left-arrow-alt mr-2 text-lg" aria-hidden="true"></i
    >{{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
}>();

defineEmits<{
  (e: "click"): void;
}>();
</script>
