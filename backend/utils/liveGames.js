class LiveGames {
	constructor() {
		this.games = [];
	}
	addGame(lobbyCode, hostId, gameLive, players, gameData) {
		var game = { lobbyCode, hostId, gameLive, players, gameData };
		this.games.push(game);
		return game;
	}
	removeGame(hostId) {
		var game = this.getGame(hostId);

		if (game) {
			this.games = this.games.filter((game) => game.hostId !== hostId);
		}
		return game;
	}
	getGameByHostId(hostId) {
		return this.games.filter((game) => game.hostId === hostId)[0];
	}
	getGameByLobbyCode(lobbyCode) {
		return this.games.find((game) => game.lobbyCode === lobbyCode);
	}
}

module.exports = { LiveGames };
