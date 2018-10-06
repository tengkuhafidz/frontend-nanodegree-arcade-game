// Enemies our player must avoid
var Enemy = function(rowPos, colPos, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.rowPos = rowPos;
    this.colPos = colPos;
    this.speed =  Math.floor(Math.random() * (200 - 50 + 1)) + 50;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.rowPos += dt * this.speed;
    if (this.rowPos > 505) {
        this.rowPos = 0;
        this.speed =  Math.floor(Math.random() * (200 - 50 + 1)) + 50;
    }
    //handles player collision
    const hasColided = this.hasCollided();
};

Enemy.prototype.hasCollided = function() {
    rowDiff = player.rowPos - this.rowPos;
    colDiff = player.colPos - this.colPos;

    if(colDiff < 50 && colDiff > -50 && rowDiff < 50 && rowDiff > -50){
        swal(
          'Ooops',
          'You died. Avoid the bugs at all cost!',
          'warning'
        )
        player = new Player();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.rowPos, this.colPos);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.rowPos = 205;
    this.colPos = 370;
    this.message = 'hi'

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

};

Player.prototype.update = function(rowPosChange, colPosChange) {
    // update position only when there is an input
    if(!isNaN(rowPosChange) && !isNaN(colPosChange)) {
        // only move player if it's still within the canvas
        this.rowPos += (this.rowPos + rowPosChange > 0 && this.rowPos + rowPosChange < 505) ? rowPosChange : 0;
        this.colPos += (this.colPos + colPosChange > -50 && this.colPos + colPosChange < 500) ? colPosChange : 0;

        // delay 500 ms so the player gets to reach the destination first
        if(this.colPos < 0) {
            setTimeout(function() {
                swal(
                  'Good job!',
                  'You won!',
                  'success'
                )
                player = new Player();
            }, 500)
        }
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.rowPos, this.colPos);
};

Player.prototype.handleInput = function(input) {
    switch(input) {
        case 'left':
            return this.update(-100, 0);
        case 'right':
            return this.update(100, 0);
        case 'up':
            return this.update(0, -80);
        case 'down':
            return this.update(0, 80);

    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0, 50), new Enemy(0, 140), new Enemy(0, 220)];
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
