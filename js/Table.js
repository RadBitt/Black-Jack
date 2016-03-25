// Table.js
// Card Game Table Object
// 

function Table() {

	this.round = 0;

	this.cardsPerDeal = 2;

	this.tableContainerId = 'table'; 

	this.gameContainerId = 'game-container';

	this.playerContainerClasses = 'hand-container'

	this.tipsContainerId = 'tips-container';

	this.interfaceContainerId = 'user-interface'; 

	this.buttonsContainerId = 'button-container'; 

	this.deck = new Deck(6);

	this.newDeck = function() {
<<<<<<< HEAD
=======

		this.deck.create();

		this.deck.shuffle();

	}

	this.deal = function()  {

		if (Table.deck.cardsLeft() == 1) {
>>>>>>> origin/master

		this.deck.create();

		this.deck.shuffle();

	}

<<<<<<< HEAD
	this.deal = function()  {

		if (Table.deck.cardsLeft() == 0) {

			this.newDeck(); 

		} 

		return this.deck.getTopCard(); 
	}

=======
>>>>>>> origin/master
	this.setUpGame = function() {

		this.newDeck(); 

		addElement('div', this.tableContainerId, [['id', this.gameContainerId]]); 

		addElement('div', this.tableContainerId, [['id', this.interfaceContainerId]]);

		addElement('div', this.interfaceContainerId, [['id', this.buttonsContainerId]])

	}

	this.drawCard = function(Player, Card) {

		var x, y, propertyString, cardPosition;
		var gameContainerMaxWidth = getID(this.gameContainerId).offsetWidth;
		var playerName = Player.getName();
		var playerContainerNode = getID(playerName);
		var playerContainerWidth = playerContainerNode.style.width + 0; 
		var totalCards = Player.totalCards(); 
		var totalCardsWidth = ((totalCards-1) * this.deck.cardWidth);
		var cardOffset = (totalCards * this.deck.cardOffset) * -1 + (gameContainerMaxWidth / 3);
		var cardIdString = playerName + '-card-' + (totalCards);
		
		if (Card == 'hidden') {
			x = -633;
			y = -1129; 
		} else {
			cardPosition = Card.getPosition();
			x = cardPosition[0];
			y = cardPosition[1];
		}
		
		if (totalCardsWidth < gameContainerMaxWidth)
			playerContainerNode.style.width = this.deck.cardWidth + 
			parseInt(playerContainerWidth)
			 + 'px';

		propertyString = 'background: url(' + this.deck.cardsURI + ') ' + x + 'px ' + y + 'px;' +
						  'position: relative;' + 
						  'top: 0' + '; left: ' + cardOffset + 'px;'; 
		addElement('div', playerName, [['id', cardIdString], ['class', 'card']]);
		getID(cardIdString).setAttribute('style', propertyString);

	}

	this.drawTable = function() {

		var playerName, propertyString;
		var dealerName = Players.getDealer().getName(); 
		var numPlayers = Players.getNumPlayers(); 

		addElement('div', this.gameContainerId, [['id', this.tipsContainerId]]);

		// Dealer first
		for (var i = 0; i < numPlayers; i++) {

			playerName = Players.currentPlayer().getName();
			addElement('div', this.gameContainerId, [['id', playerName], ['class', this.playerContainerClasses]]);
			
			if (playerName === dealerName)
				propertyString = 'position: relative;';
			else
				propertyString = 'position: fixed; bottom: 5px;';

			getID(playerName).setAttribute('style', propertyString); 
			Players.nextPlayer();
		}

	}

}

/* ================================================ //
* 	Black Jack Specific Functions that extend Table
// ================================================ */
Table.prototype.drawSplit = function(playerName) {
	addElement('div', this.gameContainerId, [['id', playerName], ['class', this.playerContainerClasses]]);
<<<<<<< HEAD
	propertyString = 'position: fixed; bottom: 5px; margin-left: 400px;';
=======
	propertyString = 'position: fixed; bottom: 5px; left: 350px;';
>>>>>>> origin/master
	getID(playerName).setAttribute('style', propertyString);
}

Table.prototype.cleanUpTable = function() {

	var Player, playerName, cardIdString;
	var numPlayers = Players.getNumPlayers(); 

	for (var p = 0; p < numPlayers; p++) {

		Player = Players.currentPlayer(); 

		playerName = Player.getName(); 

		getID(playerName).removeChildren();

		getID(playerName).style.width = "";

		if (playerName.slice(playerName.length - 6, playerName.length) == '-split') {

			getID(playerName).remove();

			Players.removeCurrent(); 

		} else Player.resetHand();

		Players.nextPlayer(); 

	}

}