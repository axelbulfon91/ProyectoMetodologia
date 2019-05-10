var escala = 20;
var s, c,k; // objetos serpiente y comida
var columnas, filas, tamañoAreaDeJuego = 400; 

	
	function setup() {
	  	
	  	frameRate(15);  	
	  	createCanvas(tamañoAreaDeJuego, tamañoAreaDeJuego + 50);
	  	columnas = floor(tamañoAreaDeJuego/escala);
	  	filas = floor(tamañoAreaDeJuego/escala);
	  	s = new Serpiente();  	// crea objeto serpiente
	  	c = new Comida();  		// crea objeto comida
		k = new Teclado();
	  	c.posicionarComida(columnas,filas); // posiciona la primera comida
	  	
	}


	function draw() {
	  
		background(50, 200, 100);
		fill(50,200,150)	
		rect(0,400,400,400);
		fill (0);
		textSize(16);
		text('Aca van los datos del proceso y etc', 20, 430);
		
		k.keyPressed();
		s.muere();				// en cada frame comprueba si la serpiente muere
		s.actualizarPos();		// en cada frame la serpiente actualiza su posicion
	  	s.mostrar();			// en cada frame se dibuja la serpiente (con su nueva posicion generada arriba)
		s.comprobarSiCome(); 	// en cada frame comprueba si la serpiente come, de ser asi vuelve a crear otra comida a travez del metodo posicionarComida
		c.dibujarComida();		// dibuja comida
		

	}


