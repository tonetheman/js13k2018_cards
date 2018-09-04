class PyramidSlot {
    constructor(n, lock1, lock2, row, col) {
        this.n = n; // this in an index
        this.row = row; // row on the UI
        this.col = col;
        this.lock1 = lock1; // each card is locked by two cards
        this.lock2 = lock2;
        this.card = null; // not filled out initially

        // this is really what determines layout on screen
        // does not for non-pyramid shapes
        this.y = this.row * CH;
        this.x = (this.col*CW)+((W/2)-CW)-(CW/2*(row-1));
    }
    setCard(c) {
        this.card = c;
        this.card.x = this.x;
        this.card.y = this.y;
    }
}

class BasePyramid {
    constructor() {
        this.slots = []
    }
    p(n, lock1, lock2, row, col) {
        this.slots.push(new PyramidSlot(n,lock1,lock2,row,col))
    }
    layout() {
        for (let i=0;i<this.slots.length;i++) {
            let s = this.slots[i];
            //console.log("s is",s,this.row,this.col);
            // do layout on the slow
            // later setCard will be called to put the cards in the right spot
            s.y = s.row * CH;
            s.x = s.col * CW/2;
        }
    }
    removedCardAtIndex(index) {
        for (let i=0;i<this.slots.length;i++) {
            let c = this.slots[i];
            if (c.lock1==index) {
                c.lock1 = -1;
            }
            if (c.lock2==index) {
                c.lock2 = -1;
            }
        }
    }
}

class Diamond extends BasePyramid {
    constructor() {
        super();
        this.INIT_DEAL_COUNT = 0;
    }
}

/*
      0
     1  2 
    3  4  5
   6  7  8  9
  10 11 12 13 14
 15 16 17 18 19 20
*/
class PyramidEasy extends BasePyramid {
    constructor() {
        super();
        
        this.INIT_DEAL_COUNT = 21;

        this.p(0,1,2,0,6);

        this.p(1,3,4,1,5);
        this.p(2,4,5,1,7);
        
        this.p(3,6,7,2,4);
        this.p(4,7,8,2,6);
        this.p(5,8,9,2,8);

        this.p(6,10,11,3,3);
        this.p(7,11,12,3,5);
        this.p(8,12,13,3,7);
        this.p(9,13,14,3,9);

        this.p(10,15,16,4,2);
        this.p(11,16,17,4,4);
        this.p(12,17,18,4,6);
        this.p(13,18,19,4,8);
        this.p(14,19,20,4,10);

        // bottom row is not locked by any card
        this.p(15,-1,-1,5,1);
        this.p(16,-1,-1,5,3);
        this.p(17,-1,-1,5,5);
        this.p(18,-1,-1,5,7);
        this.p(19,-1,-1,5,9);
        this.p(20,-1,-1,5,11);

        this.layout();
    }

}

/*
      0
     1  2 
    3  4  5
   6  7  8  9
  10 11 12 13 14
 15 16 17 18 19 20
21 22 23 24 25 26 27
*/
class Pyramid extends BasePyramid {
    constructor() {
        super();
        this.INIT_DEAL_COUNT = 28;
        this.slots.push(new PyramidSlot(0,1,2,0,6));

        this.slots.push(new PyramidSlot(1,3,4,1,5));
        this.slots.push(new PyramidSlot(2,4,5,1,7));
        
        this.slots.push(new PyramidSlot(3,6,7,2,4));
        this.slots.push(new PyramidSlot(4,7,8,2,6));
        this.slots.push(new PyramidSlot(5,8,9,2,8));

        this.slots.push(new PyramidSlot(6,10,11,3,3));
        this.slots.push(new PyramidSlot(7,11,12,3,5));
        this.slots.push(new PyramidSlot(8,12,13,3,7));
        this.slots.push(new PyramidSlot(9,13,14,3,9));

        this.slots.push(new PyramidSlot(10,15,16,4,2));
        this.slots.push(new PyramidSlot(11,16,17,4,4));
        this.slots.push(new PyramidSlot(12,17,18,4,6));
        this.slots.push(new PyramidSlot(13,18,19,4,8));
        this.slots.push(new PyramidSlot(14,19,20,4,10));

        this.slots.push(new PyramidSlot(15,21,22,5,1));
        this.slots.push(new PyramidSlot(16,22,23,5,3));
        this.slots.push(new PyramidSlot(17,23,24,5,5));
        this.slots.push(new PyramidSlot(18,24,25,5,7));
        this.slots.push(new PyramidSlot(19,25,26,5,9));
        this.slots.push(new PyramidSlot(20,26,27,5,11));
        
        // bottom row is not locked by any card
        this.slots.push(new PyramidSlot(21,-1,-1,6,0));
        this.slots.push(new PyramidSlot(22,-1,-1,6,2));
        this.slots.push(new PyramidSlot(23,-1,-1,6,4));
        this.slots.push(new PyramidSlot(24,-1,-1,6,6));
        this.slots.push(new PyramidSlot(25,-1,-1,6,8));
        this.slots.push(new PyramidSlot(26,-1,-1,6,10));
        this.slots.push(new PyramidSlot(27,-1,-1,6,12));

        this.layout();
    }
}

