const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const btnSearch= document.querySelector('.btn-search');
const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');
const btnInfo = document.querySelector('.btn-info');
const light = document.querySelector('.light');
let dict = { 'normal':'normal','fighting':'lutador', 'flying':'voador', 'poison':'veneno', 'ground':'terrestre','rock':'pedra', 'bug':'inseto', 'ghost':'fantasma', 'steel':'aço', 'fire':'fogo', 'water':'água', 'grass':'planta', 'electric':'eletrico','psychic':'psíquico', 'ice':'gelo', 'dragon':'dragão', 'dark':'sombrio', 'fairy':'fada' }
let synth = window.speechSynthesis;
let idPokemon = 0;


const fetchPokemon = async (pokemon) => {
    
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
      }
    
}

const renderPokemon = async (pokemon) => {

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        idPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = "Not found :'(";
        pokemonNumber.innerHTML = '';
        idPokemon = 0;
    }    

}

renderPokemon(1)

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
    renderPokemon(idPokemon + 1)
   
})

btnPrev.addEventListener('click',()=>{
    if (idPokemon > 1){
        renderPokemon(idPokemon - 1)
    }
   
})

btnInfo.addEventListener('click', async () =>{
    synth.cancel()
    const data = await fetchPokemon(idPokemon);
    let name = data.name +' um pokemon do tipo '+ dict[`${data.types[0].type.name}`];
    const toSpeak = new SpeechSynthesisUtterance(name);
    synth.speak(toSpeak);
    light.style.display='block';
    setTimeout(()=> {
        light.style.display='none';
      }, 3100);
      
})