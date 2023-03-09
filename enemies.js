class Enemy {
    constructor (){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20; 
        this.frameInterval = 1000/this.fps;
        this.frameTimer;
    }
    update(deltaTime){
        //movement
        this.x+=this.speedX;
        this.y+=this.speedY;
        if(this.frameTimer > this.frameInterval) {
            this.frameInterval = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }

    }
    draw(context){
        context.drawImage (this.image, this.frameX*this.width, 0, this.width, this.height, this.x, this.y, 
        this.width, this.height)

    }
}

export class GroundEnemy extends Enemy {
     constructor (game){
        super();
        this.game=game;
        this.width = 240;
        this.height = 260;
        this.x = 820;
        this.y = 820;
        this.speedX = 2;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = document.getElementById('enemy_egg');
     }
}