const cañon = document.querySelector("#arma");
const joselu = document.querySelector("#joselu");

cañon.onclick = dispara;

function dispara(){
    var animacion = document.getElementById("animacion");
  animacion.beginElement();
  joselu.setAttribute('fill', 'black');
}