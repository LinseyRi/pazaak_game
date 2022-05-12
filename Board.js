class HandBoard {
    constructor(player, boardHTMLid) { 
        this.player = player; 
        this.cards = player.hand; // TODO test weather this is permanent assignment, or reacts when a change occurs to the player's hand
        this.HTMLid = boardHTMLid; 
    }

    // methods to include: 
    // renderHand 
    // Remove card from hand 

    playCardInHand(card) {
        this.player.removeCardFromHand(card); 

        let board = document.getElementById(this.boardHTMLid); 
        let allChildren = board.children; 
        for (let x = 0; x < children.length; x++) {
            let currentChild = allChildren[x]; 
            if (currentChild.classList.contains('selected-card')) {
                board.removeChild(); 
                break; 
            }
        }
    }
}

class HouseBoard {
    constructor(player, boardHTMLid, totalHTMLid) {
        this.player = player; 
        this.HTMLid = boardHTMLid; 
        this.totalContainerid = totalHTMLid; 
        this.laidCards = new Array(); 
        this.total = this.calculateTotal(this.Cards); 
    }
}