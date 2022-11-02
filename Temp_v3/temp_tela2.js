const temporizador = document.querySelector(".temp");
let timer,seg,min;

//inserir valor
pergunta = localStorage.getItem("pergunta_tela2") || "02:00";
temporizador.innerHTML = pergunta;    

//temporizador
onstorage = (event) => {
    chave = event.key;
    valorNovo = event.newValue;
    valorAntigo = event.oldValue;

    if (chave === "contador_tela2"){
        //Formatação 00:00
        let tempo = temporizador.innerHTML.split(':');
    
        clearInterval(timer);
    
        switch (valorNovo) {
            case 'on':
                //iniciar
                iniciarTemporizador(tempo,temporizador);
    
                break;
            case 'off':
                //pausar
                if(seg <=10 && min == 0){
                    temporizador.classList.remove('tempo','aviso');
                    temporizador.classList.add('aviso');
                }
                break;
            default:
                //zerar
                temporizador.classList.remove('tempo','aviso');
                pergunta = localStorage.getItem("pergunta_tela2") || "02:00";
                temporizador.innerHTML = pergunta;

                break;
        }
    }

//verificar alterações definidas
    if (chave == "pergunta_tela2") {
        if(valorAntigo !== valorNovo){
            temporizador.innerHTML = valorNovo;
        }
    }
    if (chave == null){
        pergunta = "02:00";
        temporizador.innerHTML = pergunta;  
    }
    
}

//contardor
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
