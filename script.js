let tabla = document.querySelector("#tabla");
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

function seleccionarCasilla(){
    let posiciones = document.querySelectorAll("td");
    for(let posicion of posiciones){
        posicion.addEventListener("click", function(){
            console.log(posicion);
        })
    }
}
pintarTablero();
generarTablero();
seleccionarCasilla();
console.log(seleccionarCasilla());
