function Neurona(){

	this.pesosIniciales = [4];		//Arreglo de 4 pesos aleatorios.

	this.resultadoNComidaY1 = 0.0;	//Resultado final del calculo de pesos y bias de la neurona que identifica comida	
	this.salidaNComidaY1 = [4];		//Arreglo donde se almacenan los pesos de las cuatro direcciones de busqueda de comida

	this.resultadoNParedY2 = 0.0;	//Resultado final del calculo de pesos y bias de la neurona que identifica paredes
	this.salidaNParedY2 = [4];		//Arreglo donde se almacenan los pesos de las cuatro direcciones de busqueda de paredes

	this.resultadoNColaY3 = 0.0;	//Resultado final del calculo de pesos y bias de la neurona que identifica la cola
	this.salidaNColaY3 = [4];		//Arreglo donde se almacenan los pesos de las cuatro direcciones de busqueda de la cola

	this.calularPesosIniciales = function(){

		var vioComida= false;		//Flags de revision de avistajes
		var vioPared= false;
		var vioCola= false;

		console.clear();			//Limpia consola para una vista mas clara de los valores

		for(var i = 0; i < 4; i++){

			this.pesosIniciales[i] = this.calcularValorRandom();	// Asigna pesos al arreglo ppal.

		}

		for (var i = 0; i < 4; i++) {
			
			this.salidaNComidaY1[i] = (this.pesosIniciales[i] * visionComida[i]); 	// Multiplica	los pesos calculados por el estado de la vista		
																					// en cada direccion (1-Vio algo, 0-No vio nada) pj. 1 por algo = algo, 0 por algo = 0	
			
			if(visionComida[i] > 0){					// Evalua si ha visto comida				

				print ('Vio comida - ' + this.salidaNComidaY1[i]);	// De ser asi muestra ese peso
				vioComida= true;
				this.resultadoNComidaY1 += this.salidaNComidaY1[i];	// Realiza sumatoria de los 4 pesos del arreglo
			
				if(vioComida){
		
					var valorB = this.calcularBias();	// Genera valor aleatorio Bias para esta neurona (Neurona de comida), Bias siempre positivo
					this.resultadoNComidaY1 += valorB;	// Suma Bias a sumatoria de pesos.
			
					print ('Resultado de neurona Y1= ' + this.resultadoNComidaY1 + ' (Bias: ' + valorB + ')');	// Muestra el valor final de salida de la neurona Y1 (neurona de comida)
				
				}	

			}
			
		}	
		//Exactamente que para calcular salida de neurona de comida, se calculan las salidas Y2 (neurona de paredes) y Y3 (neurona de cola)
		for(var i = 0; i < 4; i++){

			this.pesosIniciales[i] = this.calcularValorRandom();

		}

		for (var i = 0; i < 4; i++) {

			this.salidaNParedY2[i] = (this.pesosIniciales[i] * visionPared[i]);

			if(visionPared[i] > 0){

				print ('Vio pared - ' + this.salidaNParedY2[i]);
				vioPared= true;
				
				this.resultadoNParedY2 += this.salidaNParedY2[i];
			
				if(vioPared){
		
					var valorB = this.calcularBias();
					this.resultadoNParedY2 += valorB;
			
					print ('Resultado de neurona Y2= ' + this.resultadoNParedY2 + ' (Bias: ' + valorB + ')');
			
				}


			}

			

		}

		for(var i = 0; i < 4; i++){

			this.pesosIniciales[i] = this.calcularValorRandom();

		}

		for (var i = 0; i < 4; i++) {

			this.salidaNColaY3[i] = (this.pesosIniciales[i] * visionCola[i]);

			if(visionCola[i] > 0){

				print ('Vio cola - ' + this.salidaNColaY3[i]);
				vioCola= true;

				this.resultadoNColaY3 += this.salidaNColaY3[i];
			
				if(vioCola){
		
					var valorB = this.calcularBias();
					this.resultadoNColaY3 += valorB;
			
					print ('Resultado de neurona Y3= ' + this.resultadoNColaY3 + ' (Bias: ' + valorB + ')');
				
				}

			}

			
		}
		// Reinicia valores de vista para cada componente y sus correspondientes salidas de neuronas Y1, Y2, e Y3
		visionComida = [0,0,0,0];		
		visionPared = [0,0,0,0];
		visionCola = [0,0,0,0];
		this.resultadoNComidaY1 = 0.0;
		this.resultadoNParedY2 = 0.0;
		this.resultadoNColaY3 = 0.0;
				
    }

		


	this.calcularValorRandom = function(){	// Generador de valores aleatorios por metodo de Gauss, valores aleatorios entre media y desviacion estandar
											// al no llevar parametros, se define como media de 0 y una desviacion estandar de 1
											// se utiliza este metodo debido a la alta probabilidad de obtener valores cercanos a la media y baja
											// probabilidad de obtener valores cercanos a la desviacion estandar
		var valor;
		valor = randomGaussian();
		return valor;

	}

	this.calcularBias = function(){			// Mismo metodo que el anterior mencionado 
											// pero solo obtiene valores positivos, (mayores a 0).

		var valorBias;
		
		do{
			
			valorBias = randomGaussian();	

		}while(valorBias > 0.0);	
			
		return valorBias;

	}






}