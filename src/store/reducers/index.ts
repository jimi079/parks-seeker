import { combineReducers } from 'redux';
import { IParkReducer } from '../interface/ParkReducerInterface';
import parkReducer from "./Park/ParkReducer";

// Register all reducer
export interface IRootReducer {
    // Park reducer state
    productReducer: IParkReducer
}

export default combineReducers({
    productReducer: parkReducer
});
