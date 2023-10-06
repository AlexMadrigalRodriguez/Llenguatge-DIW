const form = document.querySelector('form');
const nom = document.querySelector("#nom");
const llin1 = document.querySelector("#llin1");
const llin2 = document.querySelector("#llin2");
const usuari = document.querySelector("#usuari");
const password = document.querySelector("#password");
const pais = document.querySelector("#pais");
const cp = document.querySelector("#cp");
const dni = document.querySelector("#dni");
const captcha = document.querySelector("#captcha");
const esp = document.querySelector("#esp");

const usuaris = ["daniel82", "manuel223", "darknight1", "mrNum.1234"];

form.onsubmit = function (event) {
    form.querySelectorAll("input").forEach(element => {
        element.dispatchEvent(new Event("input"));
    });

    validaCaptcha();

    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        alert("Revisau les errades abans de continuar");
    }

    form.classList.add('was-validated');
};

/* Attach events oninput*/
nom.oninput = function(){
    setValidity(this, validaLlargaria(this.value, 2, 24) + nomesLletres(this.value));
};

llin1.oninput = function(){
    setValidity(this, validaLlargaria(this.value, 2, 24) + nomesLletres(this.value));
};

llin2.oninput = function(){
    setValidity(this, comprobar(this.value)+comprobar2(this.value));
};

usuari.oninput = function(){
    setValidity(this, validaLlargaria(this.value, 6, 16) + usuarisReps(this.value, usuaris));
};

password.oninput = function(){
    setValidity(this, validaLlargaria(this.value, 8, 16) + caractersObligatoris(this.value));
};

cp.oninput = function(){
    setValidity(this, validaLlargaria(this.value, 5, 5) + nomesNum(this.value));
};

dni.oninput = function(){
    setValidity(this, validateDNI(this.value) + validaLlargaria(this, 9, 9));
};

captcha.onsubmit = function(){
    setValidity(this, validaCaptcha(this.value));
}


/* Funció que marca els inputs com a vàlids/invàlids*/
function setValidity(element, msgError) {
    element.classList.remove("is-invalid");
    element.classList.remove("is-valid");

    if (msgError.length == 0) {
        element.classList.add("is-valid");
    } else {
        element.classList.add("is-invalid");
    }

    element.setCustomValidity(msgError);
    document.querySelector(`#error-${element.id}`).textContent = msgError;
}


/* CAPTCHA */
var generaCaptcha = function(){

}();

function validaCaptcha(){

}

function comprobar (input){
    if(input.length>0){
        return validaLlargaria(input, 2, 24);
    }else{
        return "";
    }
}

function comprobar2 (input){
    if(input.length>0){
        return nomesLletres(input);
    }else{
        return "";
    }
}

function validaLlargaria(input, min, max){
    if (input.length>0){
    if((input.length<min || input.length > max) && min==max) return `Únicament ${min} caracters.`;

    if(input.length<min || input.length > max) return `La mida ha d'estar entre ${min} i ${max}.`;
    }

    return "";
}

function nomesLletres(input){

    var regExp = /^[A-Za-zÁ-Ź\s]*$/

    return regExp.test(input)?"":"Solo lletres";
}

function usuarisReps(input, usuaris){
    for (i = 0; i<usuaris.length ; i++){
        if(input == usuaris[i]){
            return "Aquest usuari ja esta seleccionat.";
        }
    }

    return "";
}

function caractersObligatoris(input){
    if(input.length>0){
    var mal = "Minim ha d'inclure: ";
    var mal2 = "Minim ha d'inclure: ";

    var maysc = /^(?=.*[A-Z]).{1,16}$/;
    mal2+= maysc.test(input)?"":"Mayuscula. "
    var minsc = /^(?=.*[a-z]).{1,16}$/;
    mal2+= minsc.test(input)?"":"Minuscula. "
    var dig = /^(?=.*\d).{1,16}$/;
    mal2+= dig.test(input)?"":"Digit. "
    var especial = /^(?=.*[^a-zA-Z0-9])(?!.*\s).{1,16}$/;
    mal2+= especial.test(input)?"":"Caracter especial. "

    if(mal2.length>mal.length){
    return mal2;
    }
    return "";
}
}

function nomesNum(input){
    if (input.length>0){
    var regExp = /^[0-9]*$/

    return regExp.test(input)?"":"Solo números";
    }
}

pais.oninput = function(){
    if(pais.value != "4") {
        cp.setAttribute("disabled", "disabled");
        dni.setAttribute("disabled", "disabled");
        cp.setAttribute("required", "required");
        dni.setAttribute("required", "required");
        document.getElementById("cp").value = "";
        document.getElementById("dni").value = "";
    }

    if(pais.value == "4") {
        cp.removeAttribute("disabled");
        dni.removeAttribute("disabled");
        cp.removeAttribute("required");
        dni.removeAttribute("required");
    }
}

function validateDNI(input) {
    var numero
    var letr
    var letra
    var expresion_regular_dni
   
    expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
   
    if(expresion_regular_dni.test (input) == true){
       numero = input.substr(0,input.length-1);
       letr = input.substr(input.length-1,1);
       numero = numero % 23;
       letra='TRWAGMYFPDXBNJZSQVHLCKET';
       letra=letra.substring(numero,numero+1);
      if (letra!=letr.toUpperCase()) {
         return "Lletra incorrecta";
       }else{
        return "";
       }
    }else{
        var nums = /^[0-9]*$/
        return nums.test(input)?"":"Format invalid";
    }
  }

  var generaCaptcha = function() {
    var comprobar = 0;
	Valor1 = Math.round(Math.random() * 9);
	Valor2 = Math.round(Math.random() * 9);
	var operacion = Math.round (Math.random() * 1);
    var calc = ["+", "-"];
    if (calc == "+"){
        comprobar = 1;
    }
    if ( comprobar>0){
        soluc = Valor1 + Valor2;
    }else{
        soluc = Valor1 - Valor2;
    }
    ResultadoCaptcha.textContent = Valor1 + calc[operacion] + Valor2;
    
}();

/* Función que comprueba que el resultado sea la suma de los dos valores generados */
function ValidarCaptcha(input, ResultadoCaptcha) {
	if (document.getElementById("ResultadoCaptcha").value == (Valor1 + Valor2)) {
		alert("Captcha validado");
		GenerarCaptcha();
	}
	else {
		alert("El valor introducido no es válido.");
	}
}