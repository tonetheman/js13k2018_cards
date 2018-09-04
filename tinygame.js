

/*
pre: c has to have an x,y and width and height

this ended up being a useful routine. anything that has
an x,y,width,height (aka a sprite) can use it.
*/
function tinyGameCheckObject(c,pointerX,pointerY) {
    if ((pointerX>=c.x) && (pointerX<=(c.x+c.width)) &&
        (pointerY>=c.y) && (pointerY<=(c.y+c.height))) {
            return true;
    }
    return false;
}


function timestamp() {
    if (window.performance && window.performance.now)
        return window.performance.now();
    else
        return new Date().getTime();
}

function tinyGameRender() {
    game.ctx.clearRect(0,0,W,H);
    game.render();
}

function tinyGameUpdate() {
    game.update();
}

// this is really just standard stuff and there are probably
// even better ways to do it.
// it worked for me...
function tinyGameFrame() {
    game.now = timestamp();
    game.dt = game.dt + Math.min(1, (game.now - game.last) / 1000);
    while(game.dt > game.step) {
        game.dt = game.dt - game.step;
        tinyGameUpdate(game.step);
    }
    tinyGameRender(game.ctx, game.dt);
    game.last = game.now;
    requestAnimationFrame(tinyGameFrame, game.canvas);
}



function tinyGameInit() {
    game.fps = 60;
    game.step = 1/game.fps;
    game.dt = 0;
    game.now = 0;
    game.last = timestamp();

    game.canvas = document.getElementById("c");
    game.ctx = game.canvas.getContext("2d");
    W = game.canvas.width;
    H = game.canvas.height;
    console.log("tinyGameInit:",W,H);
    console.log("tinyGameInit:canvas",game.canvas);

    tinyGameFrame();
}
