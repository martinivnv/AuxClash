import { GET_PLAYERS, ADD_PLAYER } from "../types";

const initialState = {
	players: [],
};

export default function playersReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PLAYERS:
			return state;
		case ADD_PLAYER:
			return {
				players: [...state.players, payload.player],
			};
		default:
			return state;
	}
}
