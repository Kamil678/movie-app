import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/movies",
      name: "movies",
      component: () => import("../views/MoviesView.vue"),
    },
    {
      path: "/movie/:id",
      name: "movie",
      component: () => import("../views/MovieDatailsView.vue"),
    },
    {
      path: "/favorites",
      name: "favorites",
      component: () => import("../views/FavoritesView.vue"),
    },
    {
      path: "/stats",
      name: "stats",
      component: () => import("../views/StatsView.vue"),
    },
  ],
});

export default router;
