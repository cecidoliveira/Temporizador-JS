let timer,seg,min;
 
function iniciarTemporizador(tempo,temporizador){
    min = parseInt(tempo[0]);
    seg = parseInt(tempo[1]); 

    timer = setInterval(function() {
        
        if(seg == 0){
            if(min == 0){
                temporizador.classList.remove('tempo');
                clearInterval(timer);
                seg = 1;       
            }else{
                min--;
                seg = 60; 
            }
        }
        seg --;

        minutes = min < 10 ? "0" + min : min;
        seconds = seg < 10 ? "0" + seg : seg;

        temporizador.innerHTML = minutes+":"+seconds; 

        if(min == 0 && seg <= 10 && seg != 0){
            temporizador.classList.add('tempo','aviso');
        }

    },1000);

}

//teclado
document.addEventListener('keypress',function(p){
    pergunta = localStorage.getItem("pergunta");
    resposta = localStorage.getItem("resposta");
    replica = localStorage.getItem("replica");
    treplica = localStorage.getItem("treplica");

    let kpress = p.code;

        //Temporizador 00:00
    const temporizador = document.querySelector(".temp");
    let tempo = temporizador.innerHTML.split(':');

    clearInterval(timer);

    switch (kpress){
        case "Enter":
            //iniciar
            iniciarTemporizador(tempo,temporizador);
            break;
        case "Space":
            //parar
            if(seg <=10 && min == 0){
                temporizador.classList.remove('tempo','aviso');
                temporizador.classList.add('aviso');
            }
            break;
        case "KeyP":
            //pergunta
            temporizador.classList.remove('tempo','aviso');
            if (pergunta === null || pergunta == "00:00"){
                pergunta = "02:00"
            }
            temporizador.innerHTML = pergunta;
            break;
        case "KeyR":
            //resposta
            if (resposta === null || resposta == "00:00"){
                resposta = "04:00"
            }
            temporizador.classList.remove('tempo','aviso');
            temporizador.innerHTML = resposta;  
            break;
        case "KeyO":
            //replica
            temporizador.classList.remove('tempo','aviso');
            if (replica === null || replica == "00:00"){
                replica = "01:00" 
            }
            temporizador.innerHTML = replica;
            break;
        case "KeyT":
            //treplica
            if (treplica === null || treplica == "00:00"){
                treplica = "03:00"
            }
            temporizador.classList.remove('tempo','aviso');
            temporizador.innerHTML = treplica;  
            break;
        case "KeyZ":
            //zerar
            temporizador.classList.remove('tempo','aviso');
            temporizador.innerHTML = "00:00";    
    }
});