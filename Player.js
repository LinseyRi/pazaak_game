 class Player {
    constructor(playerName, playerNumber) {
        this.name = playerName; 
        this.number = playerNumber; 
        this.deck = new PlayerDeck(); 
        this.hand = new Array(); 
        this.createHand(); 

        this.isTurn = false; 
        this.playedInTurn = false; 
        this.stand = false; 
        this.wins = 0; 
        this.lastToWin = false; 
    } 

    createHand() {
        for (let i = 1; i <= 4; i++) {
            this.hand.push(this.deck.cards.pop()); 
        }
    }

    removeCardFromHand(card) {
        for (let i = 0; i < this.hand.length; i++) {
            let c = this.hand[i]; 
            if (c.value == card.value) {
                this.hand.splice(i, 1); 
                break; 
            }
        }
    } 

    getSelected() { 
        for (let i = 0; i < this.hand.length; i ++) {
            let currentCard = this.hand[i]; 
            if (currentCard.selected) {
                return currentCard; 
            }
        }
    }
}