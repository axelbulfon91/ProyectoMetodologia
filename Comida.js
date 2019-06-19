var esc = escala; //Se modifico esta variable para que este referida a la variable "escala" de PruebaSerpiente.js para que cambie de tamaño la fruta tambien
var posComida, comida;

function Comida(){

	this.posicionarComida = function(x, y){

		comida = createVector (floor(random(x)), floor(random (y)));
  		comida.mult(esc);
  		posComida = createVector(comida.x, comida.y)
  		

	}

	this.devolverPosicionComida = function (){

		return posComida;

	}

	this.dibujarComida = function(){

		fill(220,70,0);
		rect(comida.x, comida.y, esc, esc);

	}



}