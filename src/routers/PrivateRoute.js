import { Navigate } from "react-router-dom";
import {useSelector} from "react-redux";
const PrivateRoute = ({children})=>{
    const auth = useSelector((state)=> state.auth);
    if(auth.isAuthenticated){
        return <Navigate to="/admin" replace/>
    }
    return children;
}
export default PrivateRoute;