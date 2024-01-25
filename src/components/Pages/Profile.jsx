import { useSelector } from "react-redux";
import Custombtn from "../commonComponents/Button";
import { toast } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";
import { doc, collection, onSnapshot, query } from "firebase/firestore";
import PodcastCard from "../podcast/podcastCard";
import Loader from "../commonComponents/Loader";

let Profile = () => {
  const activeUser = useSelector((state) => state.User.user);
  const [podcastsData, setPodcastData] = useState([]);

  console.log("auth user:", auth.currentUser.uid);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const usersPodcastsData = [];
        querySnapshot.forEach((doc) => {
          // console.log("created by: " ,doc.data.createdBy);
          if (doc.data().createdBy === auth.currentUser.uid)
            usersPodcastsData.push({ id: doc.id, ...doc.data() });
        });
        setPodcastData(usersPodcastsData);
      },
      (error) => {
        console.error("Error while fetching podcasts", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const logoutFunc = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("Logged out");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
  };

  console.log("hello", activeUser);
  if (!activeUser) {
    return <Loader/>;
  }
  return (
    <div className="input-wrapper">
      <h2>Profile</h2>
      <div className="profile-pic"></div>
      <p>Welcome {activeUser.name}</p>
      <h2>Your Podcasts</h2>
      <div className="podcast-library">
        {podcastsData.length > 0 ? (
          <>
            {podcastsData.map((item) => {
              return (
                <PodcastCard
                  id={item.id}
                  image={item.displayImage}
                  title={item.title}
                />
              );
            })}
          </>
        ) : (
          <p>No podcast available</p>
        )}
      </div>
      <Custombtn
        text="Logout"
        onClick={logoutFunc}
        disabled={false}
      ></Custombtn>
    </div>
  );
};

export default Profile;
