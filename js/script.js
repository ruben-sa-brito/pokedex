const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const btnSearch= document.querySelector('.btn-search');
const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');
var idPokemon = 0;


const fetchPokemon = async (pokemon) => {
    
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    const data = await APIResponse.json();

    return data;
    
}

const renderPokemon = async (pokemon) => {

    const data = await fetchPokemon(pokemon);
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    idPokemon = data.id;
    

}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = '';
    
})

btnSearch.addEventListener('click', (event)=>{
    event.preventDefault();
    
    if (input.value.length > 0) { 
        renderPokemon(input.value.toLowerCase());
        input.value = '';
    }
    
})

btnNext.addEventListener('click',()=>{
    console.log(idPokemon + 1)
    renderPokemon(idPokemon + 1)
   
})

btnPrev.addEventListener('click',()=>{
    if (idPokemon > 1){
        renderPokemon(idPokemon - 1)
    }
   
})