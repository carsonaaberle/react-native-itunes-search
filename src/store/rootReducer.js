import { combineReducers } from "redux";
import itunes from "./itunes/reducer";

export const rootReducer = combineReducers({
   itunes,
});
