const listaTabs = document.querySelectorAll(".tabs");
let boton_principal = document.getElementById("boton_principal");
let contador = document.getElementById("contador");
let tiempoEnSegundos = 60*25;
let intervalId = null;
let tabActivaId = 'tab_focus';

let contador_focus = 60*25;
let contador_dc = 60*5;
let contador_dl = 60*15;


function cuenta_regresiva(){
    if (tiempoEnSegundos <= 0){
        cerrar();        
        
        if(tabActivaId === 'tab_focus') {
            tiempoEnSegundos=60*25;
            reinicio_temporizador(tabActivaId);

        }

        else if(tabActivaId === 'tab_dc') {
            tiempoEnSegundos=60*5;
            reinicio_temporizador(tabActivaId);

        }

        else if(tabActivaId === 'tab_dl'){
            tiempoEnSegundos=60*15;
            reinicio_temporizador(tabActivaId);

        }

        return;

    }

    tiempoEnSegundos -= 1;
    mostrarTiempo();

}


function reinicio_temporizador(tabActivaId){
    mostrarTiempo();
    controlSonido(`sonido_${tabActivaId}`,'stop');
    controlSonido(`alert_${tabActivaId}`,'play');

}


boton_principal.addEventListener("click", iniciarPausar);


function iniciarPausar(){
    if (intervalId){
        //boton_principal.textContent = "Iniciar";
        cerrar();
        return;

    }
    
    intervalId = setInterval(cuenta_regresiva,1000);
    controlSonido(`sonido_${tabActivaId}`,'play');
    boton_principal.textContent="Pausar";

}


function cerrar(){
    clearInterval(intervalId);
    intervalId=null;
    boton_principal.textContent="Iniciar";
    controlSonido(`sonido_${tabActivaId}`,'pause');

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

        desactivaTabClick(tabClickId);        
        
        if(tabClickId === 'tab_focus' && !tabClickClase.classList.contains('activa')) {
            tiempoEnSegundos = contador_focus;            
            tabActivaClick(tabClickId);

        }
        
        else if (tabClickId === 'tab_dc' && !tabClickClase.classList.contains('activa')) {
            tiempoEnSegundos = contador_dc;            
            tabActivaClick(tabClickId);
        
        }
        
        else if (tabClickId === 'tab_dl' && !tabClickClase.classList.contains('activa')) {
            tiempoEnSegundos = contador_dl;
            tabActivaClick(tabClickId);

        }
            
    }

    tabClickClase.onkeydown = function(evento) {
        if (evento.code === "Space" || evento.code === "Enter") {

            desactivaTabClick(tabClickId);

            if(!tabClickClase.classList.contains('activa')) {
                if(tabClickId === 'tab_focus' && !tabClickClase.classList.contains('activa')) {
                    tiempoEnSegundos = contador_focus;
                    tabActivaClick(tabClickId);
        
                }
                
                else if (tabClickId === 'tab_dc' && !tabClickClase.classList.contains('activa')) {
                    tiempoEnSegundos = contador_dc;
                    tabActivaClick(tabClickId);
                                    
                }
                
                else if (tabClickId === 'tab_dl' && !tabClickClase.classList.contains('activa')) {
                    tiempoEnSegundos = contador_dl;
                    tabActivaClick(tabClickId);                    
        
                }
    
            }
            
        }
    }

}


function tabActiva(idClaseTab) {
    document.getElementById(idClaseTab).classList.toggle('activa');

}


function tabActivaClick(tabClickId){
    cerrar();
    mostrarTiempo();
    tabActiva(tabClickId);
    tabActivaId=tabClickId;

}


function desactivaTabClick(tabClickId){
    for (let i = 0; i < listaTabs.length; i++) {
        const tabsInactivasClase = listaTabs[i];
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

}


function controlSonido(idElementoAudio,accionAudio){
    if(accionAudio === 'play') {
        document.getElementById(idElementoAudio).play();

    }
    
    else if(accionAudio === 'pause') {
        document.getElementById(idElementoAudio).pause();
        
    } 
    
    else if(accionAudio === 'stop') {
        document.getElementById(idElementoAudio).pause();
        document.getElementById(idElementoAudio).currentTime = 0;

    }

}


cargar();