import { combineReducers } from "redux";
import auth from './auth';
import player from './player';
import team from './team';

const reducers = combineReducers({
    auth,
    player,
    team
});
export default reducers;