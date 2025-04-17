<template>
  <RouterLink
    :to="link"
    class="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300 w-fit"
    :aria-label="ariaLabel"
  >
    <i v-if="icon" :class="`bx ${icon} text-lg mr-2`" aria-hidden="true"></i>
    {{ text }}
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  link: string;
  text: string;
  icon?: string;
}>();

const ariaLabel = computed(() => (props.icon ? props.text : undefined));
</script>
