import { configureStore } from "@reduxjs/toolkit";

// Game
import gameReducer from "./slices/gameSlice";

const reducer = {
	game: gameReducer,
};

export const store = configureStore({
	reducer,
	devTools: true, // devTools: process.env.NODE_ENV !== 'production',
});
