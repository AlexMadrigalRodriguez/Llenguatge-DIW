const rover = document.querySelector("#rover");
const data = document.querySelector("#data");
const pagina = document.querySelector("#pagina");
const camara = document.querySelector("#camara");
const btnCarrega = document.querySelector("#cargar");
const tbody = document.querySelector("tbody");
const loading = document.querySelector("#loading")
const title = document.querySelector("title");
var resetear = "";
var comprovarCamara = "no";
var comprovarData = "no";
var comprovarPagina = "no";

var URL = ``;

rover.oninput = function () {
    if (resetear.length) {
        URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover.value}/photos?api_key=PB1Swn7MVuWFaokTU60sNyQqJbAcDIIewaufTW8C`
        resetear = "";
        pagina.selectedIndex = null;
        data.value = "";
        camara.selectedIndex = null;
    } else {
        URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover.value}/photos?api_key=PB1Swn7MVuWFaokTU60sNyQqJbAcDIIewaufTW8C`;
        data.removeAttribute("disabled");
        pagina.removeAttribute("disabled");
        camara.removeAttribute("disabled");
    }
}

pagina.oninput = function () {
    URL += `&page=${pagina.value}`;
    resetear = "si";
    comprovarPagina = "";
}

data.oninput = function () {
    URL += `&earth_date=${data.value}`;
    resetear = "si";
    comprovarData = "";
}

camara.oninput = function () {
    URL += `&camera=${camara.value}`;
    resetear = "si";
    comprovarCamara = "";
}

btnCarrega.onclick = carrega;



function carrega() {
    loading.removeAttribute("style");
    if ((!resetear.length || comprovarCamara.length) || (comprovarData.length || comprovarPagina.length)) {
        alert("Selecciona tots els camps hostia")
    }
    fetch(URL)
        .then(response => {
            if (response.ok) return response.json();
            else {
                alert("No s'ha pogut completar la càrrega. Error " + response.status)
            }
        })
        .then(data => {
            carregaDades(data);
        });
}

function carregaDades(dades) {
    let resultat = "";
    let resultat2 = "";

    if (dades.photos.length) {
        dades.photos.forEach(function (element) {
            var fechaESP = invertir(element.earth_date);
            resultat += `<p>
            <label>L'ID de l'imatge és: ${element.id} | feta amb la camara ${element.camera.full_name}(${element.camera.name})
             el dia ${fechaESP}</label>
             <label><img src="${element.img_src}"></label>
            </p>`

            resultat2 += `${element.rover.landing_date} | ${element.rover.launch_date} | ${element.rover.status}`
        });
    } else {
        alert("No s'han trobat dades amb auqesta informació");
    }

    tbody.innerHTML = resultat;
    title.innerHTML = resultat2;
    loading.style.display = "none";
}

function invertir(data) {
    let arr = data.split("-");
    let res = arr[2] + "/" + arr[1] + "/" + arr[0];

    return res;
}