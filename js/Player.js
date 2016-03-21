// Player v0.1
// 
// 

function Players() {

	this.numberOfPlayers = 0;

	this.firstPlayerInt = 0;

	this.playersArray = new Array();

	this.currentPlayerInt = this.firstPlayerInt; 

	// this.conditions = ['bust', 'win', 'stay'];

	this.getNumPlayers = function() {
		return this.numberOfPlayers; 
	}

	this.addPlayer = function(name) {
		this.playersArray[this.numberOfPlayers] = new Player(name); 
		this.numberOfPlayers++; 
	}

	this.addDealer = function() {
		this.playersArray[this.numberOfPlayers] = new Player('dealer');
		this.numberOfPlayers++;
	}

	// @return: the Next Player
	// Description: Sets the next player as the current player.
	this.nextPlayer = function() {
		this.currentPlayerInt++; 
		if (this.currentPlayerInt >= this.numberOfPlayers)
			this.currentPlayerInt = this.firstPlayerInt; 
			
		return this.playersArray[this.currentPlayerInt];
	}

	// @return: the next player
	// Description: Returns the next player. 
	// 				does not set as current player. 
	this.getNext = function() {
		this.currentPlayerInt++;
		if (this.currentPlayerInt >= this.numberOfPlayers)
			this.currentPlayerInt = this.firstPlayerInt; 
			
		return this.playersArray[this.currentPlayerInt];
	}

	// @return: the current player in the player array
	// Description: Returns the current player. 
	this.currentPlayer = function() {
		return this.playersArray[this.currentPlayerInt]; 
	}

	// @return: the first player in the players array
	// Description: Returns the first player. 
	// 				and first player is set as current player. 
	this.firstPlayer = function() {
		this.currentPlayerInt = this.firstPlayerInt; 
		return this.playersArray[this.currentPlayerInt]; 
	}

	// @return: the dealer player
	// Description: Returns the dealer player. 
	// 				and dealer is set as current player. 
	this.getDealer = function() {
		this.currentPlayerInt = this.numberOfPlayers - 1; 
		return this.playersArray[this.currentPlayerInt]; 
	}

	this.removePlayer = function(name) {
		this.numberOfPlayers--;
	}

	function Player(name) {

		this.name = name;

		this.totalCardsInt = 0;

		this.hasAce = false; 

		this.handValue = 0; 

		this.cards = new Array();

		this.getName = function() {
			return this.name; 
		}

		this.getHandValue = function() {
			if (this.handValue > 21 && this.hasAce) {
				this.handValue -= 10;
				this.hasAce = false; 
			}
				
			return this.handValue; 
		}

		// @return: a card object
		// @param: integer for array position
		// Description: Returns a card object 
		// 				at the position given.
		this.getCard = function(cardNum) {
			return this.cards[cardNum]; 
		}

		this.totalCards = function() {
			return this.totalCardsInt;
		}

		this.addValue = function(Card) {
			var cardVal;
			cardVal = Card.getValue();
			this.handValue += cardVal;
			if (cardVal == 11) 
				this.hasAce = true; 
		}

		// @return: a card object
		// @param: a card object
		// Description: Returns the card just set.
		this.setCard = function(Card) {
			this.totalCardsInt++;
			this.addValue(Card); 
			this.cards.push(Card);
			return Card; 
		}

		this.resetCards = function() {
			this.cards = [];
			this.totalCardsInt = 0;
			this.handValue = 0; 
		}

	}

}