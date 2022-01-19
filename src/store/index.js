import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { GameReducer } from "./GameReducer";

const rootReducer = combineReducers({
    characters: GameReducer
})

export const store = createStore(rootReducer,composeWithDevTools());
