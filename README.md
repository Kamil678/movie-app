
# 🎬 Movie App – Vue 3 App powered by TMDB API

A modern and responsive movie browsing application built from scratch with Vue 3, TypeScript, and Tailwind CSS.  
The app integrates with The Movie Database (TMDB) API to fetch real-time movie data, offering users an intuitive and performant experience for discovering and managing their favorite films.

---

## 🔧 Tech Stack

- **Vue 3** with `<script setup>` Composition API  
- **TypeScript** for type safety and improved maintainability  
- **Pinia** for modular and reactive state management  
- **Axios** for robust API communication  
- **Tailwind CSS** for a fully responsive and utility-first design  
- **Vite** for fast build and development workflow  

---

## 📁 Main Features

- 🔍 **Search & Filter** – Search by title, filter by genre, sort by rating/popularity  
- 🎞️ **Browse** – Explore trending, top-rated, and popular movies  
- ❤️ **Favorites** – Mark and manage favorite films using local state (Pinia)  
- 📊 **Statistics Dashboard** – Insights into favorites: movie ratings, release year breakdown, overall summary  
- 🧭 **Navigation** – Home, Movies, Favorites, and Statistics views  
- 📱 **Responsive Design** – Fully optimized for mobile, tablet, and desktop using Tailwind  

---

## 🧠 Key Focus Areas & Challenges Overcome

- **Type-Safe API Integration**: Built typed interfaces for TMDB responses to avoid runtime errors and ensure code reliability.  
- **Reusable Composables**: Created custom composables for fetching data, managing loading/error states, and handling favorites logic.  
- **Modular Architecture**: Maintained a clean folder structure and component-based design for better scalability and readability.  
- **User Experience**: Added loading skeletons and smooth transitions to enhance the app’s interactivity.  
- **Responsive UI Tuning**: Carefully tuned layout breakpoints and interactions for a seamless experience across all devices.  
- **API Rate Limit Handling**: Implemented basic rate-limit awareness and retries to gracefully handle TMDB API restrictions.  

---

## 🚀 Getting Started

To run the project locally:

```bash
# 1. Clone the repository
git clone https://github.com/Kamil678/movie-app.git
cd movie-app

# 2. Install dependencies
npm install

# 3. Provide your TMDB API key
cp .env.dist .env

# 4. Start the development server
npm run dev
```

---

## 🔗 Live Demo & Repository

- **🌐 Live App**: [https://dazzling-valkyrie-c0fb6c.netlify.app/](https://dazzling-valkyrie-c0fb6c.netlify.app/)
- **📂 GitHub Repo**: [https://github.com/Kamil678/movie-app](https://github.com/Kamil678/movie-app)

---
