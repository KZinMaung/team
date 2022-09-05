import { call } from "../../services/api";
import { serverErrorMessage, unauthorizedMessage } from "../../utils/message";
import { DELETE_TEAM, REMOVE_ERROR, SET_DELETE, SET_ERROR, SET_LOADING, SET_SUCCESS, SET_TEAM, SET_TEAMS } from "../type";

export const getTeams = (page) => {
   
    return async (dispatch) => {
        dispatch({ type: SET_LOADING });
        try {
            const response = await call("get", "teams");
            const data = response.data;

            const transformResult = data.map((data) => {
                return {
                    ...data,
                    key: data.id,
                }
            });

            dispatch({
                type: SET_TEAMS,
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

export const createTeam = (data) => {
    console.log("data:", data)
    return async (dispatch) => {
        dispatch({ type: SET_SUCCESS, payload: false });
        dispatch({ type: SET_LOADING });
        try {
            await call("post", "teams", data);
            dispatch({ type: SET_SUCCESS, payload: true });
            dispatch({
                type: REMOVE_ERROR,
            });
        } catch (error) {
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
            dispatch({ type: SET_SUCCESS, payload: false });
        }, 1);
        dispatch({ type: SET_LOADING });
    }
}

export const deleteTeam = (id) => {
    return async (dispatch) => {
        dispatch({ type: SET_DELETE, payload: false });
        dispatch({ type: SET_LOADING });
        try {
            await call("delete", `teams/${id}`);
            dispatch({ type: SET_DELETE, payload: true });
            dispatch({ type: DELETE_TEAM, payload: id });
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
            dispatch({ type: SET_DELETE, payload: false });
        }, 1);
        dispatch({ type: SET_LOADING });
    }
}

export const editTeam = (id, data) => {
    return async (dispatch) => {
        dispatch({ type: SET_SUCCESS, payload: false });
        dispatch({ type: SET_LOADING });
        try {
            await call("post", `teams/${id}`, data);
            dispatch({ type: SET_SUCCESS, payload: true });
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
            dispatch({ type: SET_SUCCESS, payload: false });
        }, 1);
        dispatch({ type: SET_LOADING });
    }
}

export const getTeam = (id) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING });
        try {
            const response = await call("get", `teams/${id}`);
            const data = response.data;
            
            dispatch({
                type: SET_TEAM,
                payload: data,
            });
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
        dispatch({ type: SET_LOADING })
    }
}
