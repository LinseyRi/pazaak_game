class Button {
    constructor(player, handBoard, gameBoard, buttonHTMLid) {
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
        }
    }

    addPlayEventListener() { 
        document.getElementById(this.HTMLid).addEventListener("click", this.boundPlayCard); 
    }

    removePlayEventListener() { 
        document.getElementById(this.HTMLid).removeEventListener("click", this.boundPlayCard); 
    }
}

// create play card HTML button 
// Integrate with an instance of the Button object 
// test to see if the adding and removing of event listeners works 