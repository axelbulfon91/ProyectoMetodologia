function SerpienteIA(x, y, xVel, yVel, total, cola, pesos, contComida) {
  this.x = x;
  this.y = y;
  this.xVel = xVel;
  this.yVel = yVel;
  this.total = total;
  this.cola = cola.slice();
  this.nacimiento;
  this.pesos = pesos;
  this.posPrevia = createVector(-1, -1);
  this.redNeuronal = new RedNeuronal(this, this.pesos);
  this.contComida = contComida;

  this.comer = function(pos) {
    let d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {  
            //
            if(estadoSonido === true){
              sonFrut.play();
           }else{
              sonFrut.remove();
            }
//
      this.total++;
      this.contComida = 0;
      return true;
    } else {
      return false;
    }

  }

  this.dir = function(x, y) {
    this.xVel = x;
    this.yVel = y;
  }

  this.morir = function() {

    let muerto = false;
    
    if (this.x === escala*-1 || this.x === width ||
        this.y === escala*-1 || this.y === height  ) {
      muerto = true;
    } else if (frameCount === fueraDeTiempo) {
      muerto = true;
    } else {
      for (let i = 0; i < this.cola.length; i++) {
        let pos = this.cola[i];
        let d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
          muerto = true;
          break;
        }
      }
    }
    return muerto;
    //Sonido:
if(muerto === true){
  sonMov.remove(); 
        pantallaFin = true;
        
         if(estadoSonido === true){
                  sonMuert.play();
               }else{
                  sonMuert.remove();
            } 
}
//
  }


  this.final = function() {
    let columnas = width/escala;
    let filas = height/escala;
    if (this.cola.length === columnas*filas-1) {
      this.xVel = 0;
      this.yVel = 0;
      return true;
    }
    return false;
  }

  this.update = function() {
    this.posPrevia.x = this.x;
    this.posPrevia.y = this.y;

    if (this.total === this.cola.length) {   
      for (let i = 0; i < this.cola.length-1; i++) {
        this.cola[i] = this.cola[i+1];
      }
    }
    this.cola[this.total-1] = createVector(this.x, this.y);

    this.x = this.x + this.xVel*escala;
    this.y = this.y + this.yVel*escala;

    this.x = constrain(this.x, escala*-1, width);
    this.y = constrain(this.y, escala*-1, height);
  }

  this.moverse = function(dir) {
    this.posPrevia.x = this.x;
    this.posPrevia.y = this.y;
    this.contComida++;

    switch (dir) {
      case 0:
        this.xVel = 1;
        this.yVel = 0;
        break;
      case 1:
        this.xVel = -1;
        this.yVel = 0;
        break;
      case 2:
        this.xVel = 0;
        this.yVel = 1;
        break;
      case 3:
        this.xVel = 0;
        this.yVel = -1;
        break;
      default :
        
        return true;
    }

    if (this.total === this.cola.length) {   
      for (let i = 0; i < this.cola.length-1; i++) {
        this.cola[i] = this.cola[i+1];
      }
    }
    this.cola[this.total-1] = createVector(this.x, this.y);

    this.x = this.x + this.xVel*escala;
    this.y = this.y + this.yVel*escala;

    this.x = constrain(this.x, escala*-1, width);
    this.y = constrain(this.y, escala*-1, height);

    return false;
  }

  this.mostrar = function() {
    fill(255);

    //Sonido:
      if( estadoSonido === true){
      sonMov.play();
    }else{
      sonMov.remove();
    } 
    //

    for (let i = 0; i < this.cola.length; i++) {
      rect(this.cola[i].x, this.cola[i].y, escala, escala);
    }
    fill(50,200,10);
    rect(this.x, this.y, escala, escala);
  }

  
  this.tomarDir = function() {
    let mejorLargo = Number.NEGATIVE_INFINITY;
    let ds;
    let largo;
    let dir = -1;
    let proxPos = createVector(-1, -1);
    

    ds = new SerpienteIA(this.x, this.y, 1, 0, this.total, this.cola, this.pesos, this.contComida);
    ds.update();
    largo = ds.redNeuronal.calcularLargo();
    print("Resultante de fx de activacion: " + largo);
    if (mejorLargo < largo) {
      mejorLargo = largo;
      dir = 0;
      proxPos = createVector(this.x+escala, this.y);
    }

    ds = new SerpienteIA(this.x, this.y, -1, 0, this.total, this.cola, this.pesos, this.contComida);
    ds.update();
    largo = ds.redNeuronal.calcularLargo();
    
    if (mejorLargo < largo) {
      mejorLargo = largo;
      dir = 1;
      proxPos = createVector(this.x-escala, this.y);
    }

    ds = new SerpienteIA(this.x, this.y, 0, 1, this.total, this.cola, this.pesos, this.contComida);
    ds.update();
    largo = ds.redNeuronal.calcularLargo();
    
    if (mejorLargo < largo) {
      mejorLargo = largo;
      dir = 2;
      proxPos = createVector(this.x, this.y+escala);
    }

    ds = new SerpienteIA(this.x, this.y, 0, -1, this.total, this.cola, this.pesos, this.contComida);
    ds.update();
    largo = ds.redNeuronal.calcularLargo();
    
    if (mejorLargo < largo) {
      mejorLargo = largo;
      dir = 3;
      proxPos = createVector(this.x, this.y-escala);
    }
    
    return dir;
  }

}
