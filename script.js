/*RECOGER ELEMENTOS DEL DOM*/
let tabla = document.querySelector("#tabla");
let botones = document.querySelectorAll("button");
let textoturno = document.getElementById("turnojugador");
let contadorjugador1 = document.getElementById("contador-1");
let contadorjugador2 = document.getElementById("contador-2");
let tiempoTotalTexto = document.getElementById("tiempo-partida");
let modal = document.getElementById("modal");

/*BOTONES DEL DOM CADA UNO*/
let botonjug = document.getElementById("jugjug");
let botonaleatorio = document.getElementById("jugale");
let botonIA = document.getElementById("jugia");
let botonseisfichas = document.getElementById("seisfichas");
let botonnuevefichas = document.getElementById("nuevefichas");

/*BOOLEANO SI QUEDAN CASILLAS*/
var restanCasillas = true;
/*BOOLEANO PARA VER SI GANA LA PARTIDA*/
var seHaGanado = false;
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
let tiempoTotal;

/*Definir el tipo de partida o fichas*/
let tipoPartida;
let tipoFichas;
/*Definir el turno del jugador*/
let turnoJugador = "jugador1";

/**/
let contfichasjug1 = 3;
let contfichasjug2 = 3;
/*Boleano que controla cuando se mueve una casilla*/
let moverCasilla = false;

/*RESETEAR LA PARTIDA */
function reset() {
  modal.style.display = "none";
  clearInterval(contador);
  clearInterval(tiempoTotal);
  seHaGanado = false;
  contfichasjug1 = 3;
  contfichasjug2 = 3;
  tiempoTotalTexto.textContent = "Tiempo restante de Partida: 0";
  contadorjugador1.innerHTML = "Tiempo Restante: 0";
  contadorjugador2.innerHTML = "Tiempo Restante: 0";
  turnoJugador = "jugador1";
  textoturno.textContent = "Nueva Partida - Turno del Jugador 1";
}

/*RESETEAR LOS BOTONES SELECCIONADOS*/
function resetBotones() {
  botonjug.style.backgroundColor = "white";
  botonIA.style.backgroundColor = "white";
  botonaleatorio.style.backgroundColor = "white";
}

/*RESETEAR LAS ESTADISTICAS*/
function resetPartidas() {
  partidasganadasjugador1 = 0;
  partidasganadasjugador2 = 0;
  partidasempatadasjugador1 = 0;
  partidasempatadasjugador2 = 0;
  partidasperdidasjugador1 = 0;
  partidasperdidasjugador2 = 0;
}

/*VERIFICAR SI QUEDAN CASILLAS RESTANTES*/
function quedanCasillas() {
  for (let i = 0; i < tablero.length; i++) {
    for (let j = 0; j < tablero.length; j++) {
      if (tablero[i][j] == 0) {
        restanCasillas = true;
        return;
      } else {
        restanCasillas = false;
      }
    }
  }
}
/*GENERAR UNA NUEVA PARTIDA DESDE CERO*/
function generarJuego() {
  reset();
  cronometroTotal();
  cronometro();
  turnoJugador = "jugador1";
  textoturno.textContent = "Turno del Jugador 1";
  pintarTablero();
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
      /*Casilla ya seleccionada*/
      if (tipoFichas == "seisfichas") {
        gestionarCasillaSeisFichas(fila, columna);
      } else {
        gestionarCasilla(fila, columna);
      }
    });
  }
}

function hay3CasillasPuestas(jugador) {
  if (jugador == "jugador1") {
    if (contfichasjug1 === 0) {
      return true;
    } else {
      return false;
    }
  }
  if (jugador == "jugador2") {
    if (contfichasjug2 === 0) {
      return true;
    } else {
      return false;
    }
  }
}

/*PINTAR CASILLA QUE SE SELECCIONE*/
function pintarEnCasilla(fila, columna, color) {
  let td = tabla.children[fila].children[columna];
  td.style.backgroundColor = color;
}

/*GESTIONA LOS BOTONES Y LAS ELECCIONES*/
function gestionarBotones() {
  for (let boton of botones) {
    boton.addEventListener("click", function () {
      let botonseleccionado = boton.getAttribute("id");
      switch (botonseleccionado) {
        case "seisfichas":
          tipoFichas = "seisfichas";
          gestionarJuego();
          break;
        case "nuevefichas":
          tipoFichas = "nuevefichas";
          gestionarJuego();
          break;
        case "jugjug":
          tipoPartida = "jugadorvsjugador";
          gestionarJuego();
          break;
        case "jugale":
          tipoPartida = "jugadorvsaleatorio";
          gestionarJuego();
          break;
        case "jugia":
          tipoPartida = "jugadorvsia";
          gestionarJuego();
          break;
        case "empezardenuevo":
          generarJuego();
          break;
      }
    });
  }
}

