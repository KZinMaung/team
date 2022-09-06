
import { SET_CREATE_SUCCESS, SET_DELETE_SUCCESS, SET_EDIT_SUCCESS, SET_LOADING } from "../type"

const initialState = {
    loading: false,
    create_success: false,
    delete_success: false,
    edit_success: false
}

const status = (state = initialState, aciton) => {
    switch (aciton.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: !state.loading,
            };
        case SET_CREATE_SUCCESS:
            return {
                ...state,
                create_success: aciton.payload,
            }
        case SET_DELETE_SUCCESS:
            return {
                ...state,
                delete_success: aciton.payload,
            }
        case SET_EDIT_SUCCESS:
            return {
                ...state,
                edit_success: aciton.payload,
            }
        default:
            return state;
    }
}
export default status;