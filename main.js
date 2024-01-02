const listaTabs = document.querySelectorAll(".tabs");
let boton_principal = document.getElementById("boton_principal");
let contador = document.getElementById("contador");
let tiempoEnSegundos = 25;
let intervalId = null;
let tabActivaId = 'tab_focus';

let contador_focus = 25;
let contador_dc = 5;
let contador_dl = 15;

function cuenta_regresiva(){
    if (tiempoEnSegundos <= 0){
        cerrar();        
        alert("Tiempo finalizado");
        
        if(tabActivaId==='tab_focus') {
            tiempoEnSegundos=25;
            mostrarTiempo();

        }

        else if(tabActivaId==='tab_dc') {
            tiempoEnSegundos=5;
            mostrarTiempo();

        }

        else if(tabActivaId==='tab_dl'){
            tiempoEnSegundos=15;
            mostrarTiempo();

        }

        return;

    }

    console.log(tiempoEnSegundos);
    tiempoEnSegundos = tiempoEnSegundos-1;
    mostrarTiempo();

}


boton_principal.addEventListener("click", iniciarPausar);


function iniciarPausar(){
    if (intervalId){
        //boton_principal.textContent = "Iniciar";
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
    tabActiva(tabActivaId);

}


for (let i = 0; i < listaTabs.length; i++) {
    const tabClickClase = listaTabs[i];
    const tabClickId = tabClickClase.classList[1];

    tabClickClase.onclick = function() { 
        
        for (let j = 0; j < listaTabs.length; j++) {
            const tabsInactivasClase = listaTabs[j];
            const tabInactivaId = tabsInactivasClase.classList[1];
            
            if (!tabsInactivasClase.classList.contains(tabClickId) && tabsInactivasClase.classList.contains('activa')) {

                if(tabInactivaId === 'tab_focus') {
                    contador_focus = tiempoEnSegundos;
                } else if (tabInactivaId === 'tab_dc') {
                    contador_dc = tiempoEnSegundos;
                } else if (tabInactivaId === 'tab_dl') {
                    contador_dl = tiempoEnSegundos;
                }

                tabActiva(tabInactivaId);
                
            }

        }
        
        if(tabClickId === 'tab_focus' && !tabClickClase.classList.contains('activa')) {
            tiempoEnSegundos = contador_focus;
            cerrar();
            mostrarTiempo();
            tabActiva(tabClickId);
            
        }
        
        else if (tabClickId === 'tab_dc' && !tabClickClase.classList.contains('activa')) {
            tiempoEnSegundos = contador_dc;
            cerrar();
            mostrarTiempo();
            tabActiva(tabClickId);
        
        }
        
        else if (tabClickId === 'tab_dl' && !tabClickClase.classList.contains('activa')) {
            tiempoEnSegundos = contador_dl;
            cerrar();
            mostrarTiempo();
            tabActiva(tabClickId);

        }
    
    }

    tabClickClase.onkeydown = function(evento) {
        if (evento.code === "Space" || evento.code === "Enter") {
            if(!tabClickClase.classList.contains('activa')) {
                tabActiva(tabClickId);
            }
            
        }
    }
    
    tabClickClase.onkeyup = function(evento) {
        if (evento.code === "Space" || evento.code === "Enter") {
            if(!tabClickClase.classList.contains('activa')) {
                tabActiva(tabClickId);
            }
            
        }
    }

}

function tabActiva(idClaseTab) {
    document.getElementById(idClaseTab).classList.toggle('activa');
}

cargar();