/*FUNCION PRINCIPAL GESTIONA EL JUEGO Y LOS TIPOS*/
function gestionarJuego() {
  switch (tipoFichas) {
    case "seisfichas":
      botonseisfichas.style.backgroundColor = "lightgreen";
      botonnuevefichas.style.backgroundColor = "white";
      switch (tipoPartida) {
        case "jugadorvsjugador":
          gestionarColorBotones(tipoPartida);
          reset();
          generarJuego();
          break;
        case "jugadorvsaleatorio":
          gestionarColorBotones(tipoPartida);
          reset();
          generarJuego();
          break;
        case "jugadorvsia":
          gestionarColorBotones(tipoPartida);
          reset();
          generarJuego();
          break;
      }
      break;
    case "nuevefichas":
      botonnuevefichas.style.backgroundColor = "lightgreen";
      botonseisfichas.style.backgroundColor = "white";
      switch (tipoPartida) {
        case "jugadorvsjugador":
          gestionarColorBotones(tipoPartida);
          reset();
          generarJuego();
          break;
        case "jugadorvsaleatorio":
          gestionarColorBotones(tipoPartida);
          reset();
          generarJuego();
          break;
        case "jugadorvsia":
          gestionarColorBotones(tipoPartida);
          reset();
          generarJuego();
          break;
      }
      break;
  }
}

/*GESTIONA EL COLOR DE LOS BOTONES*/
function gestionarColorBotones(tipo) {
  switch (tipo) {
    case "jugadorvsjugador":
      botonjug.style.backgroundColor = "lightgreen";
      botonIA.style.backgroundColor = "white";
      botonaleatorio.style.backgroundColor = "white";
      break;
    case "jugadorvsaleatorio":
      botonaleatorio.style.backgroundColor = "lightgreen";
      botonIA.style.backgroundColor = "white";
      botonjug.style.backgroundColor = "white";
      break;
    case "jugadorvsia":
      botonIA.style.backgroundColor = "lightgreen";
      botonaleatorio.style.backgroundColor = "white";
      botonjug.style.backgroundColor = "white";
      break;
  }
}
/*BUSCA Y COMPRUEBA QUIEN HA GANADO*/
function buscarGanador() {
  if (tablero[0][0] == 1 && tablero[0][1] == 1 && tablero[0][2] == 1) {
    partidasganadasjugador1++;
    partidasperdidasjugador2++;
    seHaGanado = true;
    mostrarGanador();
  } else if (tablero[1][0] == 1 && tablero[1][1] == 1 && tablero[1][2] == 1) {
    partidasganadasjugador1++;
    partidasperdidasjugador2++;
    seHaGanado = true;

    mostrarGanador();
  } else if (tablero[2][0] == 1 && tablero[2][1] == 1 && tablero[2][2] == 1) {
    partidasganadasjugador1++;
    partidasperdidasjugador2++;
    seHaGanado = true;

    mostrarGanador();
  } else if (tablero[0][0] == 2 && tablero[0][1] == 2 && tablero[0][2] == 2) {
    partidasganadasjugador2++;
    partidasperdidasjugador1++;
    seHaGanado = true;

    mostrarGanador();
  } else if (tablero[1][0] == 2 && tablero[1][1] == 2 && tablero[1][2] == 2) {
    partidasganadasjugador2++;
    partidasperdidasjugador1++;
    seHaGanado = true;

    mostrarGanador();
  } else if (tablero[2][0] == 2 && tablero[2][1] == 2 && tablero[2][2] == 2) {
    partidasganadasjugador2++;
    partidasperdidasjugador1++;
    seHaGanado = true;

    mostrarGanador();
  } else if (tablero[0][0] == 1 && tablero[1][0] == 1 && tablero[2][0] == 1) {
    partidasganadasjugador1++;
    partidasperdidasjugador2++;
    seHaGanado = true;

    mostrarGanador();
  } else if (tablero[0][1] == 1 && tablero[1][1] == 1 && tablero[2][1] == 1) {
    partidasganadasjugador1++;
    partidasperdidasjugador2++;
    seHaGanado = true;

    mostrarGanador();
  } else if (tablero[0][2] == 1 && tablero[1][2] == 1 && tablero[2][2] == 1) {
    partidasganadasjugador1++;
    partidasperdidasjugador2++;
    seHaGanado = true;

    mostrarGanador();
  } else if (tablero[0][0] == 2 && tablero[1][0] == 2 && tablero[2][0] == 2) {
    partidasganadasjugador2++;
    partidasperdidasjugador1++;
    seHaGanado = true;

    mostrarGanador();
  } else if (tablero[0][1] == 2 && tablero[1][1] == 2 && tablero[2][1] == 2) {
    partidasganadasjugador2++;
    partidasperdidasjugador1++;
    seHaGanado = true;

    mostrarGanador();
  } else if (tablero[0][2] == 2 && tablero[1][2] == 2 && tablero[2][2] == 2) {
    partidasganadasjugador2++;
    partidasperdidasjugador1++;
    seHaGanado = true;

    mostrarGanador();
  } else if (tablero[0][0] == 1 && tablero[1][1] == 1 && tablero[2][2] == 1) {
    partidasganadasjugador1++;
    partidasperdidasjugador2++;
    seHaGanado = true;

    mostrarGanador();
  } else if (tablero[0][2] == 1 && tablero[1][1] == 1 && tablero[2][0] == 1) {
    partidasganadasjugador1++;
    partidasperdidasjugador2++;
    seHaGanado = true;

    mostrarGanador();
  } else if (tablero[0][0] == 2 && tablero[1][1] == 2 && tablero[2][2] == 2) {
    partidasganadasjugador2++;
    partidasperdidasjugador1++;
    seHaGanado = true;

    mostrarGanador();
  } else if (tablero[0][2] == 2 && tablero[1][1] == 2 && tablero[2][0] == 2) {
    partidasganadasjugador2++;
    partidasperdidasjugador1++;
    seHaGanado = true;

    mostrarGanador();
  }
}

