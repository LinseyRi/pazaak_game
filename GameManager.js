class GameManager {
    constructor(playerOne, playerTwo, gameBoardOne, gameBoardTwo) {
        this.playerOne = playerOne; 
        this.playerTwo = playerTwo; 
        this.gameBoardOne = gameBoardOne; 
        this.gameBoardTwo = gameBoardTwo; 
        this.houseDeck = new HouseDeck(); 
    }

    houseLayCard() { 
        let newCard = this.houseDeck.drawCard();
        
    }
}