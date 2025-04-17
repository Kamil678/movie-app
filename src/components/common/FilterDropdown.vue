<template>
  <div class="relative">
    <label v-if="label" :for="selectId" class="sr-only">
      {{ label }}
    </label>
    <select
      :id="selectId"
      :value="modelValue"
      @change="
        $emit('update:modelValue', ($event.target as HTMLSelectElement).value)
      "
      class="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 appearance-none pr-8 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      :aria-label="label"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
    >
      <i
        :class="`bx ${icon} text-gray-500 dark:text-gray-400`"
        aria-hidden="true"
      ></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from "vue";

interface Option {
  label: string;
  value: string;
}

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array as PropType<Option[]>,
    required: true,
  },
  icon: {
    type: String,
    default: "bx-chevron-down",
  },
  label: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);

const selectId = computed(
  () => `select-${Math.random().toString(36).substr(2, 9)}`
);
</script>
