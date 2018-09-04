
# js13k 2018 entry

Yup a card game. Playing cards is offline? That is my interpretation.

So this is a simplified (maybe) version of Pyramid software.

I only tested on new Firefox and new Chrome. Older browsers will have trouble I am using template strings and newer classes and not pre-compiling it.

I think there is a larger game lurking in here. I think you could have a larger meta game of building or collecting and push this type of game much further. It would be solidly in the super casual arena but it should work.

My zip was almost 9k so I had room to spare to add more things. Just figured I was going to run out of time... which at that point I began removing grand ideas and just marched towards the finish.

## how to run it on your own machine
You should be able to just clone the repo then run a web server like thing in the main directory. I end up using python -m http.server or caddy.

The index file will pull everything in as it should.

## build instructions if you are in to that type of thing ...
If you want to build the final zip file you will need to work on the build.py a bit to match your paths I think.

Just run python build.py and that will make a build directory with everything in it.

Dependencies
- python https://python.org
- closure compiler https://developers.google.com/closure/compiler/


# lessons and notes

## svg stuff
svg image stuff here: https://css-tricks.com/lodge/svg/09-svg-data-uris/

I saved space by not including images. I have 4 svg files that are inlined in the soure code as base64 blobs (see firefox below for why base64).

The SVG files in themselves are not useful in canvas without adding more toolkits. So you have to take the SVG files and make DOM images out of them. At this point you can use the image in an HTML canvas.

This will show up in Chrome as images that come from memory cache if you watch the network traffic in developer tools.

## closure
I ended up using google closure to compress everything. I am certain there are already tools that do everything but I wrote a build script in Python that concats the files together and runs closure on it.

## javascript stuff
% is a remainder operator?
Not what I expected. This was not a big deal but it ended up being a bug that took me a bit to trace down. It showed up as cards that could not be pulled off the board that spanned where a mod would work... and remainder does not. Ha.

Javascript promises are odd to me but I fumbled my way through it for image loading.

Sadly I figured out that the browsers can use the newer syntax for class and so there are some classes defined with prototypes and others with class.

## small game development
Feel like I am rewriting phaser...
The way I ended up dealing with states looks and feels a lot like phaser states.
That is probably because of what I am used to dealing with. Is this bad? Probably not Phaser is a great toolkit.

If I end up writing another one of these I would steal my image loading and the stuff in tinygame.js.

My use of jsfxr was gratuitous at best. I ended up not wanting to hear the lose sound though at the end of levels so maybe it works ok. I really just wanted some experience putting sounds into a game.

I intended to do a classic solitaire animation ending (aka windows solitaire) but I ended up going with just a static screen instead.

## firefox (sigh)
Error messages in FF leave a lot to be desired.

- When I missed adding a super to a class. FF just quit working with an odd unrelated message. Had to switch to Chrome to get a real error message.
- Images would not load in FF the way I originally did it. I had the SVG directly inline in the source with a data URI. There was something in that URI that made FF unhappy. But I did not take time to figure out what it was. I felt like I could have encoded with % notation and fixed it. In the end it was easier and worked in Chrome and Firefox to instead base64 encode the SVG. It took up more space :( but it worked across both browsers.

## designing levels
I did this by hand until I figured out a spreadsheet would work better.

```
HARD
        01
      02  03
    04  05  06
  07  08  09 10
11  12  13  14 15
  16  17  18  19
    20  21  22
       23 24
         25

   01  02  03  04  05  06
     07  08  09  10  11  12
   13  14  15  16  17  18  19
     20  21  22  23  24
           25  26 
```

## other game dev stuff
This is because I have no clue what I am doing.
- clicks do not work unless the game is at the top left aka not scrolled
that must change the numbers on clientX/clientY on the
mouse event?

