import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDoc, doc, onSnapshot, query, collection, orderBy } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import EpisodeDetails from "../podcast/EpisodeDetails";
import AudioPlayer from "../podcast/AudioPlayer";

function PodcastDetails() {
  // useParams will give us an object where there will be all the parameters in the url. here we are destructuring the id parameter from it
  const { id } = useParams();
  console.log("ID", id);

  const navigate = useNavigate();
  // const userDoc =
  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [audioFile, setAudioFile] = useState("");

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document Data:", docSnap.data());
        setPodcast({ id: id, ...docSnap.data() });
      } else {
        console.log("no such podcast");
      }
    } catch (e) {
      console.log(e);
      toast.error("error");
    }
  };

  useEffect(()=>{
      const unsubscribe = onSnapshot(
        query(collection(db, "podcasts", id, "episodes"), orderBy("name")),
        (querySnapshot) =>{
          const episodeData = [];
          querySnapshot.forEach((doc)=>{
            episodeData.push({id:doc.id, ...doc.data()})
          })
          setEpisodes(episodeData);
        }
      );
      return () =>{
        unsubscribe();
      }
  }, [id]);



  return (
    <div className="podcast-wrapper">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems:"center" }}>
        <h2 style={{ textAlign: "left", width: "80%" }}>{podcast.title}</h2>

        {podcast.createdBy == auth.currentUser.uid && <Link to={`/Podcasts/${id}/create-episode`}><button>Create Episodes</button></Link>}
      </div>

      <div className="bannerImage-container">
        <img src={podcast.bannerImage} className="bannerImage" />
      </div>
      <p className="discription">{podcast.discription}</p>
      <h2>Episodes</h2>
      {episodes.length>0 ? 
      <div className=" episodes">
        {episodes.map((item, index)=>{
          return <EpisodeDetails 
          key = {index}
          index = {index+1}
          name = {item.name} 
          discription={item.discription} 
          audioFile={item.audioFile}
          onClick={(file)=>setAudioFile(file)}/>
        })}
        
      </div>
       : <p>No episodes Found</p>}
       {audioFile && <AudioPlayer audioFile={audioFile} image={podcast.displayImage}/>}
    </div>
    
  );
}

export default PodcastDetails;
