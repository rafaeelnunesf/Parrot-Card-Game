// Lista com o nome de cada arquivo gif
const gifs = ["bobrossparrot.gif","explodyparrot.gif","fiestaparrot.gif","metalparrot.gif","revertitparrot.gif","tripletsparrot.gif","unicornparrot.gif"]

let numeroDeCartasViradas = 0 //variável usada para saber quantas cartas estão viradas a cada jogada (só pode ser 0, 1)
let arrayCartas = [] //array usada para comparar se as cartas viradas são iguais
let numeroDeCartasComPar = 0 
let jogadas = 0

let tempo = 0
let idInterval

function cronometro(){
    idInterval = setInterval(aumentarUmSegundo,1000);
}
function aumentarUmSegundo() {
    tempo++
    document.querySelector(".relogio").innerHTML = `${tempo} segundos`
    if(numeroDeCartasComPar === numeroDeCartas){
        clearInterval(idInterval)
    }
}

let numeroDeCartas
function QuantidadeDeCartas(){
    numeroDeCartas = parseInt(prompt("Com quantas cartas você quer jogar?"))
   cronometro()

    const divisao = numeroDeCartas % 2;
    if(numeroDeCartas >= 4 && numeroDeCartas <= 14 && divisao === 0){
        CriarCartas(numeroDeCartas)
    }else{
        QuantidadeDeCartas()
    }  
}

function CriarCartas(numeroDeCartas) {
    const elemento = document.querySelector(".cards");
    const novaOrdemDeCartas = embaralharCartas(numeroDeCartas);
    for(let i =0;i<numeroDeCartas;i++){
        elemento.innerHTML += 
        `<div class="card" data-identifier="card" onclick="regrasDeJogo(this)">
            <div class="front-face face" data-identifier="front-face"></div>            
            <div class="back-face face" data-identifier="back-face">
                <img src="/Images/${novaOrdemDeCartas[i]}" style="width:80px">
            </div>            
        </div>`
    }
}

function embaralharCartas(numeroDeCartas) {
    const array= gifs.sort(comparador); // Após esta linha, as cartas estarão embaralhada
    const cartas = array.slice(0,numeroDeCartas/2) //Pega a metade da quantidade de cartas selecionadas
    const Pares = cartas.concat(cartas); //gera os pares de cartas
    const novaOrdemDeCartas = Pares.sort(comparador) //embaralha novamente as cartas
    return novaOrdemDeCartas
}
function comparador() { 
	return Math.random() - 0.5; 
}
function regrasDeJogo(carta) {
    const gif = `"${carta.childNodes[3].childNodes[1].currentSrc}"` //Salva o nome da carta que esta selecionada

    // Verifica se a carta selecionada já está virada
    const cartaClicada = carta.classList.contains("virada") 
    if(cartaClicada){
        return
    }

    arrayCartas.push(gif)

    virarCartas(carta,numeroDeCartasViradas)
    verificarSeSaoIguais(arrayCartas)
    setTimeout(venceu,200)

}

function virarCartas(carta) {
    if(numeroDeCartasViradas<2){
        carta.classList.add("virada")
        numeroDeCartasViradas++
    }
}
function verificarSeSaoIguais(arrayCartasviradas){
    if(arrayCartasviradas[0]===arrayCartasviradas[1]){    
        colocarClassePar()
        jogadas++
    }else if(arrayCartasviradas[0]!==arrayCartasviradas[1] && arrayCartasviradas[0] !== undefined && arrayCartasviradas[1]!== undefined){
        setTimeout(tirarClasseVirada,1000);       
    }
}
function colocarClassePar() {
    const pares = document.querySelectorAll(".virada")
    for(let i= 0;i<pares.length;i++){
        pares[i].classList.add("par")
    }
    arrayCartas = []
    numeroDeCartasViradas = 0
}
function tirarClasseVirada() {
    const pares = document.querySelectorAll(".virada")
     for(let i =0;i<pares.length;i++){
        pares[i].classList.remove("virada")
    }
    numeroDeCartasViradas = 0
    arrayCartas = []
    jogadas++
}

function venceu() {
    const numeroDeCartasComPar = document.querySelectorAll(".par").length
    if(numeroDeCartasComPar === numeroDeCartas){
        alert(`Você venceu em ${jogadas} jogadas e em ${tempo} segundos`)

        decisao = prompt("Você deseja reiniciar o jogo?")
            if (decisao === 'sim'){
                location.reload(true)
            }else{
                clearInterval(idInterval)
            }
    }
}

QuantidadeDeCartas()