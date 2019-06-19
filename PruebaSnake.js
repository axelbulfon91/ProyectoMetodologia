
// CON AL MODIFICACION DE LA SIGUIENTE VARIABLE SE M ODIFICA TODA LA ESCALA-TAMAÑO DEL JUEGO COMPLETO:
	var escala = 25;     //(20)  valor relacionado con la escala del juego
		
	//El ancho del area del juego es una proporcion de la variable escala:
	var anchoAreaDeJuego = escala * 20; 
	//La altura va en funcion del ancho para que mantenga proporcion adecuada 
	// tambien se puede modificafr esto para darle la altura que se desee mas alla del ancho
	var altoAreaDeJuego =anchoAreaDeJuego * 1.125; //(450)   Valor nominal anterior 
	var s, c,k; // objetos serpiente y comida
	var columnas, filas;

	var botonComenzar =[];
	var botonSalir =[];
	var botonReseteo =[];

	var botonInstrucciones=[];
	var botonHumano =[];
	var botonIA =[];
	var myImage = new Image(anchoAreaDeJuego * 0.750 ,altoAreaDeJuego * 0.666); // Primer valor ancho  (300), segundo valor alto (300)
	var myImage2 = new Image (anchoAreaDeJuego * 0.950 ,altoAreaDeJuego * 0.333);//Titulo "Snake" // Primer valor ancho  (380), segundo valor alto (150)
	var myImage3 = new Image(anchoAreaDeJuego * 1.550,altoAreaDeJuego * 0.444);//Ayuda // Primer valor ancho  (620), segundo valor alto (230)
	var pantallaFin = false;
	var gameOverImage = new Image (anchoAreaDeJuego * 0.875 ,altoAreaDeJuego * 0.444); // Primer valor ancho  (350), segundo valor alto (200)
	var serpienteFinImagen = new Image(anchoAreaDeJuego * 0.750 ,altoAreaDeJuego * 0.444);// Primer valor ancho  (300), segundo valor alto (200)
	var sonMuteImg = new Image(anchoAreaDeJuego * 0.100 ,altoAreaDeJuego * 0.088);// Primer valor ancho  (40), segundo valor alto (40)
	var sonMenu = new Audio('sonidoMenu.mp3');
	var sonMov = new Audio ('sonidoMovimiento.mp3');
	var sonMuert = new Audio ('sonidoMuerte.mp3');
	var sonFrut = new Audio ('sonidoObtieneFruta.mp3');
	var estadoSonido = true; //Esta variable ayuda a que cuando se presiona la tecla "m" una vez, se mute el sonido, 
	//cuando se apriete nuevamente se reproduzca nuevamente el sonido. 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     VARIABLES SERPIENTE IA:
let s;
let escala = 20;
let columnas;
let filas;
let comida;
let fueraDeTiempo;
let limite;
let tiempoTomado;

let espacioExt = 10;
let poblacionActual;
let poblacion = [];
let largo = [];
let contJugadas;
let sumalargo;
let juegosPorPoblacion = 3;
let mejorLargo;
let mejorId;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////        FUNCTION SETUP             /////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   


