class Player {
    constructor(playerName, playerNumber) {
        this.name = playerName; 
        this.number = playerNumber; 
        this.deck = new PlayerDeck(); 
        this.hand = new Array(); 
        this.createHand(); 

        this.isTurn = false; 
        this.wins = 0; 
        this.lastToWin = false; 
        this.playedInRound = false; 
    } 

    createHand() {
        for (let i = 1; i <= 4; i++) {
            this.hand.push(this.deck.pop()); 
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
}