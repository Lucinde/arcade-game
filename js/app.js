// Whole-script strict mode syntax
'use strict';

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
    }
    else {
    this.x += dt * this.s;
    }
    this.y = this.row*rowHeight+rowBase;
    //deciding if there's a collision
    if (player.row == this.row && player.x+hitMargin < this.x+colWidth && player.x+colWidth-hitMargin > this.x) {
      // collision substract score
       player.subScore();
       // return to start position
       player.reset();
    }
};

// make enemy faster
Enemy.prototype.speedUp = function() {
    this.s += 10;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Enemies our player must avoid
// pName = name of the player, will be displayed in the scorecounter
// this.col and this.row position of the player to be updated for the reset method and keys
// this.x and this.y are the pixel positions of the player
var Player = function(pName) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.score = 0;
    this.name = pName;
    this.x;
    this.y;
    this.displayScore();
    this.reset();
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

//define the key actions
// when reaching the left or right edge go to the other side
// when reaching the top add one point to score, speed up enemies and return to start position
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
        if (this.row === 1) {
          this.row = maxRow;
          // count score at finish
          this.addScore(allEnemies);
          // reset to start position
          this.reset();
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

// reset player to starting position
Player.prototype.reset = function() {
  this.row = maxRow;
  this.col = maxCol/2;
}

Player.prototype.displayScore = (function() {
    // display a score count
    var doc = document;
    this.divScore = doc.createElement('div');
    // create a wrapper to center the div
    var wrapper = doc.createElement('div');
    wrapper.className = 'wrapper';
    // create a div for the score text
    var div = doc.createElement('div');
    div.className = 'score';
    div.id = 'playerName';
    var t = doc.createTextNode(this.name + "'s score: ");
    div.appendChild(t);
    wrapper.appendChild(div);
    // create a div for the score count
    this.divScore.id = 'scorecount';
    this.divScore.innerHTML = this.score;
    div.appendChild(this.divScore);
    doc.body.insertBefore(wrapper, doc.body.childNodes[0]);
  })

  Player.prototype.updateName = function(newName) {
      this.name = newName;
      var t = document.getElementById('playerName');
      t.innerHTML = this.name + "'s score: ";
      t.appendChild(this.divScore);
  }

// add 1 point and fasten enemies
  Player.prototype.addScore = function(enemies) {
    this.score += 1;
    this.divScore.innerHTML = this.score;
    enemies.forEach(function(enemy) {
        enemy.speedUp();
    });
  }

// substract 1 point
  Player.prototype.subScore = function() {
    if (this.score > 0) {
      this.score -= 1;
      this.divScore.innerHTML = this.score;
    }
  }

// define constants
var rowHeight = 83;
var rowBase = -20;
var colWidth = 101;
var maxRow = 5;
var maxCol = 4;
var hitMargin = 25;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(-colWidth,1,20);
var enemy2 = new Enemy(-colWidth,2,30);
var enemy3 = new Enemy(-colWidth,3,50);

var allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player
var player = new Player('Gijs');

// change name
function nameChanged(newName) {
  player.updateName(newName);
}

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
