const nom = document.querySelector("#nom");
const btnNorm = document.querySelector("#btnNorm");
const nomNormalitzat = document.querySelector("#nomNormalitzat");
const btnGenera = document.querySelector("#generaArray");
const btnInvert = document.querySelector("#btnInvert");
const resultatArray = document.querySelector("#resultatArray");
let numsRandom = [];
const calculo = document.querySelector("#calculo");
const tipoCalc = document.querySelector("#tipoCalc");
const btnCalc = document.querySelector("#btnCalc");
const resCalc = document.querySelector("#resCalc");


btnNorm.onclick = function () {
    let res = "";
    res += nom.value.replace(/\s+/g, "");
    res = res.toLowerCase();
    res = res.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    nomNormalitzat.innerHTML = res;
}

btnGenera.onclick = function () {
    let mayor = 0;
    let pos = 0;
    for (let i = 0; i < 10; i++) {
        numsRandom[i] = Math.round(Math.random() * 100);
        if (numsRandom[i] > mayor) {
            mayor = numsRandom[i];
            pos = i;
        }
    }
    resultatArray.innerHTML = `${numsRandom}`;
}

btnInvert.onclick = function () {
    resultatArray.innerHTML = `${numsRandom.reverse()}`;
}

btnCalc.onclick = function () {
    var pi = Math.PI;
    var circunferencia = 2 * pi * calculo.value;
    var area = pi * calculo.value ** 2;
    var volumen = 4 / 3 * pi * calculo.value ** 3;

    if (tipoCalc.value == "1") {
        resCalc.innerHTML = circunferencia.toFixed(2);
    } else if (tipoCalc.value == "2") {
        resCalc.innerHTML = area.toFixed(2);
    } else {
        resCalc.innerHTML = volumen.toFixed(2);
    }
}