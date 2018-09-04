
// this is a prototype based card
function Card(v) {
    this.x = 0;
    this.y = 0;
    this.width = 51;
    this.height = 74;
    if (v==BACK) {
        this.v = BACK;
        this.suit = BACK;
        this.rank = BACK;
        this.color = BLUE;
    } else {
        // v will range from 0-51
        this.v = v;
        // suit will be 0-3
        this.suit = Math.floor(v/13);
        // rank will be 0-12
        this.rank = Math.floor(v%13);
        /*
        Ah I am lazy... no real need to store suit and rank
        The first place I saw that trick was the source code
        to the one and only microsoft solitaire.
        */
        if ((this.suit==0) || (this.suit==1)) {
            this.color = BLACK;
        } else {
            this.color = RED;
        }    
    }
    this.canvas = document.createElement('canvas');
    this.canvas.width = CW;
    this.canvas.height = CH;
    this.canvas.setAttribute("style", "background: green; margin : 0; padding: 0; color:red; border: 1px solid blue;");
    this.context = this.canvas.getContext('2d');
    this.context.font = '800% serif';
    if (this.color==RED) {
        this.context.fillStyle = "red";
    } else if (this.color == BLACK) {
        this.context.fillStyle = "black";
    } else if (this.color == BLUE) {
        this.context.fillStyle = "blue";
    }
    
    this.img = document.createElement("img");
    this.img.src = this.canvas.toDataURL();
}
// javascript mod is really a remainder operator
// WTF who knew that?
// sad :(
function mod(n,m) {
    let remain = n % m;
    return remain >=0 ? remain : remain + m;
}
Card.prototype = {
    nextTo : function(other) {
        let r1 = mod(other.rank+1,13); //(other.rank+1)%13;
        let r2 = mod(other.rank-1,13); //(other.rank-1)%13;
        return ((r1==this.rank)||(r2==this.rank));
    },
    render : function() {
        if (this.v==BACK) {
            game.ctx.drawImage(game.gCardImages[52],this.x,this.y);
        } else {
            game.ctx.drawImage(game.gCardImages[this.v],
                this.x, this.y);
        }
    }
}

class Deck {
    constructor() {
        this.cards = [];
        this.cc = 0;
        for(var i=0;i<52;i++) {
            let a = new Card(i,this);
            this.cards.push(a);
        }
        this.cc = 52-1;
    }
    
    shuffle() {
        var j, x, i;
        for (i = this.cards.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = x;
        }
    }

    // get the top of the deck but do not pull it
    // like cheating
    top () {
        return this.cards[this.cc];
    }

    // pull the card from the deck
    deal() {
        let c = this.cards[this.cc];
        this.cc--;
        return c;
    }
}

/*
pile is really supposed to represent a physical pile of cards
you can have the top card down or up
*/
function Pile(opts) {
    // pile holds a bunch of cards
    this.cards = [];
    // no current card to start
    this.cc = -1;
    // no real position to speak of either
    this.x = 0;
    this.y = 0;
    // width is just a card width and height
    this.width = CW;
    this.height = CH;
    // keep up with options
    this.displayBackOnly = false;
    if (opts) {
        if (opts.displayBackOnly) {
            this.displayBackOnly = true;
            this.backCard = new Card(BACK);
        }
    }
}
Pile.prototype = {
    // init with just a card back
    initWithBack : function() {
        this.cards.push(new Card(BACK));
        this.cc = 0;
    },
    // init with a whole deck
    initWithDeck : function(d) {
        for(let i=0;i<52;i++) {
            this.cards.push(d.deal());
        }
        this.cc = 51;
    },
    // draw the top card only
    render : function() {
        if (this.displayBackOnly) {
            this.backCard.x = this.x;
            this.backCard.y = this.y;
            this.backCard.render();
        } else {
            if (this.cc>=0) {
                let c = this.cards[this.cc];
                c.x = this.x;
                c.y = this.y;
                c.render();
            }    
        }
    },
    // set the x and y of the pile and
    // the x and y of the card on top
    setxy : function(x,y) {
        if (this.cc>=0) {
            this.x = x;
            this.y = y;
            this.cards[this.cc].x = x;
            this.cards[this.cc].y = y;
        }
    },
    // pull a top from the top
    // adjust the current card index
    deal : function() {
        if (this.cc>0) {
            let c = this.cards[this.cc];
            this.cc--;
            // adjust the x and y of the card that
            // is now showing
            this.cards[this.cc].x = this.x;
            this.cards[this.cc].y = this.y;
            return c;
        }
    },
    empty : function() {
        return this.cc==0;
    },
    top : function() {
        if (this.cc>0) {
            return this.cards[this.cc];
        }
        return null; // TODO: prob bad
    },
    reserve_handle_click : function() {
        let c = this.deal(); // get the card from the top
    },
    push : function(c) {
        // adjust the card position to match the pile
        c.x = this.x;
        c.y = this.y;
        // save it in the array
        this.cards.push(c);
        // bump the pointer
        this.cc++;
    }
}
