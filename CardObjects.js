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
 
 class Card {
    constructor(value) {
        this.value = value; 
        this.selected = false; 
    }

    findImage(isHouseCard) {
        return ( isHouseCard ? houseCardImages[this.value.toString()] : playerCardImages[this.value.toString()]);
    }
}

 class DeckOfCards {
    constructor() {
        this.cards = new Array(); 
        this.buildDeck(); 
    }

    generateRandomNumber(limit) {
        return Math.floor(Math.random() * limit) + 1; 
    }

    shuffle() {
        for (let i = 0; i != this.cards.length; i++) {
            let r = this.generateRandomNumber(i); 
            let tempCard = this.cards[i]; 
            this.cards[i] = this.cards[r]; 
            this.cards[r] = tempCard; 
        }
    }

    drawCard() {
        return this.cards.pop(); 
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
                this.cards.push(temp); 
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
            this.cards.push(newCard); 
        }
        this.shuffle(); 
    }
}