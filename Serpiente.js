var com;

function Serpiente () {

	this.x = 0;
	this.y = 0;			
	this.xVel = 1;
	this.yVel = 0;	
	this.tam = 0;
	this.cola = [];
	this.punt = 0;
	this.rangoVision = escala // El rango de vision inicial es de una vez el tamaño de la cabeza, osea el cuadro delante de la misma
	this.maximaVision = this.rangoVision * 5  // Alcance maximo de la vision (5 veces el tamaño de la cabeza)
	com = new Comida();
	this.tamañoAreaDeJuego = 400;

	this.direccion = function(x, y){

		this.xVel = x;
		this.yVel = y;
		
		
	}
	
	this.muere = function(){

		for (var i = 0; i < this.cola.length ; i++) {
		
			var pos = this.cola[i];
			var distanciaAMorir = dist (this.x, this.y, pos.x, pos.y);

			if (distanciaAMorir < 1) {

				this.devolverPuntaje();
				textAlign(CENTER);
				text('Juego Terminado!!! presione F5 para recargar pagina', 200, 200);
				frameRate(0);

			}
		}

	}
	
	this.comer = function(pos){

		var distanciaAComida = dist(this.x, this.y, pos.x, pos.y);

		if (distanciaAComida < 1) {

			this.tam++;
			return true;

		}else{

			return false;
		}

	}
	
	this.actualizarPos = function(){
			
		for(var i = 0; i < this.cola.length - 1 ; i++){

			this.cola[i] = this.cola[i+1];
			
		}			
	
		this.cola[this.tam - 1] = createVector(this.x, this.y);

		this.x = this.x + this.xVel * escala;
		this.y = this.y + this.yVel * escala;

		this.x = constrain(this.x, 0, tamañoAreaDeJuego - escala);
		this.y = constrain(this.y, 0, tamañoAreaDeJuego - escala);
		

	}

	this.mostrar = function(){

		fill(255);

		for(var i = 0; i < this.tam; i++){

			rect(this.cola[i].x , this.cola[i].y, escala, escala);

		}

		rect(this.x, this.y, escala, escala);

		
	}

	this.comprobarSiCome = function(){

		if(this.comer(com.devolverPosicionComida())){

 			com.posicionarComida(columnas, filas);
 			print ("La serpiente comio");
  		}
		
	}	
	
	this.devolverPuntaje = function(){
		
		this.punt = this.tam * 5;
		

	}

	this.vista = function(){

	do{
		
		var distanciaDeVision = createVector(this.x , this.y);

		// -------------------------------------------------------------------------------------------------------Va mirando comida
		if(distanciaDeVision.x === posComida.x && distanciaDeVision.y - this.rangoVision === posComida.y){

			print ('--------------Esta viendo COMIDA arriba --------------');

		}else if(distanciaDeVision.x === posComida.x && distanciaDeVision.y + this.rangoVision === posComida.y){

			print ('--------------Esta viendo COMIDA abajo --------------');	

		}else if(distanciaDeVision.x + this.rangoVision === posComida.x && distanciaDeVision.y === posComida.y){

			print ('--------------Esta viendo COMIDA a la derecha --------------');	

		}
		else if(distanciaDeVision.x - this.rangoVision === posComida.x && distanciaDeVision.y === posComida.y){

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