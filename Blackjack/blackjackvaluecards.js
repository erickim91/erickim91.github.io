jQuery(function() {

  function setDeck() {
    deckCount = parseInt(prompt("How many decks would you like to use? (recommended 1~8)"));

    singleDeck = ['KC','AC','2C','3C','4C','5C','6C','7C','8C','9C','10C', 'JC','QC','KH','AH','2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KD','AD','2D','3D','4D','5D','6D','7D','8D','9D','10D','JD','QD','KS','AS','2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS'];

    repDeck = [];
    masterDeck = [];

    for(var i = 0; i < (52 * deckCount); i++){
      masterDeck.push(i);
    }

    for(k = 0; k < deckCount; k ++) {
        for(j = 0; j < singleDeck.length; j ++) {
            repDeck.push(singleDeck[j]);
        }
    }
  }

setDeck();


//THIS IS ALL JQUERY:

var dealButton = $("#cardBack");

dealButton.on("click", setDeck());











//JQUERY ENDS HERE

var deckCount, singleDeck, repDeck, masterDeck;
//declare variables and set deck

function setDeck() {
  deckCount = parseInt(prompt("How many decks would you like to use? (recommended 1~8)"));

  singleDeck = ['KC','AC','2C','3C','4C','5C','6C','7C','8C','9C','10C', 'JC','QC','KH','AH','2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KD','AD','2D','3D','4D','5D','6D','7D','8D','9D','10D','JD','QD','KS','AS','2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS'];

  repDeck = [];
  masterDeck = [];

  for(var i = 0; i < (52 * deckCount); i++){
    masterDeck.push(i);
  }

  for(k = 0; k < deckCount; k ++) {
      for(j = 0; j < singleDeck.length; j ++) {
          repDeck.push(singleDeck[j]);
      }
  }
}
//masterdeck is now set.

//dealing begins
var playerHand = [];
var playerScore;
var dealerHand = [];
var dealerScore;

var chosenIndex, chosenValue;
var pRepDeck1, pRepDeck2, dRepDeck1, dRepDeck2;

//dealCards function will invoke cards in player,dealer,player,dealer order

function dealCards() {

playerHand = [];
dealerHand = [];
pRepDeck = [];
dRepDeck = [];

chosenIndex = Math.floor(Math.random() * masterDeck.length);
playerHand.push(masterDeck[chosenIndex]);
masterDeck.splice(chosenIndex, 1);
pRepDeck.push(repDeck[chosenIndex]);
repDeck.splice(chosenIndex, 1);

chosenIndex = Math.floor(Math.random() * masterDeck.length);
dealerHand.push(masterDeck[chosenIndex]);
masterDeck.splice(chosenIndex, 1);
dRepDeck.push(repDeck[chosenIndex]);
repDeck.splice(chosenIndex, 1);

chosenIndex = Math.floor(Math.random() * masterDeck.length);
playerHand.push(masterDeck[chosenIndex]);
masterDeck.splice(chosenIndex, 1);
pRepDeck.push(repDeck[chosenIndex]);
repDeck.splice(chosenIndex, 1);

chosenIndex = Math.floor(Math.random() * masterDeck.length);
dealerHand.push(masterDeck[chosenIndex]);
masterDeck.splice(chosenIndex, 1);
dRepDeck.push(repDeck[chosenIndex]);
repDeck.splice(chosenIndex, 1);

alert("your cards: " + pRepDeck);
alert("dealer's cards: " + dRepDeck);

//Cards have been dealt, calculating score from now

var playerCard1, playerCard2, dealerCard1, dealerCard2;
var simpleV1, suitV1, numV1;
var simpleV2, suitV2, numV2;
var simpleV3, suitV3, numV3;
var simpleV4, suitV4, numV4;

  simpleV1 = playerHand[0] % 52;
  suitV1 = Math.floor(simpleV1);
  numV1 = simpleV1 % 13;
    if (numV1 == 0 || numV1 == 11 || numV1 == 12) {
      playerCard1 = 10;
    }
    else if (numV1 == 1) {
      playerCard1 = 11;
    }
    else {
      playerCard1 = numV1;
    }

  simpleV2 = playerHand[1] % 52;
  suitV2 = Math.floor(simpleV2);
  numV2 = simpleV2 % 13;
    if (numV2 == 0 || numV2 == 11 || numV2 == 12) {
      playerCard2 = 10;
    }
    else if (numV2 == 1 && playerCard1 !== 11) {
      playerCard2 = 11;
    }
    else {
      playerCard2 = numV2;
    }

    simpleV3 = dealerHand[0] % 52;
    suitV3 = Math.floor(simpleV3);
    numV3 = simpleV3 % 13;
    if (numV3 == 0 || numV3 == 11 || numV3 == 12) {
      dealerCard1 = 10;
    }
    else if (numV3 == 1) {
      dealerCard1 = 11;
    }
    else {
      dealerCard1 = numV3;
    }

    simpleV4 = dealerHand[1] % 52;
    suitV4 = Math.floor(simpleV4);
    numV4 = simpleV4 % 13;
    if (numV4 == 0 || numV4 == 11 || numV4 == 12) {
      dealerCard2 = 10;
    }
    else if (numV4 == 1 && dealerCard1 !== 11) {
      dealerCard2 = 11;
    }
    else {
      dealerCard2 = numV4;
    }

    playerScore = playerCard1 + playerCard2
    dealerScore = dealerCard1 + dealerCard2

    alert("Your score: " + playerScore);
    alert("Dealer's score: " + dealerScore);

    if (playerScore == 21) {
      alert("Blackjack. You win!");
      wannaPlayAgain();
    }
    if (dealerScore == 21) {
      alert("Dealer hit Blackjack. Dealer Wins.");
      wannaPlayAgain();
    }

};

//default deal + score calculation complete

//fitMe function will draw another card for the player

function hitMe() {

  chosenIndex = Math.floor(Math.random() * masterDeck.length);
  playerHand.push(masterDeck[chosenIndex]);
  masterDeck.splice(chosenIndex, 1);
  pRepDeck.push(repDeck[chosenIndex]);
  repDeck.splice(chosenIndex, 1);

  alert("your cards: " + pRepDeck);

//additional deal is complete, calculating score again

  for(dl = (playerHand.length - 1); dl < playerHand.length; dl ++){
    var additionalCard = ((playerHand[playerHand.length - 1]) % 52);
    var additionalNum = additionalCard % 13;
    if (additionalNum == 0 || additionalNum == 11 || additionalNum == 12) {
      var newPlayerCard = 10;
    }
    else if (additionalNum == 1 && playerScore < 11) {
      newPlayerCard = 11;
    }
    else {
      var newPlayerCard = additionalNum;
    }

    playerScore = playerScore + newPlayerCard;
  }

  alert("Your score: " + playerScore);
  alert("Dealer's score: " + dealerScore);

//score calculation complete

//choosing outcome:

  // if(playerScore > 21 && *********hasanace********) {
  //   alert("bust");
  //   wannaPlayAgain();
  // }
  if (playerScore > 21) {
    alert("bust");
    wannaPlayAgain();
  }
  else if(playerScore == 21) {
    alert("Blackjack!")
    wannaPlayAgain();
  }

};

//stand function declares the person as standing, passes turn to dealer and chooses outcome

function stand() {
  alert("it is now the dealer's turn");
  if(dealerScore < 17) {
    alert("Dealer's hand is low, dealer will hit to 17");
    hitDealer();
  }
  else if(dealerScore >= 17 && dealerScore < 21){
    alert("Dealer stands");
    alert("Your Score: " + playerScore + ". Dealer's Score: " + dealerScore + ".")
    if(dealerScore > playerScore) {
      alert("Dealer Wins");
      wannaPlayAgain();
    }
    else if (dealerScore == playerScore) {
      alert("push");
      wannaPlayAgain();
    }
    else {
      alert("You Win!");
      wannaPlayAgain();
    }
  }
  else if(dealerScore === 21) {
    alert("Dealer hit blackjack. Dealer wins")
    wannaPlayAgain();
  }
  else if(dealerScore > 21){
    alert("Dealer Busts. You win!")
    wannaPlayAgain();
  }
}

//hitDealer function draws a card for dealer and calculates value

function hitDealer() {
  chosenIndex = Math.floor(Math.random() * masterDeck.length);
  dealerHand.push(masterDeck[chosenIndex]);
  masterDeck.splice(chosenIndex, 1);
  dRepDeck.push(repDeck[chosenIndex]);
  repDeck.splice(chosenIndex, 1);

  alert("dealer's cards: " + dRepDeck);

//draw complete, now calculating score

  for(ddl = (dealerHand.length - 1); ddl < dealerHand.length; ddl ++){
    var additionalCard = ((dealerHand[dealerHand.length - 1]) % 52);
    var additionalNum = additionalCard % 13;
    if (additionalNum == 0 || additionalNum == 11 || additionalNum == 12) {
      var newDealerCard = 10;
    }
    else if (additionalNum == 1 && dealerScore < 11) {
      newDealerCard = 11;
    }
    else {
      var newDealerCard = additionalNum;
    }

    dealerScore = dealerScore + newDealerCard;

  }
  alert("Your score: " + playerScore);
  alert("Dealer's score: " + dealerScore);
  stand();
}

//wannaPlayAgain function is invoked on its own, ask's player to confirm for another game

function wannaPlayAgain() {
  var playAgain = prompt("Do you want to play again? [y/n]");
  if (playAgain == 'y') {
    dealCards();
  }
  else {
    alert("Good Game!");
  }
}

});
