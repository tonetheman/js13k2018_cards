
/*
A state corresponds to a screen in the game.
You get a chance to enter and exit to setup or cleanup
the state.
After that update is called and render is called
over and over...
*/
class BaseState {
    constructor() {}
    enter() {}
    exit() {}
    update() {}
    render() {}
}
