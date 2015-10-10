// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        this.x = -90;
        this.speedRandomizer();
    }

    var bugYTopEdge = this.y - 60;
    var bugYBottomEdge = this.y + 60;
    var bugXLeftEdge = this.x - 60;
    var bugXRightEdge = this.x + 60;
    
    if (player.y > bugYTopEdge     && 
        player.y < bugYBottomEdge  &&
        player.x > bugXLeftEdge    &&
        player.x < bugXRightEdge) 
    {   
        player.playerBackToStart();
    }
};

Enemy.prototype.speedRandomizer = function() {
    this.speed = Math.floor(Math.random() * 3 + 1) * 80;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
var Player = function(x, y) {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
};
// This class requires an update(), render() and
Player.prototype.update = function() {
     
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.playerBackToStart = function() {
    this.x = 200;
    this.y = 400;
};

// a handleInput() method.
Player.prototype.handleInput = function(e) {
    if (e === 'left') {
        if (this.x > 0) {
            this.x -= 100;
        }
    } else if (e === 'right') {
        if (this.x < 400) {
            this.x += 100;
        }
    }  else if (e === 'down') {
        if (this.y < 400) {
            this.y += 83;
        }
    }  else if (e === 'up') {
        if (this.y > 150) {
            this.y -= 83;
        } else {
            this.playerBackToStart();
        }
        
    } 
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var randomSpeed1 = Math.floor(Math.random() * 3 + 1) * 80;
var randomSpeed2 = Math.floor(Math.random() * 3 + 1) * 80;
var randomSpeed3 = Math.floor(Math.random() * 3 + 1) * 80;
allEnemies.push(new Enemy(-70, 60, randomSpeed1));
allEnemies.push(new Enemy(-70, 145, randomSpeed2));
allEnemies.push(new Enemy(-70, 225, randomSpeed3));
// Place the player object in a variable called player
var player = new Player();


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
