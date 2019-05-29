var esc = 20;
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