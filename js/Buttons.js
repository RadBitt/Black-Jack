// Buttons.js
// 
// 

function Buttons() {

	this.containerString = Table.interfaceContainerId; 

	this.deal = function() {

		addElement('button', 'user-interface', [['id', 'Deal'], ['onclick', 'Blackjack.startRound()']]);

		getID('Deal').innerHTML = 'Deal';

	}

	this.hit = function() {

		addElement('button', 'user-interface', [['id', 'Hit'], ['onclick', 'Blackjack.hit()']]);

		getID('Hit').innerHTML = 'Hit';

	}

	this.stay = function() {

		addElement('button', 'user-interface', [['id', 'Stay'], ['onclick', 'Blackjack.stay()']]);

		getID('Stay').innerHTML = 'Stay';

	}

	this.remove = function(id) {

		getID(id).remove();

	}

}