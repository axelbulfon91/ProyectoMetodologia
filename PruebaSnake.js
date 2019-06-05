	var escala = 20;
	var s, c,k; // objetos serpiente y comida
	var columnas, filas, tamañoAreaDeJuego = 400; 

	////////////////////////////////////////////////////7
	var botonComenzar =[];
	var botonSalir =[];
	var botonReseteo =[];
	var myImage = new Image(300, 300);
	var myImage2 = new Image (380,150);//Titulo "Snake"
	var gameOverImage = new Image (350,200);
	var pantallaFin = false;
	var serpienteFinImagen = new Image(300,200);
	var sonMuteImg = new Image(40,40);
	var sonMenu = new Audio('sonidoMenu.mp3');
	var sonMov = new Audio ('sonidoMovimiento.mp3');
	var sonMuert = new Audio ('sonidoMuerte.mp3');
	var sonFrut = new Audio ('sonidoObtieneFruta.mp3');
	var estadoSonido = false; //Esta variable ayuda a que cuando se presiona la tecla "l" una vez, se mute el sonido, cuando se apriete nuevamente se reproduzca nuevamente el sonido. 
//////////////////////////////////////////////////////

function setup() { 

	frameRate(5);  	
	createCanvas(tamañoAreaDeJuego, tamañoAreaDeJuego + 50);
	columnas = floor(tamañoAreaDeJuego/escala);
	filas = floor(tamañoAreaDeJuego/escala);
	s = new Serpiente();  	// crea objeto serpiente
	c = new Comida();  		// crea objeto comida
	k = new Teclado();
	c.posicionarComida(columnas,filas); // posiciona la primera comida


	////////////////////////////////////////////////////////////////////////////////////////7777
		botonComenzar[0]=50;//Controla la posicion del boton en linea horizontal
		 botonComenzar[1]=370;//Controla la posicion del boton en linea vertical
		 botonComenzar[2]=100;//Controla el ancho del boton
		 botonComenzar[3]=30;//Controla el alto del boton
		 botonComenzar[4]=0;//Controla el "prendido" o "apagado" del boton

		 botonSalir[0]=250;//Controla la posicion del boton en linea horizontal
		 botonSalir[1]=370;//Controla la posicion del boton en linea vertical
		 botonSalir[2]=100;//Controla el ancho del boton
		 botonSalir[3]=30;//Controla el alto del boton
		 botonSalir[4]=0;//Controla el "prendido" o "apagado" del boton
		 
		 botonReseteo[0]=50;//Controla la posicion del boton en linea horizontal
		 botonReseteo[1]=370;//Controla la posicion del boton en linea vertical
		 botonReseteo[2]=100;//Controla el ancho del boton
		 botonReseteo[3]=30;//Controla el alto del boton
		 botonReseteo[4]=0;//Controla el "prendido" o "apagado" del boton

		//Settings de el gif de serpiente del inicio:
		myImage.src = 'zone-2-enemy-stance.gif';
		myImage.style.position = 'absolute';
		myImage.style.left = '50px';
		myImage.style.top = '70px';
		myImage.style.mixBlendMode = 'darken';
		
		//Setting del titulo del juego: 
		myImage2.src = 'title.png';
		myImage2.style.position = 'absolute';
		myImage2.style.left = '18px';
		myImage2.style.top = '25px';
		myImage2.style.mixBlendMode = 'darken';
		
		//Setting Titulo Imagen "Game Over": 
		gameOverImage.src = 'GAME_OVER.png';
		gameOverImage.style.position = 'absolute';
		gameOverImage.style.left = '25px';
		gameOverImage.style.top = '-40px';

		
		//Setting Imagen de serpiente fallecida: 
		serpienteFinImagen.src = 'zone-2-enemy-stance_dead.png';
		serpienteFinImagen.style.position = 'absolute';
		serpienteFinImagen.style.left = '50px';
		serpienteFinImagen.style.top = '160px';

		//Settings Imagen Mute:
		sonMuteImg.src = 'mute.png';
		sonMuteImg.style.position = 'absolute';
		sonMuteImg.style.left = '359px';
		sonMuteImg.style.top = '408px';
		

	 //SONIDOS:
	sonMenu.id = "sonMenu";
	sonMenu.type="audio/mpeg";
 	sonMov.id = "sonMov";
 	sonMov.type="audio/mpeg";
 	sonMuert.id = "sonMuert";
 	sonMuert.type="audio/mpeg"; 
 	sonFrut.id = "sonFrut";
 	sonFrut.type="audio/mpeg"; 


     //Acontinuacion se desarrolla la siguiente funcion con sus variables que establece que el sonido se activara y comenzara
	//a escucharse a partir de una accion del Usuario, segun cambio de directivas de  Google Chrome's autoplay policy.
	var myDiv = createDiv('click to start audio');
	myDiv.position(135, 410);
	var mySynth = new p5.MonoSynth();
	  // This won't play until the context has started
	  mySynth.play('A6');
	  // Start the audio context on a click/touch event
	  userStartAudio().then(function() {
	  	//sonMenu.play();
	  	myDiv.remove();
	  });

}

