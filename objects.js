// ------> image dicts 
playerCardImages = {
    '1': 'assets/plus_1.png',
    '2': 'assets/plus_2.png',
    '3': 'assets/plus_3.png',
    '4': 'assets/plus_4.png',
    '-1': 'assets/minus_1.png',
    '-2': 'assets/minus_2.png',
    '-3': 'assets/minus_3.png', 
    '-4': 'assets/minus_4.png'
}

houseCardImages = {
    '1': 'assets/house_1.png',
    '2': 'assets/house_2.png',
    '3': 'assets/house_3.png',
    '4': 'assets/house_4.png',
    '5': 'assets/house_5.png',
    '6': 'assets/house_6.png',
    '7': 'assets/house_7.png',
    '8': 'assets/house_8.png',
    '9': 'assets/house_9.png',
    '10': 'assets/house_10.png',
}

// ------> Helper Object Creation <----------

// Create Card Object
class Card {
    constructor(value) {
        this.value = value; 
        this.selected = false; 
    }

    show() {
        console.log(`Card Value: ${this.value}`);
    }
}

class MainDeck {
    constructor() {
        this.deck = new Array(); 
        this.buildDeck(); 
    }

    shuffle() {
        for (let i = 0; i != this.deck.length; i++) {
            let r = Math.floor(Math.random() * i) + 1; 
            let tempCard = this.deck[i];
            this.deck[i] = this.deck[r]
            this.deck[r] = tempCard; 
        }
    }

    buildDeck() {
        for (let i = 1; i <= 10; i++) {
            for (let x = 1; x <= 4; x++) {
                let temp = new Card(i);
                this.deck.push(temp); 
            }
        }
        this.shuffle(); 
    }

    show() {
        for (let card of this.deck) {
            card.show()
        }
    }

    drawCard() {
        return this.deck.pop();
    }

    renderCard(gameBoard, boardElementId, totalSpanId) {
        // function: draw a card from the main deck, 
        // lay this on the player's game board 
        // call gameBoard function to update board elements
        // gameBoard - gameBoard object
        // boardElementId - String referring to HTML div 
        // totalSpanId - String referring to HTML span 
        console.log("Laying card...");
        let card = this.drawCard(); 
        gameBoard.cardLaid(card, boardElementId, totalSpanId, true);
        console.log("Laid card..."); 
    }
}

class PlayerDeck extends MainDeck {

    buildDeck() {
        let cardOptions = [-1, -2, -3, -4, 1, 2, 3, 4];
        for (let i = 1; i <= 10; i++) {
            let r = Math.floor(Math.random() * 7) + 1;
            let newCard = new Card(cardOptions[r]);
            this.deck.push(newCard); 
        }
    }
}

class Player {
    constructor(playerName, role) {
        this.name = playerName; 
        this.role = role; 
        this.turnDrawnCard; 
        this.turn = false; 
        this.playerDeck = new PlayerDeck(); 
        this.hand = new Array(); 
        this.stand = false; 
        this.playedInTurn = false; 
        this.createHand(); 
    }

    createHand() {
        for (let i = 1; i <= 4; i++) {
            this.hand.push(this.playerDeck.deck.pop()); 
        }
    }

    showHand() {
        for (let card of this.hand) {
            card.show(); 
        }
    }

    layCard(card, handBoardId) {
        // remove given card from hand 
        for (let i = 0; i < this.hand.length; i++) {
            let c = this.hand[i]; 
            if (c.value == card.value) {
                this.hand.splice(i, 1); 
                break; 
            }
        }
        // remove given card from the play board 
        let board = document.getElementById(handBoardId);
        let children = board.children; 
        for (let x = 0; x < children.length; x++) {
            let child = children[x]; 
            if (child.classList.contains('selected-card')) {
                board.removeChild(child);
                break; 
            }
        }

    }

    renderHand(handElementId) {
        var self = this; 
        this.hand.forEach(function (card) {
            let newCardElement = document.createElement('img'); 
            let imageSrc = playerCardImages[card.value.toString()];
            newCardElement.src = imageSrc;
            newCardElement.classList.add('hand-card'); 
            newCardElement.value = card.value; 
            newCardElement.onclick = function (e) {
                if (!self.playedInTurn) {
                    // first check to see if a different card has already been selected 
                    // and if so, remove that from the current selection 
                    let parent = e.target.parentNode; 
                    let children = parent.children; 
                    for (let x = 0; x < children.length; x++) {
                        let child = children[x]; 
                        if (child.classList.contains('selected-card')) {
                            console.log("Removing selected..."); 
                            child.classList.remove('selected-card'); 
                            console.log(child); 
                            console.log(`Child value: ${child.value}`); 
                        }    
                    }
                    for (let i = 0; i < self.hand.length; i++) {
                        let c = self.hand[i]; 
                        if (c.selected) {
                            c.selected = false; 
                        }
                    }
                    console.log("cleared state:");
                    console.log(self.hand);
                    // then find the value of the selected card
                    // and update the card object to be selected as well as the HTML element 
                    var v = e.target.value;
                    e.target.classList.add('selected-card'); 
                    console.log(e.target);
                    for (let i = 0; i < self.hand.length; i++) {
                        let c = self.hand[i]; 
                        if (c.value === v) {
                            c.selected = true; 
                            break; 
                        }
                    }
                    console.log("Selected state: ");
                    console.log(self.hand); 
                }
            }
            document.getElementById(handElementId).appendChild(newCardElement); 
        })    
    }


}

