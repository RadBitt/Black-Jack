// Table.js
// Card Game Table Object
// 

function Table() {

	this.round = 0;

	this.cardsPerDeal = 2;

	this.tableContainerId = 'table'; 

	this.gameContainerId = 'game-container';

	this.playerContainerClasses = 'hand-container player-hand'

	this.tipsContainerId = 'tips-container';

	this.interfaceContainerId = 'user-interface'; 

	this.deck = new Deck();

	this.deal = function()  {

		if (Table.deck.cardsLeft() == 0) {

			this.newDeck(); 

		} 

		return this.deck.getTopCard(); 
	}

	this.newDeck = function() {

		this.deck.create();

		this.deck.shuffle();

	}

	this.setUpGame = function() {

		this.newDeck(); 

		addElement('div', this.tableContainerId, [['id', this.gameContainerId]]); 

	}

	this.drawCard = function(Player, Card) {

		var x, y, attributeString, cardPosition;
		var playerName = Player.getName();
		var playerContainerNode = getID(playerName);
		var playerContainerWidth = playerContainerNode.style.width + 0; 
		var cardIdString = playerName + '-card-' + Player.totalCards();

		if (Card == 'hidden') {
			x = -633;
			y = -1129; 
		} else {
			cardPosition = Card.getPosition();
			x = cardPosition[0];
			y = cardPosition[1];
		}
		
		attributeString = 'background: url(' + this.deck.cardsURI + ') ' + x + 'px ' + y + 'px';
		playerContainerNode.style.width = this.deck.cardWidth + 
			parseInt(playerContainerWidth)
			 + 'px'; 
		addElement('div', playerName, [['id', cardIdString], ['class', 'card']]);
		getID(cardIdString).setAttribute('style', attributeString);

	}

	this.drawTable = function() {

		var playerName, playerIdString; 

		Players.getDealer();

		for (var i = 0; i < Players.getNumPlayers(); i++) {

			playerName = Players.currentPlayer().getName();

			addElement('div', this.gameContainerId, [['id', playerName], ['class', this.playerContainerClasses]]);

			Players.nextPlayer(); 

		}

		addElement('div', this.gameContainerId, [['id', this.tipsContainerId]]);

		addElement('div', this.gameContainerId, [['id', this.interfaceContainerId]]);

	}

	this.cleanUpTable = function() {

		var Player, playerName, cardIdString;

		for (var p = 0; p < Players.getNumPlayers(); p++) {

			Player = Players.currentPlayer(); 

			playerName = Player.getName();

			getID(playerName).removeChildren();

			getID(playerName).style.width = ""; 

			Player.resetCards();

			Players.nextPlayer(); 

		}

	}

}