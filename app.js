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

    // <div class="item">
    //         <h2 class="tituloItem">Treino</h2>
    //         <progress value="5" max="10"></progress>
    //         <div class="botoesItem">
    //             <button class="botao">+</button>
    //             <button class="botao">-</button>
    //         </div>
    //     </div>
    
    if(listaProgress.length>0){
        contadorIndex = 1;
        for (const progressLS of listaProgress){
            item = document.createElement("div");
            titulo = document.createElement("h2");
            progress = document.createElement("progress");
            divBotoes = document.createElement("div");
            btnAdicionar = document.createElement("button");
            btnRemover = document.createElement("button");

            item.classList.add("item");
            titulo.classList.add("tituloItem");
            progress.value = progressLS[1];
            progress.max = progressLS[2];
            divBotoes.classList.add("botoesItem");
            btnAdicionar.classList.add("botao");
            btnRemover.classList.add("botao");
            
            btnAdicionar.setAttribute("onclick","adicionarPonto("+(contadorIndex-1)+")");
            btnRemover.setAttribute("onclick","removerPonto("+(contadorIndex-1)+")");

            progress.id = contadorIndex;
            
            titulo.innerHTML = contadorIndex+". "+progressLS[0];
            contadorIndex++;
            btnAdicionar.innerHTML = "+";
            btnRemover.innerHTML = "-";

            divBotoes.appendChild(btnAdicionar);
            divBotoes.appendChild(btnRemover);
            item.appendChild(titulo);
            item.appendChild(progress);
            item.appendChild(divBotoes);
            
            main = document.querySelector("main");
            main.appendChild(item);
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
    
    listaProgress.push([nome, valor, meta]);
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
    listaProgress[id][1] = listaProgress[id][1]+1;
    
    progress = document.getElementById(id+1);
    progress.value = listaProgress[id][1];
    
    localStorage.setItem("listaProgressLS", JSON.stringify(listaProgress));
}
function removerPonto(id){
    listaProgress[id][1] = listaProgress[id][1]-1;
    
    progress = document.getElementById(id+1);
    progress.value = listaProgress[id][1];

    localStorage.setItem("listaProgressLS", JSON.stringify(listaProgress));
}