function setup() { 

////////////////////////////////////////    SETUP SERPIENTE HUMANA   ////////////////////////////////////////////////////////////////////////////////////

//La siguiente variable modifica la velocidad del moviemiento de la serpiente humana:
	frameRate(5);  	
	createCanvas(anchoAreaDeJuego, altoAreaDeJuego);
	columnas = floor(anchoAreaDeJuego/escala);
	filas = floor(anchoAreaDeJuego/escala);
	s = new Serpiente();  	// crea objeto serpiente
	
	visionComida = [0,0,0,0];	// inicia vision de serpiente en 4 direcciones cada una
	visionPared = [0,0,0,0];
	visionCola = [0,0,0,0];
	
	c = new Comida();  		// crea objeto comida
	k = new Teclado();
	c.posicionarComida(columnas,filas); // posiciona la primera comida


	  	botonComenzar[0]=round(anchoAreaDeJuego * 0.125);//(50)  Controla la posicion del boton en linea horizontal
		 botonComenzar[1]=round(altoAreaDeJuego * 0.822);//(370)  Controla la posicion del boton en linea vertical
		 botonComenzar[2]=round(anchoAreaDeJuego * 0.250);//(100)  Controla el ancho del boton
		 botonComenzar[3]=round(altoAreaDeJuego * 0.066);//(50)   Controla el alto del boton
		 botonComenzar[4]=0;//Controla el "prendido" o "apagado" del boton  
	
		 botonInstrucciones[0]=round(anchoAreaDeJuego * 0.375);//(150)  Controla la posicion del boton en linea horizontal
		 botonInstrucciones[1]=round(altoAreaDeJuego * 0.822);//(370)  Controla la posicion del boton en linea vertical
		 botonInstrucciones[2]=round(anchoAreaDeJuego * 0.250);//(100)  Controla el ancho del boton
		 botonInstrucciones[3]=round(altoAreaDeJuego * 0.066);//(30)  Controla el alto del boton
		 botonInstrucciones[4]=0;//()  Controla el "prendido" o "apagado" del boton
		 

		 botonSalir[0]=round(anchoAreaDeJuego * 0.625);//(250)  Controla la posicion del boton en linea horizontal
		 botonSalir[1]=round(altoAreaDeJuego * 0.822);//(370)  Controla la posicion del boton en linea vertical
		 botonSalir[2]=round(anchoAreaDeJuego * 0.250);//(100)  Controla el ancho del boton
		 botonSalir[3]=round(altoAreaDeJuego * 0.066);//(30)  Controla el alto del boton
		 botonSalir[4]=0;//Controla el "prendido" o "apagado" del boton
		 
		 botonReseteo[0]=round(anchoAreaDeJuego * 0.125);//(50)  Controla la posicion del boton en linea horizontal
		 botonReseteo[1]=round(altoAreaDeJuego * 0.822);//(370)  Controla la posicion del boton en linea vertical
		 botonReseteo[2]=round(anchoAreaDeJuego * 0.250);//(100)  Controla el ancho del boton
		 botonReseteo[3]=round(altoAreaDeJuego * 0.066);//(50)  Controla el alto del boton
		 botonReseteo[4]=0;//Controla el "prendido" o "apagado" del boton

         botonHumano[0]=round(anchoAreaDeJuego * 0.625);//(250)  Controla la posicion del boton en linea horizontal
		 botonHumano[1]=round(altoAreaDeJuego * 0.822);//(370)  Controla la posicion del boton en linea vertical
		 botonHumano[2]=round(anchoAreaDeJuego * 0.250);//(100)  Controla el ancho del boton
		 botonHumano[3]=round(altoAreaDeJuego * 0.066);//(30)  Controla el alto del boton
		 botonHumano[4]=0;//Controla el "prendido" o "apagado" del boton

		 botonIA[0]=round(anchoAreaDeJuego * 0.125);//(50)  Controla la posicion del boton en linea horizontal
		 botonIA[1]=round(altoAreaDeJuego * 0.822);//(370)  Controla la posicion del boton en linea vertical
		 botonIA[2]=round(anchoAreaDeJuego * 0.250);//(100)  Controla el ancho del boton
		 botonIA[3]=round(altoAreaDeJuego * 0.066);//(50)   Controla el alto del boton
		 botonIA[4]=0;//Controla el "prendido" o "apagado" del boton  


		//Settings de el gif de serpiente del inicio:
		myImage.src = 'zone-2-enemy-stance.gif';
		myImage.style.position = 'absolute';
		myImage.style.left = (anchoAreaDeJuego * 0.125)+'px'; //('50px') tamaño horizontal
		myImage.style.top = (altoAreaDeJuego * 0.155)+'px';  //('70px') tamaño vertical
		myImage.style.mixBlendMode = 'darken';
		
		//Setting del titulo del juego: 
		myImage2.src = 'title.png';
		myImage2.style.position = 'absolute';
		myImage2.style.left = (anchoAreaDeJuego * 0.045)+'px';//('18px') tamaño horizontal
		myImage2.style.top = (altoAreaDeJuego * 0.055)+'px';//('25px') tamaño vertical
		myImage2.style.mixBlendMode = 'darken';
		
		//Ayuda del juego 
		myImage3.src = 'ayuda.png';
		myImage3.style.position = 'absolute';
		myImage3.style.left = (anchoAreaDeJuego * 1.375)+'px';//(550)tamaño horizontal
		myImage3.style.top = (altoAreaDeJuego * 0.355)+'px';//(160) tamaño vertical
		//myImage3.style.mixBlendMode = 'darken';
		

		//Setting Titulo Imagen "Game Over": 
		gameOverImage.src = 'GAME_OVER.png';
		gameOverImage.style.position = 'absolute';
		gameOverImage.style.left = (anchoAreaDeJuego * 0.055)+'px';//('25px') tamaño horizontal
		gameOverImage.style.top = (altoAreaDeJuego * -0.088)+'px';//('-40px') tamaño vertical

		
		//Setting Imagen de serpiente fallecida: 
		serpienteFinImagen.src = 'zone-2-enemy-stance_dead.png';
		serpienteFinImagen.style.position = 'absolute';
		serpienteFinImagen.style.left = (anchoAreaDeJuego * 0.125)+'px';//('50px') tamaño horizontal
		serpienteFinImagen.style.top = (altoAreaDeJuego * 0.355)+'px';//('160px') tamaño vertical

		//Settings Imagen Mute:
		sonMuteImg.src = 'mute.png';
		sonMuteImg.style.position = 'absolute';
		sonMuteImg.style.left = (anchoAreaDeJuego * 0.897)+'px';//('359px') tamaño horizontal
		sonMuteImg.style.top = (altoAreaDeJuego * 0.906)+'px';//('408px') tamaño vertical
		

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
	myDiv.position(anchoAreaDeJuego * 0.337, altoAreaDeJuego * 0.911); // Primer valor ancho  (135), segundo valor alto (410)
	var mySynth = new p5.MonoSynth();
	  // This won't play until the context has started
	  mySynth.play('A6');
	  // Start the audio context on a click/touch event
	  userStartAudio().then(function() {
	  	//sonMenu.play();
	  	myDiv.remove();
	  });

////////////////////////////////////////    SETUP SERPIENTE IA   ///////////////////////////////////////////////////////////////////////////////////////
		frameRate(10);  
		  createCanvas(400, 400);
		  iniciarInterfazGrafica();
		  
		  columnas = floor(width/escala);
		  filas = floor(height/escala);
		  limite = columnas*filas*10;
		  
		  iniciarPoblacion();
		  iniciar();

	}// fin metodo setup

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////          METODOS:         /////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////  METODOS SERPIENTE HUMANA:     //////////////////////////////////////////////////////////////////////////////


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

