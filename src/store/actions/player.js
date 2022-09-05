import { call } from "../../services/api";
import { serverErrorMessage, unauthorizedMessage } from "../../utils/message";
import { REMOVE_ERROR, SET_ERROR, SET_LOADING, SET_PLAYERS } from "../type";

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