class GameBoard {
    constructor() {
        this.cards = new Array(); 
        this.total = this.totalCalculator(this.cards); 
    }

    totalCalculator(currentCards) {
        let total = 0; 
        for (let card of currentCards) {
            total = total + card.value; 
        }
        return total; 
    }

    cardLaid(card, gameBoardId, totalSpanId, house) {
        // card - Card object to add to board 
        // gameBoardId - String referring to HTML div on which card should be displayed
        // totalSpanId - String referring to HTML span in which text shows total
        // house - Boolean, whether card added is from the house or a player 
        this.cards.push(card); 
        let newCardElement = document.createElement('img');
        if (house == true) {
            var imageSrc = houseCardImages[card.value.toString()];
        } else {
            var imageSrc = playerCardImages[card.value.toString()];
        }
        newCardElement.src = imageSrc;
        newCardElement.classList.add('board-card');
        newCardElement.value = card.value;
        document.getElementById(gameBoardId).appendChild(newCardElement);
        this.updateTotal(totalSpanId);
    }

    testWin(player) {
        if ( this.total == 20 ) {
            gameEnd(player, 'win'); 
            console.log('WIN');
            return 'win';
        } else if ( this.total > 20 ) {
            console.log('LOSE');
            gameEnd(player, 'lose'); 
            return 'lose';
        } else {
            console.log('continue');
            return 'continue';
        }
    }

    updateTotal(totalSpanId) {
        let totalTracker = document.getElementById(totalSpanId);
        let runningTotal = this.totalCalculator(this.cards); 
        totalTracker.innerText = runningTotal; 
        this.total = this.totalCalculator(this.cards);
    }
}

// ------> Game Functions <----------

function playCard (player, playerHandId, gameBoard, gameBoardId, totalSpanId) {
    // Given a player and a game board, will search players hand for selected card and play it on the board
    // player - Player object 
    // gameBoard - GameBoard object to add card to

    // find if there is a card in player's hand to play -
    // it will be marked as selected 
    var card; 
    for (let i = 0; i < player.hand.length; i++) {
        if (player.hand[i].selected === true) {
            card = player.hand[i];
        }
    }

    // if a card has been selected,
    if (card) {
        let newBoardCard = new Card(parseInt(card.value)); 
        gameBoard.cardLaid(newBoardCard, gameBoardId, totalSpanId, false);
        player.layCard(card, playerHandId); 
    } 
    player.playedInTurn = true; 
    if (gameBoard.total == 20) {
        console.log("out-STANDING");
        if (player.role == 1) {
            stand(player, "interact-button-1", playerOneBoard);
        } else if (player.role == 2) {
            stand(player, "interact-button-2", playerTwoBoard); 
        }
    }
    // var next = gameBoard.testWin(); 
    // if (next == 'continue') {
    //     MAIN_DECK.renderCard(GAME_BOARD, "game-board", "board-total");
    // }
}

function endTurn(player, gameBoard, gameBoardId, totalSpanId) {
    player.playedInTurn = false; // if the player has laid a card this turn, not able to lay again. This resets that restriction
    var next = gameBoard.testWin(player); 
    if (next == 'continue') {
        // MAIN_DECK.renderCard(gameBoard, gameBoardId, totalSpanId);
        round(playerOne, playerTwo); 
    }
}

function stand(player, interactButtonClass, gameBoard) {
    // removes ability of given player to use interactive buttons 
    // player - Player object
    // interactButtonClass - String of class name of player HTML buttons
    // gameBoard - player's game board Object 
    player.stand = true; 
    var standingButtons = document.getElementsByClassName(interactButtonClass); 
    for (button of standingButtons) {
        button.removeAttribute("onclick"); // TODO actually remove click ability here 
        button.classList.add("disabled-button");
    }
    // Removed below as when you stand you no longer add any cards to the board
    // mechanic is for playing against opponent  
    // while (GAME_BOARD.total < 20) {
    //     endTurn(); 
    //     console.log(`total after loop: ${GAME_BOARD.total}`); 
    // }
    gameBoard.testWin(player); // TODO rework testWin function to account for both players
    round(playerOne, playerTwo); 
}

