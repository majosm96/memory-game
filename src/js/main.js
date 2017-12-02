"use strict";
(function() {
  var countDown;
  var timeLoss;
  var scoreIncrementer;
  var currentScore = 0;
  var flippedCards;
  var highestScore;
  var score = document.getElementsByClassName("score")[0];
  var timer = document.getElementsByClassName("timer")[0];
  var endGame = document.getElementsByClassName("game-over")[0];

  function dealDeck() {
    var card = document.getElementsByClassName("card");
    var pics = ["url('../img/raspberry.png')", "url('../img/orange.png')", "url('../img/banana.png')", "url('../img/apple.png')", "url('../img/blue_berry.png')", "url('../img/cherry.png')", "url('../img/cherry.png')", "url('../img/banana.png')", "url('../img/grapes.png')", "url('../img/lemon.png')", "url('../img/lemon.png')", "url('../img/raspberry.png')", "url('../img/watermelon.png')", "url('../img/strawberry.png')", "url('../img/watermelon.png')", "url('../img/orange.png')", "url('../img/apple.png')", "url('../img/blue_berry.png')", "url('../img/strawberry.png')", "url('../img/grapes.png')"];

    scoreIncrementer = 0;
    flippedCards = [];

    endGame.style.display = "none";

    shuffle(pics);

    for (var i = 0; i < card.length; i++) {
      if (card[i].classList.contains("flipped")) {
        card[i].classList.toggle("flipped");
      }
      card[i].querySelector(".back").style.backgroundImage = pics[i];
      card[i].addEventListener("click", flip);
    }

    score.innerText = currentScore;
  }

  function flip() {
    if (!this.classList.contains("flipped") && flippedCards.length < 2) {
      this.classList.toggle("flipped");

      flippedCards.push(this);

      if (flippedCards.length === 2) {
        checkMatch();
      }
    }
  }

  function checkMatch() {
    if (
      flippedCards[0].querySelector(".back").style.backgroundImage ===
      flippedCards[1].querySelector(".back").style.backgroundImage
    ) {
      flippedCards = [];
      flippedCards[0].querySelector(".back").style.display= 'none';
      flippedCards[1].querySelector(".back").style.display = 'none';
      currentScore = currentScore + 100;
      score.innerText = currentScore;

    } else {
      currentScore = currentScore - 50;
      score.innerText = currentScore;
      setTimeout(flipBack, 1500);
    }
  }

  function flipBack() {
    flippedCards[0].classList.toggle("flipped");
    flippedCards[1].classList.toggle("flipped");

    flippedCards = [];
  }

  function finalize() {
    var restart = document.getElementsByTagName("button")[0];
    restart.addEventListener("click", dealDeck);

    endGame.style.display = "flex";

    if (scoreIncrementer === 8) {
      endGame.querySelector("h1").innerText = "you win";
    } else {
      endGame.querySelector("h1").innerText = "you lose";
    }
    endGame.querySelector(".final-score").innerText =
      "score: " + scoreIncrementer;
  }

  function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  dealDeck();
})();
