
const form = document.querySelector("#form")
const taskList = document.querySelector("#task-list")
const completedButton = document.querySelector(".completed-button")
const addButton = document.querySelector("#add-button")
const completedAll = document.querySelector("#completed-all")
const inputTitle = document.querySelector("#title")
const textDescription = document.querySelector("#description")
console.log("Nueva tarea => ", inputTitle.value)


document.addEventListener("DOMContentLoaded", completedTask);

form.addEventListener('submit', (e) => {
    // En el submit: Evalua que el campo title tenga algun valor
    e.preventDefault()    
    if (!inputTitle.value) return

    //Crea los elementos de la lista
    const newListItem = document.createElement("li")    
    taskList.appendChild(newListItem)    
    console.log("Nueva tarea => ", newListItem.innerText, inputTitle.value)

    const newTitle = document.createElement("span")
    const newDescription = document.createElement("span")    
    const newBtnComplete = document.createElement("button")

    //Asigna los valores a los elementos de la lista
    newTitle.textContent = inputTitle.value
    newDescription.textContent = textDescription.value    
    newBtnComplete.textContent = "Completada"

    console.log("Nuevo titulo => ", newTitle.textContent)
    console.log("Nueva desc => ", newDescription.textContent)
    
    //Visualiza los valores a los elementos de la lista
    newListItem.appendChild(newTitle)
    newListItem.appendChild(newDescription)    
    newListItem.appendChild(newBtnComplete)

    //Eliminar tarea de la lista
    newBtnComplete.classList.add('btnComplete')
    newBtnComplete.addEventListener("click", completedTask)
        
    /* newBtnComplete.onclick = ()=>{        
       completedTask()
    } */

    //Limpiar
    inputTitle.value = ""
    textDescription.value = ""
})

completedAll.addEventListener('click', (e) => {
    if (window.confirm("Quieres marcar todas las tareas como completadas?")) {
        const listItems = document.querySelectorAll("li")
        listItems.forEach( (item) => item.remove())
    }
});

function completedTask() {
    const listItems = document.querySelectorAll ("li")
    for (let i = 0; i<listItems.length; i++) {
        listItems[i].querySelector(".btnComplete").addEventListener("click", (e) => {                
            listItems[i].remove()
        })
    }  
}


