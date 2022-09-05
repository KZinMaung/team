import { DELETE_TEAM, SET_TEAM, SET_TEAMS } from "../type";


const initialState = {
    team: {},
    teams: [],
}

const team = (state = initialState, action) => {
    switch (action.type) {
        case SET_TEAM:
            return {
                ...state,
                team: action.payload
            }
        case SET_TEAMS:
            return {
                ...state,
                teams: action.payload
            }
        case DELETE_TEAM:
            return {
                ...state,
                teams: state.teams.filter((team)=> team.id !== action.payload)
            }
        default:
            return state;
    }
}
export default team;