/*MUESTRA UN MENSAJE DE QUIEN HA GANADO*/
function mostrarGanador() {
  gestionarTurno(turnoJugador);
  setTimeout(function () {
    alert("Ha ganado el jugador: " + turnoJugador);
    generarJuego();
  }, 200);
}

/*MUESTRA LAS ESTADISTICAS DEL USUARIO*/
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

/*MUESTRA AL USUARIO EL EMPATE DE UNA PARTIDA*/
function empatarPartida() {
  setTimeout(function () {
    alert("No quedan casillas se acaba la partida en empate.");
    partidasempatadasjugador2++;
    partidasempatadasjugador1++;
    mostrarEstadisticas();
    generarJuego();
  }, 200);
}

/*COLOCA UNA CASILLA ALEATORIA*/
function casillaAleatoria() {
  let filaleatoria = Math.floor(Math.random() * 3);
  let columnaleatoria = Math.floor(Math.random() * 3);
  if (
    tablero[filaleatoria][columnaleatoria] == 0 &&
    turnoJugador == "jugador2"
  ) {
    pintarEnCasilla(filaleatoria, columnaleatoria, "red");
    tablero[filaleatoria][columnaleatoria] = 2;
    turnoJugador = "jugador1";
    textoturno.textContent = "Turno del Jugador 1";
    buscarGanador();
  } else {
    casillaAleatoria();
  }
}

function casillaAleatoriaSeisFichas() {
  let filaleatoria = Math.floor(Math.random() * 3);
  let columnaleatoria = Math.floor(Math.random() * 3);

  if (!hay3CasillasPuestas("jugador2")) {
    if (
      tablero[filaleatoria][columnaleatoria] == 0 &&
      turnoJugador == "jugador2"
    ) {
      contfichasjug2--;
      pintarEnCasilla(filaleatoria, columnaleatoria, "red");
      tablero[filaleatoria][columnaleatoria] = 2;
      turnoJugador = "jugador1";
      textoturno.textContent = "Turno del Jugador 1";
      buscarGanador();
    } else {
      casillaAleatoriaSeisFichas();
    }
  } else {
    let filaleatoria2 = Math.floor(Math.random() * 3);
    let columnaleatoria2 = Math.floor(Math.random() * 3);

    if (tablero[filaleatoria2][columnaleatoria2] == 2) {
      tablero[filaleatoria2][columnaleatoria2] = 0;
      pintarEnCasilla(filaleatoria2, columnaleatoria2, "transparent");
      contfichasjug2++;
      let filaleatoria3 = Math.floor(Math.random() * 3);
      let columnaleatoria3 = Math.floor(Math.random() * 3);
      if (tablero[filaleatoria3][columnaleatoria3] == 0) {
        contfichasjug2--;
        tablero[filaleatoria3][columnaleatoria3] = 2;
        pintarEnCasilla(filaleatoria3, columnaleatoria3, "red");
        turnoJugador = "jugador1";
        textoturno.textContent = "Turno del Jugador 1";
        buscarGanador();
      } else {
        casillaAleatoriaSeisFichas();
      }
    } else {
      casillaAleatoriaSeisFichas();
    }
  }
}

