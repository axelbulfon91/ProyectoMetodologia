var com;


function Serpiente () {

	this.x = 0;
	this.y = 0;
	this.xVel = 1;
	this.yVel = 0;
	this.tam = 0;
	this.cola = [];
	this.punt = 0;
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
				this.tam = 0;
				this.cola = [];
				this.devolverPuntaje();
				sonMov.remove(); 
				pantallaFin = true;

				 if(estadoSonido === true){
          			sonMuert.play();
         		 }else{
          			sonMuert.remove();
          }	
			}
		}
	}
	


	this.comer = function(pos){

		var distanciaAComida = dist(this.x, this.y, pos.x, pos.y);

		if (distanciaAComida < 1) {
   		 if(estadoSonido === true){
          	sonFrut.play();
         }else{
            sonFrut.remove();
          }
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
		if( estadoSonido === true){
			sonMov.play();
		}else{
			sonMov.remove();
		}	

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
	
}