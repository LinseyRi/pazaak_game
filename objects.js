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

    renderCard(gameBoard, boardElementId, totalSpanId, player) {
        // function: draw a card from the main deck, 
        // lay this on the player's game board 
        // call gameBoard function to update board elements
        // gameBoard - gameBoard object
        // boardElementId - String referring to HTML div 
        // totalSpanId - String referring to HTML span 
        let card = this.drawCard(); 
        gameBoard.cardLaid(card, boardElementId, totalSpanId, true, player);
    }
}

// class PlayerDeck extends MainDeck {

//     buildDeck() {
//         let cardOptions = [-1, -2, -3, -4, 1, 2, 3, 4];
//         for (let i = 1; i <= 10; i++) {
//             let r = Math.floor(Math.random() * 7) + 1;
//             let newCard = new Card(cardOptions[r]);
//             this.deck.push(newCard); 
//         }
//     }
// }

class Player {
    constructor(playerName, role) {
        this.name = playerName; 
        this.role = role; 
        this.turnDrawnCard; 
        this.turn = false; 
        this.runningTotal = 0; /// to add to game board
        this.wins = 0; 
        this.lastToWin = false; 
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

    resetBoard() { // this should be in the board class 
        this.runningTotal = 0; 
        this.stand = false; 
    }

    removeWinNodes(winHTMLSpan) {
        let myNode = document.getElementById(winHTMLSpan);
        while (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
        }
    }
    
    addWinNodes(winHTMLSpan) {
        let parent = document.getElementById(winHTMLSpan);
        let winsToTrack = this.wins;
        for (let i = 1; i <= 3; i++) {
            let newWinElement = document.createElement('span'); // removed 'i' element due to bug 
            if (winsToTrack > 0) {
                // newWinElement.classList.add("fa-solid"); 
                // newWinElement.classList.add("fa-solid-notch"); 
                newWinElement.innerHTML = 'W';
                winsToTrack--; 
            } else {
                // newWinElement.classList.add('fa-solid');
                // newWinElement.classList.add('fa-circle');
                newWinElement.innerHTML = 'O';
            }
            parent.appendChild(newWinElement); 
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
                            child.classList.remove('selected-card'); 
                        }    
                    }
                    for (let i = 0; i < self.hand.length; i++) {
                        let c = self.hand[i]; 
                        if (c.selected) {
                            c.selected = false; 
                        }
                    }
                    // then find the value of the selected card
                    // and update the card object to be selected as well as the HTML element 
                    var v = e.target.value;
                    e.target.classList.add('selected-card'); 
                    for (let i = 0; i < self.hand.length; i++) {
                        let c = self.hand[i]; 
                        if (c.value === v) {
                            c.selected = true; 
                            break; 
                        }
                    }
                }
            }
            document.getElementById(handElementId).appendChild(newCardElement); 
        })    
    }


}

class GameBoard {
    constructor(player, boardHTMLId) {
        this.cards = new Array(); 
        this.total = this.totalCalculator(this.cards); 
        this.player = player; 
        this.boardHTMLId = boardHTMLId;

    }

    clearBoard() {
        this.cards = new Array(); 
        this.total = 0; 
        let myNode = document.getElementById(this.boardHTMLId); 
        while (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
        }
        if (this.player.role == 1) {
            this.updateTotal("board-total-1", this.player); 
        } else if (this.player.role == 2) {
            this.updateTotal("board-total-2", this.player);
        }
    }

    totalCalculator(currentCards) {
        let total = 0; 
        for (let card of currentCards) {
            total = total + card.value; 
        }
        return total; 
    }

    cardLaid(card, gameBoardId, totalSpanId, house, player) {
        // card - Card object to add to board 
        // gameBoardId - String referring to HTML div on which card should be displayed
        // totalSpanId - String referring to HTML span in which text shows total
        // house - Boolean, whether card added is from the house or a player 
        // player - Player object
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
        this.updateTotal(totalSpanId, player);
    }

    roundEnd(firstPlayer, secondPlayer) {
        if (firstPlayer.runningTotal == 20 && secondPlayer.runningTotal == 20) {
            endCompleteRound(firstPlayer, 'draw');
            return 'draw'; 
        }
        if (firstPlayer.runningTotal > 20 && secondPlayer.runningTotal > 20) {
            endCompleteRound(firstPlayer, 'draw');
            return 'draw'; 
        }
        if (firstPlayer.stand && secondPlayer.stand) {
            let p1Dif = 20 - firstPlayer.runningTotal;
            let p2Dif = 20 - secondPlayer.runningTotal; 
            if (firstPlayer.runningTotal > 20 && secondPlayer.runningTotal <= 20) {
                endCompleteRound(secondPlayer, 'win'); 
            } else if (secondPlayer.runningTotal > 20 && firstPlayer.runningTotal <= 20) {
                endCompleteRound(firstPlayer, 'win'); 
            } else if (firstPlayer.runningTotal == 20) {
                endCompleteRound(firstPlayer, 'win'); 
            } else if (secondPlayer.runningTotal == 20) {
                endCompleteRound(secondPlayer, 'win'); 
            } else if (firstPlayer.runningTotal == secondPlayer.runningTotal) {
                endCompleteRound(firstPlayer, 'draw');
            } else if (p1Dif < p2Dif) {
                endCompleteRound(firstPlayer, 'win');
            } else if (p2Dif < p1Dif) {
                endCompleteRound(secondPlayer, 'win'); 
            }
            return 'win'; 
        } else if (firstPlayer.runningTotal > 20 && !firstPlayer.stand) {
            stand(firstPlayer, "interact-button-1", playerOneBoard);
            return 'continue';
        } else if (secondPlayer.runningTotal > 20 && !secondPlayer.stand) {
            stand(secondPlayer, "interact-button-2", playerTwoBoard);
            return 'continue';  
        } else {
            return 'continue'; 
        }
    }

