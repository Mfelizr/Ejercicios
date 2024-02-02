//Crear una clase que represente a un jugador de guerra de nieve. El jugador debe tener un nombre, cantidad de vidas, cantidad de daño por bola de nieve y un método para lanzar una bola de nieve.
class Player {
    constructor(name, lives, snowballHits) {
        this.name = name
        this.lives = lives
        this.snowballHits = snowballHits
    }    
    throwSnowball(playerGet) {
        //lanzar bola de nieve
        this.snowballHits ++
        playerGet.lives --
        return true
    }
}

//Crear dos clases que se extiendan de la clase jugador: Guerrero y Mago. El guerrero debe tener 3 vidas y 1 de daño por bola de nieve. El mago debe tener 2 vidas y 2 de dañor de bola de nieve.
class Guerrero extends Player {
    constructor(name, lives=3, snowballHits=1) {
        super(name, lives, snowballHits)
    }
}
class Mago extends Player {
    constructor(name, lives=2, snowballHits=2) {
        super(name, lives, snowballHits)
    }
}

const guerrero = new Guerrero("Lancelot")
const mago = new Mago("Merlin")
console.log(guerrero)
console.log(mago)

//Crear una clase que represente a un equipo de guerra de nieve. El equipo debe tener la lista de jugadores, un método para agregar jugadores y un método para determinar si el equipo perdió (si todos los jugadores tienen 0 vidas).
class Team {
    constructor(playersList) {
        this.playersList = []
    }    
    addPlayer(teamPlayer) {
        this.playersList.push(teamPlayer)        
    }

    theTeamLost() {
       const anyLive = this.playersList.some((e) => e.lives > 0)
       if (anyLive == false) console.log ("El equpo ha perdido: ", this.playersList)
       return !anyLive
    }

    selectPlayer() {
        const playersAlive = this.playersList.filter ((e) => e.lives > 0)
        if (playersAlive.length > 0) {
            const random = Math.floor(Math.random()*playersAlive.length)
            console.log ("Jugador seleccionado: ", playersAlive[random])
            return playersAlive[random]
        } else { 
            console.log ("No existen jugadores para seleccionar")            
        }      
    }
}

//BONUS: Crear una clase que represente a una guerra de nieve. La guerra debe tener dos equipos y un método para simular la guerra. 
//Para simular la guerra, cada equipo tendrá un turno para lanzar bolas de nieve. En cada turno, cada jugador del equipo lanzará una bola de nieve a un jugador del otro equipo. La selección de los jugadores deberá de ser aleatoria, por tanto deberá de exisitir un método que seleccione a un jugador que ataque y a otro jugador que reciba el ataque. El jugador que reciba la bola de nieve perderá la vida correspondiente al dañor del personaj. Recordar que no puede realizar ni recibir un ataque cuyo jugador tenga vida 0 o inferior. La guerra termina cuando un equipo pierde.
const team1 = new Team();
const team2 = new Team();

team1.addPlayer(new Guerrero ('Lancelot'))
team1.addPlayer(new Mago ('Merlin'))

team2.addPlayer(new Guerrero ('Harry Potter'))
team2.addPlayer(new Mago ('Gandalf'))
//console.log (team1)
//console.log (team2)
//console.log (team1.playersList[0].name, team1.playersList[0].lives)
//console.log ("El equipo ha perdido? ",team1.theTeamLost())
//console.log (" Tira Bola: ", team1.playersList[0].throwSnowball(team2.playersList[0]))


class War {
    constructor(team1, team2){
        team1 = []
        team2 = []
    }    
    warSimulator(){
        console.log("Guerra de equipos", team1, team2)
        let playerSend = new Player();
        let playerGet = new Player();
        do {
            //Equipo1
            //Jugador que ataca
            playerSend = team1.selectPlayer()            
            //Jugador que recibe
            playerGet = team2.selectPlayer()   
            //Ataque si ha sido posible seleccionar jugador            
            if (playerSend !== undefined) playerSend.throwSnowball(playerGet);

            //Equipo2
            //Jugador que ataca
            playerSend = team2.selectPlayer()            
            //Jugador que recibe
            playerGet = team1.selectPlayer()   
            //Ataque si ha sido posible seleccionar jugador            
            if (playerSend !== undefined) playerSend.throwSnowball(playerGet);

        } while (team1.theTeamLost() == false && team2.theTeamLost() == false);       
    }
}
const war = new War(team1, team2);
war.warSimulator();

//BONUS: Utilizar un setInterval para simular la guerra. En cada intervalo de tiempo, cada equipo lanzará una bola de nieve. El intervalo de tiempo deberá ser aleatorio entre 1 y 3 segundos. Cuando un equipo pierda, deberá de detenerse el intervalo de tiempo.


//BONUS: Utilizar la librería Chart.js para mostrar una gráfica de barras con la cantidad de vidas de cada jugador por quipo.