// Black Jack Main v0.1
GameFlag = new GameFlags(); 

Players = new Players();

	Players.addPlayer('Player-1');

Table = new Table();

	Table.setUpGame();

	Table.drawTable();

Blackjack = new Blackjack(); 

	Blackjack.startRound();

