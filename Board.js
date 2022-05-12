class GameBoard {
    constructor(player, boardHTMLid) {
        this.player = player; 
        this.HTMLid = boardHTMLid; 
    }

    renderCard(card, isHouse) {
        let newCardHTMLElement = document.createElement('img'); 
        newCardHTMLElement.src = card.findImage(isHouse); 
        newCardHTMLElement.classList.add('board-card'); 
        newCardHTMLElement.value = card.value; 
        if (!isHouse) {
            let self = this; 
            newCardHTMLElement.onclick = function (e) {
                if (!self.player.playedInRound) {
                    let parent = e.target.parentNode; 
                    self.removeSelectedState(parent); 
                    self.selectCard(e.target); 
                }
            }
        }
        document.getElementById(this.HTMLid).appendChild(newCardHTMLElement); 
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms)); 
    }
}

class HandBoard extends GameBoard {
    constructor(player, boardHTMLid) { 
        super(player, boardHTMLid); 
        this.cards = player.hand; // TODO test weather this is permanent assignment, or reacts when a change occurs to the player's hand
    }

    showHandOnPage() { // FUNCTIONAL 
        for (let i = 0; i < this.cards.length; i ++) {
            let card = this.cards[i]; 
            this.renderCard(card, false); 
        }
    } 

    removeCardInHand(card) { // FUNCTIONAL
        this.player.removeCardFromHand(card); 
        console.log(this.player.hand);

        let board = document.getElementById(this.HTMLid); 
        console.log("Board is: ", board); 
        let allChildren = board.children; 
        for (let x = 0; x < allChildren.length; x++) {
            let currentChild = allChildren[x]; 
            if (currentChild.classList.contains('selected-card')) {
                board.removeChild(currentChild); 
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
    constructor(player, houseDeck, boardHTMLid, totalHTMLid) {
        super(player, boardHTMLid); 
        this.totalContainerid = totalHTMLid; 
        this.houseDeck = houseDeck; 
        this.laidCards = new Array(); 
        this.total = this.calculateTotal(this.laidCards); 
    }

    calculateTotal(currentCards) { // FUNCTIONAL 
        let total = 0; 
        for (let card of currentCards) {
            total = total + card.value; 
        }
        return total; 
    }

    updateTotal() {// FUNCTIONAL 
        let totalTracker = document.getElementById(this.totalContainerid); 
        this.total = this.calculateTotal(this.laidCards); 
        totalTracker.innerText = this.total; 
    }

    layCardOnBoard(card, isHouse) { // FUNCTIONAL
        this.laidCards.push(card);
        this.renderCard(card, isHouse); 
        this.updateTotal(); 
        this.checkIfPlayerStand(); 
    }

    clearBoard() { // TODO test works
        this.laidCards = new Array(); 
        this.updateTotal(); 
        let currentBoard = document.getElementById(this.HTMLid);
        while (currentBoard.firstChild) {
            currentBoard.removeChild(currentBoard.lastChild); 
        }
    }

    checkIfPlayerStand() { 
        if (this.total == 20) {
            this.player.stand = true; 
        }
    }

    houseToLay() {
        this.layCardOnBoard(this.houseDeck.drawCard(), true); 
    }
}