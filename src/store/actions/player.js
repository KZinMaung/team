import { call } from "../../services/api";
import { serverErrorMessage, unauthorizedMessage } from "../../utils/message";
import { REMOVE_ERROR, SET_EDIT_SUCCESS, SET_ERROR, SET_LOADING, SET_PLAYERS, SET_TOTAL_COUNT } from "../type";

export const getPlayers = (page) => {
   
    return async (dispatch) => {
        dispatch({ type: SET_LOADING });
        try {
            const response = await call("get", `players?_page=${page}&_limit=10`);
            const data = response.data;

            const transformResult = data.map((data) => {
                return {
                    ...data,
                    key: data.id,
                }
            });

            dispatch({
                type: SET_PLAYERS,
                payload: transformResult,
            });

            dispatch({
                type: REMOVE_ERROR,
            })

        }
        catch (error) {
            const { status } = error.response;

            if (status === 401) {
                localStorage.removeItem("user_name");
                dispatch({
                    type: SET_ERROR,
                    payload: unauthorizedMessage,
                });
            }

            else {
                dispatch({
                    type: SET_ERROR,
                    payload: serverErrorMessage,
                });
            }

        }
        dispatch({ type: SET_LOADING })
    }
}

export const changeTeamOfPlayer = (id, team) => {
    const data = {
        "team": team
    }
    console.log("data:", data)
    return async (dispatch) => {
        dispatch({ type: SET_EDIT_SUCCESS, payload: false });
        dispatch({ type: SET_LOADING });
        try {
            await call("patch", `players/${id}`, data);
            setTimeout(() => {
                dispatch({ type: SET_EDIT_SUCCESS, payload: true });
            }, 1000);
            dispatch({
                type: REMOVE_ERROR
            })
        }
        catch (error) {

            const { status } = error.response;

            if (status === 401) {
                localStorage.removeItem("user_name");
                dispatch({
                    type: SET_ERROR,
                    payload: unauthorizedMessage,
                });
            }

            else {
                dispatch({
                    type: SET_ERROR,
                    payload: serverErrorMessage,
                });
            }

        }

        setTimeout(() => {
            dispatch({ type: SET_EDIT_SUCCESS, payload: false });
        }, 3000);
        dispatch({ type: SET_LOADING });
    }
}

export const getTotalCount = () =>{
    return async (dispatch) => {
        dispatch({ type: SET_LOADING });
        try {
            const response = await call("get", 'players');
            const data = response.data;
            const total_count = data.length;

            dispatch({
                type: SET_TOTAL_COUNT,
                payload: total_count,
            });

            dispatch({
                type: REMOVE_ERROR,
            })

        }
        catch (error) {
            const { status } = error.response;

            if (status === 401) {
                localStorage.removeItem("user_name");
                dispatch({
                    type: SET_ERROR,
                    payload: unauthorizedMessage,
                });
            }

            else {
                dispatch({
                    type: SET_ERROR,
                    payload: serverErrorMessage,
                });
            }

        }
        dispatch({ type: SET_LOADING })
    }
}



