class Enemy {
    /*parent (super)class, hier are defined the properties and methods shared between
    all enemy types*/
    constructor (){
        //horizontal and vertical spritesheet navigation
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 22; //frames per second
        this.frameInterval = 5000/this.fps;
        this.frameTimer=0;
        this.markedForDeletion = false;
    }
    update(deltaTime){
        //movement
        this.x-=this.speedX + this.game.speed;
        this.y+=this.speedY;
        if(this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        //check if off screen
        if (this.x +this.width < 0) this.markedForDeletion = true;

    }
    draw(context){
        if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage (this.image, this.frameX*this.width, 0, this.width, this.height, this.x, this.y, 
        this.width, this.height)

    }
}
export class FlyingEnemy extends Enemy {
    constructor (game){
        super();
        this.game = game;
        this.width = 175;
        this.height = 140;
        this.x = this.game.width + Math.random()*this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.3 - 120;
        this.speedX = Math.random() + 4;
        this.speedY = 1;
        this.maxFrame = 4;
        this.image = document.getElementById('enemy_raven');
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }
       
  update(deltaTime){
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);

    
  } 
}


export class GroundEnemy extends Enemy {
    /*child enemy class, hier are defined properties and methods specific just for that enemy type*/
     constructor (game){
        super();
        this.game = game;
        this.width = 55;
        this.height = 97;
        this.x = this.game.width;
        this.y = this.game.height-this.height-this.game.groundMargin;
        this.image = document.getElementById('enemy_egg');
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 6;
        
     }
}