class PlayerBoardManager { 
    constructor(player, houseDeck, gameBoardHTML, boardTotalHTML, handHTMLid, playid, endid) { // add end button and stand button
        this.player = player; 
        this.gameBoard = new HouseBoard(player, houseDeck, gameBoardHTML, boardTotalHTML);
        this.handBoard = new HandBoard(player, handHTMLid);  
        this.playButton = new PlayCardButton(player, this.handBoard, this.gameBoard, playid);
        this.endButton = new EndTurnButton(player, this.handBoard, this.gameBoard, endid); 
    }

    checkStanding() { 
        if (this.player.stand) {
            this.removeAllEventListeners(); 
        }
    }

    addAllEventListeners() {
        this.playButton.addPlayEventListener(); 
        this.endButton.addEndEventListener();
    }

    removeAllEventListeners() {
        this.playButton.removePlayEventListener(); 
        this.endButton.removeEndEventListener(); 
    }

    resetBoardForNewRound() {
        this.player.stand = false; 
        this.gameBoard.clearBoard(); 
    }

    addWinNodes() {

    }

    removeWinNodes() {

    }


}