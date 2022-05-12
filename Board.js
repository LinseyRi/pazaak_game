class GameBoard {
    constructor(player, boardHTMLid) {
        this.player = player; 
        this.HTMLid = boardHTMLid; 
    }
}

class HandBoard extends GameBoard {
    constructor(player, boardHTMLid) { 
        super(player, boardHTMLid); 
        this.cards = player.hand; // TODO test weather this is permanent assignment, or reacts when a change occurs to the player's hand
    }

    renderCard(card, image) { // FUNCTIONAL
        let newCardHTMLElement = document.createElement('img'); 
        newCardHTMLElement.src = image; 
        newCardHTMLElement.classList.add('board-card'); 
        newCardHTMLElement.value = card.value; 
        let self = this; 
        newCardHTMLElement.onclick = function (e) {
            if (!self.player.playedInRound) {
                let parent = e.target.parentNode; 
                self.removeSelectedState(parent); 
                self.selectCard(e.target); 
            }
        }
        document.getElementById(this.HTMLid).appendChild(newCardHTMLElement); 
    }

    showHandOnPage() { // FUNCTIONAL 
        for (let i = 0; i < this.cards.length; i ++) {
            let card = this.cards[i]; 
            let cardImage = playerCardImages[card.value.toString()]; 
            this.renderCard(card,cardImage); 
        }
    } 

    removeCardInHand(card) {
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

    removeSelectedState(parent) { // FUNCTIONAL 
        let currentChildren = parent.children; 
        for (let x = 0; x < currentChildren.length; x++) {
            let currentChild = currentChildren[x]; 
            if (currentChild.classList.contains('selected-card')) {
                currentChild.classList.remove('selected-card'); 
            }
        }
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].selected) {
                this.cards[i].selected = false; 
            }
        }
    }

    selectCard(target) { // FUNCTIONAL 
        let selectedVal = target.value; 
        target.classList.add('selected-card'); 
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].value == selectedVal) {
                this.cards[i].selected = true; 
            }
        }
    }
}

class HouseBoard extends GameBoard {
    constructor(player, boardHTMLid, totalHTMLid) {
        super(player, boardHTMLid); 
        this.totalContainerid = totalHTMLid; 
        this.laidCards = new Array(); 
        console.log("Game Board Cards Are: ", this.laidCards); 
        this.total = this.calculateTotal(this.laidCards); 
    }

    calculateTotal(currentCards) {
        let total = 0; 
        console.log("Current House Cards are: ", currentCards);
        for (let card of currentCards) {
            total = total + card.value; 
        }
        return total; 
    }

    updateTotal() {
        let totalTracker = document.getElementById(this.totalContainerid); 
        this.total = this.calculateTotal(this.laidCards); 
        totalTracker.innerText = this.total; 
    }

    renderCard(card, image) {
        let newCardHTMLElement = document.createElement('img'); 
        newCardHTMLElement.src = image; 
        newCardHTMLElement.classList.add('board-card'); 
        newCardHTMLElement.value = card.value; 
        document.getElementById(this.HTMLid).appendChild(newCardHTMLElement); 
    }

    layCardOnBoard(card) {
        this.laidCards.push(card);
        let cardImage = houseCardImages[card.value.toString()]; 
        this.renderCard(card, cardImage); 
        this.updateTotal(); 
    }

}

// TODO combine the render cards functions from each of the two classes 