////////////////////////////     METODOS SERPIENTE IA    //////////////////////////////////////////////////////////////////////////////////////////

function iniciarInterfazGrafica() {
  let boton = document.createElement('boton');
  document.body.appendChild(boton);
}

function mousePressed() {
   redraw(1);
 }

function iniciar() {
  poblacionActual = 0;
  mejorLargo = Number.NEGATIVE_INFINITY;
  s = poblacion[0];
  
  s.nacimiento = frameCount;
  primeraPosComida();
}

function terminarGeneracion() {
  console.log("Mejor largo : " + mejorLargo);
  console.log("Mejor pesos : " + poblacion[mejorId].pesos);
  console.log("Generando nueva generacion...");
  proxGeneracion();
  
  poblacionActual = 0;
  s = poblacion[poblacionActual];
}

function proxSerpiente() {
  if (mejorLargo < largo[poblacionActual]) {
    mejorLargo = largo[poblacionActual];
    mejorId = poblacionActual;
  }

  poblacionActual++;
  if (poblacionActual === poblacion.length) {
    terminarGeneracion();
  }
  s = poblacion[poblacionActual];
  s.nacimiento = frameCount;
  primeraPosComida();
}

function volverAJugar() {
  s = new Serpiente(0, 0, 0, 0, 0, [], poblacion[poblacionActual].pesos, 0);
  s.nacimiento = frameCount;
  primeraPosComida();
}

