import { configureStore } from "redux";
import rootReducer from "./redux";

const initialState = {};

const store = configureStore(rootReducer, initialState);

export default store;
