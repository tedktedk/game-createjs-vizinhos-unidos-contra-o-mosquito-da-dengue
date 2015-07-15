/**
	Funcionalidades para todas as classes do Game.
	Ative! Negócios Criativos | Desenvolvedor: Ted k'
	
	@class GeralGame 
	@constructor
**/
function Game(){}

/**
Variáveis Globais

@event variables 
@param {String, Number} Variáveis para todo o projeto.
**/
var g = Game.prototype;
var queue = new createjs.LoadQueue();
var geral = new GeralGame();
var qtd_acertos = 8;
var contador = 0;
var encontrados = 0;
var contagem_regressiva;
var escultar_evento_final;
var sprites_relogio;
var nAgt = navigator.userAgent;



/**
Cria toda a tela do "Preload".
Chamada para Início do Jogo.

@method Preload
@param {Object} [stage] Recebe o objeto para uso
@param {Function} [callback] Retorna o callback da função
@return {Object} Retorna o objeto construído
**/
g.Preload = function(stage){
	var container = new createjs.Container();
	var texto_preload = geral.Imagem(caminho.imgs + "aguarde-carregando.png");

	texto_preload.x = 300; 
	texto_preload.y = 250;

	container.addChild(texto_preload);
	stage.addChild(container);

	// Preload colocando todas as imagens.
	queue.installPlugin(createjs.Sound);
	queue.addEventListener("progress", handleProgress);
	queue.addEventListener("complete", handleComplete);
	queue.addEventListener("fileload", handleFileLoad);
	queue.loadManifest([
		{id: "ambiente", src: caminho.imgs + "ambiente.jpg"},
		{id: "sprites_areia", src: caminho.imgs + "sprites-areia.png?teste=1"},
		{id: "sprites_piscina", src: caminho.imgs + "sprites-piscina.png"},
		{id: "sprites_garrafa", src: caminho.imgs + "sprites-garrafas.png?teste=3"},
		{id: "sprites_lixo", src: caminho.imgs + "sprites-lixo.png?teste=2"},
		{id: "sprites_calha", src: caminho.imgs + "sprites-calha.png"},
		{id: "sprites_pneus", src: caminho.imgs + "sprites-pneus.png?teste=1"},
		{id: "sprites_tanque", src: caminho.imgs + "sprites-tanque.png"},
		{id: "sprites_vasilhas", src: caminho.imgs + "sprites-vasilhas.png?teste=2"},
		{id: "sprites_relogio", src: caminho.imgs + "sprites-relogio.png"},
		{id: "bt_jogar", src: caminho.imgs + "bt-jogar.png"},
		{id: "tela_01", src: caminho.imgs + "tela-01.jpg?teste=3"},
		{id: "bg_opacidade", src: caminho.imgs + "bg-opacidade.png?teste=6"},
		{id: "numero_1", src: caminho.imgs + "numero_1.png"},
		{id: "numero_2", src: caminho.imgs + "numero_2.png"},
		{id: "numero_3", src: caminho.imgs + "numero_3.png"},
		{id: "titulo_parabens", src: caminho.imgs + "titulo-parabens.png"},
		{id: "bt_jogar_novamente", src: caminho.imgs + "bt-jogar-novamente.png"},
		{id: "bt_compartilhar", src: caminho.imgs + "bt-compartilhar.png"},
		{id: "titulo_nao_conseguiu", src: caminho.imgs + "titulo-nao-conseguiu.png"},
		{id: "bt_tente_novamente", src: caminho.imgs + "bt-tente-novamente.png"}
	]);

	//console.log("Carregando...");

	function handleProgress(event){}
	function handleFileLoad(){}

	// Preload finalizado.
	function handleComplete(event){
		geral.AlphaContainerOut(container, function(){
			g.TelaInicial(stage);
			//g.Inicio(stage, function(){
			//	//console.log("Iniciando o Game!");
			//});
		}, 70);
    }
}



