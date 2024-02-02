//Una gráfica de lineas que muestre la cantidad de cocktails por año. Para ello tendremos que utilizar la librería Chart.js.
const charCocktelsByYear = () => {
    let chart;

    cocktails.sort((y1, y2) => {
        if (y1.dateModified === null) return 1
        
        if (y2.dateModified === null) return -1        
    
        if (y1.dateModified === y2.dateModified) return 0
        
        return y1.dateModified.localeCompare(y2.dateModified)
    })    
    
    //Buscar los datos de años y cantidad de cockteles
    const objData = {}

    cocktails.forEach(({dateModified}) => {        
        if (dateModified) {
            const date = dateModified.substring(0,4)
            if (objData[date]) {
                objData[date] ++
            } else {
                objData[date] = 1
            }
        }
    })

    console.log(objData)

    const yearLabels = Object.keys(objData)
    const dataValues = Object.values(objData)

    if (chart) {
        chart.destroy()
    }

    const ctx = document.querySelector("#myChart")
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: yearLabels,
            datasets: [
                {
                    label: 'Cocktails per Year',
                    data: dataValues,
                },
            ],
        },
    })
     
}    
charCocktelsByYear()

//Otra gráfica de tipo pie que muestre la cantidad de cocktails que contengan alguno de estas bebida alohólicas: Gin, Vodka, Tequila, Rum y/o Whiskey.
const getCocktailsByIngredients = () => {
    //creamos objeto de ingredientes
    const ingredients = ["Gin", "Vodka", "Tequila", "Rum", "Whiskey"]
    const objIngredients = {}
    for (let i = 0; i < cocktails.length; i++){
        for (let j = 1; j < 16; j++) {
            const ingredientCocktail = cocktails[i][`strIngredient${j}`]            
            if (ingredientCocktail) {
                for (const ingredient of ingredients){
                    //console.log("Ingrediente que debe tener ==> ", ingredient, " A COMPARAR ==> ", ingredientCocktail)
                    if (ingredientCocktail.toLowerCase() === ingredient.toLowerCase()) {
                        objIngredients[ingredient] = (objIngredients[ingredient]||0)+1                        
                    }                    
                }                      
            }
        }        
    }
    console.log("Objeto Ingredientes FINAL ==>", objIngredients)
    
    const ingredientLabels = Object.keys(objIngredients)
    const dataValues = Object.values(objIngredients)

    const ctx = document.querySelector("#myChart2")
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ingredientLabels,
            datasets: [
                {
                    label: 'Cocktails per Ingredients',
                    data: dataValues,
                },
            ],
        },
    })


  } 
  getCocktailsByIngredients()


  