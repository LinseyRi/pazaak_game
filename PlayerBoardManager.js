class PlayerBoardManager { 
    constructor(player, gameBoard, handBoard, playButton) { // add end button and stand button
        this.player = player; 
        this.gameBoard = gameBoard; 
        this.handBoard = handBoard; 
        this.playButton = playButton; 
    }

    checkStanding() { 
        if (this.player.stand) {
            this.removeAllEventListeners(); 
        }
    }

    addAllEventListeners() {
        this.playButton.addPlayEventListener(); 
    }

    removeAllEventListeners() {
        this.playButton.removePlayEventListener(); 
    }

    resetBoardForNewRound() {
        this.player.stand = false; 
        this.gameBoard.clearBoard(); 
    }
}