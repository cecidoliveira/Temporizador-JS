//inerir valores dos tempos
if (localStorage.getItem("dados") !== null){   
    inserirValores();
}

function inserirValores(){ 
    const conteudo1 = document.querySelector(`#tela1 > input`);
    const conteudo2 = document.querySelector(`#tela2 > input`);   
    conteudo1.value = (localStorage.getItem(`pergunta_tela1`) ?? "02:00");
    conteudo2.value = (localStorage.getItem(`pergunta_tela2`) ?? "02:00");
}

//definir valor ao clicar em definir
function defTemp(tela){

    const formData = document.querySelector(`.conf-temp#${tela} > input`);
    
    pattern = /^([0-2][0-9])(:[0-5][0-9])?$/;
    valido = pattern.test(formData.value);

    botao = document.querySelector(`.conf-temp#${tela} > button`);

    //caso valida -> verde caso não valida -> vermelho
    if (valido) {
        botao.classList.add('enviou');   
        setTimeout( ()=>{
            botao.classList.remove('enviou');
        },500);

        localStorage.setItem("dados", "valores foram definidos!");        
        localStorage.setItem(`pergunta_${tela}`, formData.value);

    }else {
        botao.classList.add('nao-enviou');   
        setTimeout( ()=>{
            botao.classList.remove('nao-enviou');
        },500);
    }
}

//controles das telas pelos botões
document.querySelectorAll('button').forEach( (button)=>{
    button.addEventListener('click',(event)=>{
        
        tipo = event.target.id;
        tela = event.target.classList.value;

        if (tipo != "send") {
            selecaoControle(tipo, tela)
        } else {
            defTemp(tela)
        }
    });
}); 

//controles das telas pelo teclado
document.addEventListener('keyup',(p)=>{
    let kpress = p.code;

    switch (kpress) {
        case "KeyA":
            tela = "tela1";
            tipo = "iniciar";
            
            selecaoControle(tipo,tela)

            break;
        case "KeyS":
            tela = "tela1";
            tipo = "pausar";
            
            selecaoControle(tipo,tela)

            break;
        case "KeyD":
            tela = "tela1";
            tipo = "zerar";
                
            selecaoControle(tipo,tela)
    
            break;
        case "KeyJ":
            tela = "tela2";
            tipo = "iniciar";
            
            selecaoControle(tipo,tela)

            break;
        case "KeyK":
            tela = "tela2";
            tipo = "pausar";
            
            selecaoControle(tipo,tela)

            break;
        case "KeyL":
            tela = "tela2";
            tipo = "zerar";
                
            selecaoControle(tipo,tela)
    
            break;
        default:
            break;
    }
});


function selecaoControle(tipo,tela){
    controle = document.querySelector(`button#${tipo}.${tela}`);
    anterior = document.querySelector(`.selects.${tela}`);
    
    switch (tipo) {
        case "iniciar":
            localStorage.setItem(`contador_${tela}`, 'on');
        case "pausar":
            if (controle.disabled === false){    
                controle.disabled=true;
                controle.classList.add('selects');

                if(tipo == "pausar"){
                    localStorage.setItem(`contador_${tela}`, 'off');
                }

                anterior.disabled=false;
                anterior.classList.remove('selects');
            }

            break;
        case "zerar":
            anterior.disabled=false;
            anterior.classList.remove('selects');

            controle.classList.add('selects');
            localStorage.removeItem(`contador_${tela}`);

            resetar = document.querySelector(`button#pausar.${tela}`);
            resetar.disabled=true;
            resetar.classList.add('selects');
            setTimeout( ()=>{
                controle.classList.remove('selects');
            },250);

            break;
        default:
            break;
    }
}
