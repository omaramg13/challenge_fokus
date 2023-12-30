let boton_principal = document.getElementById("boton_principal");
let tabFocus = document.getElementById("tab_focus");
let tabDescansoC = document.getElementById("tab_dc");
let tabDescansoL = document.getElementById("tab_dl");
let contador = document.getElementById("contador");
let tiempoEnSegundos = 1500;
let contador_focus = 1500;
let contador_dc = 300;
let contador_dl = 90;

let intervalId = null;

const styleFocusTabs = `
border-radius: 8px;
border: 2px solid rgba(24, 117, 233, 0.50);
background: rgba(24, 117, 233, 0.30); 
`;

const styleNoFocusTabs = `
border-radius: 0;
border: 0;
background: none; 
`;

function cuenta_regresiva(){
    if (tiempoEnSegundos < 0){
        cerrar();
        alert("Tiempo finalizado");        
        return;
    }
    console.log(tiempoEnSegundos);
    mostrarTiempo();
    tiempoEnSegundos = tiempoEnSegundos-1;   

}

boton_principal.addEventListener("click", iniciarPausar);

function iniciarPausar(){
    if (intervalId){
        boton_principal.textContent = "Iniciar";
        cerrar();
        return;
    }
    intervalId = setInterval(cuenta_regresiva,1000);
    boton_principal.textContent="Pausar";
}

function cerrar(){
    clearInterval(intervalId);
    intervalId=null;
    boton_principal.textContent="Iniciar";
}

function pad(num){
    return num < 10 ? "0" + num : num;
}

function mostrarTiempo(){
    let minutos = parseInt(tiempoEnSegundos / 60);
    let segundos = tiempoEnSegundos % 60;
    contador.innerHTML = `${pad(minutos)}:${pad(segundos)}`;

}

function cargar(){
    mostrarTiempo();
}

cargar();