var sia;
var s, c,k;
var tamanioAreaDeJuego = 400;
var escala = 20;
let columnas;
let filas;
let comida;
let fueraDeTiempo;
let limite;
let tiempoTomado;
let pesos = 0;
let espacioExt = 10;
let poblacionActual;
let poblacion = [];
let largo = [];
let contJugadas;
let sumalargo;
let juegosPorPoblacion = 3;
let mejorLargo;
let mejorId;
let juegaIA = false, juegaPersona = false;
let comenzoJuegoHumano;

function setup() {
  
  frameRate(20);  
  createCanvas(400, 400);    
  columnas = floor(width/escala);
  filas = floor(height/escala);
  limite = columnas*filas*10;

// setup del juego humano
//------------------------------------------------------------------------------------------
  s = new Serpiente();    // crea objeto serpiente
  c = new Comi();     // crea objeto comida
  k = new Teclado();
  comenzoJuegoHumano = true;
//-------------------------------------------------------------------------------------------

// setup del juego IA
  sia = new SerpienteIA(0, 0, 0, 0, 0, [], pesos, 0);
  iniciarPoblacion();
  iniciar();

//------------------------------------------------------------------------------------------  
}
function iniciar() {
  
  poblacionActual = 0;
  mejorLargo = Number.NEGATIVE_INFINITY;
  sia = poblacion[0];  
  sia.nacimiento = frameCount;
  primeraPosComida();
}

function keyTyped() {
  if (key === 'a') {
    juegaIA = true;
    juegaPersona = false;
  } else if (key === 'b') {
    juegaPersona = true;
    juegaIA = false;
  }
}

function terminarGeneracion() {
  print("Mejor largo : " + mejorLargo);
  print("Mejor pesos : " + poblacion[mejorId].pesos);
  print("Generando nueva generacion...");
  proxGeneracion();
  
  poblacionActual = 0;
  sia = poblacion[poblacionActual];
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
  sia = poblacion[poblacionActual];
  sia.nacimiento = frameCount;
  primeraPosComida();
}

function volverAJugar() {
  sia = new SerpienteIA(0, 0, 0, 0, 0, [], poblacion[poblacionActual].pesos, 0);
  sia.nacimiento = frameCount;
  primeraPosComida();
}

function iniciarPoblacion() {
  
  for (let i = 0; i < espacioExt; i++) {
    let pesos = [random(-1, 0), random(-1, 0), random(-1, 1), random(-1, 0), random(-1, 0)];
    poblacion.push(new SerpienteIA(0, 0, 0, 0, 0, [], pesos, 0));
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
    for (let i = 0; i < sia.cola.length; i++) {
      if (comida.x === sia.cola[i].x && comida.y === sia.cola[i].y) {
        bandera = true;
        break;
      }
    }
    if (comida.x === sia.x && comida.y === sia.y) {
      bandera = true;
    }
  }
}

function draw() {
  
  print("Pesos: " + poblacion[poblacionActual].pesos + ',');
  if(juegaIA === true & juegaPersona === false){
    background(51);

    if (sia.comer(comida)) {
      tomarPos();
    }

    let sinLugarADondeIr = false;
    sinLugarADondeIr = sia.moverse(sia.tomarDir());
    sia.mostrar();
    

    fill(220,70,0);

    rect(comida.x, comida.y, escala, escala);

    if (sia.morir() || sinLugarADondeIr === true) {
      
      let vuelta = false;
      
      
      if(contJugadas === juegosPorPoblacion) {
        largo[poblacionActual] = sumalargo / juegosPorPoblacion;
        if (largo[poblacionActual] < 0) largo[poblacionActual] = 0;
        print("Juego Terminado: " + poblacionActual);
        print("Pesos: " + poblacion[poblacionActual].pesos);
        print("Resultado de la fx de activacion: " + largo[poblacionActual]);
        sumalargo = 0;
        contJugadas = 0;

        vuelta = true;
      }
      
      else {
        sumalargo += sia.cola.length + (frameCount-sia.nacimiento)/(columnas*filas*-1);
        contJugadas++;
      }

      
      if (vuelta) {
        proxSerpiente();
      } else {
        volverAJugar();
      }
    } else if (sia.final()) {
      print("Juego Completado: " + poblacionActual);
      largo[poblacionActual] = sia.cola.length + (frameCount-sia.nacimiento)/(columnas*filas*-0.5);
      print("Resultado de la fx de activacion: " + largo[poblacionActual]);
      if (poblacionActual === poblacion.length-1) {
        terminarGeneracion();
      } else {
        proxSerpiente();
      }
    }
  
  }else if(juegaIA === false & juegaPersona === true){

    if(comenzoJuegoHumano){
      
      c.posicionarComida(columnas,filas);    
    }

    background(50, 200, 100);
    fill(50,200,150)  
    rect(0,400,400,400);
    fill (0);
    textSize(16);
    
    k.keyPressed();
    s.muere();        // en cada frame comprueba si la serpiente muere
    s.actualizarPos();    // en cada frame la serpiente actualiza su posicion
    s.mostrar();      // en cada frame se dibuja la serpiente (con su nueva posicion generada arriba)
    s.comprobarSiCome();  // en cada frame comprueba si la serpiente come, de ser asi vuelve a crear otra comida a travez del metodo posicionarComida
    c.dibujarComida();    // dibuja comida
    comenzoJuegoHumano = false;

    s.devolverPuntaje();
    textAlign(LEFT);
    text('Puntaje: ' + s.punt, 20, 430);

  }
}



