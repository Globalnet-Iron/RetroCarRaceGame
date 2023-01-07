//Disparar bala

function Bullet(car) {
  this.element = document.createElement('div');

  this.bulletX;
  this.bulletY;

  var that = this;

  this.create = function(container) {
    that.element.className = 'bullet';
    that.bulletX = car.posX;
    that.bulletY = car.posY - 50;
    that.element.style.top = that.bulletY + 'px';
    that.element.style.left = that.bulletX + 'px';

    container.appendChild(that.element);
  }

  this.update = function() {
    that.bulletY -= 1;
    that.element.style.top = that.bulletY + 'px';
  }

  this.deleteBullet = function(container) {
    container.removeChild(that.element);
  }
}
