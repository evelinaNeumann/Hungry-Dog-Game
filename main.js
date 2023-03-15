import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, GroundEnemy } from "./enemies.js";
import { UI } from "./UI.js";
/*load event provides, that Js waits for all dependent resouces such as stylesheets an d images
to be fully loaded and available before it runs.*/
window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1400;
  canvas.height = 1200;
/*"class" is a speciall type of method in js, it get's automatically executed, 
//when we call this class using the keyword */
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 150;
      this.speed = 3;
      this.background = new Background (this);
      this.player = new Player(this);
      /*here keyword "this" means this game class*/
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      this.enemies = [];//holds all currently active enemie objects
      this.particles = [];
      this.collisions = [];
      this.maxParticles = 80;
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.debug = false;
      this.score = 0;
      this.fontColor = 'rgb(255, 168, 30)';
      this.player.currentState=this.player.states[0];
      this.player.currentState.enter();
      this.time = 0;
      this.maxTime = 20000;
      this.gameOver = false;
    }
    update(deltaTime) {
      /*delta time is the difference between the time stand from this animation frame and the time stand
      //from the previous one*/
      this.time +=deltaTime;
      if (this.time > this.maxTime) this.gameOver = true;
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      //handle Enemies      
      if (this.enemyTimer>this.enemyInterval){
        this.addEnemy();
        this.enemyTimer = 0;
      }else{
        this.enemyTimer +=deltaTime;
      }
      this.enemies.forEach(enemy=> {
        enemy.update(deltaTime);
        if(enemy.markedForDeletion)this.enemies.splice(this.enemies.indexOf(enemy),1);
      });
      // handle particles
      this.particles.forEach((particle, index)=>{
        particle.update();
        if(particle.markedForDeletion) this.particles.splice(index, 1);
      });
        if(this.particles.length > this.maxParticles) {
          this.particles = this.particles.slice(0, this.maxParticles);
        }
        //handle collisions sprites
        this.collisions.forEach((collision, index) =>{
          collision.update(deltaTime);
          if(collision.markedForDeletion) this.collisions.splice(index, 1);
        })
    }
    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach(enemy=> {
        enemy.draw(context);
      });
      this.particles.forEach(particle=> {
        particle.draw(context);
      });
      this.collisions.forEach(collision=> {
        collision.draw(context);
      });
      this.UI.draw(context);
    }
    addEnemy(){
      if(this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
      this.enemies.push(new FlyingEnemy(this))
      
      console.log(this.enemies);               
         
    }
  }

  const game = new Game(canvas.width, canvas.height);
  /*the instance of game class
  //it triggers class constructor and that automatically triggers class constructor on imported player class
  // and creates a Player.*/
  console.log(game);
  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime=timeStamp - lastTime;    
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    if (!game.gameOver) requestAnimationFrame(animate);
  }

  animate(0);
});
