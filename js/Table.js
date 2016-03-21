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

		Players.addDealer();

		addElement('div', this.tableContainerId, [['id', this.gameContainerId]]); 

	}

	this.drawCard = function(Player, Card) {

		var playerName = Player.getName();
		var cardIdString = playerName + '-card-' + Player.totalCards();
		var cardPosition = Card.getPosition();
		var x = cardPosition[0];
		var y = cardPosition[1];
		var attributeString = 'background: url(' + this.deck.cardsURI + ') ' + x + 'px ' + y + 'px';

		addElement('div', playerName, [['id', cardIdString], ['class', 'card']]);

		getID(cardIdString).setAttribute('style', attributeString);

	}

	this.drawHiddenCard = function(Player) {

		var playerName = Player.getName(); 
		var cardIdString = playerName + '-card-' + Player.totalCards();
		var attributeString = 'background: url(' + this.deck.cardsURI + ') -633px -1129px';

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

			Player.resetCards();

			Players.nextPlayer(); 

		}

	}

}