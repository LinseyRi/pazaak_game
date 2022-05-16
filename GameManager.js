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
        this.P1endTurnHTMLid = "end-turn-1";
        this.P2endTurnHTMLid = "end-turn-2";
        this.boundEndTurn = this.testEndGame.bind(this); 

    }


    populatePlayer(player) {
        player.board.handBoard.showHandOnPage(); 
        player.board.gameBoard.updateTotal(); 
    }

    startGame(firstPlayer) {
        this.playerOne.isTurn = true; 
        this.populatePlayer(this.playerOne); 
        this.populatePlayer(this.playerTwo); 
        this.activateBoard(firstPlayer); 
    }

    startNextTurn(endPlayer, nextPlayer) {
        endPlayer.isTurn = false; 
        nextPlayer.isTurn = true; 
        if (this.allStanding()) {
            this.gameEnd(); 
        } else if (nextPlayer.stand) {
            this.startNextTurn(nextPlayer, endPlayer); 
        } else {
            this.deactivateBoard(endPlayer); 
            this.activateBoard(nextPlayer); 
        }
    }

    testEndGame() { // TODO 
        if (this.playerOne.stand && this.playerTwo.stand) {
            this.gameEnd(); 
        } else {
            this.swapActivePlayer(); 
        }
    }

    roundEnd() {
        if(!this.testEndGame()) {

        }

    }

    gameEnd() {
        console.log("You've reached the end"); 
    }

    setEnd() {

    }

    allStanding() {
        return (this.playerOne.stand && this.playerTwo.stand ? true : false); 
    }

    activateBoard(player) {
        if (player.number == 1) {
            document.getElementById(this.P1endTurnHTMLid).addEventListener("click", this.boundEndTurn);
        } else if (player.number == 2) {
            document.getElementById(this.P2endTurnHTMLid).addEventListener("click", this.boundEndTurn);
        }
        player.board.activateBoard(); 
    }

    deactivateBoard(player) {
        if (player.number == 1) {
            document.getElementById(this.P1endTurnHTMLid).removeEventListener("click", this.boundEndTurn);
        } else if (player.number == 2) {
            document.getElementById(this.P2endTurnHTMLid).removeEventListener("click", this.boundEndTurn);
        }
        player.board.deactivateBoard(); 
    }

    swapActivePlayer() {
        let endPlayer; 
        let nextPlayer; 
        if (this.playerOne.isTurn) {
            endPlayer = this.playerOne; 
            nextPlayer = this.playerTwo; 
        } else if (this.playerTwo.isTurn) {
            endPlayer = this.playerTwo;
            nextPlayer = this.playerOne;  
        } 
        this.testForcedStand(endPlayer); 
        this.startNextTurn(endPlayer, nextPlayer); 
    }

    testForcedStand(player) {
        if (player.board.gameBoard.total > 20 && !player.stand) {
            player.stand = true; 
        }
    } 
}