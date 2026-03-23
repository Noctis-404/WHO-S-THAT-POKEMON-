# WHO-S-THAT-POKEMON-
This project is an interactive web application that combines a fun “Who’s That Pokémon?” guessing game with a powerful Pokémon Explorer Dashboard.
# 🎮 Who’s That Pokémon?

## 📌 Project Overview

This project is an interactive web application that combines a fun **“Who’s That Pokémon?” guessing game** with a powerful **Pokémon Explorer Dashboard**.
It allows users to test their Pokémon knowledge while also exploring detailed information about different Pokémon using real-time data from a public API.

---

## 🎯 Objective

The goal of this project is to demonstrate:

* API integration using `fetch`
* Use of JavaScript array higher-order functions (`map`, `filter`, `sort`)
* Dynamic UI rendering
* Responsive and user-friendly design

---

## 🌐 API Used

This project uses the **PokéAPI**, a free and open API that provides detailed information about Pokémon, including their stats, types, abilities, and images.

---

## 🚀 Features

### 🎮 1. Who’s That Pokémon? Game

* Displays a **random Pokémon silhouette**
* User guesses the Pokémon’s name
* Shows whether the guess is correct or incorrect
* Reveals the Pokémon after submission
* Displays a **detailed Pokémon card**
* Keeps track of user score
* Option to load the next Pokémon

---

### 🎴 2. Pokémon Detail Card

After each guess, a styled card displays:

* Pokémon name and image
* Types (e.g., Fire, Water)
* Base stats (HP, Attack, Defense, Speed)
* Abilities

---

### 🔍 3. Pokémon Explorer Dashboard

A separate section to browse Pokémon data:

* **Search**

  * Search Pokémon by name

* **Filter**

  * Filter Pokémon by type

* **Sort**

  * Sort Pokémon:

    * Alphabetically (A → Z)
    * By stats (e.g., HP, Attack)

* **Favorites**

  * Mark Pokémon as favorites
  * Stored using local storage

---

## ⭐ Bonus Features (Planned)

* 🌙 Dark Mode / Light Mode toggle
* ⚡ Debounced search for better performance
* 📄 Pagination or infinite scroll
* 💾 Persistent favorites using Local Storage

---

## 🛠️ Technologies Used

* HTML5
* CSS3 (Flexbox / Grid)
* JavaScript (ES6+)
* Fetch API

---

## 📂 Project Structure

```
/project
 ├── index.html
 ├── style.css
 ├── script.js
 ├── /components
 │     ├── game.js
 │     ├── card.js
 │     ├── explorer.js
 └── /utils
       └── api.js
```

---

## ⚙️ How to Run the Project

1. Clone the repository:

   ```
   git clone https://github.com/your-username/pokemon-project.git
   ```
2. Open the project folder
3. Open `index.html` in your browser

---



