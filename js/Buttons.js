// Buttons.js
// 
// 

function Buttons() {

	this.deal = function() {

		addElement('button', 'button-container', [['id', 'Deal'], ['onclick', 'Blackjack.startRound()']]);

		getID('Deal').innerHTML = 'Deal';

	}

	this.hit = function() {

		addElement('button', 'button-container', [['id', 'Hit'], ['onclick', 'Blackjack.hit()']]);

		getID('Hit').innerHTML = 'Hit';

	}

	this.splitHand = function() {

		addElement('button', 'button-container', [['id', 'Split'], ['onclick', 'Blackjack.splitHand()']]);

		getID('Split').innerHTML = 'Split';

	}

	this.stay = function() {

		addElement('button', 'button-container', [['id', 'Stay'], ['onclick', 'Blackjack.stay()']]);

		getID('Stay').innerHTML = 'Stay';

	}

	this.remove = function(id) {

		getID(id).remove();

	}

}