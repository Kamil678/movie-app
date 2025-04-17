import Chart from "chart.js/auto";
import type { ChartConfiguration, ChartOptions } from "chart.js";

export interface MovieData {
  voteAverage: number;
  releaseDate?: string;
}

// Stałe
const RATING_COLORS = {
  "0-2": "#ef4444",
  "2-4": "#f97316",
  "4-6": "#eab308",
  "6-8": "#84cc16",
  "8-10": "#10b981",
} as const;

const LINE_CHART_STYLE = {
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
} as const;

export function createRatingChart(
  ctx: CanvasRenderingContext2D,
  movies: MovieData[]
): Chart {
  const ratingRanges = {
    "0-2": 0,
    "2-4": 0,
    "4-6": 0,
    "6-8": 0,
    "8-10": 0,
  };

  movies.forEach((movie) => {
    const rating = movie.voteAverage;
    if (rating < 2) ratingRanges["0-2"]++;
    else if (rating < 4) ratingRanges["2-4"]++;
    else if (rating < 6) ratingRanges["4-6"]++;
    else if (rating < 8) ratingRanges["6-8"]++;
    else ratingRanges["8-10"]++;
  });

  const data = Object.entries(ratingRanges);

  const config: ChartConfiguration = {
    type: "bar",
    data: {
      labels: data.map((item) => item[0]),
      datasets: [
        {
          label: "Liczba filmów",
          data: data.map((item) => item[1]),
          backgroundColor: data.map((item) => RATING_COLORS[item[0]]),
          borderRadius: 6,
        },
      ],
    },
    options: getChartOptions(true),
  };

  return new Chart(ctx, config);
}

export function createYearChart(
  ctx: CanvasRenderingContext2D,
  movies: MovieData[]
): Chart | null {
  const yearCounts: Record<string, number> = {};

  movies.forEach((movie) => {
    if (movie.releaseDate) {
      const year = new Date(movie.releaseDate).getFullYear().toString();
      yearCounts[year] = (yearCounts[year] || 0) + 1;
    }
  });

  const sortedYears = Object.entries(yearCounts).sort(
    (a, b) => Number(a[0]) - Number(b[0])
  );

  if (sortedYears.length === 0) return null;

  const options = getChartOptions(false);
  if (options.scales?.x?.ticks) {
    options.scales.x.ticks.maxRotation = 45;
    options.scales.x.ticks.minRotation = 45;
    options.scales.x.ticks.font = { size: 10 };
  }

  const config: ChartConfiguration = {
    type: "line",
    data: {
      labels: sortedYears.map((item) => item[0]),
      datasets: [
        {
          label: "Liczba filmów",
          data: sortedYears.map((item) => item[1]),
          ...LINE_CHART_STYLE,
        },
      ],
    },
    options: options,
  };

  return new Chart(ctx, config);
}

function getChartOptions(isRatingChart: boolean): ChartOptions {
  return {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#4b5563",
          stepSize: 1,
          font: { size: 11 },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        ticks: {
          color: "#4b5563",
          font: { size: 11 },
        },
        grid: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#111827",
        bodyColor: "#4b5563",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 6,
        displayColors: false,
        titleFont: { size: 13, weight: "bold" },
        bodyFont: { size: 12 },
        callbacks: {
          title: (items) =>
            isRatingChart
              ? `Ocena: ${items[0].label}`
              : `Rok: ${items[0].label}`,
          label: (item) => `Liczba filmów: ${item.raw}`,
        },
      },
    },
    animation: {
      duration: 800,
      easing: "easeOutQuart",
    },
  };
}
