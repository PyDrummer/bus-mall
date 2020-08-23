'use strict';

// Global varibles
var picArray = []; // all my instances will be stored here

// element selectors stored in variables. This is where the pics will go with DOM manipulation.
var picElOne = document.getElementById('image-one');
var picElTwo = document.getElementById('image-two');
var picElThree = document.getElementById('image-three');
var myContainer = document.getElementById('container');
var totalsOfClicks = document.getElementById('totals');

var picsClicked = 0; // tallys each time one of the pics got clicked so I can stop collecting clicks.
var allowedClicks = 15;

function Picture(src, alt) {
  this.viewed = 0;
  this.clicked = 0;
  this.src = src;
  this.alt = alt;
  picArray.push(this);
}

new Picture('./img/bag.jpg', 'bag');
new Picture('./img/banana.jpg', 'banana');
new Picture('./img/bathroom.jpg', 'bathroom');
new Picture('./img/boots.jpg', 'boots');
new Picture('./img/breakfast.jpg', 'breakfast');
new Picture('./img/bubblegum.jpg', 'bubblegum');
new Picture('./img/chair.jpg', 'chair');
new Picture('./img/cthulhu.jpg', 'cthulhu');
new Picture('./img/dog-duck.jpg', 'dog-duck');
new Picture('./img/dragon.jpg', 'dragon');
new Picture('./img/pen.jpg', 'pen');
new Picture('./img/pet-sweep.jpg', 'pet-sweep');
new Picture('./img/scissors.jpg', 'scissors');
new Picture('./img/shark.jpg', 'shark');
new Picture('./img/sweep.png', 'sweep');
new Picture('./img/tauntaun.jpg', 'tauntaun');
new Picture('./img/unicorn.jpg', 'unicorn');
new Picture('./img/usb.gif', 'usb');
new Picture('./img/water-can.jpg', 'water-can');
new Picture('./img/wine-glass.jpg', 'wine-glass');

// random number generator here:
function randNumb(max) {
  return Math.floor(Math.random() * max);
}

//render images to the page using randNumb and DOM manipulation
function renderPics() {
  var randPicOne = picArray[randNumb(picArray.length)]; //grabs a random instance from the pic array
  var randPicTwo = picArray[randNumb(picArray.length)]; // same for 2nd pic
  var randPicThree = picArray[randNumb(picArray.length)]; // same for 3rd pic

  while (randPicOne === randPicTwo || randPicOne === randPicThree || randPicTwo === randPicThree) {
    randPicOne = picArray[randNumb(picArray.length)];
    randPicTwo = picArray[randNumb(picArray.length)];
    randPicThree = picArray[randNumb(picArray.length)];
  }

  picElOne.src = randPicOne.src;
  picElTwo.src = randPicTwo.src;
  picElThree.src = randPicThree.src;

  picElOne.alt = randPicOne.alt;
  picElTwo.alt = randPicTwo.alt;
  picElThree.alt = randPicThree.alt;


  randPicOne.viewed++;
  randPicTwo.viewed++;
  randPicThree.viewed++;
  console.log(picArray);
}

function eventHandler(e) {
  if (e.target === myContainer) { // if the user clicks the container, not the image then it will alert them.
    alert('click on the image please!');
  } else {
    picsClicked++;
    if (picsClicked === allowedClicks) {
      myContainer.removeEventListener('click', eventHandler); // reduced the amount of event listeners to just one
      // We want to show the user the totals of all the clicks of the different instances. Use the DOM to show this data. Append to totalsOfClicks
      for (var i = 0; i < picArray.length; i++) {
        var picClickedAmount = document.createElement('p');
        picClickedAmount.textContent = `${picArray[i].alt}, clicked ${picArray[i].clicked} times, viewed ${picArray[i].viewed} times.`;
        totalsOfClicks.append(picClickedAmount);
      }
    }
    for (var j = 0; j < picArray.length; j++) {
      if (picArray[j].alt === e.target.alt) {
        picArray[j].clicked++;
      }
    }
    renderPics();
  }
}

myContainer.addEventListener('click', eventHandler); // reduced the amount of event listeners to just one
// picElTwo.addEventListener('click', eventHandler);
// picElThree.addEventListener('click', eventHandler);

renderPics(); // render the 3 images when the page loads up

