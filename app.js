// verifica se a lista de itens foi criada no LocalStorage
try{
    listaProgress = JSON.parse(localStorage.getItem("listaProgressLS"));
    if(listaProgress == null){
        listaProgress = [];
    }
}catch{
    listaProgress = [];
}

// Exibe as itens na tela
function carregarProgress(){
    
    if(listaProgress.length>0){
        contadorIndex = 1;
        for (const progressLS of listaProgress){
            let item = document.createElement("div");
            let titulo = document.createElement("h2");
            let progress = document.createElement("progress");
            let divBotoes = document.createElement("div");
            let btnAdicionar = document.createElement("button");
            let btnRemover = document.createElement("button");
            let dataAtualizacao = document.createElement("p");

            item.classList.add("item");
            titulo.classList.add("tituloItem");
            progress.value = progressLS[1];
            progress.max = progressLS[2];
            divBotoes.classList.add("botoesItem");
            btnAdicionar.classList.add("botao");
            btnRemover.classList.add("botao");
            dataAtualizacao.classList.add("dataAtualizacao");
            
            btnAdicionar.setAttribute("onclick","adicionarPonto("+(contadorIndex-1)+")");
            btnRemover.setAttribute("onclick","removerPonto("+(contadorIndex-1)+")");

            progress.id = "prgss"+contadorIndex;
            titulo.id = "ttl"+contadorIndex;
            dataAtualizacao.id = "data"+contadorIndex;
            item.id = contadorIndex;
            
            titulo.innerHTML = contadorIndex+". "+progressLS[0]+" ("+progressLS[1]+"/"+progressLS[2]+")";
            contadorIndex++;
            btnAdicionar.innerHTML = "+";
            btnRemover.innerHTML = "-";
            if(progressLS[3] !== undefined){
                dataAtualizacao.innerHTML = "Última atualização: "+progressLS[3];
            }else{
                dataAtualizacao.innerHTML = "Sem data de última atualização";
            }

            divBotoes.appendChild(btnAdicionar);
            divBotoes.appendChild(btnRemover);
            item.appendChild(titulo);
            item.appendChild(progress);
            item.appendChild(divBotoes);
            item.appendChild(dataAtualizacao);
            
            main = document.querySelector("main");
            main.appendChild(item);
            analisaPrgss(contadorIndex-1);
        }
    }
}

function verificarAcao(){
    const parametros = new URLSearchParams(window.location.search);
    const acao = parametros.get("acao");
    
    if(acao=="adicionar"){
        document.getElementById("divIndex").style.display = "none";
        document.getElementById("titulo").innerHTML = "Adicionar";
        
        botao = document.getElementById("botao");
        botao.setAttribute("onclick","adicionar()");
    }else if(acao=="editar"){
        document.getElementById("titulo").innerHTML = "Editar";
        
        botao = document.getElementById("botao");
        botao.setAttribute("onclick","editar()");
    }else if(acao=="excluir"){
        document.getElementById("divProgress").style.display = "none";
        document.getElementById("divMeta").style.display = "none";
        document.getElementById("titulo").innerHTML = "Excluir";
        
        botao = document.getElementById("botao");
        botao.setAttribute("onclick","excluir()");
    }
}

function adicionar(){
    nome = document.getElementById("progress").value;
    meta = document.getElementById("meta").value;
    valor = 0;
    dataHoje = new Date().toLocaleDateString('pt-BR');
    
    listaProgress.push([nome, valor, meta, dataHoje]);
    localStorage.setItem("listaProgressLS", JSON.stringify(listaProgress));
}
function editar(){
    index = document.getElementById("index").value;
    progress = document.getElementById("progress").value;
    meta = document.getElementById("meta").value;
    if(index>listaProgress.length){
        alert("Index não encontrado");
    }else{
        listaProgress[index-1][0] = progress;
        listaProgress[index-1][2] = meta;
        localStorage.setItem("listaProgressLS", JSON.stringify(listaProgress));
    }
}

function excluir(){
    index = document.getElementById("index").value;
    if(index>listaProgress.length){
        alert("Index não encontrado");
    }else{
        listaProgress.splice(index-1, 1)
        localStorage.setItem("listaProgressLS", JSON.stringify(listaProgress));
    }
}

function adicionarPonto(id){
    // Atualiza o localStorage
    dataHoje = new Date().toLocaleDateString('pt-BR');
    listaProgress[id][1] = listaProgress[id][1]+1;
    listaProgress[id][3] = dataHoje;
    
    // Atualiza o html
    titulo = document.getElementById("ttl"+(id+1));
    titulo.innerHTML = (contadorIndex-1)+". "+listaProgress[id][0]+" ("+listaProgress[id][1]+"/"+listaProgress[id][2]+")";
    progress = document.getElementById("prgss"+(id+1));
    progress.value = listaProgress[id][1];
    data = document.getElementById("data"+(id+1));
    data.innerHTML = "Última atualização: "+dataHoje;
    
    localStorage.setItem("listaProgressLS", JSON.stringify(listaProgress));
    analisaPrgss(id+1);
}
function removerPonto(id){
    // Atualiza o localStorage
    dataHoje = new Date().toLocaleDateString('pt-BR');
    listaProgress[id][1] = listaProgress[id][1]-1;
    listaProgress[id][3] = dataHoje;
    
    titulo = document.getElementById("ttl"+(id+1));
    titulo.innerHTML = (contadorIndex-1)+". "+listaProgress[id][0]+" ("+listaProgress[id][1]+"/"+listaProgress[id][2]+")";
    progress = document.getElementById("prgss"+(id+1));
    progress.value = listaProgress[id][1];
    data = document.getElementById("data"+(id+1));
    data.innerHTML = "Última atualização: "+dataHoje;
    
    localStorage.setItem("listaProgressLS", JSON.stringify(listaProgress));
    analisaPrgss(id+1);
}

function analisaPrgss(idItem){
    item = document.getElementById(idItem);
    progress = item.querySelector("progress");
    if(progress.value>=progress.max){
        progress.classList.add("concluido");
        item.classList.add("itemConcluido");
    }else if(progress.value<progress.max){
        progress.classList.remove("concluido");
        item.classList.remove("itemConcluido");
    }
}