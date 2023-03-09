import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
/*load event provides, that Js waits for all dependent resouces such as stylesheets an d images
to be fully loaded and available before it runs.*/
window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
/*"class" is a speciall type of method in js, it get's automatically executed, 
//when we call this class using the keyword */
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 50;
      this.speed = 3;
      this.background = new Background (this);
      this.player = new Player(this);
      /*here keyword "this" means this game class*/
      this.input = new InputHandler();
      
    }
    update(deltaTime) {
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
    }
    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
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
    requestAnimationFrame(animate);
  }

  animate(0);
});
