let countDown = 0;
let currentScore = 0;
let flippedCards;
let flippedCardsCheck;
const highestScore = document.getElementById('bestScore');
const score = document.getElementById('score');

function dealDeck() {
  const card = document.getElementsByClassName('card');
  const pics = ["url('../img/raspberry.png')", "url('../img/orange.png')", "url('../img/banana.png')", "url('../img/apple.png')", "url('../img/blue_berry.png')", "url('../img/cherry.png')", "url('../img/cherry.png')", "url('../img/banana.png')", "url('../img/grapes.png')", "url('../img/lemon.png')", "url('../img/lemon.png')", "url('../img/raspberry.png')", "url('../img/watermelon.png')", "url('../img/strawberry.png')", "url('../img/watermelon.png')", "url('../img/orange.png')", "url('../img/apple.png')", "url('../img/blue_berry.png')", "url('../img/strawberry.png')", "url('../img/grapes.png')"];

  flippedCards = [];
  flippedCardsCheck = [];

  shuffle(pics);

  for (let i = 0; i < card.length; i++) {
    if (card[i].classList.contains('flipped')) {
      card[i].classList.toggle('flipped');
    }
    card[i].querySelector('.back').style.backgroundImage = pics[i];
    card[i].addEventListener('click', flip);
  }

  score.innerText = currentScore;

  finalize();
}

function flip() {
  if (!this.classList.contains('flipped') && flippedCards.length < 2) {
    this.classList.toggle('flipped');

    flippedCards.push(this);
    flippedCardsCheck.push(this);

    console.log(flippedCardsCheck);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkFlippedCard() {
  Array.from(flippedCards).forEach((element, index) => {  
    if (flippedCards[index].querySelector('.back').style.backgroundImage === element.querySelector('.back').style.backgroundImage) {
      score.innerText = currentScore;
      currentScore -= 50;
    }
  });
}

function checkMatch() {
  if (flippedCards[0].querySelector('.back').style.backgroundImage === flippedCards[1].querySelector('.back').style.backgroundImage) {      
    currentScore += 100;
    score.innerText = currentScore;
    countDown = 1;

    setTimeout(() => { 
      flippedCards[0].querySelector('.back').style.display = 'none';
      flippedCards[1].querySelector('.back').style.display = 'none';
      flippedCards = [];
    }, 1000);
  } else {
    checkFlippedCard();
    setTimeout(flipBack, 1500);
  }
}

function flipBack() {
  flippedCards[0].classList.toggle('flipped');
  flippedCards[1].classList.toggle('flipped');

  flippedCards = [];
}

function finalize() {
  const restart = document.getElementById('restart');
  restart.addEventListener('click', dealDeck);
  if (countDown > 9) {
    dealDeck();
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

dealDeck();
