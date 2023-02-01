class LiveGames {
	constructor() {
		this.games = {};
	}
	addGame(lobbyCode, hostId, gameLive, gameData, connectedPlayers) {
		var game = { lobbyCode, gameLive, connectedPlayers, gameData };
		// gameData: {
		//  category: string,
		//  stage: 0,
		// 	round: 0,
		// }
		this.games[hostId] = game;
		return game;
	}
	removeGame(hostId) {
		const game = this.games[hostId];

		delete this.games[hostId];

		return game;
	}
	getGameByHostId(hostId) {
		return this.games[hostId];
	}
	getGameByLobbyCode(lobbyCode) {
		for (const gameId in this.games) {
			const thisGame = this.games[gameId];
			if (thisGame.lobbyCode == lobbyCode) {
				return { ...thisGame, hostId: gameId };
			}
		}
		return null;
	}
	updateGameHostId(oldHostId, newHostId) {
		const thisGame = this.games[oldHostId];
		this.games[newHostId] = { ...thisGame };
		delete this.games[oldHostId];
		return true;
	}
	getConnectedPlayerIds(hostId) {
		return this.games[hostId].connectedPlayers;
	}
	addConnectedPlayer(hostId, playerId) {
		this.games[hostId].connectedPlayers.push(playerId);
	}
	removeConnectedPlayer(hostId, playerId) {
		let players = this.games[hostId].connectedPlayers;
		const index = players.indexOf(playerId);
		if (index > -1) {
			players.splice(index, 1);
		}
		this.games[hostId].connectedPlayers = players;
	}
}

module.exports = { LiveGames };
