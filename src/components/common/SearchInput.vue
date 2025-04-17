<template>
  <div class="relative">
    <input
      :value="modelValue"
      @input="handleInputChange"
      type="text"
      :placeholder="placeholder"
      class="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      id="search-input"
      role="searchbox"
      aria-label="Wyszukaj"
      autocomplete="off"
    />
    <div class="absolute inset-y-0 right-0 flex items-center px-3">
      <i
        class="bx bx-search text-gray-500 dark:text-gray-400"
        aria-hidden="true"
      ></i>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Szukaj...",
  },
});

const handleInputChange = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  emit("update:modelValue", inputElement.value);
};
</script>
