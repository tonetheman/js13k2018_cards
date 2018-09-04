class GameOverDialog extends BaseState {
    constructor() {
        super();
        this.counter = 0;
    }
    update() {
        this.counter++;
        if (this.counter>200) {
            cardGameReset();
            game.changeState(GAME_STATE_PLAYING);
            this.counter=0;
        }
    }
    render() {
        game.ctx.font = "28px serif";
        game.ctx.fillText("GAME OVER!",W/2,H/2);

        // interesting thought here ...
        // somehow darken this guy
        //this.states[GAME_STATE_PLAYING].render();
    }
}
