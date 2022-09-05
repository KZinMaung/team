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
                console.log("Unauthorized user")
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

// export const getUser = () => {
//     return async (dispatch) => {
//         dispatch({ type: SET_LOADING });
//         try {
//             const response = await call("get", "api/users/myProfile");
//             const user = response.data.user;
//             const { name, email } = user;
//             dispatch({
//                 type: SET_CURRENT_USER,
//                 payload: { name, email },
//             });
//             dispatch({
//                 type: REMOVE_ERROR,
//             })
//         }
//         catch (error) {
//             const { status} = error.response;

//             if (status === 401) {
//                 localStorage.removeItem("jwtToken");
//                 dispatch({
//                     type: SET_ERROR,
//                     payload: unauthorizedMessage,
//                 });
//             }
  
//             else {
//                 dispatch({
//                     type: SET_ERROR,
//                     payload: serverErrorMessage,
//                 });
//             }

//         }
//         dispatch({ type: SET_LOADING })
//     }
// }

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