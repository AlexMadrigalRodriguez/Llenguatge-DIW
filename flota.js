const reset = document.getElementById("reset");
const canvas1  = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const context1 = canvas1.getContext('2d');
const context2 = canvas2.getContext('2d');
const area = document.getElementById("area");

const num_files = 11;
const num_col = 11;
const letras = ["", "A", "B","C", "D","E", "F","G", "H","I", "J",]

const ancho = canvas2.width / num_col;
const alto = canvas1.height / num_files;
let tablero1 = Array.from({length: num_files},() => new Array(num_col));
let tablero2 = Array.from({length: num_files},() => new Array(num_col));
let tableroPintar1 = Array.from({length: num_files},() => new Array(num_col));
let tableroPintar2 = Array.from({length: num_files},() => new Array(num_col));

function dibujaCuadricula(contexto){
  var jugador = new Image();
    contexto.strokeStyle = 'green';
    contexto.fillStyle = 'blue';
    jugador.src = './img/ye.jpg';
    if (contexto == context2){
        contexto.fillStyle = 'red';
        jugador.src = './img/walle.jpg';
    }

    var imagen = new Image();
    imagen.src = './img/agua.jpg';
    
    imagen.onload = function() {
    contexto.drawImage(imagen, 0, 0, canvas1.width, canvas1.height);
    for (let fila = 0; fila < num_files; fila++) {
        for (let col = 0; col < num_col; col++) {
            if (fila == 0 | col == 0){
                contexto.fillRect(col * ancho, fila * alto, ancho, alto);
                if (fila == 0 && col == 0) {
                  contexto.drawImage(jugador, 0, 0, ancho, alto);
                }
                if (fila > 0 && col == 0) {
                  contexto.font = 'bold 12px Arial';
                  contexto.fillStyle = 'white';
                  contexto.fillText(letras[fila], col * ancho + ancho/3, fila * alto + alto/2);
                  contexto.fillStyle = 'blue';
                  if (contexto == context2){
                    contexto.fillStyle = 'red';
                  }
                  }
                  if(fila == 0 && col>0){
                  contexto.font = 'bold 12px Arial';
                  contexto.fillStyle = 'white';
                  contexto.fillText(col.toString(), col * ancho + ancho/3, fila * alto+alto/2);
                  contexto.fillStyle = 'blue';
                  if (contexto == context2){
                    contexto.fillStyle = 'red';
                  }
                  }
            }
            contexto.strokeRect(col * ancho, fila * alto, ancho, alto);
        }
    }
    cargaBarcos(contexto);
};
};

canvas2.addEventListener('click', function(evento){
    const x = evento.clientX - canvas2.offsetLeft;
    const y = evento.clientY -canvas2.offsetTop;
    const columna = Math.floor(x/ancho);
    const fila = Math.floor(y/alto);
    if ( fila>0 && columna>0){
        disparo(context2, fila, columna);
        var Filamaquina = Math.floor(Math.random() * num_files);
        var Colmaquina = Math.floor(Math.random() * num_col);
        while(Filamaquina==0 || Colmaquina==0 || tablero1[Filamaquina][Colmaquina]=="X"){
            Filamaquina = Math.floor(Math.random() * num_files);
            Colmaquina = Math.floor(Math.random() * num_col);
        }
        disparo(context1, Filamaquina, Colmaquina);

    }
});

function disparo(contexto, fila, columna) {
    let tablero;
    let jugador;
    let tableroPintar;
  
    if (contexto == context1) {
      tablero = tablero1;
      jugador = "J2";
      tableroPintar = tableroPintar1;
    } else {
      tablero = tablero2;
      jugador = "J1";
      tableroPintar = tableroPintar2;
    }
  
    let posicion = tablero[fila][columna];
    console.log(posicion);
    
    if (posicion == undefined) {
      area.textContent += `${jugador}: (${letras[fila]},${columna}) AGUA\n`;
      contexto.fillStyle = 'white';
      contexto.fillRect(columna * ancho, fila * alto, ancho, alto);
    } else if (posicion == "X") {
      area.textContent += `${jugador}: (${letras[fila]},${columna}) Ya se ha disparado aquí.\n`;
    } else {
      area.textContent += `${jugador}: (${letras[fila]},${columna}) TOCADO`;
      contexto.fillStyle = 'orange';
      contexto.fillRect(columna * ancho, fila * alto, ancho, alto);
      tablero[fila][columna] = "X";
  
      let barcoHundido = true;
  
      for (let x = 0; x < tablero.length; x++) {
        for (let y = 0; y < tablero[x].length; y++) {
          if (tablero[x][y] == posicion) {
            barcoHundido = false;
            break;
          }
        }
        if (!barcoHundido) {
            area.textContent+= `\n`;
          break;
        }
      }
  
      if (barcoHundido) {
        area.textContent += " Y HUNDIDO\n";
        contexto.fillStyle = 'red';
        for (let f = 0; f < tableroPintar.length; f++) {
          for (let c = 0; c < tableroPintar[f].length; c++) {
            if (tableroPintar[f][c] == posicion) {
              contexto.fillRect(c * ancho, f * alto, ancho, alto);
            }
          }
        }
      }
    }
  
    tablero[fila][columna] = "X";

    let quedanElementos = false;

for (let fila = 0; fila < tablero.length; fila++) {
  for (let columna = 0; columna < tablero[fila].length; columna++) {
    if (tablero[fila][columna] != "X" && tablero[fila][columna] != undefined) {
      quedanElementos = true;
      break;
    }
  }
  if (quedanElementos) {
    break;
  }
}

if (!quedanElementos) {
  setTimeout(function() {
    alert(`Fin de la partida | GANADOR: ${jugador} GG`);
    location.reload();
  }, 100)
  } }
  

reset.addEventListener('click', function(){
    location.reload();
});



function cargaBarcos(contexto){

    let url;

    if(contexto == context1){
        url="./flota.json";
    }else{
        url="./flota2.json";
    }

    fetch(url)
    .then(response => {
        
       if(response.ok) return response.json()
       else{
            alert("No s'ha pogut completar la carrega. Error" + response.status)
       }
    })
    .then(data => {
        console.log(data);
        data.barcos.forEach(barco =>{
            pintaBarcos (contexto, barco);
        });
    });
};

function pintaBarcos (contexto, barco){
    var codi = barco.codi;
    var longitud = barco.longitud;
    var orientacion = barco.posicion.orientacion;
    var col = barco.posicion.col;
    var fila = barco.posicion.fila;
    var color = barco.color;

    while(longitud>0){
        contexto.fillStyle = color;
        if(contexto==context1){
        contexto.fillRect(col * ancho, fila * alto, ancho, alto);
        tablero1[fila][col] = codi;
        tableroPintar1[fila][col] = codi;
        }else{
        tablero2[fila][col] = codi;
        tableroPintar2[fila][col] = codi;
        }

        if (orientacion == 'H') {
            col++;
        } else if (orientacion == 'V') {
            fila++;
        }

        longitud--;
    };
};

console.log(tablero1);
console.log(tablero2);
console.log(tableroPintar2);

dibujaCuadricula(context1);
dibujaCuadricula(context2);