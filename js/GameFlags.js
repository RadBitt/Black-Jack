// Gameflags v0.1
// 
// 

function GameFlags() {

	this.numFlags = 0; 
	this.flags = new Array();

	this.addFlag = function(param) {
		this.numFlags++;
		this.flags[this.numFlags] = new Flag(param);
		this.printFlag(); 
	}

	this.printFlag = function() {

		while(this.numFlags > 0) {
			flag = this.flags[this.numFlags]; 
			console.log(flag.getMessage());
			this.numFlags--; 
		}

	}

	function Flag(param) {

		this.msg = param;

		this.messages = [
		"New deck created",
		"This deck shuffled", 
		"New round",
		"Player Splits",
		"Player doubles down"
		];

		this.getMessage = function() {
			return this.messages[this.msg]; 
		}

	}

}