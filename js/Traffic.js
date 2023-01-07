//Clase Enemigos

function Traffic(container) {
  this.element = document.createElement('div');

  this.posX; //posicion izquierda
  this.posY; //posicion superior

  var that = this;

  this.create = function(posY) {
    that.element.className = 'traffic';
    that.posX = that.randomPos();
    that.posY = -100;
    that.element.style.left = that.posX + 'px';
    that.element.style.top = that.posY + 'px';

    container.appendChild(that.element);
  }

  this.update = function() {
    that.posY += 1;
    that.element.style.top = that.posY + 'px';
  }

  this.randomPos = function() {
    var flag = Math.random();

    if (flag <= 0.33) {
      return 40;
    } else if (flag > 0.33 && flag <= 0.66) {
      return 150;
    } else {
      return 260;
    }
  }

  this.deleteTraffic = function(container) {
    container.removeChild(that.element);
  }

}
