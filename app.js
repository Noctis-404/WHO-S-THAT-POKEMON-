let currentPokemon = "";
let isFetching = false;
let isRevealed = false;


const img = document.getElementById("pokemon-img");
const loader = document.getElementById("loader");
const result = document.getElementById("result");
const guessInput = document.getElementById("guess");

async function fetchPokemon() {
  if (isFetching) return;

  isFetching = true;
  isRevealed = false;


  img.style.display = "none";
  img.classList.remove("reveal");
  loader.style.display = "block";
  result.classList.remove("show", "correct", "wrong");
  result.innerText = "";
  guessInput.value = "";
  guessInput.disabled = false;

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


  const displayName = currentPokemon.charAt(0).toUpperCase() + currentPokemon.slice(1);

  if (guess === currentPokemon) {
    result.innerText = `Correct! It's ${displayName}! 🎉`;
    result.className = "show correct";
  } else {
    result.innerText = `Wrong! It was ${displayName}`;
    result.className = "show wrong";
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

fetchPokemon();