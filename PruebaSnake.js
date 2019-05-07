var escala = 20;
var s, c; // objetos serpiente y comida
var columnas, filas, tamañoAreaDeJuego = 400; 
var arriba = false, abajo = false, der = false, izq = false;
	
	function setup() {
	  	
	  	frameRate(10);  	
	  	createCanvas(tamañoAreaDeJuego, tamañoAreaDeJuego + 50);
	  	columnas = floor(tamañoAreaDeJuego/escala);
	  	filas = floor(tamañoAreaDeJuego/escala);
	  	s = new Serpiente();  	// crea objeto serpiente
	  	c = new Comida();  		// crea objeto comida
	  	c.posicionarComida(columnas,filas); // posiciona la primera comida
	  	
	}


	function draw() {
	  
		background(50, 200, 100);
		fill(50,200,150)	
		rect(0,400,400,400);
		fill (0);
		textSize(16);
		text('Aca van los datos del proceso y etc', 20, 430);
		
		
		s.muere();				// en cada frame comprueba si la serpiente muere
		s.actualizarPos();		// en cada frame la serpiente actualiza su posicion
	  	s.mostrar();			// en cada frame se dibuja la serpiente (con su nueva posicion generada arriba)
		s.comprobarSiCome(); 	// en cada frame comprueba si la serpiente come, de ser asi vuelve a crear otra comida a travez del metodo posicionarComida
		c.dibujarComida();		// dibuja comida

	}

function keyPressed(){

	if(keyCode === UP_ARROW && arriba === false){

		s.direccion(0, -1);
		arriba = true;
		abajo = true;
		izq = false;
		der = false;

	}else if (keyCode === DOWN_ARROW && abajo === false){

		s.direccion(0, 1);
		abajo = true;
		arriba = true;
		izq = false;
		der = false;

	}else if (keyCode === LEFT_ARROW && izq === false){

		s.direccion(-1, 0);
		izq = true;
		abajo = false;
		arriba = false;
		der = true;

	}else if (keyCode === RIGHT_ARROW && der === false){

		s.direccion(1, 0);
		der = true;
		abajo = false;
		izq = true;
		arriba = false;
	}	
}