//Sonidos activacion/desactivacion: 
this.sound = function() {
this.keyPressed = function(){
		if(key === 'm' && estadoSonido === true){	
			sonMenu.pause();
			sonMov.pause();
			sonMuert.pause();
			sonFrut.pause();
			estadoSonido = false;
		} else if (key === 'm' && estadoSonido === false) {
			sonMenu.play();
			estadoSonido = true;
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////	


function draw() {
        
	 //////////////////////////////////////////////////////////////////////////////////////////
document.body.appendChild(sonMuteImg);

if (estadoSonido === true){
sonMuteImg.style.visibility = 'hidden';
} else if (estadoSonido === false){
	sonMuteImg.style.visibility = 'visible';
}

if (estadoSonido === true){
sonMenu.play();
}


this.sound();


			background(236,168,52); 
	        document.body.appendChild(myImage); //La imagen no nos pertenece, se obtuve del siguiente sitio web publico: https://static1.squarespace.com/static/53963c4ce4b0efebb7e88751/5b2812a31ae6cfa8e5f1834e/5b2812a7758d463caabaa202/1529353292808/zone-2-enemy-stance.gif 
	        document.body.appendChild(myImage2);

			//Dibujo del boton de Pantalla Comienzo del juego:
			rect(botonComenzar[0], botonComenzar[1], botonComenzar[2], botonComenzar[3]);
			text('COMENZAR',68,389);//el primer valor hace referencia a la posicion en el eje de "X" y el segundo a la posicion en el eje de "Y"
			rect(botonSalir[0], botonSalir[1], botonSalir[2], botonSalir[3]);
			text('SALIR',280,389);//el primer valor hace referencia a la posicion en el eje de "X" y el segundo a la posicion en el eje de "Y"
			
			//Evento de presionado del boton de Comienzo del juego: (Recordar: el evento es uno solo pero puedo incluir mas de un boton)
			this.mousePressed = function(){
				if((mouseY<(botonComenzar[1]+botonComenzar[3])) && (mouseY>(botonComenzar[1]))){
					if((mouseX<(botonComenzar[0]+botonComenzar[2])) && (mouseX>(botonComenzar[0]))){
						botonComenzar[4]=1;
						
					}
				}
				if((mouseY<(botonSalir[1]+botonSalir[3])) && (mouseY>(botonSalir[1]))){
					if((mouseX<(botonSalir[0]+botonSalir[2])) && (mouseX>(botonSalir[0]))){
						close();
					}
				}
			}
			
			
			//La siguiente condicion abre el juego cuando comprueba que se selecciono el boton "Comenzar";
	if(botonComenzar[4]==1){
				sonMenu.pause();
				sonMenu.muted = 'true';
				myImage.style.display = 'none';
				myImage2.style.display = 'none';

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
	background(50, 200, 100);
	fill(50,200,150)	
	rect(0,400,400,400);
	fill (0);
	textSize(16); 
	k.keyPressed();
	s.actualizarPos();		// en cada frame la serpiente actualiza su posicion
	s.muere();// en cada frame comprueba si la serpiente muere
	s.mostrar();	// en cada frame se dibuja la serpiente (con su nueva posicion generada arriba)
	s.comprobarSiCome(); 	// en cada frame comprueba si la serpiente come, de ser asi vuelve a crear otra comida a travez del metodo posicionarComida
	c.dibujarComida();		// dibuja comida
	s.devolverPuntaje();
	text('Puntaje: ' + s.punt, 20, 430); 
		}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			//La siguiente condicion establece una pantalla de fin de juego, en el caso que la serpiente muera:
	if(pantallaFin == true){
				sonMov.pause();
				//sonMov.muted='true';
				noLoop;
				background(127,127,127);
				document.body.appendChild(gameOverImage);
				document.body.appendChild(serpienteFinImagen);
				
				this.mousePressed = function(){
					if((mouseY<(botonReseteo[1]+botonReseteo[3])) && (mouseY>(botonReseteo[1]))){
						if((mouseX<(botonReseteo[0]+botonReseteo[2])) && (mouseX>(botonReseteo[0]))){

							document.location.reload();
						}
					}
					if((mouseY<(botonSalir[1]+botonSalir[3])) && (mouseY>(botonSalir[1]))){
						if((mouseX<(botonSalir[0]+botonSalir[2])) && (mouseX>(botonSalir[0]))){
							close();
						}
					}
				}
				
				fill(255,255,255);
				rect(botonSalir[0], botonSalir[1], botonSalir[2], botonSalir[3]);
				fill(0);
				text('SALIR',296,389);

				fill(255,255,255);
				rect(botonReseteo[0], botonReseteo[1], botonReseteo[2], botonReseteo[3]);
				fill(0);
				text('RESETEAR',98,389);
			}
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
}






