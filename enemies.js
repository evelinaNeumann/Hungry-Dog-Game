class Enemy {
    /*parent (super)class, hier are defined the properties and methods shared between
    all enemy types*/
    constructor (){
        //horizontal and vertical spritesheet navigation
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 2; //frames per second
        this.frameInterval = 5000/this.fps;
        this.frameTimer=0;
        this.markedForDeletion = false;
    }
    update(deltaTime){
        //movement
        this.x-=this.speedX;
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

export class GroundEnemy extends Enemy {
    /*child enemy class, hier are defined properties and methods specific just for that enemy type*/
     constructor (game){
        super();
        this.game = game;
        this.width = 60;
        this.height = 87;
        this.x = this.game.width;
        this.y = this.game.height-this.height-this.game.groundMargin;
        this.image = document.getElementById('enemy_egg');
        this.speedX = 1;
        this.speedY = 0;
        this.maxFrame = 1;
        
     }
}