    updateTotal(totalSpanId, player) {
        let totalTracker = document.getElementById(totalSpanId);
        let runningTotal = this.totalCalculator(this.cards); 
        totalTracker.innerText = runningTotal; 
        this.total = this.totalCalculator(this.cards);
        player.runningTotal = runningTotal; 
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
        cardSound.play();
        gameBoard.cardLaid(newBoardCard, gameBoardId, totalSpanId, false, player);
        player.layCard(card, playerHandId); 
    } 
    player.playedInTurn = true; 
    if (gameBoard.total == 20) {
        if (player.role == 1) {
            stand(player, "interact-button-1", playerOneBoard);
        } else if (player.role == 2) {
            stand(player, "interact-button-2", playerTwoBoard); 
        }
    }
}

function endTurn(player, gameBoard, gameBoardId, totalSpanId) {
    player.playedInTurn = false; // if the player has laid a card this turn, not able to lay again. This resets that restriction
    var next = gameBoard.roundEnd(playerOne, playerTwo); 
    if (next == 'continue') {
        endBothTurns(playerOne, playerTwo); 
    }
}

function stand(player, interactButtonClass, gameBoard) {
    // removes ability of given player to use interactive buttons 
    // player - Player object
    // interactButtonClass - String of class name of player HTML buttons
    // gameBoard - player's game board Object 
    player.stand = true; 
    if (player.role == 1) {
        document.getElementById("play-card-1").removeEventListener("click", layPlayerOneCard);
        document.getElementById("end-turn-1").removeEventListener("click", endPlayerOneTurn);
        document.getElementById("stand-1").removeEventListener("click", playerOneStand);
    } else if (player.role == 2) {
        document.getElementById("play-card-2").removeEventListener("click", layPlayerTwoCard); 
        document.getElementById("end-turn-2").removeEventListener("click", endPlayerTwoTurn);
        document.getElementById("stand-2").removeEventListener("click", playerTwoStand);
    }
    endBothTurns(playerOne, playerTwo); 
}

function gameEnd(player, winState) { 
    let board = document.getElementById("game-container");
    let endBanner = document.getElementById("game-end-banner");
    endBanner.classList.add('active');
    endBanner.classList.remove('disabled');
    if (winState == 'win') {
        endBanner.innerHTML = `${player.name} WINS`;
    } else if (winState == 'lose') {
        endBanner.innerHTML = `${player.name} LOSES`; 
    } else if (winState == 'draw') {
        endBanner.innerHTML = `It's a DRAW`
    }
}

async function showBanner(winState, player) {
    // write code to create temporary win or lose state banner; 
    let board = document.getElementById("game-container");
    let endBanner = document.getElementById("round-end-banner");
    endBanner.classList.add('active');
    endBanner.classList.remove('disabled');
    if (winState == 'win') {
        endBanner.innerHTML = `${player.name} wins the round.`;
    } else if (winState == 'lose') {
        endBanner.innerHTML = `${player.name} LOSES`; 
    } else if (winState == 'draw') {
        endBanner.innerHTML = `This round's a DRAW`
    }
    await sleep(3000);
    endBanner.classList.remove('active');
    endBanner.classList.add('disabled');
}

async function endCompleteRound(player, winState) {
    if (winState == 'draw') {
        showBanner('draw', null);
        startNewRound(player); 
    } else if (winState == 'win') {
        player.wins = player.wins + 1
        if (player.wins != 3) {
            showBanner('win', player);
        }
        startNewRound(player); 
    }
}

