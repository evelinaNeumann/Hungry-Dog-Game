class Enemy {
    constructor (){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20; 
        this.frameInterval = 1000/this.fps;
        this.frameTimer;
    }
    update(){
        //movement
        this.x+=this.speedX;
        this.y+=this.speedY;

    }
    draw(){

    }
}

class GroundEnemy extends Enemy {

}