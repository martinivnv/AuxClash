class LiveGames {
	constructor() {
		this.games = [];
	}
	addGame(lobbyCode, hostId, gameLive, gameData) {
		var game = { lobbyCode, hostId, gameLive, gameData };
		// gameData: {
		//  stage: 0,
		// 	round: 0,
		// }
		this.games.push(game);
		return game;
	}
	removeGame(hostId) {
		var game = this.getGameByHostId(hostId);

		if (game) {
			this.games = this.games.filter((game) => game.hostId !== hostId);
		}
		return game;
	}
	getGameByHostId(hostId) {
		return this.games.find((game) => game.hostId === hostId);
	}
	getGameByLobbyCode(lobbyCode) {
		return this.games.find((game) => game.lobbyCode === lobbyCode);
	}
}

module.exports = { LiveGames };
