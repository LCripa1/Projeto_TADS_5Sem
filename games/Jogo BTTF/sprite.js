function Sprite(x, y, largura, altura) {
	this.x = x;
	this.y = y;
	this.largura = largura;
	this.altura = altura;

	this.desenha = function(xCanvas, yCanvas) {
		ctx.drawImage(img, this.x, this.y, this.largura, this.altura, xCanvas, yCanvas, this.largura, this.altura);
	}
} 

var bg = new Sprite(0, 0, 600, 600),
spriteMarty = new Sprite(600, 0, 70, 70),

jogar = new Sprite(603, 70, 397, 347),
perdeu = new Sprite(603, 417, 397, 347),
novo = new Sprite(105, 723, 289, 50),
spriteRecord = new Sprite(105, 826, 289, 50),
spriteChao = new Sprite(0, 600, 600, 40),

arbustoObstacle = new Sprite(603, 791, 50, 120),
pedraObstacle = new Sprite(691, 791, 50, 120),
fogoObstacle = new Sprite(777, 791, 50, 120),
raioObstacle = new Sprite(862, 791, 50, 120),
muroObstacle = new Sprite(950, 791, 50, 120);

//w = 70
//h = 70
//x = 600 y = 0