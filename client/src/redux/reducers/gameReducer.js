import { START_GAME, END_GAME, ADD_PLAYER, UPDATE_PLAYER } from "../types";

const initialState = {
	lobbyCode: localStorage.getItem("lobbyCode"),
	players: [],
	/*
	**Player Schema**
	Name: string
	Id: string
	score: int
	host: boolean
	answers: string[]
	colour: string
	*/
};

export default function gameReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case START_GAME:
			localStorage.setItem("lobbyCode");
			return initialState;
		case END_GAME:
			localStorage.removeItem("lobbyCode");
			return initialState;
		case ADD_PLAYER:
			return {
				players: [...state.players, payload.player],
			};
		case UPDATE_PLAYER:
			return {
				players: [...state.players, payload.player],
			};
		default:
			return state;
	}
}
