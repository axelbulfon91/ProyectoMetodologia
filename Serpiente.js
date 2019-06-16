
function Serpiente () {

//-------------- Atributos ----------------------
	this.x = tamañoAreaDeJuego/2;
	this.y = tamañoAreaDeJuego/2;			
	this.xVel = floor(random(2));
	this.yVel = floor(random(2));	
	this.tam = 0;
	this.cola = [];
	this.punt = 0;
	this.rangoVision = escala // El rango de vision inicial es de una vez el tamaño de la cabeza, osea el cuadro delante de la misma
	this.maximaVision = this.rangoVision * 5  // Alcance maximo de la vision (5 veces el tamaño de la cabeza)
	this.comida = createVector(floor(random(tamañoAreaDeJuego/escala))*escala, floor(random(tamañoAreaDeJuego/escala))*escala);
	this.colorInicial1 = floor(random(256));
	this.colorInicial2 = floor(random(256));
	this.colorInicial3 = floor(random(256));
//------------- Metodos ----------------------------	
	this.setVelocidadInicial = function(){
		this.xVel = floor(random(-1, 2));
		do{
			this.yVel = floor(random(-1, 2));
		}while(abs(this.xVel) == abs(this.yVel))

	}
	
	this.cambiarDireccion = function(x, y){//Usado por el teclado para cambiar la direccion
		this.xVel = x;
		this.yVel = y;
	}
	this.muere = function(){
		//Comprueba que la cabeza y ningun bloque de la cola se choquen
		for (var i = 0; i < this.cola.length ; i++) {
		
			var pos = this.cola[i];
			var distanciaAMorir = dist (this.x, this.y, pos.x, pos.y);
			
			if (distanciaAMorir < 1 || this.x >=tamañoAreaDeJuego) {
				console.log("Posicion de x: " + this.x);
				this.devolverPuntaje();
				sonMov.remove(); 
				pantallaFin = true;
				
				 if(estadoSonido === true){
	          			sonMuert.play();
	         		 }else{
	          			sonMuert.remove();
	          }	
				 
				textAlign(CENTER);
				text('Juego Terminado!!! presione F5 para recargar pagina', 200, 200);
				frameRate(0);

			}
		}
		//Comprueba que la cabeza no se exceda de los limites del canvas
		if (this.x >=tamañoAreaDeJuego || this.x < 0 || this.y >=tamañoAreaDeJuego || this.y < 0) {
			console.log("Posicion de x: " + this.x);
			this.devolverPuntaje();
			sonMov.remove(); 
			pantallaFin = true;
			
			 if(estadoSonido === true){
					  sonMuert.play();
				  }else{
					  sonMuert.remove();
		  }	
			textAlign(CENTER);
			text('Juego Terminado!!! presione F5 para recargar pagina', 200, 200);
			frameRate(0);
		}
	}
	this.actualizarPos = function(){
		//Primero actualiza la posicion de los bloques de la cola desde el ultimo hasta el penultimo	
		for(var i = 0; i < this.cola.length - 1 ; i++){
			this.cola[i] = this.cola[i+1];		
		}			
		//Actualiza la posicion de el ultimo bloque de la cola en base al Tamaño actual
		this.cola[this.tam - 1] = createVector(this.x, this.y);
		//Actualiza la posicion de la cabeza
		this.x = this.x + this.xVel * escala;
		this.y = this.y + this.yVel * escala;
	}

	//Dibuja la seripiente
	this.mostrar = function(){
		if( estadoSonido === true){
			sonMov.play();
		}else{
			sonMov.remove();
		}
		//Dibuja los bloques correspondientes a la cola	
		
		for(var i = this.tam -1 ; i > -1; i--){
			fill(this.colorInicial1-i*5, this.colorInicial2-i*2, this.colorInicial3-i*2, 100+i*4);
			rect(this.cola[i].x , this.cola[i].y, escala, escala,5);
		}
		//Dibula el bloque de la cabeza
		fill(this.colorInicial1, this.colorInicial2, this.colorInicial3);
		rect(this.x, this.y, escala, escala, 7);
	}

	this.comprobarSiCome = function(){
		//Comprueba la distancia entre la cabeza y la posicion de la comida actual
		//Devuelve un booleano que es tomado por el metodo comprobarSiCome
		var distanciaAComida = dist(this.x, this.y, this.comida.x, this.comida.y);
		if (distanciaAComida < 1) {		
			if(estadoSonido === true){
	          	sonFrut.play();
	         }else{
	            sonFrut.remove();
	          }
			//Actualiza el tamaño de la Serpiente
			this.tam++;
			this.posicionarComida();
			print ("La serpiente comio");
			return true;

		}else{

			return false;
		}

	}
	//---------------- COMIDA -------------------------
	this.posicionarComida = function(){
		var overlapping = true;
		do{//Comprueba que la comida generada no se superponga ni con la cabeza ni con la cola
			overlapping = false;
			this.comida.x =  floor(random(tamañoAreaDeJuego/escala))*escala;
			this.comida.y =  floor(random(tamañoAreaDeJuego/escala))*escala;
			for (let i = 0; i < this.cola.length; i++) {
				if ((this.comida.x == this.cola[i].x && this.comida.y == this.cola[i].y)||(this.comida.x == this.x && this.comida.y == this.y)) {
					overlapping = true;
					console.log("Overlapping");
					break;
				}
			}
		}while (overlapping);  
	}
	
	this.dibujarComida = function(){

		fill(floor(random(170,255)),70,0);
		rect(this.comida.x, this.comida.y, escala, escala,10);

	}
	
	/////////////////////////////////
	this.devolverPuntaje = function(){
		
		this.punt = this.tam * 5;
		

	}

	this.vista = function(){

	do{
		
		var distanciaDeVision = createVector(this.x , this.y);

		// -------------------------------------------------------------------------------------------------------Va mirando comida
		if(distanciaDeVision.x === posComida.x && distanciaDeVision.y - this.rangoVision === this.comida.y){

			print ('--------------Esta viendo COMIDA arriba --------------');

		}else if(distanciaDeVision.x === this.comida.x && distanciaDeVision.y + this.rangoVision === this.comida.y){

			print ('--------------Esta viendo COMIDA abajo --------------');	

		}else if(distanciaDeVision.x + this.rangoVision === this.comida.x && distanciaDeVision.y === this.comida.y){

			print ('--------------Esta viendo COMIDA a la derecha --------------');	

		}
		else if(distanciaDeVision.x - this.rangoVision === this.comida.x && distanciaDeVision.y === this.comida.y){

			print ('--------------Esta viendo COMIDA a la izquierda --------------');	

		}
		// -------------------------------------------------------------------------------------------------------Va mirando paredes
		if( distanciaDeVision.y - this.rangoVision === 0){

			print ('--------------Esta viendo PARED arriba --------------');

		}else if(distanciaDeVision.y + this.rangoVision === 400){

			print ('--------------Esta viendo PARED abajo --------------');	

		}else if(distanciaDeVision.x + this.rangoVision === 400){

			print ('--------------Esta viendo PARED a la derecha --------------');	

		}else if(distanciaDeVision.x - this.rangoVision === 0){

			print ('--------------Esta viendo PARED a la izquierda --------------');	

		}
		
		// -------------------------------------------------------------------------------------------------------Va mirando su cola
		
		for(var i = 0; i < this.cola.length; i++){

			if(distanciaDeVision.x === this.cola[i].x && distanciaDeVision.y - this.rangoVision === this.cola[i].y){

				print ('--------------Esta viendo SU COLA arriba --------------');

			}else if(distanciaDeVision.x === this.cola[i].x && distanciaDeVision.y + this.rangoVision === this.cola[i].y){

				print ('--------------Esta viendo SU COLA abajo --------------');	

			}else if(distanciaDeVision.x + this.rangoVision === this.cola[i].x && distanciaDeVision.y === this.cola[i].y){

				print ('--------------Esta viendo SU COLA a la derecha --------------');	

			}else if(distanciaDeVision.x - this.rangoVision === this.cola[i].x && distanciaDeVision.y === this.cola[i].y){

				print ('--------------Esta viendo SU COLA a la izquierda --------------');	

			}
		}
		this.rangoVision += escala;

	}while(this.rangoVision <= this.maximaVision);		
	
	this.rangoVision = escala;	

	}
}