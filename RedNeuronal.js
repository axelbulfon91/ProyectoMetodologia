function RedNeuronal(serpiente, pesos) {
  this.serpiente = serpiente;
  this.largo = 0;
  this.pesos = [];
  this.cuadricula;

  const distanciaComida = 0;
  const cuadratura = 1;
  const compactacion = 2;
  const conectividad = 3;
  const sinSalida = 4;

  this.pesos[distanciaComida] = pesos[distanciaComida];
  this.pesos[cuadratura] = pesos[cuadratura];
  this.pesos[compactacion] = pesos[compactacion];
  this.pesos[conectividad] = pesos[conectividad];
  this.pesos[sinSalida] = pesos[sinSalida];

  this.calcularLargo = function() {
    this.iniciarCuadricula();
    if(this.serpiente.morir() === true) {
      return Number.NEGATIVE_INFINITY;
    }

    let coefAprendizaje = (this.pesos[distanciaComida] - this.serpiente.contComida*0.01) * this.distComida(comida)
          +this.pesos[cuadratura] * this.cuadratura()
          +this.pesos[compactacion] * this.compactacion()
          +this.pesos[conectividad] * this.conectividad()
          +this.pesos[sinSalida] * this.sinSalida();

    

      return coefAprendizaje;
  }

  this.iniciarCuadricula = function() {
    this.cuadricula = new Array(filas);
    for (let i = 0; i < filas; i++) {
      this.cuadricula[i] = new Array(columnas);
      for (let j = 0; j < columnas; j++) {
        this.cuadricula[i][j] = 0;
      }
    }
    for (let i = 0; i < this.serpiente.cola.length; i++) {
      if(this.serpiente.cola[i].x/escala !== -1 && this.serpiente.cola[i].x/escala !== columnas && this.serpiente.cola[i].y/escala !== -1 && this.serpiente.cola[i].y/escala !== filas) {
        this.cuadricula[this.serpiente.cola[i].y/escala][this.serpiente.cola[i].x/escala] = 1;
      }
    }
    if(this.serpiente.x/escala !== -1 && this.serpiente.x/escala !== columnas && this.serpiente.y/escala !== -1 && this.serpiente.y/escala !== filas) {
      this.cuadricula[this.serpiente.y/escala][this.serpiente.x/escala] = 1;
    }
  }

  ///////////////////////////////////

  this.distComida = function(comida) {
    let distX = abs(comida.x - this.serpiente.x) / escala;
    let distY = abs(comida.y - this.serpiente.y) / escala;
    return (distX + distY);
  }

  this.distanciaAlCentro = function() {
    let distCuadricula = new Array(filas);
    for (let i = 0; i < filas; i++) {
      distCuadricula[i] = new Array(columnas);
      for (let j = 0; j < columnas; j++) {
        distCuadricula[i][j] = 0;
      }
    }
    for (let i = 0; i < Math.min(filas, columnas)/2; i++) {
      for (let j = 0+i; j < columnas-i; j++) {
        distCuadricula[i][j] = i+1;
        distCuadricula[filas-i-1][j] = i+1;
      }
      for (let j = 0+i; j < filas-i; j++) {
        distCuadricula[j][i] = i+1;
        distCuadricula[j][columnas-i-1] = i+1;
      }
    }

    let fila = this.serpiente.x/escala;
    let col = this.serpiente.y/escala;
    return distCuadricula[fila][col];
  }

  this.cuadratura = function() {
    let xMax = this.serpiente.x;
    let xMin = this.serpiente.x;
    let yMax = this.serpiente.y;
    let yMin = this.serpiente.y;
    let blanquearCuenta = 0;
    for (i = 0; i < this.serpiente.cola.length; i++) {
      xMax = (xMax < this.serpiente.cola[i].x)? this.serpiente.cola[i].x : xMax;
      xMin = (xMin > this.serpiente.cola[i].x)? this.serpiente.cola[i].x : xMin;
      yMax = (yMax < this.serpiente.cola[i].y)? this.serpiente.cola[i].y : yMax;
      yMin = (yMin > this.serpiente.cola[i].y)? this.serpiente.cola[i].y : yMin;
    }

    for (let fila = yMin/escala; fila <= yMax/escala; fila++) {
      for (let col = xMin/escala; col <= xMax/escala; col++) {
        if (this.cuadricula[fila][col] === 0) {
          blanquearCuenta++;
        }
      }
    }

    return blanquearCuenta / (this.serpiente.cola.length+1) * 2;
  }

  this.compactacion = function() {
    let contador = 0;
    for (let i = 0; i < this.serpiente.cola.length; i++) {
      for (let j = 0; j < this.serpiente.cola.length; j++) {
        if (this.serpiente.cola[i].x + escala === this.serpiente.cola[j].x && this.serpiente.cola[i].y === this.serpiente.cola[j].y) {
          contador++;
        } else if (this.serpiente.cola[i].x - escala === this.serpiente.cola[j].x && this.serpiente.cola[i].y === this.serpiente.cola[j].y) {
          contador++;
        } else if (this.serpiente.cola[i].x === this.serpiente.cola[j].x && this.serpiente.cola[i].y + escala === this.serpiente.cola[j].y) {
          contador++;
        } else if (this.serpiente.cola[i].x === this.serpiente.cola[j].x && this.serpiente.cola[i].y - escala === this.serpiente.cola[j].y) {
          contador++;
        }
      }
      if (this.serpiente.cola[i].x + escala === this.serpiente.x && this.serpiente.cola[i].y === this.serpiente.y) {
        contador++;
      } else if (this.serpiente.cola[i].x - escala === this.serpiente.x && this.serpiente.cola[i].y === this.serpiente.y) {
        contador++;
      } else if (this.serpiente.cola[i].x === this.serpiente.x && this.serpiente.cola[i].y + escala === this.serpiente.y) {
        contador++;
      } else if (this.serpiente.cola[i].x === this.serpiente.x && this.serpiente.cola[i].y - escala === this.serpiente.y) {
        contador++;
      }
    }

    for (let j = 0; j < this.serpiente.cola.length; j++) {
      if (this.serpiente.x + escala === this.serpiente.cola[j].x && this.serpiente.y === this.serpiente.cola[j].y) {
        contador++;
      } else if (this.serpiente.x - escala === this.serpiente.cola[j].x && this.serpiente.y === this.serpiente.cola[j].y) {
        contador++;
      } else if (this.serpiente.x === this.serpiente.cola[j].x && this.serpiente.y + escala === this.serpiente.cola[j].y) {
        contador++;
      } else if (this.serpiente.x === this.serpiente.cola[j].x && this.serpiente.y - escala === this.serpiente.cola[j].y) {
        contador++;
      }
    }
    return contador/(this.serpiente.cola.length+1);
  }

  this.conectividad = function() {
    let cuadriculaTemp = [];
    let blanquearCuenta = 0;
    for (let i = 0; i < filas; i++) {
      cuadriculaTemp[i] = [];
      for (let j = 0; j < columnas; j++) {
        cuadriculaTemp[i][j] = this.cuadricula[i][j];
      }
    }
    let comienzo = createVector(floor(random(0, columnas)), floor(random(0, filas)));
    while (cuadriculaTemp[comienzo.y][comienzo.x] === 1) {
      comienzo = createVector(floor(random(0, columnas)), floor(random(0, filas)));
    }
    this.propagacion(comienzo, cuadriculaTemp);

    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < columnas; j++) {
        if (cuadriculaTemp[i][j] === 0) {
          blanquearCuenta++;
        }
      }
    }

    return blanquearCuenta;
  }

  this.sinSalida = function() {
    let comienzo;
    let cuadriculaTemp = [];
    let blanquearCuenta = 0;
    for (let i = 0; i < filas; i++) {
      cuadriculaTemp[i] = [];
      for (let j = 0; j < columnas; j++) {
        cuadriculaTemp[i][j] = this.cuadricula[i][j];
      }
    }

    comienzo = createVector(this.serpiente.x/escala+1, this.serpiente.y/escala);
    if (comienzo.x !== columnas && cuadriculaTemp[comienzo.y][comienzo.x] === 0) {
      this.propagacion(comienzo, cuadriculaTemp);
    }
    comienzo = createVector(this.serpiente.x/escala-1, this.serpiente.y/escala);
    if (comienzo.x !== -1 && cuadriculaTemp[comienzo.y][comienzo.x] === 0) {
      this.propagacion(comienzo, cuadriculaTemp);
    }
    comienzo = createVector(this.serpiente.x/escala, this.serpiente.y/escala+1);
    if (comienzo.y !== filas && cuadriculaTemp[comienzo.y][comienzo.x] === 0) {
      this.propagacion(comienzo, cuadriculaTemp);
    }
    comienzo = createVector(this.serpiente.x/escala, this.serpiente.y/escala-1);
    if (comienzo.y !== -1 && cuadriculaTemp[comienzo.y][comienzo.x] === 0) {
      this.propagacion(comienzo, cuadriculaTemp);
    }

    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < columnas; j++) {
        if (cuadriculaTemp[i][j] == 0) {
          blanquearCuenta++;
        }
      }
    }

    return blanquearCuenta;
  }

  this.propagacion = function(comienzo, cuadriculaTemp) {
    let sig;
    cuadriculaTemp[comienzo.y][comienzo.x] = 1;
    if (comienzo.x !== columnas-1 && cuadriculaTemp[comienzo.y][comienzo.x+1] === 0) {
      sig = createVector(comienzo.x+1, comienzo.y);
      this.propagacion(sig, cuadriculaTemp);
    }
    if (comienzo.x !== 0 && cuadriculaTemp[comienzo.y][comienzo.x-1] === 0) {
      sig = createVector(comienzo.x-1, comienzo.y);
      this.propagacion(sig, cuadriculaTemp);
    }
    if (comienzo.y !== filas-1 && cuadriculaTemp[comienzo.y+1][comienzo.x] === 0) {
      sig = createVector(comienzo.x, comienzo.y+1);
      this.propagacion(sig, cuadriculaTemp);
    }
    if (comienzo.y !== 0 && cuadriculaTemp[comienzo.y-1][comienzo.x] === 0) {
      sig = createVector(comienzo.x, comienzo.y-1);
      this.propagacion(sig, cuadriculaTemp);
    }
  }
}
