/*SELECTOR DE ELEMENTOS*/
let tabla = document.querySelector("#tabla");
let botones = document.querySelectorAll("button");
let textoturno = document.getElementById("turnojugador");
var tipoPartida;

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
var tablero = [];

/*TIEMPOS DE PARTIDA*/
let tiempoPartida = 180;

var turnoJugador1 = new Boolean(true);

function gestionJuego() {
  switch (tipoPartida) {
    case "jugadorvsjugador":
      pintarTablero();
      generarTablero();
      seleccionarCasilla();
      textoturno.textContent = "Comienza la Partida, Turno del Jugador1.";
      break;
    case "jugadorvsaleatorio":
      pintarTablero();
      generarTablero();
      seleccionarCasilla();
      textoturno.textContent = "Comienza la Partida, Turno del Jugador1.";
      break;
    case "empezardenuevo":
      location.reload();
      break;
    default:
      break;
  }
}

function hasGanado() {
  setTimeout(() => {
    alert("Ha ganado el jugador: " + turnoJugador());
    location.reload();
  }, "150");
}
function ganar() {
  if (tablero[0][0] == 1 && tablero[0][1] == 1 && tablero[0][2] == 1) {
    hasGanado();
  }
  if (tablero[1][0] == 1 && tablero[1][1] == 1 && tablero[1][2] == 1) {
    hasGanado();
  }
  if (tablero[2][0] == 1 && tablero[2][1] == 1 && tablero[2][2] == 1) {
    hasGanado();
  }
  if (tablero[0][0] == 2 && tablero[0][1] == 2 && tablero[0][2] == 2) {
    hasGanado();
  }
  if (tablero[1][0] == 2 && tablero[1][1] == 2 && tablero[1][2] == 2) {
    hasGanado();
  }
  if (tablero[2][0] == 2 && tablero[2][1] == 2 && tablero[2][2] == 2) {
    hasGanado();
  }
}

function reset() {
  for (let i = 0; i < array.length; i++) {
    for (let i = 0; i < array.length; i++) {
      tablero[i][j] = 0;
    }
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
          tipoPartida = "jugadorvsaleatorio";
          gestionJuego();
          break;
        case "jugia":
          console.log("Botón Jugador contra IA");
          break;
        case "jugjug":
          console.log("Botón Jugador contra Jugador");
          tipoPartida = "jugadorvsjugador";
          gestionJuego();
          break;
        case "seis-fichas":
          console.log("Botón 6 fichas");

          break;
        case "empezardenuevo":
          console.log("Botón empezar de nuevo");
          tipoPartida = "empezardenuevo";
          gestionJuego();

          break;
        case "nuevefichas":
          console.log("Botón 9 fichas");

          break;
      }
    });
  }
}

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
      columnas.push(0);
    }
    tablero.push(columnas);
  }
}

/*RECOGE TODOS LOS LISTENER DE LAS CASILLAS TD*/
function seleccionarCasilla() {
  let posiciones = document.querySelectorAll("td");
  for (let posicion of posiciones) {
    posicion.addEventListener("click", function () {
      let fila = posicion.parentNode.rowIndex;
      let columna = posicion.cellIndex;
      gestionarCasilla(fila, columna);
      ganar();
    });
  }
}

function generarAleatorio() {
  let filaleatoria = Math.floor(Math.random() * 3);
  let columnaleatoria = Math.floor(Math.random() * 3);
  let aleatorioValido = false;
  for (let i = 0; i < tablero.length; i++) {
    for (let j = 0; j < tablero[i].length; j++) {
      if (tablero[j][i] == 0) {
        aleatorioValido = true;
        break;
      }
    }
  }
  if (!aleatorioValido) {
    alert("Han empatado");
    return;
  }
  if (tablero[filaleatoria][columnaleatoria] == 0) {
    gestionarCasilla(filaleatoria, columnaleatoria);
  } else {
    generarAleatorio();
  }
}
function gestionarCasilla(fila, columna) {
  if (tablero[fila][columna] == 0) {
    if (turnoJugador1) {
      tablero[fila][columna] = 1;
      turnoJugador1 = false;
      pintarCasilla(fila, columna, "blue");
      textoturno.textContent = "Turno del Jugador 2";
      if (tipoPartida == "jugadorvsaleatorio") {
        generarAleatorio();
      }
    } else {
      tablero[fila][columna] = 2;
      turnoJugador1 = true;
      pintarCasilla(fila, columna, "red");
      textoturno.textContent = "Turno del Jugador 1";
    }
  } else {
    textoturno.textContent = "Casilla ya seleccionada";
  }
}

function pintarCasilla(fila, columna, color) {
  let td = tabla.childNodes[fila + 3].childNodes[columna];
  td.style.backgroundColor = color;
}

/*CONTADOR TIEMPO RESTANTE JUGADA JUGADOR*/
function contador() {
  let segundosdisponiblepartida = 30;
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
function turnoJugador() {
  if (turnoJugador1) {
    return "jugador1";
  } else {
    return "jugador2";
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

//contador();
//temporizadorPartida();
/*Esencial para arrancar*/
gestionarBotones();
//reset();
