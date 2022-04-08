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
        let card = this.drawCard(); 
        gameBoard.cardLaid(card, boardElementId, totalSpanId, true);
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
    constructor(playerName) {
        this.name = playerName; 
        this.playerDeck = new PlayerDeck(); 
        this.hand = new Array(); 
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

    renderHand(handElementId) {
        var self = this; 
        this.hand.forEach(function (card) {
            let newCardElement = document.createElement('img'); 
            let imageSrc = playerCardImages[card.value.toString()];
            newCardElement.src = imageSrc;
            newCardElement.classList.add('hand-card'); 
            newCardElement.value = card.value; 
            newCardElement.onclick = function (e) {
                var v = e.target.value;
                console.log(v); 
                e.target.classList.add('selected-card'); 
                console.log(e.target);
                for (let i = 0; i < self.hand.length; i++) {
                    let c = self.hand[i]; 
                    if (c.value === v) {
                        c.selected = true; 
                        break; 
                    }
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
        console.log(house);
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

    testWin() {
        if ( this.total == 20 ) {
            return 'win'; 
        } else if ( this.total > 20 ) {
            return 'lose'; 
        } else if ( this.total < 20 ) {
            return 'continue';
        }
    }

    updateTotal(totalSpanId) {
        let totalTracker = document.getElementById(totalSpanId);
        let runningTotal = this.totalCalculator(this.cards); 
        totalTracker.innerText = runningTotal; 
    }
}

// ------> Game Functions <----------

function testPlayingCard () {
    var card; 
    for (let i = 0; i < playerOne.hand.length; i++) {
        if (playerOne.hand[i].selected === true) {
            card = playerOne.hand[i];
        }
    }
    if (card) {
        let newBoardCard = new Card(parseInt(card.value)); 
        // TODO don't hard code in the game_board
        GAME_BOARD.cardLaid(newBoardCard, "game-board", "board-total", false);
        // e.target.parentNode.removeChild(card);
    } 
    MAIN_DECK.renderCard(GAME_BOARD, "game-board", "board-total");
}


// ------> Game Content <----------

const GAME_BOARD = new GameBoard(); 
const MAIN_DECK = new MainDeck(); 
var playerOne = new Player("Player One"); 

// ------> Add Button Events <-----

// end turn button 
// var endTurnButton = document.getElementById("end-turn");
// endTurnButton.addEventListener('click', testPlayingCard(playerOne)); 


// ---- > Game Manager Functions
function gameManager(player) {
    player.renderHand("player-hand");
    MAIN_DECK.renderCard(GAME_BOARD, "game-board", "board-total");
}

gameManager(playerOne);