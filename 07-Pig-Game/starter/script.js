'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let currentScore, scores, activePLayer, playing;

const init = function () {
  currentScore = 0;
  activePLayer = 0;
  scores = [0, 0];
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  activePLayer = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  diceEl.classList.add('hidden');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePLayer}`).textContent = 0;
  currentScore = 0;
  activePLayer = activePLayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generate random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //check
    if (dice !== 1 && dice !== 6) {
      currentScore += dice;
      document.getElementById(`current--${activePLayer}`).textContent =
        currentScore;
    } else {
      //switch to next plr
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //add currentscore toacplr score
    scores[activePLayer] += currentScore;
    document.getElementById(`score--${activePLayer}`).textContent =
      scores[activePLayer];
    //check score==100?
    if (scores[activePLayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePLayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePLayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', function () {
  init();
});
