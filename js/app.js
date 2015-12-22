// create empty array to hold kitten objects
var kittensArr = [];
// generate kitten objects with reference to photos
for (var i = 1; i <= 13; i++) {
  var kitten = {
    id: i,
    imgUrl: './images/cat' + i + '.jpg',
    votes: 0
  };
  // push the newly created kitten object into the main array
  kittensArr.push(kitten);
}
//=====================================================================


// function that returns an array of two random
// kittens from the main kittensArr array
function getRandomKittens() {
  // variables to store our two random numbers
  var a, b;
  // random number generator abstraced into a function (mostly
  // so our code looks tidy and has less repetition)
  function rand() { return Math.floor(Math.random() * kittensArr.length); }

  a = rand();
  // do-while loop ensures that we get two different random numbers.
  // it will call 'rand' again if the numbers are ever the same
  do {
    b = rand();
  } while (a === b);

  // return array referencing two random kittens from kittenArr
  return [ kittensArr[a], kittensArr[b] ];
}

function createKittenImg(kitten) {
  // create a new img element for the DOM
  var imgEl = document.createElement('img');

  imgEl.src = kitten.imgUrl;
  // set a data-attribute with the specific kitten object's ID. we will
  // need it later to look it up in the array and increase it's points
  imgEl.setAttribute('data-id', kitten.id);

  imgEl.addEventListener('click', function () {
    // 'getKittensObj' will find the kitten object corresponding
    //  to the clicked on picture and return it
    var kitten = getKittenObj(this.dataset.id);
    // increment the clicked kitten's vote count by 1
    kitten.votes++;

    console.log("Kitten " + kitten.id + " has " + kitten.votes + " votes!");
  });

  return imgEl;
}

function addKittenToPage(kitten) {
  document.getElementById('kitten-container').appendChild(kitten);
}

function getKittenObj(id) {
  // loops through kittensArr to find the id of the clicked-on kitten,
  // increments that kitten's vote count by 1
  for (var i = 0; i < kittensArr.length; i++) {
    if (kittensArr[i].id == id) {
      // when found, return kitten object and exit the function
      return kittensArr[i];
    }
  }
}

// we can now use the functions we created to write some nice tidy code :D
//    (NOTE: forEach and map are 'higher order functions', which we
//     haven't covered yet. they are very useful in reducing the amount
//     of manual looping code we normally would have to write)
function renderKittens() {
  // clears out the current kitten images on the page, otherwise
  // we'd be adding more every time this function is called
  document.getElementById('kitten-container').innerHTML = "";
  getRandomKittens().map(createKittenImg).forEach(addKittenToPage);
}

// assign an event listener to the button on our page to load
// a fresh pair of kittens every time it is clicked
document.getElementById('load-kittens').addEventListener('click', renderKittens);

// 'init' type function that will load the first set of kittens on the page
renderKittens();
