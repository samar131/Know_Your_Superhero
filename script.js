// https://superheroapi.com/api/access-token/character-id

const SUPERHERO_TOKEN = "123007714124344";
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`;
const newHeroBtnDiv = document.getElementById("new-hero");

const heroImageDiv = document.getElementById("heroImage");
const searchButtonDiv = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

const getSuperHero = (id, name) => {
  fetch(`${BASE_URL}/${id}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json.powerstats);
      const superHero = json;
      showHeroInfo(superHero);
    });
};

const statToEmoji = {
  intelligence: "🧠",
  strength: "💪",
  speed: "⚡",
  durability: "🏋️",
  power: "🎇",
  combat: "⚔️",
};

const showHeroInfo = (character) => {
  const name = `<h2>${character.name}</h2>`;

  const img = `<img src="${character.image.url}" height=200 width=200>`;

  const stats = Object.keys(character.powerstats)
    .map((stat) => {
      return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${
        character.powerstats[stat]
      }</p>`;
    })
    .join("");

  heroImageDiv.innerHTML = `${name} ${img} ${stats}`;
};

const getSearchedHero = (name) => {
  console.log(searchInput.value);
  fetch(`${BASE_URL}/search/${name}`)
    .then((response) => response.json())
    .then((json) => {
      const hero = json.results[0];
      showHeroInfo(hero);
    });
};

const randomHero = () => {
  const numberOfHero = 731;
  return Math.floor(Math.random() * numberOfHero) + 1;
};

newHeroBtnDiv.onclick = () => getSuperHero(randomHero());

searchButtonDiv.onclick = () => getSearchedHero(searchInput.value);
