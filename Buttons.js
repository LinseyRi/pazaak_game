class Button {
    constructor(player, handBoard, gameBoard, buttonHTMLid, gameManager) {
        this.player = player; 
        this.handBoard = handBoard; 
        this.gameBoard = gameBoard; 
        this.HTMLid = buttonHTMLid;
    }


}

class PlayCardButton extends Button {
    constructor(player, handBoard, gameBoard, buttonHTMLid) {
        super(player, handBoard, gameBoard, buttonHTMLid)
        this.boundPlayCard = this.playCard.bind(this); 
    }

    playCard() {
        let selectedCard = this.player.getSelected(); 
        if (selectedCard) {
            this.handBoard.removeCardInHand(selectedCard); 
            this.gameBoard.layCardOnBoard(selectedCard, false); 
            this.player.playedInTurn = true; 
        }
        this.gameBoard.checkIfPlayerStand(); 
    }

    addPlayEventListener() { 
        document.getElementById(this.HTMLid).addEventListener("click", this.boundPlayCard); 
    }

    removePlayEventListener() { 
        document.getElementById(this.HTMLid).removeEventListener("click", this.boundPlayCard); 
    }
}


class StandButton extends Button {
    constructor(player, handBoard, gameBoard, buttonHTMLid) {
        super(player, handBoard, gameBoard, buttonHTMLid)
        this.boundStand = this.stand.bind(this); 
    }

    stand() {
        // TODO 
    }
}