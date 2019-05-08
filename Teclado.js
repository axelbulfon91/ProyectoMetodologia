var arriba = false, abajo = false, der = false, izq = false;
var teclaW = false, teclaS = false, teclaD = false, teclaA = false;

function Teclado(){

	if(event.keyCode === 38 && arriba === false && abajo === false){

		s.direccion(0, -1);
		arriba = true;
		abajo = true;
		izq = false;
		der = false;

	}else if (event.keyCode === 40 && abajo === false && arriba === false){

		s.direccion(0, 1);
		abajo = true;
		arriba = true;
		izq = false;
		der = false;

	}else if (event.keyCode === 37 && izq === false && der === false){

		s.direccion(-1, 0);
		izq = true;
		abajo = false;
		arriba = false;
		der = true;

	}else if (event.keyCode === 39 && der === false && izq === false){

		s.direccion(1, 0);
		der = true;
		abajo = false;
		izq = true;
		arriba = false;
	}else if(event.keyCode === 87 && teclaW === false && teclaS === false){

		s.direccion(0, -1);
		arriba = true;
		abajo = true;
		izq = false;
		der = false;

	}else if (event.keyCode === 83 && teclaS === false && teclaW === false){

		s.direccion(0, 1);
		abajo = true;
		arriba = true;
		izq = false;
		der = false;

	}else if (event.keyCode === 65 && teclaA === false && teclaD === false){

		s.direccion(-1, 0);
		izq = true;
		abajo = false;
		arriba = false;
		der = true;

	}else if (event.keyCode === 68 && teclaD === false && teclaA === false){

		s.direccion(1, 0);
		der = true;
		abajo = false;
		izq = true;
		arriba = false;
	}
}
