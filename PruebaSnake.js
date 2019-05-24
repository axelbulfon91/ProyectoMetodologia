var escala = 20;
var s, c,k; // objetos serpiente y comida
var columnas, filas, tamañoAreaDeJuego = 400; 
var botonComenzar =[];
 var myImage = new Image(300, 300);
 var myImage2 = new Image (260,90);
//"C:\Users\ANDY\Desktop\LOCAL SNAKE - MODS\ProyectoMetodologia\zone-2-enemy-stance.gif";
 



	
	function setup() {
		
	  	frameRate(5);  	
	  	createCanvas(tamañoAreaDeJuego, tamañoAreaDeJuego + 50);
	  	columnas = floor(tamañoAreaDeJuego/escala);
	  	filas = floor(tamañoAreaDeJuego/escala);
	  	s = new Serpiente();  	// crea objeto serpiente
	  	c = new Comida();  		// crea objeto comida
		k = new Teclado();
	  	c.posicionarComida(columnas,filas); // posiciona la primera comida
	 
	botonComenzar[0]=50;//Controla la posicion del boton en linea horizontal
	 botonComenzar[1]=370;//Controla la posicion del boton en linea vertical
	 botonComenzar[2]=100;//Controla el ancho del boton
	 botonComenzar[3]=30;//Controla el alto del boton
	 botonComenzar[4]=0;//Controla el "prendido" o "apagado" del boton
	
	//Settings de el gif de serpiente del inicio:
	myImage.src = 'zone-2-enemy-stance.gif';
	myImage.style.position = 'absolute';
	myImage.style.left = '50px';
	myImage.style.top = '70px';
    myImage.style.mixBlendMode = 'darken';
	
	//Setting del titulo del juego: 
	myImage2.src = 'title.png';
	myImage2.style.position = 'absolute';
	myImage2.style.left = '75px';
	myImage2.style.top = '50px';
    myImage2.style.mixBlendMode = 'darken';
	}
	


	function draw() {

		
		background(236,168,52); 
        document.body.appendChild(myImage); //La imagen no nos pertenece, se obtuve del siguiente sitio web publico: https://static1.squarespace.com/static/53963c4ce4b0efebb7e88751/5b2812a31ae6cfa8e5f1834e/5b2812a7758d463caabaa202/1529353292808/zone-2-enemy-stance.gif 
		document.body.appendChild(myImage2);
		
		
		//Dibujo del boton de Comienzo del juego:
		rect(botonComenzar[0], botonComenzar[1], botonComenzar[2], botonComenzar[3]);
		text('COMENZAR',68,387);//el primer valor hace referencia a la posicion en el eje de "X" y el segundo a la posicion en el eje de "Y"
		
		//Evento de presionado del boton de Comienzo del juego:
		this.mousePressed = function(){
			if((mouseY<(botonComenzar[1]+botonComenzar[3])) && (mouseY>(botonComenzar[1]))){
				if((mouseX<(botonComenzar[0]+botonComenzar[2])) && (mouseX>(botonComenzar[0]))){
					botonComenzar[4]=1;
				}
			}
			
		}
		
		
		if(botonComenzar[4]==1){
		myImage.style.display = 'none';
		myImage2.style.display = 'none';
		
		background(50, 200, 100);
		fill(50,200,150)	
		rect(0,400,400,400);
		fill (0);
		textSize(16); 
		
	
		k.keyPressed();
		s.muere();				// en cada frame comprueba si la serpiente muere
		s.actualizarPos();		// en cada frame la serpiente actualiza su posicion
	  	s.mostrar();			// en cada frame se dibuja la serpiente (con su nueva posicion generada arriba)
		s.comprobarSiCome(); 	// en cada frame comprueba si la serpiente come, de ser asi vuelve a crear otra comida a travez del metodo posicionarComida
		c.dibujarComida();		// dibuja comida
		
		s.devolverPuntaje();
		text('Puntaje: ' + s.punt, 20, 430);
		}

	}
		
		
	  
	


