class GameManager {
    constructor() {
        this.houseDeck = new HouseDeck();  
        this.playerOne = new Player("Player One", 
                                1, 
                                this.houseDeck, 
                                "game-board-1", 
                                "board-total-1", 
                                "player-hand-1", 
                                "play-card-1", 
                                "end-turn-1"

                                );
        this.playerTwo = new Player("Player Two", 
                                2,
                                this.houseDeck,
                                "game-board-2",
                                "board-total-2", 
                                "player-hand-2", 
                                "play-card-2",
                                "end-turn-2"
                                );                                                                                           
    }

    startGame(firstPlayer) {
        this.populatePlayer(this.playerOne); 
        this.populatePlayer(this.playerTwo); 
        firstPlayer.board.addAllEventListeners(); 
        this.drawFirstCard(firstPlayer); 
    }

    populatePlayer(player) {
        player.board.handBoard.showHandOnPage(); 
        player.board.gameBoard.updateTotal(); 
    }

    drawFirstCard(player) {
        let card = this.houseDeck.drawCard(); 
        player.board.gameBoard.layCardOnBoard(card, true); 
    } 

    testEndGame() {
        if (this.playerOne.stand && this.playerTwo.stand) {
            this.endGame(); 
            return true; 
        } else {
            return false; 
        }
    }

    roundEnd() {
        if(!this.testEndGame()) {

        }

    }

    startTurn(player) {
        player.turn = true;
        player.board.addAllEventListeners(); 
    }

    endTurn(player) {
        player.turn = false; 
        player.board.removeAllEventListeners(); 
    }

    gameEnd() {

    }

    setEnd() {

    }
}