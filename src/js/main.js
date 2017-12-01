var fruits = [
  "img/raspberry.png",
  "img/orange.png",
  "img/banana.png",
  "img/apple.png",
  "img/blue_berry.png",
  "img/cherry.png",
  "img/cherry.png",
  "img/banana.png",
  "img/grapes.png",
  "img/lemon.png",
  "img/lemon.png",
  "img/raspberry.png",
  "img/watermelon.png",
  "img/strawberry.png",
  "img/watermelon.png",
  "img/orange.png",
  "img/apple.png",
  "img/blue_berry.png",
  "img/strawberry.png",
  "img/grapes.png"
];

var imgs = document.getElementsByClassName("fruits");
console.log(imgs);

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var newFruits = shuffle(fruits);

Array.from(imgs).forEach(function(element, index) {
  element.src = newFruits[index];
});
