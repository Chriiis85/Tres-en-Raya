/*RECOGER ELEMENTOS DEL DOM*/
let tabla = document.querySelector("#tabla");
let botones = document.querySelectorAll("button");
let textoturno = document.getElementById("turnojugador");
let contadorjugador1 = document.getElementById("contador-1");
let contadorjugador2 = document.getElementById("contador-2");
/*RECOGER DOM CONTADOR DE PARTIDAS*/
let textopartidasganadasjugador1 =
  document.getElementById("partidas-ganadas-1");
let textopartidasempatadasjugador1 = document.getElementById(
  "partidas-empatadas-1"
);
let textopartidasperdidasjugador1 = document.getElementById(
  "partidas-perdidas-1"
);
let textopartidasganadasjugador2 =
  document.getElementById("partidas-ganadas-2");
let textopartidasempatadasjugador2 = document.getElementById(
  "partidas-empatadas-2"
);
let textopartidasperdidasjugador2 = document.getElementById(
  "partidas-perdidas-2"
);
/*CONTADOR PARTIDAS JUGADOR*/
let partidasganadasjugador1 = 0;
let partidasganadasjugador2 = 0;
let partidasempatadasjugador1 = 0;
let partidasempatadasjugador2 = 0;
let partidasperdidasjugador1 = 0;
let partidasperdidasjugador2 = 0;

/*ARRAY DE LA TABLA Y FILAS*/
let numerofilas = 3;
let numerocolumnas = 3;
var tablero = [];
let contador;

/*Definir el tipo de partida*/
let tipoPartida;
/*Definir el turno del jugador*/
let turnoJugador = "jugador1";

/*RESETEAR LA PARTIDA */
function reset() {
  clearInterval(contador);

  partidasganadasjugador1 = 0;
  partidasempatadasjugador2 = 0;
  partidasperdidasjugador1 = 0;
  partidasganadasjugador2 = 0;
  partidasempatadasjugador1 = 0;
  partidasperdidasjugador2 = 0;

  turnoJugador = "jugador1";
  textoturno.textContent = "Turno del Jugador 1";
}

function mostrarEstadisticas() {
  textopartidasganadasjugador1.textContent =
    partidasganadasjugador1 + " Partida(s)";
  textopartidasempatadasjugador1.textContent =
    partidasempatadasjugador1 + " Partida(s)";
  textopartidasperdidasjugador1.textContent =
    partidasperdidasjugador1 + " Partida(s)";
  textopartidasganadasjugador2.textContent =
    partidasganadasjugador2 + " Partida(s)";
  textopartidasempatadasjugador2.textContent =
    partidasempatadasjugador2 + " Partida(s)";
  textopartidasperdidasjugador2.textContent =
    partidasperdidasjugador2 + " Partida(s)";
}
/*GENERAR UNA NUEVA PARTIDA DESDE CERO*/
function generarJuego() {
  reset();
  turnoJugador = "jugador1";
  textoturno.textContent = "Turno del Jugador 1";
  generarTablero();
  casillaSeleccionada();
  mostrarEstadisticas();
}

