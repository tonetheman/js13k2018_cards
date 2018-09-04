class GameWinning extends BaseState {
    constructor() {
        super();
        this.counter = 0;
    }
    update() {
        this.counter++;
        if (this.counter>200) {
            game.changeState(GAME_STATE_MENU_0);
            this.counter=0;
        }
    }
    render() {
        game.ctx.font = "28px serif";
        game.ctx.fillText("YOU WIN!!!",W/2,H/2);

    }
}
