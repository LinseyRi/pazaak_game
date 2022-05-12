let gameDeck = new HouseDeck(); 
let playerOne = new Player("Player One", 1);
let playerOneHand = new HandBoard(playerOne, "player-hand-1"); 
let gameBoard = new  HouseBoard(playerOne, gameDeck, "game-board-1", "board-total-1");
let playCardButton = new PlayCardButton(playerOne, playerOneHand, gameBoard, "play-card-1"); 

// ------- TEST 1: House Deck Created and Shuffled 
console.log("Test 1: House Deck Created and Shuffled...")
console.log(gameDeck.cards); 

// ------- TEST 2: Create Player 
console.log(playerOne.name); 

// ------- TEST 3: Player Deck Created and Shuffled 
console.log(playerOne.deck); 

// ------- TEST 4: Player Hand Created 
console.log(playerOne.hand); 

// ------ TEST 5: HandBoard created and displaying player hand
console.log(playerOneHand.cards); 

// ------- TEST 6: Render Hand on webpage 
playerOneHand.showHandOnPage(); 

// ------- TEST 7: GameBoard total rendering 
gameBoard.updateTotal(); 

// ------- TEST 8: Render card from main deck onto board 
let drawnCard = gameDeck.drawCard(); 
console.log("Drawn Card is: ", drawnCard); 
gameBoard.layCardOnBoard(drawnCard, true); 

// ------- TEST 9: Play card button 
console.log(playCardButton); 
playCardButton.addPlayEventListener(); 