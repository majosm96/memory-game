const game = (() => {
  let countDown = 0;
  let currentScore = 0;
  let flippedCards;
  let highScore = 0;
  let countCards = 0;
  let flippedCardsCheckDataId;
  let flippedCardsCheck;
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
  function upDateScore() {
    localStorage.setItem('highScore', highScore);
    const highestScoreDom = document.getElementById('best');
    console.log(highestScoreDom);

    if (currentScore > highScore) {
      highScore = currentScore;
    }
    highestScoreDom.innerText = highScore;

    return highScore;
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
      // Set new data id for check flipped card
      this.setAttribute('data-id', countCards);

      // Push data id for check flipped card
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
    upDateScore();
  }

  function checkFlippedCard() {
    for (let i = 0; i < flippedCardsCheck.length; i++) {
      if (flippedCardsCheck[i].querySelector('.back').style.backgroundImage === flippedCards[0].querySelector('.back').style.backgroundImage || flippedCardsCheck[i].querySelector('.back').style.backgroundImage === flippedCards[1].querySelector('.back').style.backgroundImage) {
        console.log('testing');
        currentScore -= (currentScore === 0) ? 0 : 50;
        score.innerText = currentScore;

        return currentScore;
      }
    }
  }
  function flipBack() {
    flippedCards[0].classList.toggle('flipped');
    flippedCards[1].classList.toggle('flipped');
    flippedCards = [];
  }
  function checkMatch() {
    if (flippedCards[0].querySelector('.back').style.backgroundImage === flippedCards[1].querySelector('.back').style.backgroundImage) {
      currentScore += 100;
      score.innerText = currentScore;
      console.log(flippedCardsCheck[0].querySelector('.back').dataset.id);
      // Hide cards before match
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

  function sw() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then((registration) => {
          console.log('SW registered: ', registration);
          registration.pushManager.subscribe({ userVisibleOnly: true });
        }).catch((registrationError) => {
          console.log('SW registered: ', registrationError);
        });
      });
    }
  }

  function init() {
    dealDeck();
    sw();
    finalize();
  }

  return { init };
})();

game.init();
