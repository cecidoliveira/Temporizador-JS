let pergunta,resposta,timer,seg;

function getTemp(){
    const formData = new FormData(document.querySelector('form'))
    pergunta = formData.get("defPergunta");
    resposta = formData.get("defResposta");
}


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

        if(min == 0 && seg == 10){
            temporizador.classList.add('tempo','aviso');
        }

    },1000);

}

//teclado
document.addEventListener('keypress',function(p){
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
            if (pergunta === undefined || pergunta == "00:00"){
                pergunta = "00:30"
            }
            temporizador.innerHTML = pergunta;
            break;
        case "KeyR":
            //resposta
            if (resposta === undefined || resposta == "00:00"){
                resposta = "01:30"
            }
            temporizador.classList.remove('tempo','aviso');
            temporizador.innerHTML = resposta;  
            break;
        case "KeyZ":
            //zerar
            temporizador.classList.remove('tempo','aviso');
            temporizador.innerHTML = "00:00";    
    }
});