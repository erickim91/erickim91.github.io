jQuery(function() {

var deckCount, singleDeck, repDeck, masterDeck;

var playerHand = [];
var playerScore;
var dealerHand = [];
var dealerScore;

var chosenIndex, chosenValue;
var pRepDeck1, pRepDeck2, dRepDeck1, dRepDeck2;

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
var hitMeButton = $("#hitMe");
var standButton = $("#stand");
var dealerScoreDisplay = $("#dealerScore");
var playerScoreDisplay = $("#playerScore");
var anywhere = $("body");

dealButton.on("click", function dealCards() {

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

      $('.playerValueCounter').empty().append(playerScore);
      $('.dealerValueCounter').empty().append(dealerScore);


      if (playerScore == 21) {
        alert("Blackjack. You win!");
        wannaPlayAgain();
      }
      if (dealerScore == 21) {
        alert("Dealer hit Blackjack. Dealer Wins.");
        wannaPlayAgain();
      }

});



hitMeButton.on("click", function hitMe() {

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

  $('.playerValueCounter').text(playerScore);
  $('.dealerValueCounter').text(dealerScore);

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

});

standButton.on("click", function stand() {

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
});







//JQUERY ENDS HERE

//declare variables and set deck


//masterdeck is now set.

//dealing begins

//dealCards function will invoke cards in player,dealer,player,dealer order


//default deal + score calculation complete

//fitMe function will draw another card for the player


//stand function declares the person as standing, passes turn to dealer and chooses outcome

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
  $('.playerValueCounter').text(playerScore);
  $('.dealerValueCounter').text(dealerScore);
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


//createCard credits to Mohammed:

function createCard(suit, value) {
      var hearts = $('<path d="M151.299,93.486 C149.846,87.955 147.772,82.763 145.077,77.912 C142.381,73.06 137.167,65.525 129.432,55.306 C123.76,47.806 120.268,43.049 118.956,41.033 C116.799,37.752 115.241,34.74 114.28,31.998 C113.319,29.256 112.838,26.478 112.838,23.666 C112.838,18.463 114.573,14.103 118.042,10.588 C121.51,7.072 125.799,5.314 130.909,5.314 C136.065,5.314 140.542,7.142 144.338,10.799 C147.198,13.517 149.518,17.572 151.299,22.963 C152.846,17.666 155.026,13.635 157.838,10.869 C161.729,7.119 166.229,5.244 171.338,5.244 C176.401,5.244 180.69,6.99 184.206,10.482 C187.721,13.974 189.479,18.135 189.479,22.963 C189.479,27.182 188.448,31.576 186.385,36.146 C184.323,40.717 180.338,46.705 174.432,54.111 C166.745,63.814 161.143,71.783 157.628,78.017 C154.862,82.939 152.753,88.096 151.299,93.486 L151.299,93.486 z" fill="#D40000  " class="heart"/>');
     var diamonds = $('<path d="M39.419,107.322 C29.928,122.904 19.033,137.607 7.076,151.385 C19.044,165.157 30.124,179.822 39.419,195.541 C48.715,179.822 59.794,165.157 71.763,151.385 C59.806,137.607 48.911,122.904 39.419,107.322 z" fill="#D40000 " class="diamond"/>');
     var clubs = $('<path d="M151.143,108.151 C145.612,108.151 140.979,110.01 137.206,113.713 C133.432,117.416 131.549,121.823 131.549,126.932 C131.549,131.104 133.159,135.463 136.393,140.057 C133.591,137.722 130.798,136.338 125.487,136.338 C115.096,136.338 107.643,144.868 107.643,155.526 C107.643,166.827 115.891,175.432 126.893,175.432 C137.909,175.432 146.175,167.918 150.237,158.776 C150.049,166.229 148.917,172.127 146.831,176.463 C144.745,180.799 141.549,184.385 137.237,187.244 C134.331,189.166 129.096,190.854 121.549,192.307 L120.987,194.713 L151.143,194.713 L181.331,194.713 L180.768,192.307 C173.221,190.854 167.987,189.166 165.081,187.244 C160.768,184.385 157.573,180.799 155.487,176.463 C153.401,172.127 152.268,166.229 152.081,158.776 C156.143,167.918 164.409,175.432 175.424,175.432 C186.427,175.432 194.674,166.827 194.674,155.526 C194.674,144.868 187.222,136.338 176.831,136.338 C171.52,136.338 168.726,137.722 165.924,140.057 C169.159,135.463 170.768,131.104 170.768,126.932 C170.768,121.823 168.885,117.416 165.112,113.713 C161.338,110.01 156.674,108.151 151.143,108.151 z" fill="#000000  " class="club"/>');
     var spades = $('<path d="M39.419,4.459 C38.201,9.521 36.326,14.068 33.794,18.053 C31.263,22.037 26.755,26.951 20.263,32.834 C13.771,38.717 9.654,43.224 7.919,46.365 C6.185,49.506 5.326,52.693 5.326,55.928 C5.326,60.428 6.826,64.178 9.826,67.178 C12.826,70.178 16.482,71.678 20.794,71.678 C28.514,71.678 34.485,66.041 38.419,59.896 C38.12,66.615 37.013,71.993 35.076,76.021 C32.99,80.357 29.796,83.945 25.482,86.803 C22.577,88.726 17.341,90.412 9.794,91.865 L9.232,94.271 L39.388,94.271 L69.576,94.271 L69.013,91.865 C61.466,90.412 56.23,88.726 53.326,86.803 C49.012,83.945 45.818,80.357 43.732,76.021 C41.797,71.999 40.689,66.632 40.388,59.928 C44.322,66.063 50.334,71.678 58.044,71.678 C62.357,71.678 66.013,70.178 69.013,67.178 C72.013,64.178 73.513,60.428 73.513,55.928 C73.513,52.693 72.654,49.506 70.919,46.365 C69.185,43.224 65.068,38.717 58.576,32.834 C52.083,26.951 47.576,22.037 45.044,18.053 C42.513,14.068 40.638,9.521 39.419,4.459 z" fill="#000000  " class="spade"/>');
      if (value === 11){
        value = "J";
      } else if (value === 12){
        value = "Q";
      } else if (value === 13){
        value = "K";
      } else if (value === 1){
        value = "A";
      }
      var card = $('<div class="card-frame" width="80" height="100"></div>');
      var svg = $('<svg width="150" height="200"></svg>').appendTo(card);
      $('<text x=2 y=22></text>').text(value).css('font-size',25).appendTo(svg);
      $('<text x=90 y=140></text>').text(value).css('font-size',20).appendTo(svg);
      if (suit === 0) {
        $(svg).append(clubs);
      } else if(suit === 1) {
        $(svg).append(spades);
      } else if (suit === 2){
        $(svg).append(hearts);
      } else {
        $(svg).append(diamonds);
      }
      return card;
    }

    function show(hand, here) {
       $(here).empty();
      hand.forEach(function(c, i) {
        $(here).append(createCard(Math.floor(c/13), (c % 13)+1).css({position: 'absolute', top: 10, left: i*70}).prop('outerHTML'));
      });
    }
