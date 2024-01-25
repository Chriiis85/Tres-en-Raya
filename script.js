/*SELECTOR DE ELEMENTOS*/
let tabla = document.querySelector("#tabla");
let botones = document.querySelectorAll("button");
let textoturno = document.getElementById("turnojugador");
var tipoPartida;

/*CONTADOR DE PARTIDAS*/
contPartidasGanadasJugador1 = 0;
contPartidasPerdidasJugador1 = 0;
contPartidasEmpatadasJugador1 = 0;
contPartidasGanadasJugador2 = 0;
contPartidasPerdidasJugador2 = 0;
contPartidasEmpatadasJugador2 = 0;

/*TD PARA CONTADOR DE PARTIDAS*/
let partidasGanadasJugador1 = (document.getElementById(
  "partidas-ganadas-1"
).innerHTML = " Partida(s)");
let partidasPerdidasJugador1 = (document.getElementById(
  "partidas-perdidas-1"
).innerHTML = " Partida(s)");
let partidasEmpatadasJugador1 = (document.getElementById(
  "partidas-empatadas-1"
).innerHTML = " Partida(s)");
let partidasGanadasJugador2 = (document.getElementById(
  "partidas-ganadas-2"
).innerHTML = " Partida(s)");
let partidaPerdidasJugador2 = (document.getElementById(
  "partidas-perdidas-2"
).innerHTML = " Partida(s)");
let partidasEmpatadasJugador2 = (document.getElementById(
  "partidas-empatadas-2"
).innerHTML = " Partida(s)");

/*TABLRE Y FILAS*/
let numerofilas = 3;
let numerocolumnas = 3;
var tablero = [];

/*TIEMPOS DE PARTIDA*/
let contjug1 = document.getElementById("contador-1");
let contjug2 = document.getElementById("contador-2");
let contador;

var turnoJugador1 = new Boolean(true);
var hayCasillas = true;

/******************************************************************************************************************************************/
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

function gestionJuego() {
  switch (tipoPartida) {
    case "jugadorvsjugador":
      pintarTablero();
      generarTablero();
      cronometro();
      textoturno.textContent = "Comienza la Partida, Turno del Jugador1.";
      break;
    case "jugadorvsaleatorio":
      pintarTablero();
      generarTablero();
      cronometro();
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
  alert("Ha ganado el jugador: " + turnoJugador());
  reset();
}

function ganar() {
  console.log(tablero);
  /*HORIZONTAL*/
  if (tablero[0][0] == 1 && tablero[0][1] == 1 && tablero[0][2] == 1) {
    hasGanado();
  } else if (tablero[1][0] == 1 && tablero[1][1] == 1 && tablero[1][2] == 1) {
    hasGanado();
  } else if (tablero[2][0] == 1 && tablero[2][1] == 1 && tablero[2][2] == 1) {
    hasGanado();
  } else if (tablero[0][0] == 2 && tablero[0][1] == 2 && tablero[0][2] == 2) {
    hasGanado();
  } else if (tablero[1][0] == 2 && tablero[1][1] == 2 && tablero[1][2] == 2) {
    hasGanado();
  } else if (tablero[2][0] == 2 && tablero[2][1] == 2 && tablero[2][2] == 2) {
    hasGanado();
  } else if (tablero[0][0] == 1 && tablero[1][0] == 1 && tablero[2][0] == 1) {
    /*VERTICAL*/
    hasGanado();
  } else if (tablero[0][1] == 1 && tablero[1][1] == 1 && tablero[2][1] == 1) {
    hasGanado();
  } else if (tablero[0][2] == 1 && tablero[1][2] == 1 && tablero[2][2] == 1) {
    hasGanado();
  } else if (tablero[0][0] == 2 && tablero[1][0] == 2 && tablero[2][0] == 2) {
    hasGanado();
  } else if (tablero[0][1] == 2 && tablero[1][1] == 2 && tablero[2][1] == 2) {
    hasGanado();
  } else if (tablero[0][2] == 2 && tablero[1][2] == 2 && tablero[2][2] == 2) {
    hasGanado();
  } else if (tablero[0][0] == 1 && tablero[1][1] == 1 && tablero[2][2] == 1) {
    hasGanado();
  } else if (tablero[0][2] == 1 && tablero[1][1] == 1 && tablero[2][0] == 1) {
    hasGanado();
  } else if (tablero[0][0] == 2 && tablero[1][1] == 2 && tablero[2][2] == 2) {
    hasGanado();
  } else if (tablero[0][2] == 2 && tablero[1][1] == 2 && tablero[2][0] == 2) {
    hasGanado();
  }
  if (!hayCasillas) {
    alert("La partida termina en empate ");
  }
}
function quedanCasillas() {
  let cont = 0;
  for (let i = 0; i < tablero.length; i++) {
    for (let j = 0; j < tablero.length; j++) {
      if (tablero[i][j] != 0) {
        cont++;
      }
    }
  }

  if (cont == 9) {
    hayCasillas = false;
  }
}
/*PINTAR TABLERO ARRAY*/
function pintarTablero() {
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
  seleccionarCasilla();
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
      quedanCasillas();
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
      clearInterval(contador);
      cronometro();
      textoturno.textContent = "Turno del Jugador 2";
      if (tipoPartida == "jugadorvsaleatorio") {
        generarAleatorio();
      }
    } else {
      tablero[fila][columna] = 2;
      turnoJugador1 = true;
      pintarCasilla(fila, columna, "red");
      clearInterval(contador);
      cronometro();
      textoturno.textContent = "Turno del Jugador 1";
    }
  } else {
    textoturno.textContent = "Casilla ya seleccionada";
  }
}

function pintarCasilla(fila, columna, color) {
  let td = tabla.children[fila].children[columna];
  td.style.backgroundColor = color;
}

function turnoJugador() {
  if (turnoJugador1) {
    return "jugador1";
  } else {
    return "jugador2";
  }
}
function reset() {
  pintarTablero();
  generarTablero();
  textoturno.textContent = "Comienza la Partida, Turno del Jugador1.";
  clearInterval(contador);
  clearInterval(contador);
  contjug1.innerHTML = "Tiempo Restante: 0";
  contjug2.innerHTML = "Tiempo Restante: 0";
}

function cronometro() {
  let segundos = 30;

  contador = setInterval(function () {
    if (segundos == 0) {
      textoturno.textContent = "Se te acabo el tiempo: " + turnoJugador();
      textoturno.style.color = "red";
    } else {
      segundos--;
      if (turnoJugador1) {
        contjug1.innerHTML = "Tiempo restante: " + segundos;
        contjug2.innerHTML = "Tiempo Restante: 0";
      } else {
        contjug2.innerHTML = "Tiempo restante: " + segundos;
        contjug1.innerHTML = "Tiempo Restante: 0";
      }
    }
  }, 1000);
}

gestionarBotones();
