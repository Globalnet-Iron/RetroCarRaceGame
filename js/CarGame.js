//Clase principal del juego
function CarGame() {
  var container; //contenedor principal del juego
  var road; //division de desplazamiento
    
  //instancias
  var car;
  var traffic;
  var bullet;
    
  var intervalId; // bucle principal del juego "setInterval"
  var moveY = 0; // movimiento de desplazamiento "div"

  var allTraffic = [];
  var allBullet = [];

  var gameOverScreen;
  var brnRetry; //boton "retry"

  var bulletCounter = 20;
  var score = 0;

  var that = this;

  this.init = function() {
    container = document.getElementsByClassName('container')[0];

    car = new Car();
    car.addClass('car');
    car.setInitialPos({
      posX: 150,
      posY: 490
    });
    car.appendTo(container);
    that.startGame();
  }

  this.startGame = function() {
    road = document.getElementsByClassName('road')[0];

    document.addEventListener('keydown', that.moveCar);

    //Bucle principal del juego
    intervalId = setInterval(function() {
      score++;

      that.updateBullet();
      that.updateBg();
      that.createTraffic();
      that.updateTraffic();
      that.collisionDetect();
      that.displayBoard();
    }, 5);
  }

  this.updateBg = function() {
    moveY -= 3;
    road.style.bottom = moveY + 'px';
  }

  this.createTraffic = function() {
    if (moveY % 250 == 0) {
      traffic = new Traffic(container);
      traffic.create(-moveY);

      allTraffic.push(traffic);
    }
  }

  this.updateTraffic = function() {
    for (var i = 0; i < allTraffic.length; i++) {
      allTraffic[i].update();
    }
  }

  this.moveCar = function(e) {
    if (e.keyCode == '37' && car.posX != 40) { //movimiento izquierda
      car.movePos(-110);
    }

    if (e.keyCode == '39' && car.posX != 260) { //movimiento derecha
      car.movePos(+110);
    }

    if (e.keyCode == '32' && bulletCounter != 0) { //disparo - "tecla espacio"
      bullet = new Bullet(car);
      bullet.create(container);
      allBullet.push(bullet);
      bulletCounter--;
    }
  }

  this.updateBullet = function() {

    for (var i = 0; i < allBullet.length; i++) {
      allBullet[i].update();

      if (allBullet[i].bulletY == 0) {
        allBullet[i].deleteBullet(container);
        allBullet.splice(i, 1);
      }
    }
  }

  this.collisionDetect = function() {
    var carX = car.posX;
    var carY = car.posY;
    var traffic = allTraffic;
    var bullet = allBullet;

    for (var i = 0; i < traffic.length; i++) {
      if (traffic[i].posX <= carX + 100 
          && traffic[i].posX + 100 >= carX 
          && traffic[i].posY <= carY + 100 
          && traffic[i].posY + 100 >= carY) {
        that.gameOver();
      }

      for (var j = 0; j < bullet.length; j++) {
        if (traffic[i].posX <= bullet[j].bulletX + 100 
            && traffic[i].posX + 100 >= bullet[j].bulletX 
            && traffic[i].posY <= bullet[j].bulletY + 100 
            && traffic[i].posY + 100 >= bullet[j].bulletY) {
          traffic[i].deleteTraffic(container);
          traffic = traffic.splice(i, 1);
          bullet[j].deleteBullet(container);
          bullet = bullet.splice(j, 1);
        }
      }
    }
  }

  this.displayBoard = function() {
    var scoreBoard = document.getElementById('score');
    var bullets = document.getElementById('bullets');

    bullets.innerHTML = bulletCounter;
    scoreBoard.innerHTML = score;
  }

  this.gameOver = function() {
    gameOverScreen = document.getElementsByClassName('game-over')[0];
    btnRetry = document.getElementsByClassName('btn-retry')[0];

    clearInterval(intervalId);
    gameOverScreen.style.display = 'block';

    btnRetry.addEventListener('click', that.restart);

  }

  this.restart = function() {
    gameOverScreen.style.display = 'none';
    score = 0;

    for (var i = 0; i < allTraffic.length; i++) {
      allTraffic[i].deleteTraffic(container);
    }
    for (var i = 0; i < allBullet.length; i++) {
      allBullet[i].deleteBullet(container);
    }

    moveY = 0;
    bulletCounter = 20;
    allTraffic = [];
    allBullet = [];
    car.deleteCar(container);

    that.init();
  }

}

var carGame = new CarGame();
carGame.init();
