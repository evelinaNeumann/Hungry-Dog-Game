import {Sitting, Running, Jumping, Falling } from "./playerStates.js";

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 200;
    this.height = 182;
    this.x = 0;
    /*positioning the Player at the bottom of playground*/
    this.y = this.game.height - this.height-this.game.groundMargin;
    /*vertical speed (velocity)*/
    this.vy = 0;
    this.weight = 1;
    this.image = document.getElementById("player");
    this.frameX=0;
    this.frameY=0;
    this.maxFrame;
    this.fps = 20;
    this.frameInterval = 1000/this.fps;
    this.frameTimer = 0;
    this.speed = 0;
    this.maxSpeed = 10;
    this.states=[new Sitting(this), new Running(this), new Jumping(this), new Falling(this)];
    this.currentState=this.states[0];
    this.currentState.enter();
  }
  update(input, deltaTime) {
    this.currentState.handleInput(input)
    /*horizontal movement*/
    this.x += this.speed;
    if (input.includes("ArrowRight")) this.speed = this.maxSpeed;
    else if (input.includes("ArrowLeft")) this.speed = -this.maxSpeed;
    /*movement stopps if the array doesn't receive arrowright or arrowleft input */
    else this.speed = 0;
    /*left edge boundary*/
    if (this.x < 0) this.x = 0;
    /*right edge boundary*/
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
    /*vertical movement
    //the player is only able to jump, while standing on the ground
    //for the correct performance the position of code lines is important!*/
     this.y += this.vy;
    /*pulls down the player, whenever the player is not standing on the ground
    //increase it' velocity by it's weight*/
    if (!this.onGround()) this.vy += this.weight;
    /*when the player is back on the ground, velocity needs to be set on 0
    //in purpouse not to go througtht the bottom edge of the playground */
    else this.vy = 0;
    /*Sprite Animation */
    if (this.frameTimer > this.frameInterval){
        this.frameTimer = 0;
        if (this.frameX<this.maxFrame)this.frameX++;
        else this.frameX = 0;
    }else{
        this.frameTimer +=deltaTime;
    }
    
  }
  /*determins what the player it about to be looking like*/
  draw(context) {
    context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height, this.width,this.height,this.x,this.y, this.width, this.height );//arguments 
    /*of this method: image, source x, source y, source width, source height,
    // along with destination ("this") elements*/
  }
  /*this method checks if the player is in the air or on the ground*/
  onGround() {
    return this.y >= this.game.height - this.height-this.game.groundMargin;
  }
  setState(state){
    this.currentState = this.states[state];
    this.currentState.enter();
  }
}