function iniciarPoblacion() {
  for (let i = 0; i < espacioExt; i++) {
    let pesos = [random(-1, 0), random(-1, 0), random(-1, 1), random(-1, 0), random(-1, 0)];
    poblacion.push(new Serpiente(0, 0, 0, 0, 0, [], pesos, 0));
  }
  sumalargo = 0;
  contJugadas = 0;
}

function primeraPosComida() {
  comida = createVector(floor(random(columnas)), floor(random(filas)));
  comida.mult(escala);
  fueraDeTiempo = frameCount + limite;
}

function tomarPos() {
  let bandera = true;
  fueraDeTiempo = frameCount + limite;

  while(bandera) {
    bandera = false;
    comida = createVector(floor(random(columnas)), floor(random(filas)));
    comida.mult(escala);
    for (let i = 0; i < s.cola.length; i++) {
      if (comida.x === s.cola[i].x && comida.y === s.cola[i].y) {
        bandera = true;
        break;
      }
    }
    if (comida.x === s.x && comida.y === s.y) {
      bandera = true;
    }
  }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
////////////////////////////////   FUNCTION DRAW   /////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function draw() {
        
	
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
			textSize(anchoAreaDeJuego * 0.040);
			rect(botonComenzar[0], botonComenzar[1], botonComenzar[2], botonComenzar[3]);
			text('COMENZAR',anchoAreaDeJuego * 0.135 ,altoAreaDeJuego * 0.864); // Primer valor posicion a lo ancho  (54), segundo valor posicion a lo alto (389)
			rect(botonSalir[0], botonSalir[1], botonSalir[2], botonSalir[3]);
			text('SALIR',anchoAreaDeJuego * 0.700 ,altoAreaDeJuego * 0.864);// Primer valor posicion a lo ancho  (280), segundo valor posicion a lo alto (389)
			rect(botonInstrucciones[0], botonInstrucciones[1], botonInstrucciones[2], botonInstrucciones[3]);
			text('AYUDA',anchoAreaDeJuego * 0.437,altoAreaDeJuego * 0.864);//Primer valor posicion a lo ancho  (175), segundo valor posicion a lo alto (389)

			
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

				 if((mouseY<(botonInstrucciones[1]+botonInstrucciones[3])) && (mouseY>(botonInstrucciones[1]))){
					if((mouseX<(botonInstrucciones[0]+botonInstrucciones[2])) && (mouseX>(botonInstrucciones[0]))){
						botonInstrucciones[4]=1;
						
					}
				}
			}

	if(botonInstrucciones[4]==1){
	document.body.appendChild(myImage3);

	}

