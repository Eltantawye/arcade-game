let lives = document.querySelector('.lives');
let level = document.querySelector('.level');
let score = document.querySelector('.score');
let popup = document.querySelector('.popup');
let livesArr = ['❤','❤','❤'];
lives.textContent = livesArr;
level.textContent = " 0";
score.textContent = " 0";
let arrowPress = true;

// Enemies our player must avoid
class Enemy {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.speedIncrement = 0;
    this.speed =Math.floor(Math.random() * 3) + 1;
  }
    //update enemies postion and speed
    update(dt) {
      if(this.x >= 500) {
        this.x = 0;
        this.speed =Math.floor(Math.random() * 3+this.speedIncrement) +1;
        this.render();
      }
    }
    // Draw the enemy on the screen, required method for game
    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x+=this.speed, this.y);
    }
}

/*bug class inherits enemy class
*adding bug image
*/
class Bug extends Enemy {
  constructor(x,y) {
    super(x,y);
    this.sprite = 'images/enemy-bug.png';
  }
}

/*car class inherits enemy class
*adding car image
*/
 class Car extends Enemy {
  constructor(x,y) {
    super(x,y);
    this.sprite = 'images/enemy-car.png';
  }
}

/* player class */
class Player {
  constructor() {
    this.x = 200;
    this.y = 400;
    this.levels = 0;
    this.score = 0;
    this.sprite = 'images/char-boy.png'
  }


  update(dt) {
        //check collisions with enemies
    for(let i = 0 ; i < allEnemies.length ; i++) {
      if((allEnemies[i].x >= this.x-75 && allEnemies[i].x <= this.x+70 ) && allEnemies[i].y === this.y)
      {
        this.reset();
        livesArr.pop('❤');
        lives.textContent = livesArr;
      }
    }
        // winning situation will increase game level and score
    if(this.y < 0) {
      level.textContent = ++this.levels;
      score.textContent = this.score+=10;
      setTimeout(() => this.reset(),10);
      allEnemies.forEach((enemy)=>++enemy.speedIncrement);
    }
      //check if player have zero lives
      //reset gamel panel
    if(livesArr.length === 0) {
      popupBox(this.score,this.levels);
      this.panelReset();
      allEnemies.forEach((enemy)=> enemy.speedIncrement = 0);
    }
  }

  //render player
  render(dt) {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  /*taking arrows input
  *player can not move off screen
  */
  handleInput(key) {
   if(arrowPress) {
    switch (key) {
      case 'up':
          if(this.y >= 0)
          this.y-=90;
          break;
      case 'down':
          if(this.y <= 399)
          this.y+=90;
          break;
      case 'left':
          if(this.x >= 90)
          this.x-=100;
          break;
      case 'right':
          if(this.x <= 350)
          this.x+=100;
          break;
    }
   }
  }

  //reset player postion
  reset() {
    this.x = 200;
    this.y = 400;
  }

  //game panel reset
  panelReset() {
    livesArr.push('❤','❤','❤');
    this.levels = 0;
    this.score = 0;
    lives.textContent = livesArr;
    level.textContent = this.levels;
    score.textContent = this.score;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let firstEnemy = new Car(0,40);
let secondEnemy = new Bug(0,130);
let thirdEnemy = new Bug(0,220);
allEnemies.push(firstEnemy,secondEnemy,thirdEnemy);

let player = new Player();

/* popup messege */
function popupBox(score,level) {
  let boxScore = document.querySelector('.pop-score');
  let boxLevel = document.querySelector('.pop-lvl');
  let boxBtn = document.querySelector('.play-again');
  arrowPress = false;
  popup.style.display = 'block';
  boxScore.textContent=score;
  boxLevel.textContent=level;
  boxBtn.addEventListener('click',function(){
    popup.style.display = 'none';
    arrowPress = true;
  });
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