async function endBothTurns(firstPlayer, secondPlayer) {
    if (firstPlayer.turn) {
        firstPlayer.turn = false; 
        secondPlayer.turn = true; 
        if (!firstPlayer.stand) {
            let lastPlayerBox = document.getElementById("player-two");
            lastPlayerBox.classList.remove("current-turn");
            let playerBox = document.getElementById("player-one"); 
            playerBox.classList.add("current-turn");

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
            
            if (firstPlayer.runningTotal == 20) {
                stand(firstPlayer, "interact-button-1", playerOneBoard);
            }

            cardSound.play();
            await sleep(1000);
            mainDeck.renderCard(playerOneBoard, "game-board-1", "board-total-1", firstPlayer);
        } 
        if (firstPlayer.stand) {
            endTurn(playerOne, playerOneBoard, "game-board-1", "board-total-1");
        }
    } else if (secondPlayer.turn) {
        firstPlayer.turn = true; 
        secondPlayer.turn = false; 
        if (!secondPlayer.stand) {
            let lastPlayerBox = document.getElementById("player-one");
            lastPlayerBox.classList.remove("current-turn");
            let playerBox = document.getElementById("player-two"); 
            playerBox.classList.add("current-turn");

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

            if (secondPlayer.runningTotal == 20) {
                stand(secondPlayer, "interact-button-2", playerTwoBoard); 
            }

            cardSound.play();
            await sleep(1000);
            mainDeck.renderCard(playerTwoBoard, "game-board-2", "board-total-2", secondPlayer);
        } 
        if (secondPlayer.stand) {
            endTurn(playerTwo, playerTwoBoard, "game-board-2", "board-total-2");
        }
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var cardSound = new Audio("playCardSound.mp3"); // buffers automatically when created



// ------> Game Content <----------

var mainDeck = new MainDeck(); 
var roundCounter = 0; 

// ---> Player One Content
var playerOne = new Player("Player One", 1); 
const playerOneBoard = new GameBoard(playerOne, "game-board-1"); 

// ---> Player Two Content 
var playerTwo = new Player("Player Two", 2);
const playerTwoBoard = new GameBoard(playerTwo, "game-board-2"); 


// ---- > Game Manager Functions
async function startNewRound(first) {
    if (playerOne.wins == 3 && playerTwo.wins < 3) {
        gameEnd(playerOne, 'win');
        return 'end'; 
    } else if (playerTwo.wins == 3 && playerOne.wins < 3) {
        gameEnd(playerTwo, 'win');
        return 'end'; 
    }
    // reset the house deck (recreate and shuffle)
    mainDeck = new MainDeck(); 

    // clear all cards currently counted on "game-board-1" and playerOneBoard
    playerOne.resetBoard(); 
    playerOneBoard.clearBoard();

    // clear all cards currently counted on "game-board-2" and playerTwoBoard 
    playerTwo.resetBoard(); 
    playerTwoBoard.clearBoard(); 
    await sleep(2000);

    // for each win in player's hand, remove one fa-circle-notch and fill with fa-circle
    playerOne.removeWinNodes("win-streak-1"); 
    playerTwo.removeWinNodes("win-streak-2");
    
    playerOne.addWinNodes("win-streak-1"); 
    playerTwo.addWinNodes("win-streak-2"); 


    let oneHandChildrenCurrently = document.getElementById("player-hand-1").children;
    let twoHandChildrenCurrently = document.getElementById("player-hand-2").children; 

    if (playerOne.hand.length > 0 && oneHandChildrenCurrently.length == 0) {
        playerOne.renderHand("player-hand-1");
    }

    if (playerTwo.hand.length > 0 && twoHandChildrenCurrently.length == 0) {
        playerTwo.renderHand("player-hand-2");
    }

    playerOne.turn = false; 
    playerTwo.turn = false; 
    first.turn = true; 

    // if (playerOne.lastToWin == false && playerTwo.lastToWin == false) {
    //     // insert pull card from deck chance - run in separate function 
    // } else if (playerOne.lastToWin) {
    //     playerOne.turn = true; 
    // } else if (playerTwo.lastToWin) {
    //     playerTwo.turn = true; 
    // }

    
    endBothTurns(playerOne, playerTwo); 
}

function chanceCheckDraw() {
    let chanceDeck = new MainDeck(); 
    return chanceDeck.drawCard(); 
}

async function fillStartScreen() {
    // draw the cards
    let playerOneCard = chanceCheckDraw(); 
    let playerTwoCard = chanceCheckDraw(); 
    while (playerOneCard == playerTwoCard) { // ensure cards aren't the same
        playerTwoCard = chanceCheckDraw(); 
    }

    // insert function to create card img
    createChanceCard(playerOneCard, "player-1-chance"); 
    createChanceCard(playerTwoCard, "player-2-chance"); 

    // test who goes first 
    let firstGo = playerOneCard.value > playerTwoCard.value ? playerOne : playerTwo; 

    // enter this into span
    document.getElementById("first-player").innerHTML = `${firstGo.name}`; 
    // add start game button function 
    document.getElementById("start-game-button").addEventListener("click", function() {
        document.getElementById("game-start").classList.add("disabled"); 
        startNewRound(firstGo); 
    }); 
}

function createChanceCard(card, htmlElement) {
    console.log("Creating card..."); 
    let chanceDisplay = document.getElementById(htmlElement); 
    let newChanceEl = document.createElement('img');
    let imageSrc = houseCardImages[card.value.toString()]; 
    newChanceEl.src = imageSrc; 
    newChanceEl.classList.add("chance-display-card"); 
    newChanceEl.value = card.value; 
    chanceDisplay.appendChild(newChanceEl); 
}

// TODO implement AI functionality  

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

fillStartScreen(); 