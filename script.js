/*SELECTOR DE ELEMENTOS*/
let tabla = document.querySelector("#tabla");
let botones = document.querySelectorAll("button");

/*CONTADOR DE PARTIDAS*/
contPartidasGanadasJugador1 = 10;
contPartidasPerdidasJugador1 = 10;
contPartidasEmpatadasJugador1 = 10;
contPartidasGanadasJugador2 = 1;
contPartidasPerdidasJugador2 = 1;
contPartidasEmpatadasJugador2 = 1;

/*TD PARA CONTADOR DE PARTIDAS*/
let partidasGanadasJugador1 = (document.getElementById(
  "partidas-ganadas-1"
).innerHTML = contPartidasGanadasJugador1 + " Partida(s)");
let partidasPerdidasJugador1 = (document.getElementById(
  "partidas-perdidas-1"
).innerHTML = contPartidasPerdidasJugador1 + " Partida(s)");
let partidasEmpatadasJugador1 = (document.getElementById(
  "partidas-empatadas-1"
).innerHTML = contPartidasEmpatadasJugador1 + " Partida(s)");
let partidasGanadasJugador2 = (document.getElementById(
  "partidas-ganadas-2"
).innerHTML = contPartidasGanadasJugador2 + " Partida(s)");
let partidaPerdidasugador2 = (document.getElementById(
  "partidas-perdidas-2"
).innerHTML = contPartidasPerdidasJugador2 + " Partida(s)");
let partidasEmpatadasJugador2 = (document.getElementById(
  "partidas-empatadas-2"
).innerHTML = contPartidasEmpatadasJugador2 + " Partida(s)");

/*TABLRE Y FILAS*/
let numerofilas = 3;
let numerocolumnas = 3;
let tablero = [];

/*TIEMPOS DE PARTIDA*/
let tiempoPartida = 180;
var segundosdisponiblepartida = 30;

/*PINTAR TABLERO ARRAY*/
function pintarTablero() {
  for (let i = 0; i < numerofilas; i++) {
    let nuevafila = document.createElement("tr");
    tabla.appendChild(nuevafila);
    for (let c = 0; c < numerocolumnas; c++) {
      let nuevaColumna = document.createElement("td");
      nuevaColumna.classList.add("td-tabla");
      nuevafila.appendChild(nuevaColumna);
    }
  }
}

/*PINTAR TABLERO HTML*/
function generarTablero() {
  /*Vaciar al generar tablero*/
  tablero = [];
  for (let i = 0; i < numerofilas; i++) {
    const columnas = [];
    for (let j = 0; j < numerocolumnas; j++) {
      columnas.push(j);
    }
    tablero.push(columnas);
  }
}

/*SELECCIONAR CASILLA TD*/
function seleccionarCasilla() {
  let posiciones = document.querySelectorAll("td");
  for (let posicion of posiciones) {
    posicion.addEventListener("click", function () {
      console.log(posicion);
    });
  }
}

/*GESTIONAR BOTONES*/
function gestionarBotones() {
  for (let boton of botones) {
    boton.addEventListener("click", function () {
      let botonseleccionado = boton.getAttribute("id");
      switch (botonseleccionado) {
        case "jugale":
          console.log("Botón Jugador contra Aleatorio");
          break;
        case "jugia":
          console.log("Botón Jugador contra IA");
          break;
        case "jugjug":
          console.log("Botón Jugador contra Jugador");
          break;
        case "6fichas":
          console.log("Botón 6 fichas");

          break;
        case "empezardenuevo":
          console.log("Botón empezar de nuevo");

          break;
        case "9fichas":
          console.log("Botón 9 fichas");

          break;
      }
    });
  }
}

/*CONTADOR TIEMPO RESTANTE JUGADA JUGADOR*/
function contador() {
  let contador1 = (document.getElementById("contador-1").innerHTML =
    "Tiempo restante jugada: " + segundosdisponiblepartida);
  let contador2 = (document.getElementById("contador-2").innerHTML =
    "Tiempo restante jugada: " + segundosdisponiblepartida);
  if (segundosdisponiblepartida == 0) {
    alert("Se ha llegado al fin del tiempo de partida del jugador 2");
  } else {
    segundosdisponiblepartida--;
    setTimeout("contador()", 1000);
  }
}

/*TEMPORIZADOR PARTIDA TOTAL*/
function temporizadorPartida() {
  let tiempo = (document.getElementById("tiempo-partida").innerHTML =
    "Tiempo restante jugada: " + tiempoPartida);
  if (tiempoPartida == 0) {
    alert("Se ha consumido el tiempo de patida");
  } else {
    tiempoPartida--;
    setTimeout("temporizadorPartida()", 1000);
  }
}

pintarTablero();
generarTablero();
seleccionarCasilla();
gestionarBotones();
contador();
temporizadorPartida();
console.log(seleccionarCasilla());
console.log(tablero);
