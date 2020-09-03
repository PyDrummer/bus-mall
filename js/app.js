'use strict';

// Global varibles
var picArray = []; // all my instances will be stored here

// element selectors stored in variables. This is where the pics will go with DOM manipulation.
var picElOne = document.getElementById('image-one');
var picElTwo = document.getElementById('image-two');
var picElThree = document.getElementById('image-three');
var myContainer = document.getElementById('container');
var totalsOfClicks = document.getElementById('totals');
var resetButtonEl = document.getElementById('button');
var picIndexArray = [];

var picsClicked = 0; // tallys each time one of the pics got clicked so I can stop collecting clicks.
var allowedClicks = 26;

function Picture(src, alt) {
  this.viewed = 0;
  this.clicked = 0;
  this.src = src;
  this.alt = alt;
  picArray.push(this);
}

var retrievedPics = localStorage.getItem('savedPics');

if (retrievedPics) {
  picArray = JSON.parse(retrievedPics);
} else {
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
}

// random number generator here:
function randNumb(max) {
  return Math.floor(Math.random() * max);
}

function randPic() {
  while (picIndexArray.length > 3) { // this makes sure 3 indexs are stored
    picIndexArray.pop(); // pop out the last 3 indexes
  }
  while (picIndexArray.length < 6) { // add more indexes till our picIndexArray has 6 indexes
    var picIndex = randNumb(picArray.length);
    while (picIndexArray.includes(picIndex)) {
      picIndex = randNumb(picArray.length);
    }
    picIndexArray.unshift(picIndex); // unshift makes these new indexes be pushed to the front of the array.
  }
}

//render images to the page using randNumb and DOM manipulation
function renderPics() {
  randPic();
  var randPicOne = picArray[picIndexArray[0]]; //grabs a picIndex number from the picArray
  var randPicTwo = picArray[picIndexArray[1]]; // same for 2nd pic
  var randPicThree = picArray[picIndexArray[2]]; // same for 3rd pic

  picElOne.src = randPicOne.src;
  picElTwo.src = randPicTwo.src;
  picElThree.src = randPicThree.src;

  picElOne.alt = randPicOne.alt;
  picElTwo.alt = randPicTwo.alt;
  picElThree.alt = randPicThree.alt;

  randPicOne.viewed++;
  randPicTwo.viewed++;
  randPicThree.viewed++;
}

function eventHandler(e) {
  if (e.target === myContainer) { // if the user clicks the container, not the image then it will alert them.
    alert('click on an image please!');
  } else {
    picsClicked++;

    for (var j = 0; j < picArray.length; j++) {
      if (picArray[j].alt === e.target.alt) {
        picArray[j].clicked++;
      }
    }
    renderPics();

    if (picsClicked === allowedClicks) {
      myContainer.removeEventListener('click', eventHandler); // removing the event listener because allowed clicks amount is met

      renderList(); // DOM manipulation to show how many times the pics were viewed and clicked
      renderChart(); // Now that clicks are done we can render the chart
      addToLocalStorage(); // Save our data to the localStorage
      createResetButton(); // Reset all the data stored in localStorage
    }
  }
}

function renderList(){
  // Show the user the totals of all the clicks of the different instances. Use the DOM to show this data. Append to totalsOfClicks
  for (var i = 0; i < picArray.length; i++) {
    var picClickedAmount = document.createElement('p');
    picClickedAmount.textContent = `${picArray[i].alt}, clicked ${picArray[i].clicked} times, viewed ${picArray[i].viewed} times.`;
    totalsOfClicks.append(picClickedAmount);
  }
}

function addToLocalStorage() {
  var stringifyPicArray = JSON.stringify(picArray);
  //set into local storage with key value pair 'savedPics' and stringifyPicArray
  localStorage.setItem('savedPics', stringifyPicArray);
}

function createResetButton() {
  resetButtonEl.textContent = 'Click to Reset';
  resetButtonEl.addEventListener('click', resetHandler);
}

function resetHandler(e) {
  console.log(e.target, resetButtonEl);
  if (e.target === resetButtonEl) {
    alert('You\'ve Reset The Chart Data!');
    localStorage.clear();
    location.reload();
  }else {
    alert('didn\'t work');
  }
}

// function to render the chart

function renderChart() {
  // Storing array data from my for loop
  var picNames = [];
  var clicksData = [];
  var viewsData = [];

  for (var i = 0; i < picArray.length; i++) {
    picNames.push(picArray[i].alt);
    //console.log(`Pic names array ${picNames}`);
    clicksData.push(picArray[i].clicked);
    viewsData.push(picArray[i].viewed);
  }
  // Adding chart.js https://cdn.jsdelivr.net/npm/chart.js@2.9.3 information here
  var chartData = {
    type: 'bar',
    data: {
      labels: picNames, // change this to names of the pic array
      datasets: [{
        label: '# of Clicks',
        data: clicksData, // change this to the clicks
        backgroundColor: '#97BC62FF',
        hoverBackgroundColor: '#2C5F2D',
        borderColor: '#101820FF',
        borderWidth: 1
      }, {
        label: '# of Views',
        data: viewsData, // change this to the views
        backgroundColor: '#F2AA4CFF',
        hoverBackgroundColor: '#F93822FF',
        borderColor: '#101820FF',
        borderWidth: 1
      }]
    },
    options: {
      responsive: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, chartData); // chart is part of the CDN, eslinter doesnt like it
}

renderPics(); // render the 3 images when the page loads up

myContainer.addEventListener('click', eventHandler); // reduced the amount of event listeners to just one
// picElTwo.addEventListener('click', eventHandler);
// picElThree.addEventListener('click', eventHandler);
