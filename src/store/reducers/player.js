import { SET_PLAYER, SET_PLAYERS } from "../type";

const initialState = {
    player: {},
    players: [],
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
        default:
            return state;
    }
}
export default player;