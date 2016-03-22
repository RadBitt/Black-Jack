// Buttons.js
// 
// 

function Buttons() {

	this.containerString = Table.interfaceContainerId; 

	this.deal = function() {

		addElement('div', this.containerString, [['id', 'button-container']])

		addElement('button', 'button-container', [['id', 'Deal'], ['onclick', 'Blackjack.startRound()']]);

		getID('Deal').innerHTML = 'Deal';

	}

	this.hit = function() {

		addElement('div', this.containerString, [['id', 'button-container']])

		addElement('button', 'button-container', [['id', 'Hit'], ['onclick', 'Blackjack.hit()']]);

		getID('Hit').innerHTML = 'Hit';

	}

	this.stay = function() {

		addElement('div', this.containerString, [['id', 'button-container']])

		addElement('button', 'button-container', [['id', 'Stay'], ['onclick', 'Blackjack.stay()']]);

		getID('Stay').innerHTML = 'Stay';

	}

	this.remove = function(id) {

		getID(id).remove();

	}

}