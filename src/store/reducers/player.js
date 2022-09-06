import { SET_PLAYER, SET_PLAYERS, SET_TOTAL_COUNT } from "../type";

const initialState = {
    player: {},
    players: [],
    totalCount: 0
}

const player = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLAYER:
            return {
                ...state,
                player: action.payload
            }
            case SET_PLAYERS:
                return{
                    ...state,
                    players: action.payload
                }
                case SET_TOTAL_COUNT:
                return{
                    ...state,
                    totalCount: action.payload
                }
        default:
            return state;
    }
}
export default player;