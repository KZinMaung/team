import { REMOVE_ERROR, SET_ERROR } from "../type"

const initialState = {
    message: null,
}
const error = (state = initialState, action)=>{
    switch (action.type){
        case SET_ERROR:
            return {
                ...state,
                message: action.payload,
            }
        case REMOVE_ERROR:
            return{
                ...state,
                message: null,
            }
        default:
            return state;
    }
}
export default error;