/**
Tela Inicial que chama a tela do jogo quando clica no botão "Jogar"

@method TelaInicial
@return {Object} Retorna o objeto construído via callback
@param {Object} [stage] Recebe o objeto para uso
**/
g.TelaInicial = function(stage){
	var container = new createjs.Container();
	var bg = geral.Imagem(queue.getResult("tela_01").src);
	var bt_jogar = geral.Imagem(queue.getResult("bt_jogar").src);
	var numero_1 = geral.Imagem(queue.getResult("numero_1").src);
	var numero_2 = geral.Imagem(queue.getResult("numero_2").src);
	var numero_3 = geral.Imagem(queue.getResult("numero_3").src);

	container.alpha = 0;
	bt_jogar.alpha = 0;
	bt_jogar.x = 325;
	bt_jogar.cursor = "pointer";

	numero_1.x = 385;
	numero_1.y = 295;
	numero_1.alpha = 0;

	numero_2.x = 385;
	numero_2.y = 295;
	numero_2.alpha = 0;

	numero_3.x = 385;
	numero_3.y = 295;
	numero_3.alpha = 0;

	geral.AlphaContainer(container, function(){
		// Hover botão jogar.
		createjs.Tween.get(bt_jogar).wait(500).to({alpha: bt_jogar.alpha + 1.0}, 400);
		createjs.Tween.get(bt_jogar).wait(500).to({y: 295}, 700, createjs.Ease.bounceOut);

		// Chamar tela de Início do Game com a Contagem Regressiva.
		// Tween com a contagem regressiva animada.
		bt_jogar.addEventListener("click", function(){
			createjs.Tween.get(bt_jogar).to({alpha: bt_jogar.alpha - 1.0}, 400).call(function(){
				createjs.Tween.get(numero_3).wait(300).to({alpha: numero_3.alpha + 1.0}, 400).call(function(){
					createjs.Tween.get(numero_3).wait(130).to({alpha: numero_3.alpha - 1.0}, 400).call(function(){
						createjs.Tween.get(numero_2).wait(130).to({alpha: numero_2.alpha + 1.0}, 400).call(function(){
							createjs.Tween.get(numero_2).wait(130).to({alpha: numero_2.alpha - 1.0}, 400).call(function(){
								createjs.Tween.get(numero_1).wait(130).to({alpha: numero_1.alpha + 1.0}, 400).call(function(){
									gg.Transicao(stage, container, 800, function(){
										g.Inicio(stage, function(){
											//console.log("Iniciou o Game!");
										});
									});
								});
							});
						});
					});
				});
			});
		});

	}, false);

	container.addChild(bg, bt_jogar, numero_1, numero_2, numero_3);
	stage.addChild(container);
}



/**
Gerencia totalmente o jogo, configura a quantidade de acertos
E conduz o contador (tempo) de jogo.

@method Inicio
@return {Object} Retorna o objeto construído via callback
@param {Object} [stage] Recebe o objeto para uso
@param {Function} [callback] Retorna o callback da função
**/
g.Inicio = function(stage, callback){
	var container = new createjs.Container();
	var bg = geral.Imagem(queue.getResult("ambiente").src);
	var contador = geral.Texto({text: "00:15", size: "35px", color: "#FFF"});
	var shape_acertos = new createjs.Shape(new createjs.Graphics().beginFill("#f05623").drawCircle(845, 131, 32));
	var acertos_texto = geral.Texto({text: "ACERTOS", size: "8px", color: "#FFF"});
	var acertos = geral.Texto({text: "0/" + qtd_acertos, size: "27px", color: "#FFF"});

	// Posicionamento dos elementos.
	bg.x = bg.y = 0;
	contador.x = 768;
	contador.y = 39;

	acertos.x = 821;
	acertos.y = 102;
	acertos.shadow = acertos_texto.shadow = contador.shadow = new createjs.Shadow("#201e1e", 1, 1, 1);

	acertos_texto.x = 826;
	acertos_texto.y = 140;

	// Corrigir o posicionamento no FireFox.
	if ((verOffset = nAgt.indexOf("Firefox")) != -1){
		contador.y = 57;
	    acertos.y = 114;
	}

	// Clicks nos elementos e contagem de acertos.
	g.Acoes(stage, bg, container, acertos);

	// Mostra o Tempo corrente.
	g.Tempo(container, contador, function(data){
		var bg_opacidade = geral.Imagem(queue.getResult("bg_opacidade").src);
		var titulo_nao_conseguiu = geral.Imagem(queue.getResult("titulo_nao_conseguiu").src);
		var bt_tente_novamente = geral.Imagem(queue.getResult("bt_tente_novamente").src);

		bg_opacidade.x = bg_opacidade.y = bg_opacidade.alpha = 0;

		titulo_nao_conseguiu.x = 90;
		titulo_nao_conseguiu.y = -190;

		bt_tente_novamente.x = 383;
		bt_tente_novamente.y = 260;
		bt_tente_novamente.alpha = 0;
		bt_tente_novamente.cursor = "pointer";

		createjs.Tween.get(bg_opacidade, {loop: false}).wait(500).to({alpha: bg_opacidade.alpha + 1.0}, 400).call(function(){
			createjs.Tween.get(titulo_nao_conseguiu).to({y: 130}, 600, createjs.Ease.bounceOut);
			createjs.Tween.get(bt_tente_novamente).wait(100).to({alpha: bt_tente_novamente.alpha + 1.0}, 600);
		});

		// Clicar no botão e jogar novamente.
		bt_tente_novamente.addEventListener("click", function(){
			qtd_acertos = 8;
			contador = 0;
			encontrados = 0;
			g.TelaInicial(stage);
			stage.removeChild(container);
		});

		container.addChild(bg_opacidade, titulo_nao_conseguiu, bt_tente_novamente);
		encontrados = ((encontrados == 0) ? "todas" : encontrados);
		//console.log("Acabou o tempo! Você só encontrou " + encontrados + " coisas. Tempo final: " + data + " segundos");
	}, {
		contador: contador,
		shape_acertos: shape_acertos,
		acertos_texto: acertos_texto,
		acertos: acertos
	});

	stage.addChild(container);
	callback();
}



