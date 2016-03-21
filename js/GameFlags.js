// Gameflags.js
// 
// 

function GameFlags() {

	this.numFlags = 0; 
	this.flags = new Array();

	this.addFlag = function(kind, param) {
		this.numFlags++;
		this.flags[this.numFlags] = new Flag(kind, param);
		this.printFlag(); 
	}

	this.printFlag = function() {

		while(this.numFlags > 0) {
			flag = this.flags[this.numFlags]; 
			console.log(flag.getMessage());
			this.numFlags--; 
		}

	}

	function Flag(kind, param) {

		this.msg = param;

		this.kind = kind;

		this.messageString = '';

		this.gameMessages = function() {
			var messageArray = [
			"New deck created",
			"This deck shuffled", 
			"New round"
			];

			return messageArray[this.msg]; 
		}

		this.playerMessages = function() {
			var playerName = Players.currentPlayer().getName(); 
			var messageArray = [
			" hits",
			" stays", 
			" splits",
			" doubles down"
			];

			return playerName + messageArray[this.msg]; 
		}

		this.getMessage = function() {

			if (this.kind == 0)
				this.messageString = this.gameMessages();
			else if (this.kind == 1)
				this.messageString = this.playerMessages(); 

			return this.messageString; 
		}

	}

}