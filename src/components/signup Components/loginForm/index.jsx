import { useState } from "react";
import InputComponent from "../../commonComponents/inputSection";
import CustomBtn from "../../commonComponents/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../../firebase";
import { getDoc, doc } from "firebase/firestore";
import { setUser } from "../../../slices/userSlice";
import { toast } from "react-toastify";


function Loginform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

  const handleLogIn = async()=> {
    console.log("handling signin...")
    setLoader(true);

        if(password.length > 6){
            try{
                // login user's account
                const userCredentials = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
                // console.log(userCredentials);
                const user = userCredentials.user;
                // console.log(user);

                // Saving user's details {by creating a doc and saving it in our firebase database}
                let userDoc = await getDoc(doc(db, "users", user.uid));
                let userData = userDoc.data();
                

                // save this data in redux
                dispatch(setUser({
                    name : userData.name,
                    email: user.email,
                    uid : user.uid
                }))
                toast.success("succesfully logged in")
                // now as the user has been logged in. redirect him to the profile page
                navigate("/Profile");
                setLoader(false);
                
            }catch(e){
                console.log("error", e)
                toast.error(e.message);
                setLoader(false);
            }
        }
        else{
            toast.error("password is invalid")
            setLoader(false);
        }
}
  

  return (
    <>
      <InputComponent
        type="email"
        state={email}
        setState={setEmail}
        placeholder="Email"
        required={true}
      />
      <InputComponent
        type="password"
        state={password}
        setState={setPassword}
        placeholder="Password"
        required={true}
      />
    <CustomBtn text={!loader ? "Login Now" : "loading..."} disabeled = {loader} onClick = {handleLogIn}/>
    </>
  );
}

export default Loginform;