import { call } from "../../services/api";
import { unauthorizedMessage } from "../../utils/message";
import { REMOVE_ERROR, SET_CURRENT_USER, SET_ERROR, SET_LOADING } from "../type"

export const login = (userName, password) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING });
        dispatch({ type: REMOVE_ERROR });
       
            const response = await call("get", "users");
            const users = response.data;
           
            const authUser = users.find((user)=> userName === user.user_name && password === user.pwd);

            //unauthorized user
            if(!authUser){
                localStorage.removeItem("user_name");
                dispatch({
                    type: SET_ERROR,
                    payload: unauthorizedMessage,
                })
            }
            else{
                const {user_name} = authUser;
            
                localStorage.setItem("user_name", user_name);
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: { user_name},
                })
    
                dispatch({
                    type: REMOVE_ERROR,
                })
    
            }

        dispatch({ type: SET_LOADING });
    }
}


export const logout = ()=>{
    return async(dispatch)=>{
        localStorage.removeItem("user_name");
        dispatch({
            type: SET_CURRENT_USER,
            payload:{}
        });
        dispatch({
            type:REMOVE_ERROR
        });
    }
}