let rangoMutacion = 0.05;
let rangoDeSupervivencia = 0.5;
let cantidadDePesos = 5;

function proxGeneracion() {
  ordenarPoblacion();
  cruce();
  mutacion();
  ordenarPoblacion();
}

function ordenarPoblacion() {
  for (let i = 1; i < poblacion.length; i++) {
    let aux = poblacion[i];
    let pista = largo[i];
    let j = i-1;
    while (j >= 0 && largo[j] < pista)
    {
      poblacion[j+1] = poblacion[j];
      largo[j+1] = largo[j];
      j = j-1;
    }
    poblacion[j+1] = aux;
    largo[j+1] = pista;
  }
}

function cruce() {
  for (let i = 0; i < floor(poblacion.length*(1 - rangoDeSupervivencia)); i++) {
    let arreglo = [];
    arreglo[0] = largo[0];
    for (let j = 1; j < poblacion.length; j++) {
      arreglo[j] = arreglo[j-1] + largo[j];
    }
    let max = arreglo[poblacion.length-1];
    let tomarA = random(0, max);
    let tomarB = random(0, max);
    let padreA;
    let padreB;
    for (let j = 0; j < poblacion.length; j++) {
      if (tomarA <= arreglo[j]) {
        padreA = j;
        break;
      }
    }
    for (let j = 0; j < poblacion.length; j++) {
      if (tomarB <= arreglo[j]) {
        padreB = j;
        break;
      }
    }
    let nuevosPesos = [];
    let norma = largo[padreA] + largo[padreB];
    if (norma === 0) continue;
    for (let j = 0; j < cantidadDePesos; j++) {
      let peso = poblacion[padreA].pesos[j]*(largo[padreA]/norma) + poblacion[padreB].pesos[j]*(largo[padreB]/norma);
      nuevosPesos.push(peso);
    }
    let hijo = new Serpiente(0, 0, 0, 0, 0, [], nuevosPesos);
    poblacion[poblacion.length-i-1] = hijo;
    
  }
}

function mutacion() {
  for (let i = 0; i < poblacion.length; i++) {
    for (let j = 0; j < cantidadDePesos; j++) {
      if (random(1) < rangoMutacion) {
        poblacion[i].pesos[j] *= (1 + (1 - i/poblacion.length));
        poblacion[i].pesos[j] += random(-0.2, 0.2);
        
      }
    }
  }
}