//La siguiente condicion abre el juego cuando comprueba que se selecciono el boton "Comenzar";
	if(botonComenzar[4]==1){

		myImage3.style.visibility = 'hidden';
		background(236,168,52); 
        textSize(anchoAreaDeJuego * 0.040);
		rect(botonIA[0], botonIA[1], botonIA[2], botonIA[3]);
		text('PRUEBA I.A.',anchoAreaDeJuego * 0.130 ,altoAreaDeJuego * 0.864); // Primer valor posicion a lo ancho  (52), segundo valor posicion a lo alto (389)
		rect(botonHumano[0], botonHumano[1], botonHumano[2], botonHumano[3]);
		text('HUMANO',anchoAreaDeJuego * 0.667 ,altoAreaDeJuego * 0.864);// Primer valor posicion a lo ancho  (267), segundo valor posicion a lo alto (389)


//Segunda pantalla de opciones MOUSE PRESSED:
this.mousePressed = function(){
				//Si se clickea el boton "Humano", comienza el juego para el usuario:
				if((mouseY<(botonHumano[1]+botonHumano[3])) && (mouseY>(botonHumano[1]))){
					if((mouseX<(botonHumano[0]+botonHumano[2])) && (mouseX>(botonHumano[0]))){
							botonHumano[4]=1;
					}
				}
				//Si se clickea el boton "ProbarIA", se abre la funcion de la serpiente inteligente.
				if((mouseY<(botonIA[1]+botonIA[3])) && (mouseY>(botonIA[1]))){
					if((mouseX<(botonIA[0]+botonIA[2])) && (mouseX>(botonIA[0]))){
						botonIA[4]=1;
					}
				}
			}

/////////////////         SERPIENTE "HUMANA":       /////////////////////////////////////////////////////////////////////////////////////////////////////

if(botonHumano[4]==1){

	sonMenu.pause();
    sonMenu.muted = 'true';
	myImage.style.display = 'none';
	myImage2.style.display = 'none';

	background(50, 200, 100);
	fill(50,200,150)	
	rect(0,anchoAreaDeJuego,anchoAreaDeJuego,anchoAreaDeJuego);//(posicion horizontal, posicion vertical, ancho, alto)
	fill (0);
	textSize(anchoAreaDeJuego * 0.040); //Escala del texto en funcion del ancho del area de juego; valor(16) 
	k.keyPressed();
	s.muere();// en cada frame comprueba si la serpiente muere
	s.actualizarPos();		// en cada frame la serpiente actualiza su posicion
	s.mostrar();	// en cada frame se dibuja la serpiente (con su nueva posicion generada arriba)
	s.comprobarSiCome(); 	// en cada frame comprueba si la serpiente come, de ser asi vuelve a crear otra comida a travez del metodo posicionarComida
	c.dibujarComida();		// dibuja comida
	s.devolverPuntaje();
	text('Puntaje: ' + s.punt, anchoAreaDeJuego * 0.050 ,altoAreaDeJuego * 0.955);// Primer valor posicion a lo ancho  (20), segundo valor posicion a lo alto (430)
		}


//////////////////////////////        SERPIENTE IA:       ///////////////////////////////////////////////////////////////////////////////////////////////////

		if(botonHumano[4]==1){

//ACA VA EL DRAW DE LA SERPIENTE INTELIGENTE:
 background(51);

  if (s.comer(comida)) {
    tomarPos();
  }
  
  let sinLugarADondeIr = false;
  sinLugarADondeIr = s.moverse(s.tomarDir());
  s.mostrar();

  fill(255, 0, 100);

  rect(comida.x, comida.y, escala, escala);

  if (s.morir() || sinLugarADondeIr === true) {
    
    let vuelta = false;
    
    if(contJugadas === juegosPorPoblacion) {
      largo[poblacionActual] = sumalargo / juegosPorPoblacion;
      if (largo[poblacionActual] < 0) largo[poblacionActual] = 0;
      console.log("Juego Terminado: " + poblacionActual);
      console.log("pesos: " + poblacion[poblacionActual].pesos);
      console.log("largo = " + largo[poblacionActual]);
      sumalargo = 0;
      contJugadas = 0;

      vuelta = true;
    }
    
    else {
      sumalargo += s.cola.length + (frameCount-s.nacimiento)/(columnas*filas*-1);
      contJugadas++;
    }

    
    if (vuelta) {
      proxSerpiente();
    } else {
      volverAJugar();
    }
  } else if (s.final()) {
    console.log("Juego Completado: " + poblacionActual);
    largo[poblacionActual] = s.cola.length + (frameCount-s.nacimiento)/(columnas*filas*-0.5);
    console.log("largo = " + largo[poblacionActual]);
    if (poblacionActual === poblacion.length-1) {
      terminarGeneracion();
    } else {
      proxSerpiente();
    }
  }

  function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}

}//fin if boton "Probar IA"
}//fin funcion draw


////////////////////////////      PANTALLA FIN DEL JUEGO:   /////////////////////////////////////////////////////////////////////////////////////////////////

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
				text('SALIR',anchoAreaDeJuego * 0.740 ,altoAreaDeJuego * 0.864);// Primer valor posicion a lo ancho  (296), segundo valor posicion a lo alto (389)

				fill(255,255,255);
				rect(botonReseteo[0], botonReseteo[1], botonReseteo[2], botonReseteo[3]);
				fill(0);
				text('RESETEAR',anchoAreaDeJuego * 0.245 ,altoAreaDeJuego * 0.864);// Primer valor posicion a lo ancho  (98), segundo valor posicion a lo alto (389)
			}
		
}