/**
Animação da contagem regressiva do tempo.
Assim que o tempo finalizar retorna o callback com a informação de finalizado.

@method Tempo
@return {Object} Retorna o objeto construído via callback
@param {Object} [base_contador] Recebe o objeto do tipo Text para uso
@param {Function} [callback] Retorna o callback da função
**/
g.Tempo = function(container, base_contador, callback, options){
	var sprites_relogio_data = {
		"images": [queue.getResult("sprites_relogio").src],
		"animations": {
			run: [0, 10, "stop", 0.023]
		},
		"frames": {
			"height": 130,
			"width": 130,
			"regX": 0,
			"regY": 0
		}
	};

	sprites_relogio = new createjs.Sprite(new createjs.SpriteSheet(sprites_relogio_data), "run");
	sprites_relogio.x = 758;
	sprites_relogio.y = 8;

	container.addChild(sprites_relogio, options.shape_acertos, options.contador, options.acertos_texto, options.acertos);
	contador = 15;

	contagem_regressiva = setInterval(function(){
		contador--;

		if (contador >= 10){
			base_contador.text = "00:" + contador;
		}
		else {
			base_contador.text = "00:0" + contador;
		}

		if (contador == 0){
			clearInterval(contagem_regressiva);
			clearInterval(escultar_evento_final);
			callback(0);
		}

	}, 1000);
}



