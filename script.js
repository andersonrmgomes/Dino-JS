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
const backgroung = document.querySelector(".background");

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

document.addEventListener("keyup", handlekeyUP);

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