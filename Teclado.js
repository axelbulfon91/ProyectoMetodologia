var arriba = false, abajo = false, der = false, izq = false;
var teclaW = false, teclaS = false, teclaD = false, teclaA = false;

function Teclado(){  


this.keyPressed = function(){
	if( keyCode === UP_ARROW && arriba === false && abajo === false){
		
		s.direccion(0, -1);
		arriba = true;
		abajo = true;
		izq = false;
		der = false;
		
	}else if (keyCode === DOWN_ARROW && abajo === false && arriba === false){

		s.direccion(0, 1);
		abajo = true;
		arriba = true;
		izq = false;
		der = false;

	}else if (keyCode === LEFT_ARROW && izq === false && der === false){

		s.direccion(-1, 0);
		izq = true;
		abajo = false;
		arriba = false;
		der = true;

	}else if (keyCode === RIGHT_ARROW && der === false && izq === false){

		s.direccion(1, 0);
		der = true;
		abajo = false;
		izq = true;
		arriba = false;
	}else if(key === 'w' && arriba === false && abajo === false){

		s.direccion(0, -1);
		arriba = true;
		abajo = true;
		izq = false;
		der = false;

	}else if (key === 's' && abajo === false && arriba === false){

		s.direccion(0, 1);
		abajo = true;
		arriba = true;
		izq = false;
		der = false;

	}else if (key === 'a' && izq === false && der === false){

		s.direccion(-1, 0);
		izq = true;
		abajo = false;
		arriba = false;
		der = true;

	}else if (key === 'd' && der === false && izq === false){

		s.direccion(1, 0);
		der = true;
		abajo = false;
		izq = true;
		arriba = false;
		}
	}
}
