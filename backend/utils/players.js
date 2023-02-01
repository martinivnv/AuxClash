class Players {
	constructor() {
		this.players = {};
	}
	addPlayer(hostId, playerId, playerName, score) {
		var player = { hostId, playerName, score };
		this.players[playerId] = player;
		return player;
	}
	removePlayer(playerId) {
		var player = this.getPlayer(playerId);

		delete this.players[playerId];

		return player;
	}
	getPlayer(playerId) {
		return { ...this.players[playerId], playerId: playerId };
	}
	updatePlayerScore(playerId, newScore) {
		this.players[playerId].score = newScore;
	}
	updateHostId(playerId, newHostId) {
		this.players[playerId].hostId = newHostId;
	}
}

module.exports = { Players };