/*PINTAR EL TRABLERO CON LOS TD,TR EN HMTL*/
function pintarTablero() {
  /*Vaciar al generar tablero*/
  tabla.innerHTML = "";
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

/*PINTAR TABLERO CON EL ARRAY*/
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
function casillaSeleccionada() {
  let posiciones = document.querySelectorAll("td");
  for (let posicion of posiciones) {
    posicion.addEventListener("click", function () {
      let fila = posicion.parentNode.rowIndex;
      let columna = posicion.cellIndex;
      gestionarCasilla(fila, columna);
    });
  }
}

/*PINTAR CASILLA QUE SE SELECCIONE*/
function pintarEnCasilla(fila, columna, color) {
  let td = tabla.children[fila].children[columna];
  td.style.backgroundColor = color;
}

function gestionarBotones() {
  for (let boton of botones) {
    boton.addEventListener("click", function () {
      let botonseleccionado = boton.getAttribute("id");
      switch (botonseleccionado) {
        case "jugjug":
          tipoPartida = "jugadorvsjugador";
          gestionarJuego();
          break;
        case "empezardenuevo":
          generarJuego();
          break;
      }
    });
  }
}

function gestionarJuego() {
  switch (tipoPartida) {
    case "jugadorvsjugador":
      textoturno.textContent = "Turno del Jugador 1";
      generarJuego();
      //cronometro();
      break;

    default:
      break;
  }
}

/*BUSCA Y COMPRUEBA QUIEN HA GANADO*/
function buscarGanador() {
  if (tablero[0][0] == 1 && tablero[0][1] == 1 && tablero[0][2] == 1) {
    partidasganadasjugador1++;
    mostrarGanador();
  } else if (tablero[1][0] == 1 && tablero[1][1] == 1 && tablero[1][2] == 1) {
    mostrarGanador();
  } else if (tablero[2][0] == 1 && tablero[2][1] == 1 && tablero[2][2] == 1) {
    mostrarGanador();
  } else if (tablero[0][0] == 2 && tablero[0][1] == 2 && tablero[0][2] == 2) {
    mostrarGanador();
  } else if (tablero[1][0] == 2 && tablero[1][1] == 2 && tablero[1][2] == 2) {
    mostrarGanador();
  } else if (tablero[2][0] == 2 && tablero[2][1] == 2 && tablero[2][2] == 2) {
    mostrarGanador();
  } else if (tablero[0][0] == 1 && tablero[1][0] == 1 && tablero[2][0] == 1) {
    mostrarGanador();
  } else if (tablero[0][1] == 1 && tablero[1][1] == 1 && tablero[2][1] == 1) {
    mostrarGanador();
  } else if (tablero[0][2] == 1 && tablero[1][2] == 1 && tablero[2][2] == 1) {
    mostrarGanador();
  } else if (tablero[0][0] == 2 && tablero[1][0] == 2 && tablero[2][0] == 2) {
    mostrarGanador();
  } else if (tablero[0][1] == 2 && tablero[1][1] == 2 && tablero[2][1] == 2) {
    mostrarGanador();
  } else if (tablero[0][2] == 2 && tablero[1][2] == 2 && tablero[2][2] == 2) {
    mostrarGanador();
  } else if (tablero[0][0] == 1 && tablero[1][1] == 1 && tablero[2][2] == 1) {
    mostrarGanador();
  } else if (tablero[0][2] == 1 && tablero[1][1] == 1 && tablero[2][0] == 1) {
    mostrarGanador();
  } else if (tablero[0][0] == 2 && tablero[1][1] == 2 && tablero[2][2] == 2) {
    mostrarGanador();
  } else if (tablero[0][2] == 2 && tablero[1][1] == 2 && tablero[2][0] == 2) {
    mostrarGanador();
  }
}

/*MUESTRA UN MENSAJE DE QUIEN HA GANADO*/
function mostrarGanador() {
  generarJuego();
  alert("Ha ganado el jugador: " + turnoJugador);
}

function gestionarCasilla(fila, columna) {
  if (tablero[fila][columna] == 0) {
    if (turnoJugador == "jugador1") {
      tablero[fila][columna] = 1;
      pintarEnCasilla(fila, columna, "blue");
      buscarGanador();
      gestionarTurno(turnoJugador);
    } else if (turnoJugador == "jugador2") {
      tablero[fila][columna] = 2;
      pintarEnCasilla(fila, columna, "red");
      buscarGanador();
      gestionarTurno(turnoJugador);
    }
  } else {
    alert("La casilla ya esta seleccionada");
  }
}

function gestionarTurno(jugador) {
  clearInterval(contador);

  if (jugador == "jugador1") {
    turnoJugador = "jugador2";
    textoturno.textContent = "Turno del Jugador 2";
  } else {
    turnoJugador = "jugador1";
    textoturno.textContent = "Turno del Jugador 1";
  }
  cronometro();
}

/*CONTADOR PARA LOS SEGUNDOS RESTANTES DEL MOVIMIENTO*/
function cronometro() {
  let segundos = 30;

  contador = setInterval(function () {
    if (segundos == 0) {
      alert("Se acabó el tiempo");
      generarJuego();
    } else {
      segundos--;
      if (turnoJugador == "jugador1") {
        contadorjugador1.innerHTML = "Tiempo restante: " + segundos;
        contadorjugador2.innerHTML = "Tiempo Restante: 0";
      } else {
        contadorjugador2.innerHTML = "Tiempo restante: " + segundos;
        contadorjugador1.innerHTML = "Tiempo Restante: 0";
      }
    }
  }, 1000);
}

gestionarBotones();
