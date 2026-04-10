# ⚡ WHO'S THAT POKÉMON? & POKÉDEX ⚡

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

A high-performance, responsive web application that brings the classic "Who's That Pokémon?" game and a comprehensive Kanto Pokédex to your browser. This project showcases advanced API handling, CSS variables for theming, and the power of Array Higher-Order Functions.

## 🚀 Live Demo
**[Deploy this project on Netlify!](https://www.netlify.com/)** (Use the `/dist` folder for the fastest deployment)

---

## 🎮 Core Gameplay & Features

### 👤 "Who's That Pokémon?" Guessing Game
*   **Dynamic Fetching**: Every round pulls a random Pokémon from the original 151 using [PokeAPI](https://pokeapi.co/).
*   **Silhouette Mode**: Pokémon are displayed as shadows until correctly guessed.
*   **Interactive Feedback**: Correct/Wrong classes update the UI dynamically.

### 📜 Digital Pokédex (Kanto Gen 1)
*   **Real-time Search**: Instant keyword filtering for any Pokémon name.
*   **Type Selective**: Filter by categories like Fire, Water, Ice, or Dragon.
*   **Advanced Sorting**: Order the list by Pokédex ID or Alphabetically (A-Z).
*   **Stat Insight**: View detailed height, weight, gender ratios, types, and official descriptions.

### 💎 Exclusive UX Features
*   **🌗 Theme Toggle**: Switch between **Deep Dark** and **Pure White** themes instantly.
*   **💖 Favorites**: Save your favorite Pokémon to a personalized list using local persistent storage.
*   **📱 Fully Responsive**: A seamless experience on Mobile, Tablet, and Desktop.
*   **⚡ Optimized Performance**: Implemented **Debouncing** on search inputs to minimize unnecessary re-renders.

---

## 🛠️ Technical Implementation

### 🔧 Integration & Logic
*   **API Integration**: Robust `fetch` calls with `Promise.all` for parallel data loading.
*   **HOF requirement**: 100% compliance with the use of `.map()`, `.filter()`, `.sort()`, `.find()`, and `.some()` for all data manipulations.
*   **Modular Design**: Separated concerns between game state, UI rendering, and theme management.

### 🎨 Design System
*   **CSS Variables**: Centralized design tokens for colors, shadows, and gradients.
*   **Animations**: Custom heartbeat effects and smooth screen transitions.
*   **Pixel Perfect**: High-quality imagery and font choices for that authentic Pokémon feel.

---

## 📌 Project Milestones (Submission Checklist)

### ✅ Milestone 1: Planning
*   [x] Project Idea Selection
*   [x] Public API Identification (PokeAPI)
*   [x] GitHub Repository Setup
*   [x] Initial README.md

### ✅ Milestone 2: API Integration
*   [x] Fetching real-time data
*   [x] Dynamic UI rendering
*   [x] Loading states handled
*   [x] Responsive design implemented

### ✅ Milestone 3: Core Features (The Triple Threat)
*   [x] **Search**: HOF-based keyword search
*   [x] **Filtering**: HOF-based type filtering
*   [x] **Sorting**: HOF-based alphabetical/numeric sorting
*   [x] **Interaction**: Like/Favorite system
*   [x] **Theme Switch**: Light/Dark mode toggle

### ✅ Milestone 4: Finalization
*   [x] Code Refactoring & Cleanup
*   [x] Final Documentation
*   [x] Deployment Strategy (`/dist` folder ready)

---

## ⭐ Bonus Accomplishments
*   **Debouncing**: Added utility function to search input for performance.
*   **Local Storage**: Multi-state persistence (Theme + Favorites).
*   **Advanced UI**: Custom layout designed from scratch for a premium look.

## 📥 Local Installation
```bash
# Clone the repository
git clone https://github.com/Noctis-404/WHO-S-THAT-POKEMON-.git

# Launch the project
# Open index.html in your browser or run a dev server
```

---
**Final Submission for Individual Project | April 10, 2026**
Created with ❤️ by **[Atharv](https://github.com/Noctis-404)**
