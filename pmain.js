
let game = null;

let W = 400, H = 600;
let BLACK = 0, RED = 1, BLUE = 3;
let BACK = -1;

// card width and height
let CW = 51;
let CH = 74;

// game states these match the screens in the game
let GAME_STATE_LOADING = 0;
let GAME_STATE_PLAYING = 2;
let GAME_STATE_MENU_0 = 1;
let GAME_STATE_WINNING = 3;
let GAME_STATE_OVER = 4;

// different constants to match the levels in game
let LVL_EASYPYRAMID = 0;
let LVL_HARDPYRAMID = 1;
let LVL_BLOB1 = 2;
let LVL_SLIDER1 = 3;
let LVL_LATTICE1 = 4;

// results for checking game over or not
let RES_NOT_OVER = 0; // there are cards that can be played
let RES_NOTHING_TO_PLAY = 2; // nothing to play currently
let RES_WIN = 1; // game is over and the player won
let RES_NO_CHECK = -1; // we are not checking anything
let RES_GAME_OVER = 3; // game is no plays and foundation is empty

// try this: https://codepen.io/jackrugile/post/arcade-audio-for-js13k-games
// https://github.com/mneubrand/jsfxr
// http://www.superflashbros.net/as3sfxr/
let jsfxr = window['jsfxr']; // added to make closure happy

// sounds for jsfxr
let BLIP = [1,,0.1401,,0.1168,0.2534,,,,,,,,,,,,,1,,,0.1,,0.5];
let blipSoundURL = jsfxr(BLIP);
let blipPlayer = new Audio();
blipPlayer.src = blipSoundURL;
let WINSOUND = [0,0.0122,0.4,0.0661,0.9703,0.5013,,0.4752,0.0459,,,-0.9875,0.4313,0.6926,0.087,0.624,-0.6693,0.24,0.2382,0.5391,0.9463,0.0004,0.108,0.5];
let winSoundURL = jsfxr(WINSOUND);
let winPlayer = new Audio();
winPlayer.src = winSoundURL;
let LOSESOUND = [1,0.4278,0.7032,0.2042,0.5064,0.5826,,,-0.1107,,,-0.9291,0.7922,0.163,-0.1465,0.2398,0.4789,0.8507,0.9037,-0.0365,-0.2982,0.0124,-0.0241,0.5];
let loseSoundURL = jsfxr(LOSESOUND)
let losePlayer = new Audio();
losePlayer.src = loseSoundURL;

let resetButton = null;
let menuButton = null;

let Game = function(){
    this.SHUFFLE_COUNT = 10;
    this.INIT_DEAL_COUNT = 28; // need this many cards
    this.canvas = null;
    this.ctx = null;
    //this.reserve = null;
    this.deck = null; // this is the deck that holds cards before deal
    this.pcards = [];
    this.allImages = []; // these are the small svgs
    this.gCardImages = []; // these are the final images
    this.currentState = null; // start as null
    this.levelChoice = null;
    this.needToCheckForEnd = false;

    // these need to be filled out before the game.render call is
    // made
    this.states = [];
    this.states[GAME_STATE_LOADING] = new GameLoading();
    this.states[GAME_STATE_PLAYING] = new GamePlaying();
    this.states[GAME_STATE_MENU_0] = new GameMenu();
    this.states[GAME_STATE_WINNING] = new GameWinning();
    this.states[GAME_STATE_OVER] = new GameOverDialog();
}

Game.prototype = {
    update : function() {
        if (this.currentState) {
            this.currentState.update();
        }
    },
    render : function() {
        if (this.currentState) {
            this.currentState.render();
        }
    },
    changeState : function(newState) {
        // only exit the current state if it is there
        if (this.currentState) {
            this.currentState.exit();
        }
        // enter the new state
        this.states[newState].enter();
        this.currentState = this.states[newState];
    }
};



