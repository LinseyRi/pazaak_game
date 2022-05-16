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
        this.boundSwapPlayer = this.swapActivePlayer.bind(this); 

    }

    startGame(firstPlayer) {
        this.playerOne.isTurn = true; 
        this.populatePlayer(this.playerOne); 
        this.populatePlayer(this.playerTwo); 
        this.activateBoard(firstPlayer); 
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

    

    startNextTurn(endPlayer, nextPlayer) {
        console.log("ending player is: ", endPlayer); 
        console.log("Next player is: ", nextPlayer); 
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

    gameEnd() {

    }

    setEnd() {

    }

    allStanding() {
        return (this.playerOne.stand && this.playerTwo.stand ? true : false); 
    }

    activateBoard(player) {
        console.log("Adding on click...");
        console.log(player.number);  
        if (player.number == 1) {
            document.getElementById(this.P1endTurnHTMLid).addEventListener("click", this.boundSwapPlayer);
        } else if (player.number == 2) {
            document.getElementById(this.P2endTurnHTMLid).addEventListener("click", this.boundSwapPlayer);
        }
        player.board.activateBoard(); 
    }

    deactivateBoard(player) {
        if (player.number == 1) {
            document.getElementById(this.P1endTurnHTMLid).removeEventListener("click", this.boundSwapPlayer);
        } else if (player.number == 2) {
            document.getElementById(this.P2endTurnHTMLid).removeEventListener("click", this.boundSwapPlayer);
        }
        player.board.deactivateBoard(); 
    }

    swapActivePlayer() {
        console.log("Swapping..."); 
        let endPlayer; 
        let nextPlayer; 
        if (this.playerOne.isTurn) {
            endPlayer = this.playerOne; 
            nextPlayer = this.playerTwo; 
        } else if (this.playerTwo.isTurn) {
            endPlayer = this.playerTwo;
            nextPlayer = this.playerOne;  
        } 
        this.startNextTurn(endPlayer, nextPlayer); 
    }
}