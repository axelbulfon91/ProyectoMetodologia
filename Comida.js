var posComida, comi;

function Comi(){


	this.posicionarComida = function(x, y){

		comi = createVector (floor(random(x)), floor(random (y)));
  		comi.mult(escala);
  		posComida = createVector(comi.x, comi.y)
  		return true;
  		

	}

	this.devolverPosicionComida = function (){

		return posComida;

	}

	this.dibujarComida = function(){

		fill(220,70,0);
		rect(comi.x, comi.y, escala, escala);

	}



}