function gestionarCasillaSeisFichas(fila, columna) {
  if (turnoJugador == "jugador1") {
    if (!hay3CasillasPuestas("jugador1")) {
      if (tablero[fila][columna] != 1 && tablero[fila][columna] != 2) {
        tablero[fila][columna] = 1;
        pintarEnCasilla(fila, columna, "blue");
        gestionarTurno(turnoJugador);
        buscarGanador();
        contfichasjug1--;
      }
      if (tipoPartida == "jugadorvsaleatorio" && turnoJugador == "jugador2") {
        casillaAleatoriaSeisFichas();
      }
      if (tipoPartida == "jugadorvsia" && turnoJugador == "jugador2") {
        colocarIA();
      }
    } else {
      if (tablero[fila][columna] == 1) {
        tablero[fila][columna] = 0;
        pintarEnCasilla(fila, columna, "transparent");
        contfichasjug1++;
      }
    }
  } else if (turnoJugador == "jugador2") {
    if (!hay3CasillasPuestas("jugador2")) {
      if (tablero[fila][columna] != 2 && tablero[fila][columna] != 1) {
        tablero[fila][columna] = 2;
        pintarEnCasilla(fila, columna, "red");
        gestionarTurno(turnoJugador);
        buscarGanador();
        contfichasjug2--;
      }
    } else {
      if (tablero[fila][columna] == 2) {
        tablero[fila][columna] = 0;
        pintarEnCasilla(fila, columna, "transparent");
        contfichasjug2++;
      }
    }
  }
  quedanCasillas();
  if (!restanCasillas && !seHaGanado) {
    empatarPartida();
  }
}
/*GESTIONA LAS CASILLAS Y COMO SE HACE EL FUNCIONAMIENTO INTERNAMENTE*/
function gestionarCasilla(fila, columna) {
  if (restanCasillas) {
    if (tablero[fila][columna] == 0) {
      if (turnoJugador == "jugador1") {
        tablero[fila][columna] = 1;
        pintarEnCasilla(fila, columna, "blue");
        gestionarTurno(turnoJugador);
        buscarGanador();
        if (tipoPartida == "jugadorvsaleatorio" && turnoJugador == "jugador2") {
          setTimeout(function () {
            casillaAleatoria();
          }, 300);
        }
        if (tipoPartida == "jugadorvsia" && turnoJugador == "jugador2") {
          setTimeout(function () {
            colocarIA();
          }, 300);
        }
      } else if (turnoJugador == "jugador2") {
        tablero[fila][columna] = 2;
        pintarEnCasilla(fila, columna, "red");
        gestionarTurno(turnoJugador);
        buscarGanador();
      }
    } else {
      alert("La casilla ya esta seleccionada");
    }
  }
  quedanCasillas();
  if (!restanCasillas && !seHaGanado) {
    empatarPartida();
  }
}