class GamePlaying extends BaseState {
    constructor() {
        super();
    }
    enter() {

        // these are hard coded
        // if i had more time this would be an array more than
        // likely
        if (game.levelChoice== LVL_EASYPYRAMID) {
            game.pyramid = new PyramidEasy();
        } else if (game.levelChoice==LVL_HARDPYRAMID) {
            game.pyramid = new Pyramid();
        } else if (game.levelChoice==LVL_BLOB1) {
            game.pyramid = new Blob1();
        } else if (game.levelChoice==LVL_SLIDER1) {
            game.pyramid = new Slider1();
        } else if (game.levelChoice==LVL_LATTICE1) {
            game.pyramid = new Lattice1();
        }

        cardGameInit();

    }
    exit() {
        cardGameTearDown();
    }
    update() {
        // always run this
        // there is a flag that tells it to do work or not
        cardGameCheckForEnd();
    }
    render() {

        // draw the pyramid
        if (game.pyramid) {
            for(let i=0;i<game.INIT_DEAL_COUNT;i++) {
                if (game.pyramid.slots[i].card) {
                    game.pyramid.slots[i].card.render();
                }
            }
        }

        if (game.foundation) {
            game.foundation.render();
            game.ctx.fillText(game.foundation.cc + " left",
                CW*3.2,CH*7.5);
        }
        
        if (game.discard) {
            game.discard.render();
        }

        // other UI elements below here
        if (resetButton) {
            resetButton.render();
        }
        if (menuButton) {
            menuButton.render();
        }
    }
}

function cardGameReset() {

    // reset no need to check anything
    game.needToCheckForEnd = false;

    // initial deck shuffled
    game.deck = new Deck();
    for(let i=0;i<game.SHUFFLE_COUNT;i++) {
        game.deck.shuffle();
    }

    // deal cards to pyramid
    if (game.levelChoice==LVL_EASYPYRAMID) {
        game.pyramid = new PyramidEasy();
    } else if (game.levelChoice==LVL_HARDPYRAMID) {
        game.pyramid = new Pyramid();
    } else if (game.levelChoice == LVL_BLOB1) {
        game.pyramid = new Blob1();
    } else if (game.levelChoice == LVL_SLIDER1) {
        game.pyramid = new Slider1();
    } else if (game.levelChoice == LVL_LATTICE1) {
        game.pyramid = new Lattice1();
    }
    
    // set up the deal count according the the pyramid
    game.INIT_DEAL_COUNT = game.pyramid.INIT_DEAL_COUNT;
    for (let i=0;i<game.INIT_DEAL_COUNT;i++) {
        game.pyramid.slots[i].setCard(game.deck.deal());
    }

    // make pile out of remaining cards
    game.foundation = new Pile({displayBackOnly:true});
    for (let i=game.INIT_DEAL_COUNT;i<52;i++) {
        game.foundation.push(game.deck.deal());
    }
    game.foundation.setxy(2*CW,7*CH);

    // make a new empty pile that will hold cards
    // as they are pulled from the foundation and removed
    // from the pyramid
    game.discard = new Pile();
    game.discard.initWithBack();
    game.discard.setxy(CW,7*CH);

    // now move the first card to the discard pile
    let c = game.foundation.deal();
    game.discard.push(c);

    resetButton = new Button("reset",CW*5,CH*7.5,50,10);
    menuButton = new Button("menu", CW*6.2,CH*7.5,50,10);

    game.needToCheckForEnd = true; // now that everything is set again check
}

