// Deck class v0.1
// Represents a deck or decks of cards as a single deck. 
// 

function Deck(size) {

	this.size = size * 52;
	this.cards = new Array();
	this.cardsURI = 'cards/52_Cards_Color_Faces_Set/Color_52_Faces_v.2.3.svg';

	this.create = function() {

		var id = 1;
		var suitesInt = 0;
		var suites = ['C', 'H', 'S', 'D'];
		var x = 183 + 27; // X distance to next card
		var y = 252 + 29; // Y distance to next row of cards

		// Default Deck Size
		if (isNaN(size))
			this.size = 52; 

		// Create deck of cards
		for (var i = 1; i <= this.size; i++) {

			this.cards[i-1] = new Card(id, suites[suitesInt]); 

			id++;

			if (i % 13 == 0) {
				id = 1;
				suitesInt++;
			}
				
		}

		// Assign & calulate Card Positions
		for (i = 0; i < this.size; i++) {

			id = (this.cards[i].id - 1) * -1; 

			if (this.cards[i].getSuite() == 'C') {
				this.cards[i].setPosition(x * id, 0);
			}

			if (this.cards[i].getSuite() == 'H') {
				this.cards[i].setPosition(x * id, y * -1);
			}

			if (this.cards[i].getSuite() == 'S') {
				this.cards[i].setPosition(x * id, y * -2);
			}
				
			if (this.cards[i].getSuite() == 'D') {
				this.cards[i].setPosition(x * id, y * -3);
			}

		}

	}

	this.shuffle = function() {
		
		var m = this.cards.length, t, i;

		// While there remain elements to shuffle…
		while (m) {

			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);

			// And swap it with the current element.
			t = this.cards[m];
			this.cards[m] = this.cards[i];
			this.cards[i] = t;

		}

	}

	this.setDeckSize = function(newSize) {
		this.size = newSize;
		this.create();
		this.shuffle();
	}

	this.getDeckSize = function() {
		return this.size; 
	}

	this.getTopCard = function() {
		return this.cards.pop();  
	}

	this.cardsLeft = function() {
		return this.cards.length; 
	}

	this.getBottomCard = function() {
		return this.cards.shift(); 
	}

}