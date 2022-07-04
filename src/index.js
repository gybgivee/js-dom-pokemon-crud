const pokeForm = document.querySelector(".poke-form");
const pokeList = document.querySelector(".poke-list");
let state = [];

function init() {

  setPokemonsToState();

}
function setPokemonsToState() {
  get();
}
function setstate(updatedState) {
  Object.keys(updatedState).forEach((prop) => {
    state[prop] = updatedState[prop];
  });

  rander();
}
function rander() {
  listenToAddPokemonForm();
}
function addPokemon(pokemon) {
  const liEl = document.createElement("li");

  const imgEl = document.createElement("img");
  const h2El = document.createElement("h2");

  liEl.classList.add("pokemon");
  imgEl.src = pokemon.image;

  h2El.innerText = pokemon.name;

  liEl.append(imgEl, h2El);
  pokeList.append(liEl);


  const linkDelete = document.createElement("a");
  liEl.appendChild(linkDelete);
  linkDelete.innerHTML = "Delete";
  linkDelete.setAttribute("href", "#");
  linkDelete.setAttribute("class", "delete");
  linkDelete.setAttribute("id", "delete_" + pokemon.id);
  listenToRemovePokemon(linkDelete);


  const linkLike = document.createElement("a");
  liEl.appendChild(linkLike);
  linkLike.innerHTML = "Like";
  linkLike.setAttribute("href", "#");
  linkLike.setAttribute("class", "update");
  linkLike.setAttribute("id", "update_" + pokemon.id);
  listenToUpdateLikePokemon(linkLike);


}

function addPokemons(pokemons) {
  pokemons.forEach(pokemon => addPokemon(pokemon))
}

function listenToAddPokemonForm() {
  pokeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const pokemon = {
      name: pokeForm.name.value,
      image: pokeForm.image.value,
      like: false,
    };

    create(pokemon);

    pokeForm.reset();
  });
}
function listenToRemovePokemon(linkDelete) {
  linkDelete.addEventListener("click", function (event) {

    const id = event.target.id.replace("delete_", "");
    console.log('Remove click', id)
    deletePokemon(id);
  })



}
function listenToUpdateLikePokemon(linkLike) {
  linkLike.addEventListener("click", function (event) {
    const liEl = document.querySelectorAll(".pokemon");
    linkLike.innerHTML = 'Liked';
    linkLike.style.color = '#C71585';
    liEl.appendChild(linkLike);

    const id = event.target.id.replace("update_", "");
    console.log('update click', id)

    update(id);

  })
};


const get = () => {
  fetch('http://localhost:3000/pokemons')
    .then(function (response) {
      console.log('get response', response);
      return response.json();
    })
    .then(function (data) {
      setstate(data);
      addPokemons(data);
    });

};
const create = (pokemon) => {
  fetch('http://localhost:3000/pokemons', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pokemon)


  }).then(function (response) {
    console.log('create response', response);
    return response.json();
  })
};
const update = (id) => {
  fetch(`http://localhost:3000/pokemons/${id}`, {
    method: "PATCH",
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      like: true
    })
  }).then(function (response) {

    return response.json();
  }).then(function (data) {

    setstate(data);

  });

};
const deletePokemon = (id) => {
  fetch(`http://localhost:3000/pokemons/${id}`, {
    method: 'DELETE'
  })
    .then(function (response) { return response.json() })
    .then(function (data) {
      setstate(data);
    })

};


init();