function cardGameCheckForEnd() {
    if (game.needToCheckForEnd) {
        // only check 1 time per cycle
        game.needToCheckForEnd = false;
    } else {
        // do nothing
        return RES_NO_CHECK;
    }

    let cardsInFoundation = false;
    if (game.foundation.cc>0) {
        cardsInFoundation = true;
        //return RES_NOT_OVER;
    }

    // set win to true by default
    let win = true;
    // set still has move as false
    let stillHasMove = false;

    // get the top card used to see if we still have moves
    let top = game.discard.top();

    for (let i=0;i<game.INIT_DEAL_COUNT;i++) {
        // get the card
        let s = game.pyramid.slots[i];
        // if there is  card there do something?
        if (s.card) {
            // the presence of any card on the board
            // makes win false
            win = false;

            // only check cards that can be clicked on
            if ((s.lock1==-1) && (s.lock2==-1)) {
                if (top.nextTo(s.card)) {
                    // there is still a move to be made
                    // game is not over
                    stillHasMove = true;
                }    
            }

        }
    }

    // TODO: not sure if I am going to use this yet?
    function bumpStorage(key) {
        if (window.localStorage) {
            let f = key + game.levelChoice;
            let val = window.localStorage.getItem(f);
            if (!val) {
                window.localStorage.setItem(f,1);
            } else {
                window.localStorage.setItem(f,parseInt(val)+1);
            }
        }
    }

    if (win) {
        winPlayer.play();
       // bumpStorage("win_");
        setTimeout(function() {
            game.changeState(GAME_STATE_WINNING);
        },2000);
        return RES_WIN;
    } else if (stillHasMove) {
        return RES_NOT_OVER;
    }
    // at this point the only choice is we have no plays
    // left to give
    // if the foundation is empty too then it is really over!
    if (game.foundation.cc==0) {
        losePlayer.play();
        //bumpStorage("lose_");
        setTimeout(function(){
            game.changeState(GAME_STATE_OVER);
        },2000);
        return RES_GAME_OVER;
    }
    return RES_NOTHING_TO_PLAY;
}


function cardGameClickHandler(e) {
    e.stopPropagation();

    let pointerX = e.clientX - game.canvas.offsetLeft;
    let pointerY = e.clientY - game.canvas.offsetTop;

    // handle UI elements first,reset and menu
    if (resetButton) {
        if (tinyGameCheckObject(resetButton,pointerX,pointerY)) {
            cardGameReset();
            return;
        }
    }
    if (menuButton) {
        if (tinyGameCheckObject(menuButton,pointerX,pointerY)) {
            game.changeState(GAME_STATE_MENU_0);
            return;
        }
    }

    // also check for foundation click
    if (!game.foundation.empty()) {
        if (tinyGameCheckObject(game.foundation.top(),pointerX,pointerY)) {
            // pull card from foundation
            let c = game.foundation.deal();
            // push to discard pile
            game.discard.push(c);

            game.needToCheckForEnd = true;

            return;        
        }    
    }

    // now the pyramid
    for (let i=0;i<game.INIT_DEAL_COUNT;i++) {
        let s = game.pyramid.slots[i];
        if (s.card) {
            if (tinyGameCheckObject(s.card,pointerX,pointerY)) {

                // both locks have to be -1 for this card to move
                if ((s.lock1==-1) && (s.lock2==-1)) {
                    // look at discard pile
                    if (game.discard.top().nextTo(s.card)) {
                        // we can take the card from the pyramid
                        // and move it to discard!
                        game.discard.push(s.card);
                        s.card = null;
                        game.pyramid.removedCardAtIndex(i);
                        blipPlayer.play();
                        // now check for game end
                        game.needToCheckForEnd = true;
                    }
                } // if this card is unlocked
            } // tiny game check object end
        } // if s.card               
    } // end of for loop

}

function cardGameTearDown() {
    // practice good hygiene
    document.removeEventListener("click", cardGameClickHandler);
}

function cardGameInit() {

    // set up the card game
    cardGameReset();

    // setup the card game click handler
    document.addEventListener("click", cardGameClickHandler);

    game.needToCheckForEnd = true;

}
  
function mainline() {
    game = new Game(); // singleton game here

    // load the 4 SVG data uris first
    loadAllSVG().then(function(loadedImages){

        // save them where every one can see them
        game.allImages = loadedImages;

        // generate all the card images using those 4 SVGs
        generateCardImages().then(function(){

            // setup the engine
            tinyGameInit();
            
            // this will cause enter to be called
            game.changeState(GAME_STATE_LOADING);
      
        });
    }, function(e){
        console.log(e);
    });

}   


window.onload = mainline;