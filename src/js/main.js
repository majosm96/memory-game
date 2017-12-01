// let countScore;
// let time;
let scoreIncrementer;
let flippedCards;
const score = document.getElementsById('score');


function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
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

function flipBack() {
  flippedCards[0].classList.toggle('flipper-test');
  flippedCards[1].classList.toggle('flipper-test');

  flippedCards = [];
}

function checkMatch() {
  if (flippedCards[0].src === flippedCards[1].src) {
    flippedCards = [];
    const sumScore = scoreIncrementer + scoreIncrementer;
    score.innerText = `0, ${sumScore}!`;
  } else {
    setTimeout(flipBack, 1500);
  }
}

function flip() {
  if (!this.classList.contains('flipper-test') && flippedCards.length < 2) {
    this.classList.toggle('flipper-test');

    flippedCards.push(this);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function createGameBoard() {
  const imgs = document.getElementsByClassName('fruits');
  const fruits = ['img/raspberry.png', 'img/orange.png', 'img/banana.png', 'img/apple.png', 'img/blue_berry.png', 'img/cherry.png', 'img/cherry.png', 'img/banana.png', 'img/grapes.png', 'img/lemon.png', 'img/lemon.png', 'img/raspberry.png', 'img/watermelon.png', 'img/strawberry.png', 'img/watermelon.png', 'img/orange.png', 'img/apple.png', 'img/blue_berry.png', 'img/strawberry.png', 'img/grapes.png'];

  shuffle(fruits);

  Array.from(imgs).forEach((element, index) => {
    element.src = fruits[index];

    if (imgs[index].classList.contains('flipper-test')) {
      imgs[index].classList.toggle('flipped');
    }
    element.src = fruits[index];
    element.addEventListener('click', flip);
  });

  score.innerText = '00';
}

createGameBoard();