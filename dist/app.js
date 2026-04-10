let currentPokemon = "";
let isFetching = false;
let isRevealed = false;

const menuScreen = document.getElementById("menu-screen");
const gameScreen = document.getElementById("game-screen");

const img = document.getElementById("pokemon-img");
const loader = document.getElementById("loader");
const result = document.getElementById("result");
const guessInput = document.getElementById("guess");
const nextBtn = document.querySelector(".next-btn");



const navigateToGame = () => {
  menuScreen.classList.remove('show');
  menuScreen.classList.add('hide');
  gameScreen.classList.remove('hide');
  gameScreen.classList.add('show');
  
  if (!currentPokemon) {
    fetchPokemon();
  }
};

const leftTextBtn = document.getElementById("left-text-btn");
if (leftTextBtn) leftTextBtn.addEventListener('click', navigateToGame);

const pokedexScreen = document.getElementById("pokedex-screen");
const detailScreen = document.getElementById("detail-screen");
const pokedexGrid = document.getElementById("pokedex-grid");

let pokedexLoaded = false;
let allPokemon = [];
let favorites = JSON.parse(localStorage.getItem('pokedex-favorites')) || [];
let currentTheme = localStorage.getItem('pokedex-theme') || 'dark';

// Initial Theme Setup
document.body.setAttribute('data-theme', currentTheme);
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
  themeToggleBtn.innerText = currentTheme === 'dark' ? '🌙' : '☀️';
  themeToggleBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', currentTheme);
    themeToggleBtn.innerText = currentTheme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('pokedex-theme', currentTheme);
  });
}

const navigateToPokedex = () => {
  menuScreen.classList.remove('show');
  menuScreen.classList.add('hide');
  pokedexScreen.classList.remove('hide');
  pokedexScreen.classList.add('show');
  
  if (!pokedexLoaded) {
    fetchPokedex();
  }
};

const rightTextBtn = document.getElementById("right-text-btn");
if (rightTextBtn) rightTextBtn.addEventListener('click', navigateToPokedex);

function backToMenu() {
  gameScreen.classList.remove('show');
  gameScreen.classList.add('hide');
  pokedexScreen.classList.remove('show');
  pokedexScreen.classList.add('hide');
  menuScreen.classList.remove('hide');
  menuScreen.classList.add('show');
}


async function fetchPokemon() {
  if (isFetching) return;

  isFetching = true;
  isRevealed = false;

  img.style.display = "none";
  img.classList.remove("reveal");
  loader.style.display = "block";
  result.className = "";
  result.innerText = "";
  guessInput.value = "";
  guessInput.disabled = false;
  nextBtn.disabled = true;

  try {
    const id = Math.floor(Math.random() * 151) + 1; 
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    currentPokemon = data.name.toLowerCase();

    img.src = data.sprites.other["official-artwork"].front_default;

    img.onload = () => {
      loader.style.display = "none";
      img.style.display = "block";
      isFetching = false;
      guessInput.focus();
    };

    img.onerror = () => {
      throw new Error("Failed to load image");
    };

  } catch (error) {
    console.error(error);
    loader.innerText = "Error loading Pokémon!";
    isFetching = false;
  }
}

function checkGuess() {
  if (isRevealed || isFetching || !currentPokemon) return;

  const guess = guessInput.value.trim().toLowerCase();

  if (!guess) return;

  isRevealed = true;
  guessInput.disabled = true;
  nextBtn.disabled = false;
  nextBtn.focus();

  const displayName = currentPokemon.charAt(0).toUpperCase() + currentPokemon.slice(1);

  if (guess === currentPokemon) {
    result.innerText = `It's ${displayName}!`;
    result.className = "correct";
  } else {
    result.innerText = `It's ${displayName}!`;
    result.className = "wrong";
  }

  img.classList.add("reveal");
}

function nextPokemon() {
  fetchPokemon();
}

guessInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkGuess();
  }
});

async function fetchPokedex() {
  pokedexGrid.innerHTML = '<div class="loader" style="grid-column: 1 / -1; text-align: center;">Loading Pokemon Data...</div>';
  
  try {
    // Fetch basic info for first 151
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();
    
    // Fetch details for all 151 in parallel to get types for filtering
    const detailPromises = data.results.map(p => fetch(p.url).then(res => res.json()));
    allPokemon = await Promise.all(detailPromises);
    
    pokedexLoaded = true;
    renderPokedex(allPokemon);
    
    // Add Event Listeners for controls
    const searchInput = document.getElementById('pokedex-search');
    const typeFilter = document.getElementById('type-filter');
    const sortOrder = document.getElementById('sort-order');
    
    const handleControls = () => {
      const searchTerm = searchInput.value.toLowerCase();
      const selectedType = typeFilter.value;
      const sortValue = sortOrder.value;
      
      // SEARCHING & FILTERING using HOFs
      let filtered = allPokemon
        .filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm))
        .filter(pokemon => selectedType === 'all' || pokemon.types.some(t => t.type.name === selectedType));
      
      // SORTING using HOFs
      filtered.sort((a, b) => {
        if (sortValue === 'id-asc') return a.id - b.id;
        if (sortValue === 'id-desc') return b.id - a.id;
        if (sortValue === 'name-asc') return a.name.localeCompare(b.name);
        if (sortValue === 'name-desc') return b.name.localeCompare(a.name);
        return 0;
      });
      
      renderPokedex(filtered);
    };
    
    const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(null, args);
        }, delay);
      };
    };
    
    const debouncedHandleControls = debounce(handleControls, 300);
    
    searchInput.addEventListener('input', debouncedHandleControls);
    typeFilter.addEventListener('change', handleControls);
    sortOrder.addEventListener('change', handleControls);
    
  } catch (err) {
    console.error(err);
    pokedexGrid.innerHTML = '<p style="color: black; grid-column: 1/-1;">Error loading Pokedex. Check your connection.</p>';
  }
}

