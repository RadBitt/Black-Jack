// Card.js
// 
// 

function Card(id, suite) {

	this.suite = suite;
	this.id = id;
	this.position = []; 

	this.getId = function() {
		return this.id;
	}

	this.getSuite = function() {
		return this.suite;
	}

	this.getPosition = function() {
		return this.position;
	}

	this.setPosition = function(x, y) {
		this.position = [x, y]; 
	}

}

/* ================================================ //
* 	Black Jack Specific Functions that Extend Card
// ================================================ */

Card.prototype.getValue = function() {
	if (this.id == 1)
		return 11;
	if (this.id > 10)
		return 10;
	return this.id;
}