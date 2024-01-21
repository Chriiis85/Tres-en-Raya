let tabla = document.querySelector("#tabla");
let botones = document.querySelectorAll("button");

let numerofilas = 3;
let numerocolumnas = 3;
let tablero = [];

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

function generarTablero() {
  for (let i = 0; i < numerofilas; i++) {
    const columnas = [];
    for (let c = 0; c < numerocolumnas; c++) {
      columnas.push(c);
    }
    tablero.push(columnas);
  }
}

function seleccionarCasilla() {
  let posiciones = document.querySelectorAll("td");
  for (let posicion of posiciones) {
    posicion.addEventListener("click", function () {
      console.log(posicion);
    });
  }
}
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

        default:
          break;
      }
    });
  }
}

pintarTablero();
generarTablero();
seleccionarCasilla();
gestionarBotones();
console.log(seleccionarCasilla());
