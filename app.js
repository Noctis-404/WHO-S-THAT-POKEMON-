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



// Menu Navigation
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

    // Use official artwork for highest quality
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

// --- Pokedex Functionality ---
async function fetchPokedex() {
  pokedexGrid.innerHTML = '<div class="loader" style="grid-column: 1 / -1; text-align: center;">Loading Pokedex...</div>';
  
  try {
    pokedexGrid.innerHTML = ''; // clear loader
    for (let i = 1; i <= 151; i++) {
      const gridItem = document.createElement("div");
      gridItem.classList.add("poke-grid-item");
      
      const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`;
      const img = document.createElement("img");
      img.src = imgUrl;
      img.alt = `Pokemon ${i}`;
      img.loading = "lazy";
      
      gridItem.appendChild(img);
      gridItem.addEventListener('click', () => showPokemonDetail(i));
      
      pokedexGrid.appendChild(gridItem);
    }
    pokedexLoaded = true;
  } catch (err) {
    console.error(err);
    pokedexGrid.innerHTML = '<p>Error loading Pokedex.</p>';
  }
}

async function showPokemonDetail(id) {
  // Switch screens
  pokedexScreen.classList.remove('show');
  pokedexScreen.classList.add('hide');
  detailScreen.classList.remove('hide');
  detailScreen.classList.add('show');
  
  // Set temporary loading state
  document.getElementById("detail-name").innerText = "Loading...";
  document.getElementById("detail-img").src = "";
  document.getElementById("detail-types").innerHTML = "";
  document.getElementById("detail-desc").innerText = "...";
  
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

    // ID formatting: #001
    document.getElementById("detail-id").innerText = `#${id.toString().padStart(3, '0')}`;
    
    // Name
    document.getElementById("detail-name").innerText = pokeData.name;
    
    // Image
    let imageUrl = pokeData.sprites.other["official-artwork"].front_default;
    if (!imageUrl) imageUrl = pokeData.sprites.front_default;
    document.getElementById("detail-img").src = imageUrl;
    
    // Types
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

    // Weight and Height
    document.getElementById("detail-weight").innerText = `${pokeData.weight / 10} Kg`;
    document.getElementById("detail-height").innerText = `${pokeData.height / 10} M`;

    // Flavor Text (English)
    const flavorTextEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === "en");
    const formattedDesc = flavorTextEntry ? flavorTextEntry.flavor_text.replace(/\f/g, "\n").replace(/\n/g, " ") : "No description available.";
    document.getElementById("detail-desc").innerText = formattedDesc;

    // Gender Ratio
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
        genderBarFill.style.display = 'none'; // Only female
      } else {
        genderBarFill.style.display = 'flex';
      }
    }

    // Update background color based on primary type
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