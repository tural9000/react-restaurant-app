import { combineReducers } from "redux";
import { appReducer } from './appReducer';
import { orderReducer } from './orderReducer';

export const rootReducer = combineReducers({
    order: orderReducer,
    app: appReducer
})
