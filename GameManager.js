class GameManager {
    constructor() {
        this.playerOne = new Player("Player One", 1);
        this.playerTwo = new Player("Player Two", 2);  
        this.houseDeck = new HouseDeck(); 
        this.playerOneBoard = new PlayerBoardManager(this.playerOne, 
                                                this.houseDeck, 
                                                "game-board-1", 
                                                "board-total-1", 
                                                "player-hand-1", 
                                                "play-card-1", 
                                                "end-turn-1"
                                                ); 
        this.playerTwoBoard = new PlayerBoardManager(this.playerTwo, 
                                                this.houseDeck,
                                                "game-board-2",
                                                "board-total-2", 
                                                "player-hand-2", 
                                                "play-card-2",
                                                "end-turn-2"
                                                ); 
    }

    startGame(firstPlayerBoard) {
        this.populatePlayerOne(); 
        this.populatePlayerTwo(); 
        firstPlayerBoard.addAllEventListeners(); 
        this.drawFirstCard(firstPlayerBoard); 
    }

    populatePlayerOne() {
        this.playerOneBoard.handBoard.showHandOnPage(); 
        this.playerOneBoard.gameBoard.updateTotal(); 
    }

    populatePlayerTwo() {
        this.playerTwoBoard.handBoard.showHandOnPage(); 
        this.playerTwoBoard.gameBoard.updateTotal(); 
    }

    drawFirstCard(houseBoardToLay) {
        let card = this.houseDeck.drawCard(); 
        houseBoardToLay.gameBoard.layCardOnBoard(card, true); 
    } 

    testEndGame() {
        if (this.playerOne.stand && this.playerTwo.stand) {
            this.endGame(); 
        }
    }

    roundEnd() {

    }

    gameEnd() {

    }

    setEnd() {

    }
}