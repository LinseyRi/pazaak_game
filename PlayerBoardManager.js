class PlayerBoardManager { 
    constructor(player, boardHTMLid, houseDeck, gameBoardHTML, boardTotalHTML, handHTMLid, buttonClassid, playid, endid) { // add end button and stand button
        this.player = player; 
        this.boardid = boardHTMLid; 
        this.gameBoard = new HouseBoard(player, houseDeck, gameBoardHTML, boardTotalHTML);
        this.handBoard = new HandBoard(player, handHTMLid); 
        this.buttonClass = buttonClassid;  
        this.playButton = new PlayCardButton(player, this.handBoard, this.gameBoard, playid);
        this.endButton = new EndTurnButton(player, this.handBoard, this.gameBoard, endid); 
    }

    checkStanding() { 
        if (this.player.stand) {
            this.removeAllEventListeners(); 
        }
    }

    activateBoard() {
        this.addAllEventListeners(); 
        this.activateCSS(); 
    }

    deactivateBoard() {
        this.removeAllEventListeners(); 
        this.deactivateCSS(); 
    }

    addAllEventListeners() {
        this.playButton.addPlayEventListener(); 
        this.endButton.addEndEventListener();
    }

    removeAllEventListeners() {
        this.playButton.removePlayEventListener(); 
        this.endButton.removeEndEventListener(); 
    }

    activateCSS() {
        document.getElementById(this.boardid).classList.add("current-turn"); 
        let playerButtons = document.getElementsByClassName(this.buttonClass); 
        for (button of playerButtons) {
            button.classList.remove("temp-disabled-button"); 
        } 
    }

    deactivateCSS() {
        document.getElementById(this.boardid).classList.remove("current-turn");
        let playerButtons = document.getElementsByClassName(this.buttonClass); 
        for (button of playerButtons) {
            button.classList.add("temp-disabled-button"); 
        }
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