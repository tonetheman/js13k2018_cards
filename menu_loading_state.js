class GameMenu extends BaseState {
    constructor() {
        super();
        this.eb = { x : W/4, y : H/4, width: 120, height: 20};
        this.hb = { x : W/4, y : H/4+28, width:120, height:20};
        this.b1 = { x : W/4, y : H/4+56, width:120, height:20};
        this.s1 = { x : W/4, y : H/4+84, width:120, height:20};
        this.l1 = { x : W/4, y : H/4+112, width:120, height:20};

        this.ch = (e) => {
            this.click_handler(e);
        }
    }
    enter() {
        console.log("GameMenu enter");
        document.addEventListener("click", this.ch);
    }
    exit() {
        console.log("GameMenu exit");
        let res = document.removeEventListener("click",this.ch);
        console.log("res from remove event listener",res);
    }
    click_handler(e) {
        console.log("GameMenu click handler fired!");
        let pointerX = e.clientX - game.canvas.offsetLeft;
        let pointerY = e.clientY - game.canvas.offsetTop;

        if (tinyGameCheckObject(this.eb,pointerX,pointerY)) {
            console.log("easy");
            game.levelChoice = LVL_EASYPYRAMID;
            game.changeState(GAME_STATE_PLAYING);
            return;
        }
        if (tinyGameCheckObject(this.hb,pointerX,pointerY)) {
            console.log("hard");
            game.levelChoice = LVL_HARDPYRAMID;
            game.changeState(GAME_STATE_PLAYING);
            return;
        }
        if (tinyGameCheckObject(this.b1,pointerX,pointerY)) {
            console.log("blob1");
            game.levelChoice = LVL_BLOB1;
            game.changeState(GAME_STATE_PLAYING);
            return;
        }
        if (tinyGameCheckObject(this.s1,pointerX,pointerY)) {
            console.log("slider1");
            game.levelChoice = LVL_SLIDER1;
            game.changeState(GAME_STATE_PLAYING);
            return;
        }
        if (tinyGameCheckObject(this.l1,pointerX,pointerY)) {
            console.log("lattice1");
            game.levelChoice = LVL_LATTICE1;
            game.changeState(GAME_STATE_PLAYING);
            return;
        }

    }
    update() {
        // at some point do removeEventListener("click",?)
    }
    render() {
        game.ctx.font = "18px serif";
        game.fillStyle = "red";
        game.ctx.fill = "black";
        let x = W/4;
        let y = H/4;

        roundRect(game.ctx, this.eb.x, this.eb.y, this.eb.width, this.eb.height);
        game.ctx.fillText("easy pyramid", x+4, y+14);

        roundRect(game.ctx,this.hb.x,this.hb.y,this.hb.width,this.hb.height);
        game.ctx.fillText("hard pyramid", x+4, y+42);

        roundRect(game.ctx,this.b1.x,this.b1.y,this.b1.width,this.b1.height);
        game.ctx.fillText("blob1", x+4, y+70);

        roundRect(game.ctx,this.s1.x,this.s1.y,this.s1.width,this.s1.height);
        game.ctx.fillText("slider1", x+4, y+98);

        roundRect(game.ctx,this.l1.x,this.l1.y,this.l1.width,this.l1.height);
        game.ctx.fillText("lattice1", x+4, y+126);

        
    }
}

class GameLoading extends BaseState {
    constructor() {
        super();
        this.counter = 0;
    }
    enter() {
        console.log("GameLoading enter called");
    }
    exit() {
        console.log("GameLoading exit called");
    }
    update() {
        this.counter++;
        if(this.counter>200) {
            game.changeState(GAME_STATE_MENU_0);
        }
    }
    render() {
        game.ctx.font = "18px serif";
        game.ctx.fillStyle = "red";
        game.ctx.fillText("13k solitaire",W/2,H/2);
        game.ctx.fillText("tony colston",W/2,H/2+40);
    }
}
