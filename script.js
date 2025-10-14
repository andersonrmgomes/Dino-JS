/*
 * Elemento do jogador (dinossauro).
 * Espera um elemento com a classe '.dino' em 'index.html'
 * @type {HtmlElement}
 */
const dino = document.querySelector(".dino");

/*
 * Elementyo que representa o cenário / pista do jogo.
 * Espera um elemento com a classe '.background' em 'index.html'.
 * @type {HtmlElement}
 */
const background = document.querySelector(".background");

/*
 * Flag que indica se o dino está no meio de um pulo.
 * Usada para evitar pulos múltiplos encadeados.
 * @type {`booblean}  //true para verdadeiro ou false para falso.
 */
let pulando = false;
/*
 * Altura atual (em pixels) do dino a partir da base (propriedade css 'buttom').
 * Valor 0 seguifica em contato com chão;
 * @type {number}
 */
let posicao = 0;
/*
 * Estado do jogo: quando true, o jogo terminou (Game Over).
 * Usado para pausar contadores e inpedir novas criações/atualizações;
 * @type {boolean}
 */
let GameOver = false;

function handlekeyUP(event) {
  if (event.code === "Space") {
    if (!pulando) {
      Pular();
    }
  }
}


function Pular() {
    
    pulando = true;

    let intervalosubida = setInterval(() => {
        
        if (posicao >= 150) {
            clearInterval(intervalosubida);
        
        // Descendo.
        let intervalodescida = setInterval(() => {
            if (posicao <= 0) {
                clearInterval(intervalodescida);
                pulando = false;
            } else {
                posicao -= 20;
                dino.style.bottom = posicao + 'px';
            }
        }, 20);
        } else {
        // Subindo.
        posicao += 20;
        dino.style.bottom = posicao + 'px';
        }
    }, 20);
}

function criarCacto(){
    const cacto = document.createElement('div');
    //posicao inicial(px) a partir da esquerda
    let cactoPosicao = 1800;
    let randomTime = Math.random() + 6000;
    cacto.classList.add('cacto');
    cacto.style.left = cactoPosicao + 'px';
    background.appendChild(cacto);

    //movimentar o cacto
    let intervaloEsqueda = setInterval(() =>{
        cactoPosicao -=10;
        cacto.style.left = cactoPosicao + 'px';
        //remover quando ele sair da tela
        if(cactoPosicao <-60 ){
            clearInterval(intervaloEsqueda);
            if(background.contains(cacto)) background.removeChild(cacto);
        } else if (cactoPosicao > 0 && cactoPosicao < 60 && posicao < 60 ){
            //colisao detecta o fim do jogo
            clearInterval(intervaloEsqueda);
            //criar funcao game over
            console.log("Game Over")
        }else{
            cactoPosicao -=10;
            cacto.style.left = cactoPosicao + 'px';
        }

    },20)
setTimeout(criarCacto, randomTime);
}

criarCacto()
document.addEventListener("keyup", handlekeyUP);