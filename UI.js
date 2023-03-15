export class UI {
    constructor (game){
        this.game = game;
        this.fontSize = 45;
        this.fontFamily = 'Climate Crisis';
    }
    draw(context){
        context.font = this.fontSize+'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        //drawing score
        context.fillText('Score: ' + this.game.score, 20, 50);
        // game timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
        // game over message 
        if (this.game.gameOver){
            context.textAlign = 'center';
            context.font = this.fontSize * 4 + 'px ' + this.fontFamily;
            if (this.game.score > 50) {
                context.fillText ('Great', this.game.width * 0.5, this.game.height*0.5 - 20);
                context.font = this.fontSize * 0.95 + 'px ' + this.fontFamily;                
                context.fillText ('Only a true warrior knows the taste of victory!', this.game.width * 0.5, 
                this.game.height*0.5 + 50);
            } else {
                context.fillText ('TOO bad', this.game.width * 0.5, this.game.height*0.5 - 20);
                context.font = this.fontSize * 1.2 + 'px ' + this.fontFamily;
                context.fillText ('If you snooze you lose', this.game.width * 0.5, this.game.height*0.5 + 60);


            }
            
        }
    }
}