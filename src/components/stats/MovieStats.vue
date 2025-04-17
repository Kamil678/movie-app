<template>
  <div class="">
    <EmptyStatsMessage v-if="favorites.length === 0" />

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCard
        title="Oceny filmów"
        iconClass="bx bx-star"
        iconColor="text-yellow-500"
      >
        <canvas ref="ratingChartRef" height="220"></canvas>
      </ChartCard>
      <ChartCard
        title="Rozkład lat wydania"
        iconClass="bx bx-calendar"
        iconColor="text-green-500"
      >
        <canvas ref="yearChartRef" height="220"></canvas>
      </ChartCard>
      <StatsSummary
        :totalFavorites="favorites.length"
        :averageRating="averageRating"
        :mostCommonYear="mostCommonYear"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import { useMoviesStore } from "../../stores/movies";
import Chart from "chart.js/auto";
import EmptyStatsMessage from "./EmptyStatsMessage.vue";
import ChartCard from "./ChartCard.vue";
import StatsSummary from "./StatsSummary.vue";
import type { Movie } from "../../types/Movie";

const store = useMoviesStore();
const favorites = computed(() => store.favorites);

const ratingChartRef = ref<HTMLCanvasElement | null>(null);
const yearChartRef = ref<HTMLCanvasElement | null>(null);
let ratingChart: Chart | null = null;
let yearChart: Chart | null = null;

const averageRating = computed(() => {
  if (favorites.value.length === 0) return 0;
  const sum = favorites.value.reduce(
    (acc, movie: Movie) => acc + movie.voteAverage,
    0
  );
  return sum / favorites.value.length;
});

const mostCommonYear = computed(() => {
  const yearCounts: Record<string, number> = {};

  favorites.value.forEach((movie: Movie) => {
    if (movie.releaseDate) {
      const year = new Date(movie.releaseDate).getFullYear().toString();
      yearCounts[year] = (yearCounts[year] || 0) + 1;
    }
  });

  if (Object.keys(yearCounts).length === 0) return null;

  return Object.entries(yearCounts).reduce((maxYear, [year, count]) => {
    return count > yearCounts[maxYear] ? year : maxYear;
  }, Object.keys(yearCounts)[0]);
});

function generateChartData() {
  const ratingRanges = {
    "0-2": 0,
    "2-4": 0,
    "4-6": 0,
    "6-8": 0,
    "8-10": 0,
  };

  favorites.value.forEach((movie: Movie) => {
    const rating = movie.voteAverage;
    if (rating < 2) ratingRanges["0-2"]++;
    else if (rating < 4) ratingRanges["2-4"]++;
    else if (rating < 6) ratingRanges["4-6"]++;
    else if (rating < 8) ratingRanges["6-8"]++;
    else ratingRanges["8-10"]++;
  });

  const yearCounts: Record<string, number> = {};
  favorites.value.forEach((movie: Movie) => {
    if (movie.releaseDate) {
      const year = new Date(movie.releaseDate).getFullYear().toString();
      yearCounts[year] = (yearCounts[year] || 0) + 1;
    }
  });

  const sortedYears = Object.entries(yearCounts).sort(
    (a, b) => Number(a[0]) - Number(b[0])
  );

  return {
    ratingData: Object.entries(ratingRanges),
    yearData: sortedYears,
  };
}

function getChartOptions(isDark: boolean) {
  return {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: isDark ? "#d1d5db" : "#4b5563",
          stepSize: 1,
          font: { size: 11 },
        },
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        ticks: {
          color: isDark ? "#d1d5db" : "#4b5563",
          font: { size: 11 },
        },
        grid: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark
          ? "rgba(30, 41, 59, 0.9)"
          : "rgba(255, 255, 255, 0.95)",
        titleColor: isDark ? "#f3f4f6" : "#111827",
        bodyColor: isDark ? "#d1d5db" : "#4b5563",
        borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 6,
        displayColors: false,
        titleFont: { size: 13, weight: "bold" },
        bodyFont: { size: 12 },
      },
    },
    animation: {
      duration: 800,
      easing: "easeOutQuart",
    },
  };
}

function initCharts() {
  if (favorites.value.length === 0) return;

  try {
    const chartData = generateChartData();
    const isDark = document.documentElement.classList.contains("dark");
    const baseOptions = getChartOptions(isDark);

    if (ratingChartRef.value) {
      if (ratingChart) ratingChart.destroy();

      const ctx = ratingChartRef.value.getContext("2d");
      if (ctx) {
        const ratingOptions = {
          ...baseOptions,
          plugins: {
            ...baseOptions.plugins,
            tooltip: {
              ...baseOptions.plugins.tooltip,
              callbacks: {
                title: (items) => `Ocena: ${items[0].label}`,
                label: (item) => `Liczba filmów: ${item.raw}`,
              },
            },
          },
        };

        ratingChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: chartData.ratingData.map((item) => item[0]),
            datasets: [
              {
                label: "Liczba filmów",
                data: chartData.ratingData.map((item) => item[1]),
                backgroundColor: [
                  "#ef4444",
                  "#f97316",
                  "#eab308",
                  "#84cc16",
                  "#10b981",
                ],
                borderRadius: 6,
              },
            ],
          },
          options: ratingOptions,
        });
      }
    }

    if (yearChartRef.value && chartData.yearData.length > 0) {
      if (yearChart) yearChart.destroy();

      const ctx = yearChartRef.value.getContext("2d");
      if (ctx) {
        const yearOptions = {
          ...baseOptions,
          scales: {
            ...baseOptions.scales,
            x: {
              ...baseOptions.scales.x,
              ticks: {
                ...baseOptions.scales.x.ticks,
                maxRotation: 45,
                minRotation: 45,
                font: { size: 10 },
              },
            },
          },
          plugins: {
            ...baseOptions.plugins,
            tooltip: {
              ...baseOptions.plugins.tooltip,
              callbacks: {
                title: (items) => `Rok: ${items[0].label}`,
                label: (item) => `Liczba filmów: ${item.raw}`,
              },
            },
          },
        };

        yearChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: chartData.yearData.map((item) => item[0]),
            datasets: [
              {
                label: "Liczba filmów",
                data: chartData.yearData.map((item) => item[1]),
                borderColor: "#10b981",
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                fill: true,
                tension: 0.4,
                pointBackgroundColor: "#10b981",
                pointBorderColor: "#fff",
                pointRadius: 4,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: "#047857",
                borderWidth: 3,
              },
            ],
          },
          options: yearOptions,
        });
      }
    }
  } catch (error) {
    console.error("Error initializing charts:", error);
  }
}

watch(
  favorites,
  () => {
    initCharts();
  },
  { deep: true }
);

onMounted(() => {
  initCharts();
});

onUnmounted(() => {
  if (ratingChart) {
    ratingChart.destroy();
    ratingChart = null;
  }

  if (yearChart) {
    yearChart.destroy();
    yearChart = null;
  }
});
</script>
