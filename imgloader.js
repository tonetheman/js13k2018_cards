
// this will load the 4 svg data uris
// it will return a single promise using promise.all
function loadAllSVG() {
    // a will be an array of promise objects
    let a = [];
    a.push(new Promise(function(res,rej){
        let img = document.createElement("img");
        img.src = clubsData64;
        img.onload = function() {
            res({t:"clubs", img:img});;
        }
        img.onerror = function(e) {
            rej("could not load img clubs"+e);
        }
    }));
    a.push(new Promise(function(res,rej){
        let img = document.createElement("img");
        img.src = spadesData64;
        img.onload = function() {
            res({t:"spades",img:img});
        }
        img.onerror = function() {
            rej("could not load img clubs");
        }
    }));
    a.push(new Promise(function(res,rej){
        let img = document.createElement("img");
        img.src = diamondsData64;
        img.onload = function() {
            res({t:"diamonds",img:img});
        }
        img.onerror = function() {
            rej("could not load img clubs");
        }
    }));
    a.push(new Promise(function(res,rej){
        let img = document.createElement("img");
        img.src = heartsData64;
        img.onload = function() {
            res({t:"hearts",img:img});
        }
        img.onerror = function() {
            rej("could not load img clubs");
        }
    }));

    return Promise.all(a);
}

function loadMemoryImage(index,rank,suit) {
    let c = document.createElement("canvas");
    let W = c.width;
    let H = c.height;
    let ctx = c.getContext("2d");
    ctx.clearRect(0,0,W,H);
    ctx.font="20px Georgia";
    if ((suit==0)|(suit==1)) {
        ctx.fill = "black";
        roundRect(ctx,0,0,50,70);
    } else if  ((suit==2)||(suit==3)) {
        ctx.fillStyle="red"; // changes font not image
        roundRect(ctx,0,0,50,70);
    } else if (suit==-1) {
        ctx.fillStyle = "blue"; // card back
        roundRect(ctx,0,0,50,70,5,"blue");
    }
    if (rank==BACK) {

    } else {
        ctx.fillText(rank,5,55);
    }
    
    if (suit==-1) {
        // nothing yet
    } else {
        ctx.drawImage(game.allImages[suit].img,10,10);
    }
    let data = c.toDataURL();
    return new Promise(function(res,rej){
        let i = document.createElement("img");
        i.src=data;
        i.onload = function() {
            game.gCardImages[index]=i;
            res(i);
        }
        i.onerror = function() {
            rej("unable to load image");
        }
    });
}

// this will generate all the card images used in the game
// and the card back
// sad blue
function generateCardImages() {
    let c = document.createElement("canvas");
    let W = c.width;
    let H = c.height;
    let ctx = c.getContext("2d");
    let ranks = ["A","2","3","4","5","6","7","8","9",
        "T","J","Q","K"];
    
    // will anyone besides me even look at this source code?
    // do you get the naked eyes references?
    //
    let allOfYourPromises = [];
    let counter = 0;
    for (let j=0;j<4;j++) {
        for(let i=0;i<ranks.length;i++) {
            allOfYourPromises.push(loadMemoryImage(counter,ranks[i],j));
            counter++;
        }
    }
    // hack to get a card back
    allOfYourPromises.push(loadMemoryImage(counter,BACK,BACK));
    return Promise.all(allOfYourPromises);
}
