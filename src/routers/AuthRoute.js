import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = ({children})=>{
    const auth = useSelector((state)=> state.auth);
    if(!auth.isAuthenticated){
        return <Navigate to="/auth/login" replace/>
    }
    return children;
}
export default AuthRoute;