
import {useAuthState} from "react-firebase-hooks/auth"

import { Navigate, Outlet } from "react-router-dom"
import { auth } from "./firebase";
import Loader from "./components/commonComponents/Loader";

function PrivateRouter() {
    const [user, loading, error] = useAuthState(auth);
    
    if(loading){
        return <Loader/>
    } else if(!user || error){
        return <Navigate to="/" replace/>
    }else{
        return <Outlet/>;
    }
}

export default PrivateRouter