/*GESTIONA Y CAMBIAR EL TURNO DEL JUGADOR*/
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
  let segundos = 31;

  contador = setInterval(function () {
    if (segundos == 0) {
      if (turnoJugador == "jugador1") {
        partidasganadasjugador2++;
        partidasperdidasjugador1++;
      } else {
        partidasganadasjugador1++;
        partidasperdidasjugador2++;
      }
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

/*CONTADOR PARA LOS SEGUNDOS RESTANTES DEL MOVIMIENTO*/
function cronometroTotal() {
  let segundos = 181;

  tiempoTotal = setInterval(function () {
    if (segundos == 0) {
      partidasempatadasjugador1++;
      partidasempatadasjugador2++;
      alert("Se acabó el tiempo de la Partida");
      generarJuego();
    } else {
      segundos--;
      tiempoTotalTexto.textContent = "Tiempo restante de Partida: " + segundos;
    }
  }, 1000);
}

/*FUNCION DE COLOCAR UNA CASILLA POR PARTE DE LA IA*/
function colocarIA() {
  if (tipoFichas == "seisfichas") {
    if (hay3CasillasPuestas("jugador2")) {
      let filaleatoria = Math.floor(Math.random() * 3);
      let columnaleatoria = Math.floor(Math.random() * 3);
      if (tablero[filaleatoria][columnaleatoria] == 2) {
        tablero[filaleatoria][columnaleatoria] = 0;
        pintarEnCasilla(filaleatoria, columnaleatoria, "transparent");
        contfichasjug2++;
      } else {
        colocarIA();
        return;
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    /*LA IA TRATA DE GANAR SIN MIRAR SI TE BLOQUEA O No*/
    if (tablero[i][0] == 2 && tablero[i][1] == 2 && tablero[i][2] == 0) {
      pintarEnCasilla(i, 2, "red");
      tablero[i][2] = 2;
      turnoJugador = "jugador1";
      textoturno.textContent = "Turno del Jugador 1";
      contfichasjug2--;
      buscarGanador();
      return;
    }
    if (tablero[i][0] == 2 && tablero[i][2] == 2 && tablero[i][1] == 0) {
      pintarEnCasilla(i, 1, "red");
      tablero[i][1] = 2;
      turnoJugador = "jugador1";
      textoturno.textContent = "Turno del Jugador 1";
      contfichasjug2--;

      buscarGanador();
      return;
    }
    if (tablero[i][1] == 2 && tablero[i][2] == 2 && tablero[i][0] == 0) {
      pintarEnCasilla(i, 0, "red");
      tablero[i][0] = 2;
      turnoJugador = "jugador1";
      textoturno.textContent = "Turno del Jugador 1";
      contfichasjug2--;

      buscarGanador();
      return;
    }
    if (tablero[0][i] == 2 && tablero[1][i] == 2 && tablero[2][i] == 0) {
      pintarEnCasilla(2, i, "red");
      tablero[2][i] = 2;
      turnoJugador = "jugador1";
      textoturno.textContent = "Turno del Jugador 1";
      contfichasjug2--;

      buscarGanador();
      return;
    }
    if (tablero[0][i] == 2 && tablero[2][i] == 2 && tablero[1][i] == 0) {
      pintarEnCasilla(1, i, "red");
      tablero[1][i] = 2;
      turnoJugador = "jugador1";
      textoturno.textContent = "Turno del Jugador 1";
      contfichasjug2--;

      buscarGanador();
      return;
    }
    if (tablero[1][i] == 2 && tablero[2][i] == 2 && tablero[0][i] == 0) {
      pintarEnCasilla(0, i, "red");
      tablero[0][i] = 2;
      turnoJugador = "jugador1";
      textoturno.textContent = "Turno del Jugador 1";
      contfichasjug2--;

      buscarGanador();
      return;
    }
    /*BLOQUEA AL JUGADOR*/
    if (tablero[i][0] == 1 && tablero[i][1] == 1 && tablero[i][2] == 0) {
      pintarEnCasilla(i, 2, "red");
      tablero[i][2] = 2;
      turnoJugador = "jugador1";
      textoturno.textContent = "Turno del Jugador 1";
      contfichasjug2--;

      buscarGanador();
      return;
    }
    if (tablero[i][0] == 1 && tablero[i][2] == 1 && tablero[i][1] == 0) {
      pintarEnCasilla(i, 1, "red");
      tablero[i][1] = 2;
      turnoJugador = "jugador1";
      textoturno.textContent = "Turno del Jugador 1";
      contfichasjug2--;

      buscarGanador();
      return;
    }
    if (tablero[i][1] == 1 && tablero[i][2] == 1 && tablero[i][0] == 0) {
      pintarEnCasilla(i, 0, "red");
      tablero[i][0] = 2;
      turnoJugador = "jugador1";
      textoturno.textContent = "Turno del Jugador 1";
      contfichasjug2--;

      buscarGanador();
      return;
    }
    if (tablero[0][i] == 1 && tablero[1][i] == 1 && tablero[2][i] == 0) {
      pintarEnCasilla(2, i, "red");
      tablero[2][i] = 2;
      turnoJugador = "jugador1";
      textoturno.textContent = "Turno del Jugador 1";
      contfichasjug2--;

      buscarGanador();
      return;
    }
    if (tablero[0][i] == 1 && tablero[2][i] == 1 && tablero[1][i] == 0) {
      pintarEnCasilla(1, i, "red");
      tablero[1][i] = 2;
      turnoJugador = "jugador1";
      textoturno.textContent = "Turno del Jugador 1";
      contfichasjug2--;

      buscarGanador();
      return;
    }
    if (tablero[1][i] == 1 && tablero[2][i] == 1 && tablero[0][i] == 0) {
      pintarEnCasilla(0, i, "red");
      tablero[0][i] = 2;
      turnoJugador = "jugador1";
      textoturno.textContent = "Turno del Jugador 1";
      contfichasjug2--;

      buscarGanador();
      return;
    }
  }
  /*TRATA DE GANAR ELLA SOLA*/
  if (tablero[0][0] == 2 && tablero[1][1] == 2 && tablero[2][2] == 0) {
    pintarEnCasilla(2, 2, "red");
    tablero[2][2] = 2;
    turnoJugador = "jugador1";
    textoturno.textContent = "Turno del Jugador 1";
    contfichasjug2--;

    buscarGanador();
    return;
  }
  if (tablero[0][0] == 2 && tablero[2][2] == 2 && tablero[1][1] == 0) {
    pintarEnCasilla(1, 1, "red");
    tablero[1][1] = 2;
    turnoJugador = "jugador1";
    textoturno.textContent = "Turno del Jugador 1";
    contfichasjug2--;

    buscarGanador();
    return;
  }
  if (tablero[2][2] == 2 && tablero[1][1] == 2 && tablero[0][0] == 0) {
    pintarEnCasilla(0, 0, "red");
    tablero[0][0] = 2;
    turnoJugador = "jugador1";
    textoturno.textContent = "Turno del Jugador 1";
    contfichasjug2--;

    buscarGanador();
    return;
  }
  if (tablero[0][2] == 2 && tablero[1][1] == 2 && tablero[2][0] == 0) {
    pintarEnCasilla(2, 0, "red");
    tablero[2][0] = 2;
    turnoJugador = "jugador1";
    textoturno.textContent = "Turno del Jugador 1";
    contfichasjug2--;

    buscarGanador();
    return;
  }
  if (tablero[2][0] == 2 && tablero[1][1] == 2 && tablero[0][2] == 0) {
    pintarEnCasilla(0, 2, "red");
    tablero[0][2] = 2;
    turnoJugador = "jugador1";
    textoturno.textContent = "Turno del Jugador 1";
    contfichasjug2--;

    buscarGanador();
    return;
  }
  /*TRATA DE BLOQUEARTE A TI*/
  if (tablero[0][0] == 1 && tablero[1][1] == 1 && tablero[2][2] == 0) {
    pintarEnCasilla(2, 2, "red");
    tablero[2][2] = 2;
    turnoJugador = "jugador1";
    textoturno.textContent = "Turno del Jugador 1";
    contfichasjug2--;

    buscarGanador();
    return;
  }
  if (tablero[0][0] == 1 && tablero[2][2] == 1 && tablero[1][1] == 0) {
    pintarEnCasilla(1, 1, "red");
    tablero[1][1] = 2;
    turnoJugador = "jugador1";
    textoturno.textContent = "Turno del Jugador 1";
    contfichasjug2--;

    buscarGanador();
    return;
  }
  if (tablero[2][2] == 1 && tablero[1][1] == 1 && tablero[0][0] == 0) {
    pintarEnCasilla(0, 0, "red");
    tablero[0][0] = 2;
    turnoJugador = "jugador1";
    textoturno.textContent = "Turno del Jugador 1";
    contfichasjug2--;

    buscarGanador();
    return;
  }
  if (tablero[0][2] == 1 && tablero[1][1] == 1 && tablero[2][0] == 0) {
    pintarEnCasilla(2, 0, "red");
    tablero[2][0] = 2;
    turnoJugador = "jugador1";
    textoturno.textContent = "Turno del Jugador 1";
    contfichasjug2--;

    buscarGanador();
    return;
  }
  if (tablero[2][0] == 1 && tablero[1][1] == 1 && tablero[0][2] == 0) {
    pintarEnCasilla(0, 2, "red");
    tablero[0][2] = 2;
    turnoJugador = "jugador1";
    textoturno.textContent = "Turno del Jugador 1";
    contfichasjug2--;

    buscarGanador();
    return;
  }

  casillaAleatoria();
  contfichasjug2--;
}
gestionarBotones();
mostrarEstadisticas();
