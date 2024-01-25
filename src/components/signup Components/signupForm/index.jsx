import { useState } from "react";
import InputComponent from "../../commonComponents/inputSection";
import CustomBtn from "../../commonComponents/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signupform() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasssword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);

  const handleSignIn = async () => {
    console.log("handling signin...");
    setLoader(true);

    if (password === confirmPasssword && password.length > 6) {
      try {
        // Creating user's account
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredentials.user;
        // console.log(user);

        // Saving user's details {by creating a doc and saving it in our firebase database}
        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
        });

        // save this data in redux
        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
          })
        );

        toast.success("signed in successfully");
        setLoader(false);
        // now as the user has been signed in. redirect him to the profile page
        navigate("/Profile");
      } catch (e) {
        toast.error(e.message);
        setLoader(false);
      }
    } else {
      // alert("password is invalid")
      if (password !== confirmPasssword) {
        toast.error("Password and confirm password should be same");
      } else if (password.length < 6) {
        toast.error("Password needs to be of 6 or more characters");
      }

      setLoader(false);
    }
  };

  return (
    <>
      <InputComponent
        type="text"
        state={fullName}
        setState={setFullName}
        placeholder="Full Name"
        required={true}
      />
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
      <InputComponent
        type="password"
        state={confirmPasssword}
        setState={setConfirmPassword}
        placeholder="Confirm Password"
        required={true}
      />
      {/* <button type="submit">Signup Now</button> */}
      <CustomBtn
        text={!loader ? "Signup Now" : "loading..."}
        disabeled={loader}
        onClick={handleSignIn}
      />
    </>
  );
}

export default Signupform;
