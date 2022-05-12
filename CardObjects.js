class Card {
    constructor(value) {
        this.value = value; 
        this.selected = false; 
    }
}

class DeckOfCards {
    constructor() {
        this.deck = new Array(); 
        this.buildDeck(); 
    }

    generateRandomNumber(limit) {
        return Math.floor(Math.random() * i) + 1; 
    }

    shuffle() {
        for (let i = 0; i != this.deck.length; i++) {
            let r = this.generateRandomNumber(i); 
            let tempCard = this.deck[i]; 
            this.deck[i] = this.deck[r]; 
            this.deck[r] = tempCard; 
        }
    }

    drawCard() {
        return this.deck.pop(); 
    }

    renderCard(gameBoard) {
        let card = this.drawCard(); 
        // call method here that would show the card on the gameBoard
    }
}

class HouseDeck extends DeckOfCards {
    buildDeck() {
        for (let i = 1; i <= 10; i++) {
            for (let x = 1; x <= 4; x++) {
                let temp = new Card(i); 
                this.deck.push(temp); 
            }
        }
        this.shuffle(); 
    }
}

class PlayerDeck extends DeckOfCards {
    buildDeck() { 
        let cardOptions = [-1, -2, -3, -4, 1, 2, 3, 4]; 
        for (let i = 1; i <= 10; i++) {
            let r = this.generateRandomNumber(7); 
            let newCard = new Card(cardOptions[r]); 
            this.deck.push(newCard); 
        }
        this.shuffle(); 
    }
}