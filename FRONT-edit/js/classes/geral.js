/**
	Funcionalidades para todas as classes do Game.
	Ative! Negócios Criativos | Desenvolvedor: Ted k'
	
	@class GeralGame 
	@constructor
**/
function GeralGame(){}

/**
Variáveis Globais

@event variables
@param {String, Number} Variáveis para todo o projeto.
**/
var gg = GeralGame.prototype,
	caminho = {
		imgs: "global/imgs/",
		php: "global/php/",
		json: "global/json/"
	},
	canvas = {
		id: document.getElementById("canvas"),
		width: 895,
		height: 500
	},
	fonte = {
		family: "KomikaAxis"
	};



/**
Retorna o objeto ID via javascript.

@method getID
@return {Object} Para Javascript puro
**/
gg.getID = function(id){
	return document.getElementById(id);
}


/**
Retorna o AJAX para o método.

@method Ajax
@return {callback} Para a página
**/
gg.Ajax = function(options, callback){
	var xmlhttp = new XMLHttpRequest();
	var retorno;
	var query_final;

	query_final = ((options.query) ? options.query : "");
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			retorno = xmlhttp.responseText;
			callback(retorno);
		}
	}

	xmlhttp.open(options.tipo, options.arquivo, true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(query_final);
}


/**
Retorna o objeto ID via javascript.

@method mouseOverOutButtonMenu
@return {Object} Para o framework "createjs"
**/
gg.mouseOverOutBotoesMenu = function(options){
	var button = options.objeto;

	button.addEventListener("mousedown", function(){
		button.image.src = options.imageOver;
	});
	
	button.addEventListener("pressup", function(){
		button.image.src = options.imageOut;
	});
}


/**
Adiciona qualquer imagem ao objeto.

@method Imagem
@return {Object} Para o framework "createjs"
**/
gg.Imagem = function(imagem){
	return new createjs.Bitmap(imagem);
}


/**
Adiciona qualquer texto ao objeto.

@method Texto
@param {Object} [options] Recebe o objeto para uso
@return {Object} Para o framework "createjs"
**/
gg.Texto = function(options){
	return new createjs.Text(options.text, options.size + " " + fonte.family, options.color);
}


/**
Mudança das telas do jogo.

@method Transicao
@param {Object} [stage] Recebe o objeto para uso
@param {Object} [container] Recebe o objeto para uso
@param {Function} [callback] Retorna o callback da função
@return {Object} Para o framework "createjs"
**/
gg.Transicao = function(stage, container, tempo, callback){
	createjs.Tween.get(container).to({alpha:container.alpha - 1.0}, tempo).call(function(){
		stage.removeChild(container);
		callback();
	});
}


/**
Mudança de FadeIn em objetos.

@method AlphaContainer
@param {Object} [container] Recebe o objeto para uso
@param {Function} [callback] Retorna o callback da função
@param {Numeral} [tempo] Recebe o valor para uso
@return {Object} Para o javascript (callback)
**/
gg.AlphaContainer = function(container, callback, tempo){
	var novo_tempo;
	var alpha = 0;

	container.alpha = 0;

	if (tempo == undefined){
		novo_tempo = 45;
	}
	else {
		novo_tempo = tempo;
	}

	var interval_alpha = setInterval(function(){
		alpha += 0.1;
		container.alpha = alpha;

		if (alpha > 0.9){
			clearInterval(interval_alpha);

			if (callback == undefined){
				console.log("Sem callback");
			}
			else {
				callback();
			}
		}
	}, novo_tempo);
}


/**
Mudança de FadeOut em objetos.

@method AlphaContainerOut
@param {Object} [container] Recebe o objeto para uso
@param {Function} [callback] Retorna o callback da função
@param {Numeral} [tempo] Recebe o valor para uso
@return {Object} Para o javascript (callback)
**/
gg.AlphaContainerOut = function(container, callback, tempo){
	var novo_tempo;
	var alpha = 1;

	container.alpha = 1;

	if (tempo == undefined){
		novo_tempo = 35;
	}
	else {
		novo_tempo = tempo;
	}

	var interval_alpha = setInterval(function(){
		alpha -= 0.1;
		container.alpha = alpha;

		if (alpha < 0.1){
			clearInterval(interval_alpha);
			
			if (callback == undefined){
				console.log("Sem callback");
			}
			else {
				callback();
			}
		}
	}, novo_tempo);
}