function renderPokedex(pokemonList) {
  pokedexGrid.innerHTML = '';
  
  if (pokemonList.length === 0) {
    pokedexGrid.innerHTML = '<p style="color: black; grid-column: 1/-1; text-align: center;">No Pokemon found.</p>';
    return;
  }

  // Use map to create elements (HOF)
  pokemonList.map(pokemon => {
    const gridItem = document.createElement("div");
    gridItem.classList.add("poke-grid-item");
    
    const imgUrl = pokemon.sprites.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    const img = document.createElement("img");
    img.src = imgUrl;
    img.alt = pokemon.name;
    img.loading = "lazy";
    
    gridItem.appendChild(img);
    gridItem.addEventListener('click', () => showPokemonDetail(pokemon.id));
    
    pokedexGrid.appendChild(gridItem);
  });
}

async function showPokemonDetail(id) {
  pokedexScreen.classList.remove('show');
  pokedexScreen.classList.add('hide');
  detailScreen.classList.remove('hide');
  detailScreen.classList.add('show');
  
  document.getElementById("detail-name").innerText = "Loading...";
  document.getElementById("detail-img").src = "";
  document.getElementById("detail-types").innerHTML = "";
  document.getElementById("detail-desc").innerText = "...";
  
  const heartIcon = document.querySelector('.heart-icon');
  heartIcon.classList.toggle('active', favorites.includes(id));
  
  // Interaction for favorite button
  heartIcon.onclick = (e) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      favorites = favorites.filter(favId => favId !== id);
      heartIcon.classList.remove('active');
    } else {
      favorites.push(id);
      heartIcon.classList.add('active');
    }
    localStorage.setItem('pokedex-favorites', JSON.stringify(favorites));
  };
  
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

    const [pokeRes, speciesRes] = await Promise.all([
      fetch(url),
      fetch(speciesUrl)
    ]);
    
    if (!pokeRes.ok || !speciesRes.ok) throw new Error("Failed to fetch details");

    const pokeData = await pokeRes.json();
    const speciesData = await speciesRes.json();

    document.getElementById("detail-id").innerText = `#${id.toString().padStart(3, '0')}`;
    
    document.getElementById("detail-name").innerText = pokeData.name;
    
    let imageUrl = pokeData.sprites.other["official-artwork"].front_default;
    if (!imageUrl) imageUrl = pokeData.sprites.front_default;
    document.getElementById("detail-img").src = imageUrl;
    
    const typeColors = {
      normal: "#A8A77A", fire: "#EE8130", water: "#6390F0", electric: "#F7D02C", grass: "#7AC74C",
      ice: "#96D9D6", fighting: "#C22E28", poison: "#A33EA1", ground: "#E2BF65", flying: "#A98FF3",
      psychic: "#F95587", bug: "#A6B91A", rock: "#B6A136", ghost: "#735797", dragon: "#6F35FC",
      dark: "#705898", steel: "#B7B7CE", fairy: "#D685AD"
    };

    const typesHtml = pokeData.types.map(t => {
      const typeName = t.type.name;
      const color = typeColors[typeName] || "#777";
      return `<span class="type-badge" style="background-color: ${color}; color: ${['electric', 'ice', 'flying', 'normal'].includes(typeName) ? 'black' : 'white'}; border-color: ${color}">${typeName}</span>`;
    }).join("");
    document.getElementById("detail-types").innerHTML = typesHtml;

    document.getElementById("detail-weight").innerText = `${pokeData.weight / 10} Kg`;
    document.getElementById("detail-height").innerText = `${pokeData.height / 10} M`;

    const flavorTextEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === "en");
    const formattedDesc = flavorTextEntry ? flavorTextEntry.flavor_text.replace(/\f/g, "\n").replace(/\n/g, " ") : "No description available.";
    document.getElementById("detail-desc").innerText = formattedDesc;

    const genderRate = speciesData.gender_rate;
    const genderBarFill = document.querySelector('.gender-bar-fill');
    const genderBar = document.querySelector('.gender-bar');
    if (genderRate === -1) {
      genderBarFill.style.width = '100%';
      genderBarFill.innerText = 'Genderless';
      genderBarFill.style.background = '#ccc';
      genderBar.style.background = '#ccc';
    } else {
      const femalePercentage = (genderRate / 8) * 100;
      const malePercentage = 100 - femalePercentage;
      genderBarFill.style.width = `${malePercentage}%`;
      genderBarFill.innerText = `${malePercentage}% Male`;
      genderBarFill.style.background = '#90caf9';
      genderBar.style.background = '#f48fb1';
      if (malePercentage === 0) {
        genderBarFill.style.display = 'none';
      } else {
        genderBarFill.style.display = 'flex';
      }
    }

    const primaryType = pokeData.types[0].type.name;
    const bgColor = typeColors[primaryType] || "#fc5c5c";
    detailScreen.style.backgroundColor = bgColor;

  } catch (error) {
    console.error(error);
    document.getElementById("detail-name").innerText = "Error loading";
  }
}

function backToPokedex() {
  detailScreen.classList.remove('show');
  detailScreen.classList.add('hide');
  pokedexScreen.classList.remove('hide');
  pokedexScreen.classList.add('show');
}