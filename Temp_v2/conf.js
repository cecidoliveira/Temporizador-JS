if (localStorage.getItem("pergunta") !== null){
    inserirValores();
}

function getTemp(){
    const formData = new FormData(document.querySelector('form'));

    localStorage.setItem("pergunta", formData.get("defPergunta"));
    localStorage.setItem("resposta", formData.get("defResposta"));
    localStorage.setItem("replica", formData.get("defReplica"));
    localStorage.setItem("treplica", formData.get("defTreplica"));
}

function inserirValores(){ 
    const conteudo = document.querySelector('form');
    
    conteudo[0].value = localStorage.getItem("pergunta");
    conteudo[1].value = localStorage.getItem("resposta");
    conteudo[2].value = localStorage.getItem("replica");
    conteudo[3].value = localStorage.getItem("treplica");  
}


