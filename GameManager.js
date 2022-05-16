class GameManager {
    constructor() {
        this.houseDeck = new HouseDeck();  
        this.playerOne = new Player("Player One", 
                                1, 
                                "player-one",
                                this.houseDeck, 
                                "game-board-1", 
                                "board-total-1", 
                                "player-hand-1", 
                                "interact-button-2", 
                                "play-card-1", 
                                "end-turn-1", 
                                );
        this.playerTwo = new Player("Player Two", 
                                2,
                                "player-two",
                                this.houseDeck,
                                "game-board-2",
                                "board-total-2", 
                                "player-hand-2", 
                                "interact-button-2",
                                "play-card-2",
                                "end-turn-2", 
                                );                                                                                           
    }

    startGame(firstPlayer) {
        this.populatePlayer(this.playerOne); 
        this.populatePlayer(this.playerTwo); 
        firstPlayer.board.activateBoard(); 
        // firstPlayer.board.addAllEventListeners(); 
        // this.drawFirstCard(firstPlayer); 
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

    swapActivePlayer() {
        if (this.playerOne.turn) {
            endPlayer = this.playerOne; 
            nextPlayer = this.playerTwo; 
        } else if (this.playerTwo.turn) {
            endPlayer = this.playerTwo;
            nextPlayer = this.playerOne;  
        }
        this.startNextTurn(endPlayer, nextPlayer); 
    }

    startNextTurn(endPlayer, nextPlayer) {
        endPlayer.turn = false; 
        nextPlayer.turn = true; 
        if (this.allStanding()) {
            this.gameEnd(); 
        } else if (nextPlayer.stand) {
            this.endTurn(nextPlayer, endPlayer); 
        } else {
            endPlayer.board.deactivateBoard(); 
            nextPlayer.board.activateBoard(); 
        }
    }

    gameEnd() {

    }

    setEnd() {

    }

    allStanding() {
        return (this.playerOne.stand && this.playerTwo.stand ? true : false); 
    }
}