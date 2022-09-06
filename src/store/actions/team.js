import { call } from "../../services/api";
import { duplicateMessage, serverErrorMessage, unauthorizedMessage } from "../../utils/message";
import { DELETE_TEAM, REMOVE_ERROR, SET_CREATE_SUCCESS, SET_DELETE_SUCCESS, SET_EDIT_SUCCESS, SET_ERROR, SET_LOADING, SET_TEAM, SET_TEAMS } from "../type";

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
    return async (dispatch) => {
        dispatch({ type: SET_CREATE_SUCCESS, payload: false });
        dispatch({ type: SET_LOADING });
        try {
            const response = await call("get", "teams");
            const teams = response.data;
            const index = teams.find((team)=> team.full_name === data.full_name);
            if(index){
                setTimeout(() => {
                    dispatch({
                        type: SET_ERROR,
                        payload: duplicateMessage,
                    });
                }, 1000);
            }
            else{
                await call("post", "teams", data);
                setTimeout(() => {
                    dispatch({ type: SET_CREATE_SUCCESS, payload: true });
                }, 1000);
                dispatch({
                    type: REMOVE_ERROR,
                });
            }
            
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
            dispatch({ type: SET_CREATE_SUCCESS, payload: false });
        }, 3000);
        dispatch({ type: SET_LOADING });
    }
}

export const deleteTeam = (id) => {
    return async (dispatch) => {
        dispatch({ type: SET_DELETE_SUCCESS, payload: false });
        dispatch({ type: SET_LOADING });
        try {
            await call("delete", `teams/${id}`);
            
            setTimeout(() => {
                dispatch({ type: SET_DELETE_SUCCESS, payload: true });
            }, 1000);
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
            dispatch({ type: SET_DELETE_SUCCESS, payload: false });
        }, 3000);
        dispatch({ type: SET_LOADING });
    }
}

export const editTeam = (id, data) => {
    return async (dispatch) => {
        dispatch({ type: SET_EDIT_SUCCESS, payload: false });
        dispatch({ type: SET_LOADING });
        try {
            const response = await call("get", "teams");
            const teams = response.data;
            const oldTeam = teams.filter((team)=> team.full_name === data.full_name);
            if(oldTeam.length !== 0 && oldTeam[0]?.id !== id){
                    setTimeout(() => {
                        dispatch({
                            type: SET_ERROR,
                            payload: duplicateMessage,
                        });
                    }, 1000);  
            }
            else{
                await call("put", `teams/${id}`, data);
                setTimeout(() => {
                    dispatch({ type: SET_EDIT_SUCCESS, payload: true });
                }, 1000);
                dispatch({
                    type: REMOVE_ERROR
                })
            }
        }
        catch (error) {
            console.log("error:", error)
            // const { status } = error.response;

            // if (status === 401) {
            //     localStorage.removeItem("user_name");
            //     dispatch({
            //         type: SET_ERROR,
            //         payload: unauthorizedMessage,
            //     });
            // }

            // else {
            //     dispatch({
            //         type: SET_ERROR,
            //         payload: serverErrorMessage,
            //     });
            // }

        }

        setTimeout(() => {
            dispatch({ type: SET_EDIT_SUCCESS, payload: false });
        }, 3000);
        dispatch({ type: SET_LOADING });
    }
}

export const getTeam = (id) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING });
        try {
            //in react component, if id === '', need to be 'state.team is empty'
            if(id === ''){   
                dispatch({
                    type: SET_TEAM,
                    payload: { },
                });
            }
            else{
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
