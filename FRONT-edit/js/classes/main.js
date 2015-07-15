/**
	Todas as funcionalidades iniciais do Game.
	Ative! Negócios Criativos | Desenvolvedor: Ted k'

	@function init 
	@constructor
**/
function init(){
	var stage = new createjs.Stage("canvas");
	var inicio = new Game();

	// Habilitando o FPS e o MouseOver.
	createjs.Ticker.setFPS(30);
	stage.enableMouseOver(20);
	inicio.Preload(stage);

	createjs.Ticker.addEventListener("tick", function(){
		stage.update();
	});
}