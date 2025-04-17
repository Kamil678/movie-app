<template>
  <div
    class="flex items-center justify-center space-x-1"
    role="navigation"
    aria-label="Paginacja"
  >
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      :class="[
        currentPage === 1
          ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
      ]"
      aria-label="Poprzednia strona"
    >
      <i class="bx bx-chevron-left mr-1" aria-hidden="true"></i>
      Poprzednia
    </button>
    <button
      v-if="currentPage > 3"
      @click="changePage(1)"
      class="flex items-center justify-center w-10 h-10 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      :aria-current="currentPage === 1 ? 'page' : undefined"
    >
      1
    </button>
    <span
      v-if="currentPage >= 4"
      class="flex items-center justify-center w-10 h-10 text-gray-500 dark:text-gray-400"
      aria-hidden="true"
    >
      ...
    </span>
    <button
      v-for="page in visiblePageNumbers"
      :key="page"
      @click="changePage(page)"
      class="flex items-center justify-center w-10 h-10 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      :class="[
        currentPage === page
          ? 'bg-blue-600 text-white'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
      ]"
      :aria-current="currentPage === page ? 'page' : undefined"
    >
      {{ page }}
    </button>
    <span
      v-if="currentPage < totalPages - 3"
      class="flex items-center justify-center w-10 h-10 text-gray-500 dark:text-gray-400"
      aria-hidden="true"
    >
      ...
    </span>
    <button
      v-if="currentPage < totalPages - 2 && totalPages > 1"
      @click="changePage(totalPages)"
      class="flex items-center justify-center w-10 h-10 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      :aria-current="currentPage === totalPages ? 'page' : undefined"
    >
      {{ totalPages }}
    </button>
    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="flex items-center justify-center pl-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      :class="[
        currentPage === totalPages
          ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
      ]"
      aria-label="Następna strona"
    >
      Następna
      <i class="bx bx-chevron-right ml-1" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["change-page"]);

const visiblePageNumbers = computed(() => {
  const delta = 1;
  const range: number[] = [];

  let start = Math.max(1, props.currentPage - delta);
  let end = Math.min(props.totalPages, props.currentPage + delta);

  if (props.currentPage <= delta + 1) {
    end = Math.min(props.totalPages, 2 * delta + 1);
  } else if (props.currentPage >= props.totalPages - delta) {
    start = Math.max(1, props.totalPages - 2 * delta);
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
});

const changePage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit("change-page", page);
  }
};
</script>
