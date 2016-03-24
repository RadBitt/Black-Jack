// Blackjack.js
// 
// 

function Blackjack() {

	this.tips = new Tips();

	this.buttons = new Buttons();

	this.dealerName = Players.getDealer().getName();

	this.setButtons = function() {

		this.buttons.hit();

		this.buttons.stay();

	}

	this.removeButtons = function() {

		getID(Table.buttonsContainerId).removeChildren(); 
	}

	this.stay = function() {

		GameFlag.addFlag(1, 1);
		this.control(Players.nextPlayer());
	}

	this.hit = function() {

		GameFlag.addFlag(1, 0);
		Player = Players.currentPlayer();
		Table.drawCard(Player, Player.setCard(Table.deal()));
		this.control(Player); 
	}

	this.splitHand = function() {

		var Player = Players.currentPlayer(); 
		var playerName = Player.getName();
		var newHandPlayer = Player;
		GameFlag.addFlag(1, 2);
		Card = Player.removeLastCard();
		getID(playerName + '-card-2').remove(); 
		playerName += '-split'; 

		// Now work with new hand. 
		newHandPlayer = Players.addPlayer(playerName);

		Table.drawSplit(playerName);
		Table.drawCard(newHandPlayer, newHandPlayer.setCard(Card));
		this.control(Players.prevPlayer());

	}

	this.doubleDown = function() {

	}

	this.checkBlackJack = function(Player) {
		var bool = false;
		if (Player.getHandValue() === 21)
			bool = true;
		return bool;
	}

	this.checkSplitOption = function(Player) { 
		if (Player.getHandValue() == 20 || Player.getHandValue() == 10)
			return false;
		else
			return true;
	}

	this.startRound = function() {
		var playerName;
		var dealerCard; 
		Table.round++;

		// Log with flag, 0 = gametype message, 2 = new round
		GameFlag.addFlag(0, 2);
		Players.firstPlayer();

		if (Table.round > 1) {
			Table.cleanUpTable(); 
			this.buttons.remove('Deal');  
		}
		for(var c = 1; c <= Table.cardsPerDeal; c++) {
			for (var p = 0; p < Players.getNumPlayers(); p++) {
				Player = Players.currentPlayer();
				if (Player.getName() === 'dealer') {
					if (c == 1) {
						Player.setCard(Table.deal()); 
						Table.drawCard(Player, 'hidden');
					} else if (c == 2) {
						Player.setCard(dealerCard = Table.deal());
						Table.drawCard(Player, dealerCard); 
						if (dealerCard.getValue() == 11) {
							if(this.checkBlackJack(Player)) {
								this.control(Player);
								return;
							}
						}
					}
				} else Table.drawCard(Player, Player.setCard(Table.deal()));
				if (Player.getName() != 'dealer' && c == 2 && Player.hasPair()) {
					if(this.checkSplitOption(Player))
						this.buttons.splitHand(); 
				}
				Players.nextPlayer(); 
			}
		}
		this.setButtons();
		this.control(Players.firstPlayer()); 
	}

	this.control = function(Player) {

		var playerName = Player.getName();
		var handValue = Player.getHandValue();
		if (playerName === this.dealerName) {
			this.removeButtons();
			if (handValue < 21) {
				this.tips.message(playerName + "'s turn. Hand: " + handValue);
				console.log(playerName + "'s turn. Hand: " + handValue);
				this.dealerAi(Player);
			} else if (handValue > 21) {
				this.tips.message(playerName + " busts!");
				console.log(playerName + " busts!");
				this.endRound();
			} else if (handValue === 21) {
				this.tips.message(playerName + " Black Jack! Hand: " + handValue);
				console.log(playerName + " Black Jack! Hand: " + handValue);
				this.dealerAi(Player); 
			} 
		} else if (playerName != this.dealerName) {
			if (handValue === 21) {
				this.tips.message(playerName + " Black Jack! Hand: " + handValue);
				console.log(playerName + " Black Jack! Hand: " + handValue);
				this.control(Players.nextPlayer()); 
			} else if (handValue > 21) {
				this.tips.message(playerName + " busts! Hand: " + handValue);
				console.log(playerName + " busts! Hand: " + handValue);
				if (Players.nextPlayer().getName() === this.dealerName) {
					this.removeButtons();
					this.endRound();
				} else {
					// Next player already set to current player.  
					this.control(Players.currentPlayer());
				} 
			} else if (handValue < 21) {
				this.tips.message(playerName + "'s turn. Hand: " + handValue);
				console.log(playerName + "'s turn. Hand: " + handValue);
			}
		}
	}

	this.dealerControl = function() {

	}

	this.playerControl = function() {
		
	}

	this.endRound = function() {

		var playerHand;
		var Dealer = Players.getDealer(); 
		var Player = Players.firstPlayer(); 
		var dealerHand =  Dealer.getHandValue();
		var dealerName = Dealer.getName(); 
		var numPlayers = Players.getNumPlayers();

		for (var i = 0; i < numPlayers-1; i++) {

			playerHand = Player.getHandValue();
			playerName = Player.getName(); 
			if (playerHand > dealerHand && playerHand <= 21) {

				this.tips.message(playerName + " beats " + dealerName);
				console.log(playerName + " beats " + dealerName);
			} else if (playerHand < dealerHand && dealerHand <= 21) {

				this.tips.message(dealerName + "'s " + dealerHand + " beats " + playerName);
				console.log(dealerName + "'s " + dealerHand + " beats " + playerName);
			} else if (playerHand === dealerHand) {

				this.tips.message(playerName + " & " + dealerName + " push.");
				console.log(playerName + " & " + dealerName + " push.");
			} else if (playerHand < dealerHand && dealerHand > 21) {

				this.tips.message(playerName + " beats " + dealerName);
				console.log(playerName + " beats " + dealerName);
			} else if (playerHand > 21 && dealerHand > 21) {

				this.tips.message(dealerName + " busts!");
				console.log(dealerName + " busts!");
			} else if (playerHand > 21 && dealerHand <= 21) {

				this.tips.message(playerName + " busts " + dealerName + " wins.");
				this.tips.message(playerName + " busts " + dealerName + " wins.");
			}
			Players.nextPlayer(); 
		}
		this.buttons.deal(); 
	}

	this.dealerAi = function(Dealer) {

		var handValue = Dealer.getHandValue(); 
		var playerName = Dealer.getName();
		var hiddenCard = Dealer.getCard(0); 
		var cardPosition = hiddenCard.getPosition();
		var x = cardPosition[0];
		var y = cardPosition[1];
		var hiddenCardIdString = playerName + '-card-' + '1';
		var propertyString = 'url(' + Table.deck.cardsURI + ') ' + x + 'px ' + y + 'px';

		getID(hiddenCardIdString).style.setProperty('background', propertyString);

		if (handValue < 17) {

			while(Dealer.getHandValue() < 17)

				this.hit();

		} else if (handValue >= 17) {

			this.endRound(); 

		}

	}

	function Tips() {

		this.message = function(string) {

			getID('tips-container').innerHTML = string;

		}

	}

}