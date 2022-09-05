import { combineReducers } from "redux";
import auth from './auth';
import player from './player';

const reducers = combineReducers({
    auth,
    player
});
export default reducers;