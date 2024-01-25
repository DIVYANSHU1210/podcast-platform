import { useState } from "react";

import Signupform from "../signup Components/signupForm";
import Loginform from "../signup Components/loginForm";

let Signup = ()=>{
    

    const [flag, setFlag] = useState(false);

    return(
        <div className="input-wrapper"> 
            {!flag ? <h2>Signup page</h2> : <h2>Login Page</h2>}
            {!flag ? <Signupform/> : <Loginform/>}
            {!flag ? <p className="link" onClick={()=>setFlag(!flag)}>Already Have An Account? Login.</p> : <p className = "link" onClick={()=>setFlag(!flag)}>Don't Have An Account? Signin.</p>}   
        </div>
    )
}

export default Signup;