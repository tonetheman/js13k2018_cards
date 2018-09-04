class Button {
    constructor(msg,x,y,width,height) {
        this.msg = msg;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    update() {

    }
    render() {
        game.ctx.fill = "black";
        roundRect(game.ctx,this.x,this.y,50,20);

        game.ctx.font = "18px serif";
        game.ctx.fillText(this.msg, this.x+8, this.y+13);
    }
}
