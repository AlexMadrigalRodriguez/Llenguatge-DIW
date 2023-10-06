var botoHola = document.querySelector("#botoHola");
var botoCrea = document.querySelector("#botoCrea");
var botoRemove = document.querySelector("#botoRemove");
var divCreacio = document.querySelector("#creacio");
var primerP = document.querySelector("#primerP");
var btnCanvi = document.querySelector("#divEnllac button");
var textarea = document.querySelector("textarea");
var numLletres = document.querySelector("#numLletres");

botoHola.onclick = function(){this.textContent = "BYE!";};
botoHola.onmouseover = toggleInvisible;
botoHola.onmouseout = toggleInvisible;
botoCrea.onclick = function(){divCreacio.innerHTML="<h1>Som un h1</h1>";};
botoRemove.onclick = function(){divCreacio.innerHTML="";};
textarea.onkeyup = function(){
    numLletres.textContent = textarea.value.length;
}

document.body.oncopy = function(){
    alert("No pots copiar");
    return false;
}

btnCanvi.onclick = function(){
    var a  = document.querySelector("#divEnllac a");
    a.textContent = "Yahoo!";
    a.setAttribute("href", "https://www.yahoo.es");
};

function toggleInvisible(){
    primerP.classList.toggle("invisible");
}