/**
Cliques nos objetos e criação dos sprites.
Pause o jogo quando a quantidade de acertos for alcançada.

@method Acoes
@return {Object} Retorna o objeto construído via callback
@param {Object} [container] Recebe o objeto para uso
@param {Object} [acertos] Recebe o objeto para uso
@param {Function} [callback] Retorna o callback da função
**/
g.Acoes = function(stage, bg, container, acertos, callback){
	var sprites_tanque_data = {
		"images": [queue.getResult("sprites_tanque").src],
		"animations": {
			init: [0, 0, "stop", 0.1],
			run: [1, 3, "stop", 0.7]
		},
		"frames": {
			"width": 175,
			"height": 99,
			"regX": 0,
			"regY": 0
		}
	};

	var sprites_calha_data = {
		"images": [queue.getResult("sprites_calha").src],
		"animations": {
			init: [0, 0, "stop", 0.1],
			run: [1, 4, "stop", 0.4]
		},
		"frames": {
			"width": 275,
			"height": 254,
			"regX": 0,
			"regY": 0
		}
	};

	var sprites_areia_data = {
		"images": [queue.getResult("sprites_areia").src],
		"animations": {
			init: [0, 0, "stop", 0.1],
			run: [1, 3, "volta1", 0.4],
			volta1: [3, 3, "volta2", 0.4],
			volta2: [2, 2, "volta3", 0.4],
			volta3: [1, 1, "volta4", 0.4],
			volta4: [0, 0, "stop", 0.4]
		},
		"frames": {
			"width": 155,
			"height": 131,
			"regX": 0,
			"regY": 0
		}
	};

	var sprites_lixo_data = {
		"images": [queue.getResult("sprites_lixo").src],
		"animations": {
			init: [0, 0, "stop", 0.1],
			run: [1, 7, "stop", 0.5]
		},
		"frames": {
			"width": 130,
			"height": 153,
			"regX": 0,
			"regY": 0
		}
	};

	var sprites_garrafa_data = {
		"images": [queue.getResult("sprites_garrafa").src],
		"animations": {
			init: [0, 0, "stop", 0.1],
			run: [1, 8, "stop", 0.6]
		},
		"frames": {
			"width": 170,
			"height": 151,
			"regX": 0,
			"regY": 0
		}
	};

	var sprites_piscina_data = {
		"images": [queue.getResult("sprites_piscina").src],
		"animations": {
			init: [0, 0, "stop", 0.1],
			run: [1, 6, "stop", 0.4]
		},
		"frames": {
			"width": 480,
			"height": 300,
			"regX": 0,
			"regY": 0
		}
	};

	var sprites_vasilhas_data = {
		"images": [queue.getResult("sprites_vasilhas").src],
		"animations": {
			init: [0, 0, "stop", 0.1],
			run: [1, 5, "stop", 0.4]
		},
		"frames": {
			"width": 170,
			"height": 135,
			"regX": 0,
			"regY": 0
		}
	};

	var sprites_pneus_data = {
		"images": [queue.getResult("sprites_pneus").src],
		"animations": {
			init: [0, 0, "stop", 0.1],
			run: [1, 3, "stop", 0.3]
		},
		"frames": {
			"width": 330,
			"height": 182,
			"regX": 0,
			"regY": 0
		}
	};

	// Posição dos elementos.
	function spriteTanque(tipo){
		sprites_tanque = new createjs.Sprite(new createjs.SpriteSheet(sprites_tanque_data), tipo);
		sprites_tanque.x = 61;
		sprites_tanque.y = 5;
	}

	function spriteCalha(tipo){
		sprites_calha = new createjs.Sprite(new createjs.SpriteSheet(sprites_calha_data), tipo);
		sprites_calha.x = 53;
		sprites_calha.y = 106;
	}

	function spriteAreia(tipo){
		sprites_areia = new createjs.Sprite(new createjs.SpriteSheet(sprites_areia_data), tipo);
		sprites_areia.x = 610;
		sprites_areia.y = 60;
	}

	function spriteLixo(tipo){
		sprites_lixo = new createjs.Sprite(new createjs.SpriteSheet(sprites_lixo_data), tipo);
		sprites_lixo.x = 15;
		sprites_lixo.y = 235;
	}

	function spriteGarrafa(tipo){
		sprites_garrafa = new createjs.Sprite(new createjs.SpriteSheet(sprites_garrafa_data), tipo);
		sprites_garrafa.x = 0;
		sprites_garrafa.y = 345;
	}

	function spritePiscina(tipo){
		sprites_piscina = new createjs.Sprite(new createjs.SpriteSheet(sprites_piscina_data), tipo);
		sprites_piscina.x = 543;
		sprites_piscina.y = 131;
	}

	function spriteVasilhas(tipo){
		sprites_vasilhas = new createjs.Sprite(new createjs.SpriteSheet(sprites_vasilhas_data), tipo);
		sprites_vasilhas.x = 712;
		sprites_vasilhas.y = 370;
	}

	function spritePneus(tipo){
		sprites_pneus = new createjs.Sprite(new createjs.SpriteSheet(sprites_pneus_data), tipo);
		sprites_pneus.x = 319;
		sprites_pneus.y = 349;
	}

	spriteTanque("init");
	spriteCalha("init");
	spriteAreia("init");
	spriteLixo("init");
	spriteGarrafa("init");
	spritePiscina("init");
	spriteVasilhas("init");
	spritePneus("init");

	function clickElementos(sprites, callback){
		sprites.addEventListener("click", function(e){
			if (contador > 0){
				var _this = e.target;
				_this.mouseEnabled = false;
				_this.alpha = 0;
				
				encontrados += 1;
				acertos.text = encontrados + "/" + qtd_acertos;

				callback();
			}
		});
	}

	// Click no Tanque.
	clickElementos(sprites_tanque, function(){
		spriteTanque("run");
		container.addChild(sprites_tanque);
		//console.log("Encontrou o Tanque! PARABÉNS");
	});

	// Click na Calha.
	clickElementos(sprites_calha, function(){
		spriteCalha("run");
		container.addChild(sprites_calha);
		//console.log("Encontrou a Calha! PARABÉNS");
	});

	// Click na Areia.
	clickElementos(sprites_areia, function(){
		spriteAreia("run");
		container.addChild(sprites_areia);
		//console.log("Encontrou a Areia! PARABÉNS");
	});

	// Click no Lixo.
	clickElementos(sprites_lixo, function(){
		spriteLixo("run");
		container.addChild(sprites_lixo);
		//console.log("Encontrou o Lixo! PARABÉNS");
	});

	// Click na Garrafa.
	clickElementos(sprites_garrafa, function(){
		spriteGarrafa("run");
		container.addChild(sprites_garrafa);
		//console.log("Encontrou a Garrafa! PARABÉNS");
	});

	// Click na Piscina.
	clickElementos(sprites_piscina, function(){
		spritePiscina("run");
		container.addChild(sprites_piscina);
		//console.log("Encontrou a Piscina! PARABÉNS");
	});

	// Click nas Vasilhas.
	clickElementos(sprites_vasilhas, function(){
		spriteVasilhas("run");
		container.addChild(sprites_vasilhas);
		//console.log("Encontrou as Vasilhas! PARABÉNS");
	});

	// Click nos Pneus.
	clickElementos(sprites_pneus, function(){
		spritePneus("run");
		container.addChild(sprites_pneus);
		//console.log("Encontrou os Pneus! PARABÉNS");
	});

	// Chama o método para pausar o tempo quando a quantidade de acertos for finalizada.
	escultar_evento_final = setInterval(function(){
		g.FinalJogo(stage, encontrados, function(data){
			if (data){
				clearInterval(escultar_evento_final);
				//console.log("O jogo acabou. Você conseguiu a tempo! Restaram " + contador + " segundos.");
			}
		});
	}, 100);

	// Envio dos elementos para o stage.
	container.addChild(bg, sprites_tanque, sprites_calha, sprites_areia, sprites_lixo);
	container.addChild(sprites_garrafa, sprites_piscina, sprites_vasilhas, sprites_pneus);

	if (callback != undefined){
		callback();
	}
}



