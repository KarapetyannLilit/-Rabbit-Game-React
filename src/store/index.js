import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { characterReducer } from "./characterReducer";

const rootReducer = combineReducers({
    characters: characterReducer
})

export const store = createStore(rootReducer,composeWithDevTools());
