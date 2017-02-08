// Enemies our player must avoid
// dx is a pixel position
// row is a game row
// ds is speed factor
var Enemy = function(dx, row, ds) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = dx;
    this.row = row;
    this.s = ds;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= (maxCol+1)*colWidth) {
        this.x = -colWidth;
        this.row = Math.floor(Math.random() * 3) +1;
        this.s += 5;
    }
    else {
    this.x += dt * this.s;
    }
    this.y = this.row*rowHeight+rowBase;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Enemies our player must avoid
var Player = function(col, row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.row = row;
    this.col = col;
  //  this.x = col*colWidth;
  //  this.y = rowBase+row*rowHeight;
};

// Update the player's position, required method for game
Player.prototype.update = function() {
   this.x = this.col*colWidth;
   this.y = this.row*rowHeight+rowBase;
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    switch (keyCode) {
      case 'left':
        if (this.col === 0) {
          this.col = maxCol;
        }
        else {
          this.col -= 1;
        }
        break;
      case 'right':
        if (this.col === maxCol) {
          this.col = 0;
        }
        else {
          this.col += 1;
        }
        break;
      case 'up':
        if (this.row === 0) {
          this.row = maxRow;
        }
        else {
          this.row -= 1;
        }
        break;
      case 'down':
        if (this.row != maxRow) {
          this.row += 1;
        }
        break;
      default:
    }
}

// define constants
var rowHeight = 83;
var rowBase = -20;
var colWidth = 101;
var maxRow = 5;
var maxCol = 4;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(-colWidth,1,20);
var enemy2 = new Enemy(-colWidth,2,30);
var enemy3 = new Enemy(-colWidth,3,50);

var allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player
var player = new Player(2,5);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