/**
Pausar o tempo quando a quantidade de acertos for finalizada.
Finalizar o Jogo.
Distroi a contagem regressiva.

@method FinalJogo
@return {Object} Retorna o objeto construído via callback
@param {Object} [encontrados] Recebe a quantidade de acertos para uso
@param {Function} [callback] Retorna o callback da função
**/
g.FinalJogo = function(stage, encontrados, callback){
	if (encontrados == qtd_acertos){
		var container = new createjs.Container();
		var bg_opacidade = geral.Imagem(queue.getResult("bg_opacidade").src);
		var titulo_parabens = geral.Imagem(queue.getResult("titulo_parabens").src);
		var bt_jogar_novamente = geral.Imagem(queue.getResult("bt_jogar_novamente").src);
		var bt_compartilhar = geral.Imagem(queue.getResult("bt_compartilhar").src);

		bg_opacidade.x = bg_opacidade.y = bg_opacidade.alpha = 0;
		titulo_parabens.x = 55;
		titulo_parabens.y = -190;

		bt_jogar_novamente.x = 393;
		bt_jogar_novamente.y = 260;
		bt_jogar_novamente.alpha = 0;
		bt_jogar_novamente.cursor = "pointer";

		bt_compartilhar.x = 386;
		bt_compartilhar.y = 410;
		bt_compartilhar.alpha = 0;
		bt_compartilhar.cursor = "pointer";

		// Centralizando um PopUp.
		function popupCenter(url, title, w, h) {  
		    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;  
		    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;  
		              
		    width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;  
		    height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;  
		              
		    var left = ((width / 2) - (w / 2)) + dualScreenLeft;  
		    var top = ((height / 2) - (h / 2)) + dualScreenTop;  
		    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);  
		    if (window.focus) {  
		        newWindow.focus();  
		    }  
		} 

		createjs.Tween.get(bg_opacidade, {loop: false}).wait(300).to({alpha: bg_opacidade.alpha + 1.0}, 400).call(function(){
			createjs.Ticker.setPaused(true);
			sprites_relogio.gotoAndStop("stop");
			clearInterval(contagem_regressiva);

			createjs.Ticker.setPaused(false);
			createjs.Tween.get(titulo_parabens).to({y: 90}, 600, createjs.Ease.bounceOut).call(function(){
				createjs.Tween.get(bt_jogar_novamente).to({alpha: bt_jogar_novamente.alpha + 1.0}, 600);
				createjs.Tween.get(bt_compartilhar).to({alpha: bt_compartilhar.alpha + 1.0}, 600);

				// Clicar no botão e jogar novamente.
				bt_jogar_novamente.addEventListener("click", function(){
					window.location.href = "index.html";
					return false;
				});

				// Clicar para compartilhar o Jogo.
				bt_compartilhar.addEventListener("click", function(){
					popupCenter("https://www.facebook.com/sharer/sharer.php?u=https://apps.facebook.com/unidos-contra-dengue/", "Facebook", "600", "450");
					return true;
				});

				callback(true);
			});
		});

		container.addChild(bg_opacidade, titulo_parabens, bt_jogar_novamente, bt_compartilhar);
		stage.addChild(container);
	}
	else {
		callback(false);
	}
}


















