let countDown = 0;
let currentScore = 0;
let flippedCards;
let countCards = 0;
let flippedCardsCheckDataId;
let flippedCardsCheck;
let highestScoreValue;
const highestScore = document.getElementById('bestScore');
const score = document.getElementById('score');

function finalize() {
  const restart = document.getElementById('restart');
  restart.addEventListener('click', dealDeck);
  if (countDown === 10) {
    Array.from(flippedCardsCheck).forEach((element) => {
      element.classList.remove('flipped');
    });
  }
}

function dealDeck() {
  const card = document.getElementsByClassName('card');
  const pics = ["url('../img/raspberry.png')", "url('../img/orange.png')", "url('../img/banana.png')", "url('../img/apple.png')", "url('../img/blue_berry.png')", "url('../img/cherry.png')", "url('../img/cherry.png')", "url('../img/banana.png')", "url('../img/grapes.png')", "url('../img/lemon.png')", "url('../img/lemon.png')", "url('../img/raspberry.png')", "url('../img/watermelon.png')", "url('../img/strawberry.png')", "url('../img/watermelon.png')", "url('../img/orange.png')", "url('../img/apple.png')", "url('../img/blue_berry.png')", "url('../img/strawberry.png')", "url('../img/grapes.png')"];

  flippedCards = [];
  flippedCardsCheck = [];
  flippedCardsCheckDataId = [];

  shuffle(pics);

  for (let i = 0; i < card.length; i++) {
    if (card[i].classList.contains('flipped')) {
      card[i].classList.toggle('flipped');
    }
    card[i].querySelector('.back').style.backgroundImage = pics[i];
    card[i].addEventListener('click', flip);

    if (countDown === 10) {
      Array.from(flippedCardsCheck).forEach((element) => {
        card[i].classList.remove('flipped');
        console.log('test', element);
      });
    }
  }

  score.innerText = currentScore;
}

function flip() {
  if (!this.classList.contains('flipped') && flippedCards.length < 2) {

    this.classList.toggle('flipped');
    //Set new data id for check flipped card
    this.setAttribute('data-id', countCards);

    //Push data id for check flipped card
    countCards += 1;
    flippedCards.push(this);
    flippedCardsCheck.push(this);
    flippedCardsCheckDataId.push(this.dataset.id);

    console.error(flippedCardsCheck);
    console.error(flippedCardsCheckDataId);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkFlippedCard() {
  for (let i = 0; i < flippedCardsCheckDataId.length; i++) {
    if (flippedCardsCheckDataId[i] === flippedCardsCheck[0].querySelector('.back').dataset.id || flippedCardsCheckDataId[i] === flippedCardsCheck[1].querySelector('.back').dataset.id) {
      console.log("testing");
      currentScore -= 50;
      score.innerText = currentScore;
    }
  }
}

function checkMatch() {
  if (flippedCards[0].querySelector('.back').style.backgroundImage === flippedCards[1].querySelector('.back').style.backgroundImage) {      
    currentScore += 100;
    score.innerText = currentScore;

    //Hide cards before match
    setTimeout(() => { 
      flippedCards[0].querySelector('.back').style.display = 'none';
      flippedCards[1].querySelector('.back').style.display = 'none';
      flippedCards = [];
    }, 1000);

    countDown += 1;
    console.log(countDown);

  } else {
    checkFlippedCard();
    console.log('testing');
    setTimeout(flipBack, 1500);
  }
}

function flipBack() {
  flippedCards[0].classList.toggle('flipped');
  flippedCards[1].classList.toggle('flipped');

  flippedCards = [];
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