/*
   00    01
 02 03 04 05
06 07 08 09 10
 11 12 13 14
   15 16 17
 18  19 20 21
*/
class Blob1 extends BasePyramid {
    constructor() {
        super();
        this.INIT_DEAL_COUNT = 22;
        this.slots.push(new PyramidSlot(0,2,3,0,4));
        this.slots.push(new PyramidSlot(1,4,5,0,8));
        this.slots.push(new PyramidSlot(2,6,7,1,3));
        this.slots.push(new PyramidSlot(3,7,8,1,5));
        this.slots.push(new PyramidSlot(4,8,9,1,7));
        this.slots.push(new PyramidSlot(5,9,10,1,9));
        this.slots.push(new PyramidSlot(6,-1,11,2,2));
        this.slots.push(new PyramidSlot(7,11,12,2,4));
        this.slots.push(new PyramidSlot(8,12,13,2,6));
        this.slots.push(new PyramidSlot(9,13,14,2,8));
        this.slots.push(new PyramidSlot(10,14,-1,2,10));
        this.slots.push(new PyramidSlot(11,-1,15,3,3));
        this.slots.push(new PyramidSlot(12,15,16,3,5));
        this.slots.push(new PyramidSlot(13,16,17,3,7));
        this.slots.push(new PyramidSlot(14,17,-1,3,9));
        this.slots.push(new PyramidSlot(15,18,19,4,4));
        this.slots.push(new PyramidSlot(16,19,20,4,6));
        this.slots.push(new PyramidSlot(17,20,21,4,8));
        this.slots.push(new PyramidSlot(18,-1,-1,5,3));
        this.slots.push(new PyramidSlot(19,-1,-1,5,5));
        this.slots.push(new PyramidSlot(20,-1,-1,5,7));
        this.slots.push(new PyramidSlot(21,-1,-1,5,9));

        this.layout();
        //console.log(this.slots);
    }
}

class Slider1 extends BasePyramid {
    constructor (){
        super();
        this.INIT_DEAL_COUNT = 21;
        this.p(0,5,6,0,4);
        this.p(1,6,7,0,6);
        this.p(2,7,8,0,8);
        this.p(3,8,9,0,10);
        this.p(4,9,-1,0,12);
        this.p(5,10,11,1,3);
        this.p(6,11,12,1,5);
        this.p(7,12,14,1,7);
        this.p(8,13,-1,1,9);
        this.p(9,-1,-1,1,11);
        this.p(10,14,15,2,2);
        this.p(11,15,16,2,4);
        this.p(12,16,17,2,6);
        this.p(13,17,-1,2,8);
        this.p(14,18,19,3,1);
        this.p(15,19,20,3,3);
        this.p(16,20,-1,3,5);
        this.p(17,-1,-1,3,7);
        this.p(18,-1,-1,4,0);
        this.p(19,-1,-1,4,2);
        this.p(20,-1,-1,4,4);
        this.layout();
    }
}

class Lattice1 extends BasePyramid {
    constructor() {
        super();
        this.INIT_DEAL_COUNT = 21;
        this.p(0,-1,3,0,1);
        this.p(1,3,4,0,3);
        this.p(2,4,5,0,5);
        this.p(3,6,7,1,2);
        this.p(4,7,8,1,4);
        this.p(5,8,-1,1,6);
        this.p(6,-1,9,2,1);
        this.p(7,9,10,2,3);
        this.p(8,10,11,2,5);
        this.p(9,12,13,3,2);
        this.p(10,13,14,3,4);
        this.p(11,14,-1,3,6);
        this.p(12,-1,15,4,1);
        this.p(13,15,16,4,3);
        this.p(14,16,17,4,5);
        this.p(15,18,19,5,2);
        this.p(16,19,20,5,4);
        this.p(17,20,-1,5,6);
        this.p(18,-1,-1,6,1);
        this.p(19,-1,-1,6,3);
        this.p(20,-1,-1,6,5);

        this.layout();
    }
}