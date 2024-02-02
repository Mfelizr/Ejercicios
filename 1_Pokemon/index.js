//Generar un numero_random de búsqueda que nos permita buscar un pokemon por su número. Al hacer click en el botón de buscar, se deberá mostrar la información del pokemon en la gráfica de barras.
let total_pokemons = 1000
const buttonRandom = document.querySelector("#click-random")
const button = document.querySelector("#click")
let chart;
let id_pokemon = document.querySelector("#id-pokemon")

buttonRandom.addEventListener('click', (e) => {            
    id_pokemon.value = Math.floor(Math.random()*total_pokemons)        
    showPokemonDetails(id_pokemon.value)
});

button.addEventListener('click', (e) => {
    showPokemonDetails(id_pokemon.value)    
});

function showPokemonDetails (id_pokemon) {
    axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id_pokemon}`)
    .then(({data}) => {
        console.log(data)

        if (chart) {
            chart.destroy()
        }
    
        const statNameLabels = data.stats.map(({stat}) => { return stat.name}) 
        const statBaseValues = data.stats.map(({base_stat}) => { return base_stat})
        console.log("NOMBRE ==>", statNameLabels)
        console.log("BASE ==>", statBaseValues)

        //También se deberá mostrar la imagen del pokemon y su nombre.
        const image = document.querySelector("#pokemon-image")
        image.src = data.sprites.front_default
        const name = document.querySelector("#pokemon-name")        
        name.innerText = data.name.toUpperCase()
        console.log ("nombre: ", data.name)

        const ctx = document.querySelector("#myChart")
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: statNameLabels,
                datasets: [
                    {
                        label: 'Habilidad',
                        data: statBaseValues,
                    },
                ],
            },
        })
    })
    //ERROR
    .catch((error) => {        
        if (error.response) {            
            console.log(error.response.data);
            if (error.response.status = 404)            
            window.alert("El pokemon especificado no existe. Favor especificar un numero válido")            
        } else {
            // Something happened in setting up the request and triggered an Error
            window.alert("Error inesperado, favor comunicarse con soporte")
        }        
    })
};
