console.log('[DevSoutinho] Flappy Bird');

let frames = 0;
const sprites = new Image();
sprites.src = 'imagens/sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


// [Plano de fundo]
const planoDeFundo = {
  spriteX: 0,
  spriteY: 152,
  largura: 320,
  altura: 480,
  x: 0,
  y: canvas.height - 480,
  desenha() {

    contexto.drawImage(
        sprites,
        planoDeFundo.spriteX, planoDeFundo.spriteY,
        planoDeFundo.largura, planoDeFundo.altura,
        planoDeFundo.x, planoDeFundo.y,
        planoDeFundo.largura, planoDeFundo.altura,
    );
  },
}; 

// [Chao]
function criaChao() {
  const chao = {
    spriteX: 0,
    spriteY: 40,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza() {
      const movimentoDoChao = 1;
      const repeteEm = chao.largura / 2;
      const movimentacao = chao.x - movimentoDoChao;

      chao.x = movimentacao % repeteEm;
    },
    desenha() {
      contexto.drawImage(
          sprites,
          chao.spriteX, chao.spriteY,
          chao.largura, chao.altura,
          chao.x, chao.y,
          chao.largura, chao.altura,
      );

      contexto.drawImage(
          sprites,
          chao.spriteX, chao.spriteY,
          chao.largura, chao.altura,
          (chao.x + chao.largura), chao.y,
          chao.largura, chao.altura,

      );
    },
  };
  return chao;
}

function fazColisao(flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura;
  const chaoY = chao.y;

  if (flappyBirdY >= chaoY) {
    return true;
  }

  return false;
}

function criaFlappyBird() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 45,
    altura: 40,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
      flappyBird.velocidade = - flappyBird.pulo;
    },
    velocidade: 0,
    gravidade: 0.18,
    atualiza() {
      if(fazColisao(flappyBird, globais.chao)) {
        mudaParaTela(Telas.PERDEU);
      }

      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
      flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    desenha() {
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY, //Sprite de X e y
            flappyBird.largura, flappyBird.altura, //Tamanho do Peter Pan
            flappyBird.x, flappyBird.y, //Localização do Peter Pan na tela
            flappyBird.largura, flappyBird.altura,
        );
    },
  };
  return flappyBird;
}

// [Iniciar]
const iniciar = {
  spriteX: 320,
  spriteY: 0,
  largura: 190,
  altura: 170,
  y: (canvas.width / 2) - 90 / 4,
  x: 70,
  desenha() {
    contexto.drawImage(
        sprites,
        iniciar.spriteX, iniciar.spriteY,
        iniciar.largura, iniciar.altura,
        iniciar.x, iniciar.y,
        iniciar.largura, iniciar.altura,
    );
  },
};

// [Mensagem Perdeu]
const mensagemPerdeu = {
  spriteX: 104,
  spriteY: 632,
  largura: 226,
  altura: 199,
  y: (canvas.width / 2) - 174 / 2,
  x: 50,
  desenha() {
    contexto.drawImage(
        sprites,
        mensagemPerdeu.spriteX, mensagemPerdeu.spriteY,
        mensagemPerdeu.largura, mensagemPerdeu.altura,
        mensagemPerdeu.x, mensagemPerdeu.y,
        mensagemPerdeu.largura, mensagemPerdeu.altura,
    );
  },
};

function criaCanos() {
  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 632,
    },
    ceu: {
      spriteX: 52,
      spriteY: 632,
    },
    espaco: 100,
    desenha() { 
      canos.pares.forEach(function(par) {
        const yRandom = par.y;
        const espacamentoEntreCanos = 110;

        const canoCeuX = par.x;
        const canoCeuY = yRandom;

        // [Cano do Ceu]
        contexto.drawImage(
          sprites,
          canos.ceu.spriteX, canos.ceu.spriteY,
          canos.largura, canos.altura,
          canoCeuX, canoCeuY,
          canos.largura, canos.altura,
      )

      //[Cano do Chão]
      const canoChaoX = par.x;
      const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
      contexto.drawImage(
          sprites,
          canos.chao.spriteX, canos.chao.spriteY,
          canos.largura, canos.altura,
          canoChaoX, canoChaoY,
          canos.largura, canos.altura,
      )

      par.canoCeu = {
        x: canoCeuX, 
        y: canos.altura + canoCeuY
      }
      par.canoChao = {
        x: canoChaoX,
        y: canoChaoY
      }

    })

    },
    temColisaoComOFlappyBird(par) {
      const cabecaDoFlappy = globais.flappyBird.y;
      const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

      if(globais.flappyBird.x >= par.x) {

        if(cabecaDoFlappy <= par.canoCeu.y) {
          return true;
        }

        if(peDoFlappy >= par.canoChao.y) {
          return true;
        }
      }
      return false;
    },
    pares: [],
    atualiza() {
      const passou100Frames = frames % 100 === 0;
      if(passou100Frames) {
        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        });
      }

      canos.pares.forEach(function(par) {
          par.x = par.x - 2;

          if(canos.temColisaoComOFlappyBird(par)) {
            mudaParaTela(Telas.PERDEU);
          }

          if (par.x + canos.largura <= 0) {
            canos.pares.shift();
          }
      });

    }
  }

  return canos;
}

function criaPlacar() {
  const placar = {
    pontuacao: 0,
    desenha() {
      contexto.font = '35px "VT323"';
      contexto.textAlign = 'right';
      contexto.fillStyle = 'white';
      contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35);
      placar.pontuacao
    },
    atualiza() {
      const intervaloDeFrames = 20;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if (passouOIntervalo) {
        placar.pontuacao = placar.pontuacao + 1;
      }
    }

  }  
  return placar;
}

//
// [Telas]
//

const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
  telaAtiva = novaTela;

  if (telaAtiva.inicializa) {
      telaAtiva.inicializa();
  }
}

const Telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = criaFlappyBird();
      globais.chao = criaChao();
      globais.canos = criaCanos();
    },
    desenha() {
      planoDeFundo.desenha();
      globais.flappyBird.desenha();
      globais.chao.desenha();
      iniciar.desenha();
    },
    click() {
      mudaParaTela(Telas.JOGO);
    },    
    atualiza() {
      globais.chao.atualiza();
    }
  }
};

Telas.JOGO = {
  inicializa() {
    globais.placar = criaPlacar();
  },
  desenha() {
    planoDeFundo.desenha();
    globais.canos.desenha();
    globais.chao.desenha();
    globais.flappyBird.desenha();
    globais.placar.desenha();
  },
  click() {
    globais.flappyBird.pula();
  },
  atualiza() {
    globais.canos.atualiza();
    globais.chao.atualiza();
    globais.flappyBird.atualiza();
    globais.placar.atualiza();
  }
};

Telas.PERDEU = {
  desenha() {
    mensagemPerdeu.desenha();
  },
  atualiza() {

  },
  click() {
    mudaParaTela(Telas.INICIO);
  }
}


function loop() {

  telaAtiva.desenha();
  telaAtiva.atualiza();
  
  frames = frames + 1;
  requestAnimationFrame(loop);

}

window.addEventListener('click', function() {
  if(telaAtiva.click) {
    telaAtiva.click();
  }
});

mudaParaTela(Telas.INICIO);
loop();