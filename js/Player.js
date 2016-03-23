// Player.js
// 
// 

function Players() {

	this.numberOfPlayers = 0;

	this.firstPlayerInt = 0;

	this.dealerSet = false;

	this.playersArray = new Array();

	this.currentPlayerInt = this.firstPlayerInt; 

	this.getNumPlayers = function() {
		return this.numberOfPlayers; 
	}

	this.addPlayer = function(name) {
		var tempPlayer;
		// swap dealer into last position after
		// creating a new player. 
		if (this.dealerSet) {
			tempPlayer = this.getDealer();
			this.playersArray[this.numberOfPlayers-1] = new Player(name);
			this.numberOfPlayers++;
			this.playersArray[this.numberOfPlayers-1] = tempPlayer;  
		} else {
			this.playersArray[this.numberOfPlayers] = new Player(name);
			this.numberOfPlayers++;
		}
		
		return this.playersArray[this.numberOfPlayers-2]; 
	}

	this.addDealer = function() {
		this.dealerSet = true; 
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

	// @return: the previouse Player
	// Description: Sets the previous player as the current player.
	this.prevPlayer = function() {
		this.currentPlayerInt--; 
		if (this.currentPlayerInt < 0)
			this.currentPlayerInt = this.numberOfPlayers; 
			
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

	this.removeLastPlayer = function() {
		this.numberOfPlayers--;
	}

	function Player(name) {

		this.name = name;

		this.money = 0;

		this.totalCardsInt = 0;

		this.handValue = 0;

		this.hasAce = new Array();

		this.cards = new Array();

		this.getName = function() {
			return this.name; 
		}

		this.getHandValue = function() {
			if (this.hasAce.length > 0) {
				if (this.handValue > 21) {
					this.handValue -= 10;
					this.hasAce.pop(); 
				}
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

		this.removeLastCard = function() {
			var Card = this.cards.pop();
			this.totalCardsInt--;
			this.handValue -= Card.getValue(); 
			return Card; 
		}

		this.totalCards = function() {
			return this.totalCardsInt;
		}

		this.addValue = function(Card) {
			var cardVal;
			cardVal = Card.getValue();
			this.handValue += cardVal;
			if (cardVal == 11) 
				this.hasAce.push(true);  
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
			this.totalCardsInt = 0;
			this.handValue = 0;
			this.hasAce = [];
			this.cards = [];
		}

		this.hasPair = function() {
			var card1 = this.getCard(0).getValue();
			var card2 = this.getCard(1).getValue();
			if (card1 == card2)
				return true;
			else 
				return false; 
		}

	}

}