function gameEnd(player, winState) {
    var board = document.getElementById("game-container");
    var endBanner = document.getElementById("game-end-banner");
    endBanner.classList.add('active');
    endBanner.classList.remove('disabled');
    if (winState == 'win') {
        endBanner.innerHTML = `${player.name} WINS`;
    } else if (winState == 'lose') {
        endBanner.innerHTML = `${player.name} `; 
    }
}

function round(firstPlayer, secondPlayer) {
    if (firstPlayer.turn) {
        firstPlayer.turn = false; 
        secondPlayer.turn = true; 
        if (!firstPlayer.stand) {
            MAIN_DECK.renderCard(playerOneBoard, "game-board-1", "board-total-1");
            let playerButtons = document.getElementsByClassName("interact-button-1");
            for (button of playerButtons) {
                button.classList.remove("temp-disabled-button");
            }
            let tempButtons = document.getElementsByClassName("interact-button-2");
            for (button of tempButtons) {
                button.classList.add("temp-disabled-button");
            }
            document.getElementById("current-player").innerHTML = firstPlayer.name; 

            // add event listeners to active player 
            document.getElementById("play-card-1").addEventListener("click", layPlayerOneCard);
            document.getElementById("end-turn-1").addEventListener("click", endPlayerOneTurn);
            document.getElementById("stand-1").addEventListener("click", playerOneStand); 

            // remove event listeners from player whose turn it is not 
            document.getElementById("play-card-2").removeEventListener("click", layPlayerTwoCard); 
            document.getElementById("end-turn-2").removeEventListener("click", endPlayerTwoTurn);
            document.getElementById("stand-2").removeEventListener("click", playerTwoStand);
        } 
        if (firstPlayer.stand) {
            endTurn(playerOne, playerOneBoard, "game-board-1", "board-total-1");
        }
    } else if (secondPlayer.turn) {
        firstPlayer.turn = true; 
        secondPlayer.turn = false; 
        if (!secondPlayer.stand) {
            MAIN_DECK.renderCard(playerTwoBoard, "game-board-2", "board-total-2");
            let playerButtons = document.getElementsByClassName("interact-button-2");
            for (button of playerButtons) {
                button.classList.remove("temp-disabled-button");
            }
            let tempButtons = document.getElementsByClassName("interact-button-1");
            for (button of tempButtons) {
                button.classList.add("temp-disabled-button");
            }
            document.getElementById("current-player").innerHTML = secondPlayer.name; 

            // add event listeners to current player 
            document.getElementById("play-card-2").addEventListener("click", layPlayerTwoCard); 
            document.getElementById("end-turn-2").addEventListener("click", endPlayerTwoTurn);
            document.getElementById("stand-2").addEventListener("click", playerTwoStand);

            // remove event listeners from past player 
            document.getElementById("play-card-1").removeEventListener("click", layPlayerOneCard);
            document.getElementById("end-turn-1").removeEventListener("click", endPlayerOneTurn);
            document.getElementById("stand-1").removeEventListener("click", playerOneStand);
        } 
        if (secondPlayer.stand) {
            endTurn(playerTwo, playerTwoBoard, "game-board-2", "board-total-2");
        }
    }
}


// ------> Game Content <----------

const MAIN_DECK = new MainDeck(); 

// ---> Player One Content
const playerOneBoard = new GameBoard(); 
var playerOne = new Player("Player One", 1); 

// ---> Player Two Content 
const playerTwoBoard = new GameBoard(); 
var playerTwo = new Player("Player Two", 2);

// ---- > Game Manager Functions
function gameManager() {
    // MAIN_DECK.renderCard(playerOneBoard, "game-board-1", "board-total-1");
    playerOne.renderHand("player-hand-1");
    // MAIN_DECK.renderCard(playerTwoBoard, "game-board-2", "board-total-2");
    playerTwo.renderHand("player-hand-2");

    playerOne.turn = true; 
    round(playerOne, playerTwo); 
}

gameManager();



// TODO add a player 2
// TODO implement round-robin turn style 
// TODO implement AI functionality  
// TODO flip for who starts round
// TODO implement 3 rounds


// ------> Event Listener Functions <----------


// ---> Player One Event Listeners 
function layPlayerOneCard() {
    playCard(playerOne, "player-hand-1", playerOneBoard, "game-board-1", "board-total-1");
}

function endPlayerOneTurn() {
    endTurn(playerOne, playerOneBoard, "game-board-1", "board-total-1"); 
}

function playerOneStand() {
    stand(playerOne, "interact-button-1", playerOneBoard); 
}

// ---> Player Two Event Listeners 
function layPlayerTwoCard() {
    playCard(playerTwo, "player-hand-2", playerTwoBoard, "game-board-2", "board-total-2");
}

function endPlayerTwoTurn() {
    endTurn(playerTwo, playerTwoBoard, "game-board-2", "board-total-2"); 
}

function playerTwoStand() {
    stand(playerTwo, "interact-button-2", playerTwoBoard); 
}