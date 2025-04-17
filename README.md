# 🎬 Movie App – Vue 3 App powered by TMDB API

A modern and responsive movie browsing application built with Vue 3, TypeScript, and Tailwind CSS.  
It integrates with [The Movie Database API](https://developer.themoviedb.org/) to fetch real-time movie data, and provides a clean user experience for discovering and managing your favorite films.

---

## 🔧 Tech Stack

- **Vue 3** with `<script setup>` Composition API
- **TypeScript**
- **Pinia** for state management
- **Axios** for API communication
- **Tailwind CSS** for styling
- **Vite** as the build tool

---

## 📁 Main Features

- 🔍 **Search & Filter** – Search movies by title, filter by genre, sort by rating or popularity
- 🎞️ **Browse** – View trending, top-rated, and popular movies
- ❤️ **Favorites** – Save your favorite films using local state (Pinia)
- 📊 **Statistics** – Overview of favorites: average rating, most common genres, total runtime, etc.
- 🧭 **Navigation** – Home, Movies, Favorites, Statistics tabs
- 📱 **Responsive UI** – Tailwind-based layout, optimized for all screen sizes

---

## 🚀 Getting Started

To run the project locally:

```bash
# 1. Clone the repository
git clone https://github.com/your-username/movie-explorer.git
cd movie-app

# 2. Install dependencies
npm install

# 3. Copy the example environment file and provide your TMDB API key
cp .env.dist .env

# 4. Run the app
npm run dev
```

---

## 🧠 What I focused on

- Modular component structure
- Type-safe API integration
- Error handling and loading states
- Reusable composables
- Clean, readable, well-structured code

---

## 📌 Live Demo

**🔗 https://dazzling-valkyrie-c0fb6c.netlify.app/**
