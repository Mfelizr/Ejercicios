//Busca los ultimos 20 cockteles
const TwentyCocktails = () => {
    
    cocktails.sort((y1, y2) => {
        if (y1.dateModified === null) return 1
        
        if (y2.dateModified === null) return -1        
    
        if (y1.dateModified === y2.dateModified) return 0
        
        return y2.dateModified.localeCompare(y1.dateModified) 
    })    
    
    //Buscar los datos de los últimos 20 cockteles de los últimos años con un filter
        
    const lastTwentyCocktails = cocktails.filter ((cocktail, i) => i < 20 )    

    const list = document.querySelector("#listCocktails")
    for (const cocktail of lastTwentyCocktails) {
        const listElement = document.createElement("li") 
        listElement.innerText = cocktail.strDrink
        list.appendChild(listElement) 
    }
    
    // Al hacer click en el nombre de un cocktail, se deberá mostrar:El nombre del cocktail. La imagen del cocktail. Los ingredientes del cocktail.
    //Las instrucciones para preparar el cocktail. El tipo de vaso que se utiliza para servir el cocktail. El tipo de bebida alcohólica que contiene el cocktail.
   const listElements = document.querySelectorAll ("li")
    for (let i = 0; i<listElements.length; i++) {
        listElements[i].addEventListener("click", (e) => {                
            const contentInfo = document.querySelector("#contentInfo")
            const image = document.querySelector("#id-image")
            const name = document.querySelector("#id-name")
            const instrucciones = document.querySelector("#id-instrucciones")
            const ingredients = document.querySelector("#id-ingredients")
            const glassType = document.querySelector("#id-tipovaso")
            const alcoholic = document.querySelector("#id-tipobebida")
            let allIngredients = ""    
            
            image.src = lastTwentyCocktails[i].strDrinkThumb
            name.innerText = lastTwentyCocktails[i].strDrink       
            instrucciones.innerText = lastTwentyCocktails[i].strInstructions
            allIngredients = cocktailIngredients(lastTwentyCocktails[i])          
            ingredients.innerText =  allIngredients    
            glassType.value = lastTwentyCocktails[i].strGlass
            alcoholic.value = lastTwentyCocktails[i].strAlcoholic
        })
    }  
}
TwentyCocktails()

//Hace un string con todos los ingredientes
const cocktailIngredients = (cocktail) => {
    const ingredients = []
    for (let j = 1; j < 16; j++) {        
        const ingredientCocktail = cocktail[`strIngredient${j}`]            
        if (ingredientCocktail) {
           //Crear un array con los ingredientes y luego hacerlo un string                     
           ingredients.push(ingredientCocktail)
        }
    }
    if (!ingredients) return ""
    return ingredients.join()   
}

