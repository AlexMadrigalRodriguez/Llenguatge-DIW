const tbody = document.querySelector("tbody");
const btnCarrega = document.querySelector("#carrega");

btnCarrega.onclick = carrega;

function carrega() {
    fetch("./carregaFormulari.json")
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
    var persones = dades.persones;
    var resultat = "";
    persones.forEach(function (element) {
        resultat += `<tr><td>${element.nom}<td>${element.llin1}</td></td></tr>`;
    });

    tbody.innerHTML=resultat;
}