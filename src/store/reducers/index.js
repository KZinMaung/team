import { combineReducers } from "redux";
import auth from './auth';
import player from './player';
import team from './team';
import status from './status';
import error from "./error";
const reducers = combineReducers({
    status,
    error,
    auth,
    player,
    team,
});
export default reducers;