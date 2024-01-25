import { useState } from "react"
import InputComponent from "../commonComponents/inputSection"
import FileInput from "../commonComponents/inputSection/fileInput"
import { toast } from "react-toastify";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Custombtn from "../commonComponents/Button";


function createEpisode() {

    const {id}  = useParams();
    const [name, setName] = useState("");
    const [discription, setDiscription] = useState("");
    const [audioFile, setAudioFile] = useState(); 
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const audioFileHandle = async() =>{
        setLoader(true);
        toast("Creating Episode");
        if(name && discription && audioFile && id){
            try{
                const storage = getStorage();


                const audioFileRef = ref(
                    storage,
                    `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
                );

                await uploadBytes(audioFileRef, audioFile);

                const audioFileURL = await getDownloadURL(audioFileRef);

                const episodeData = {
                    name : name,
                    discription: discription,
                    audioFile : audioFileURL,
                    createdBy : auth.currentUser.uid
                };

                await addDoc(collection(db, "podcasts", id, "episodes"), episodeData);

                toast.success("Episode Created");
                navigate(`/Podcasts/${id}`)
                setName("");
                setDiscription("");
                setAudioFile(null);
                setLoader(false);
            }
            catch(e){
                console.log(e);
                toast.error(e);
            }
        }else{
          toast.error("Please fill all the values!!")
        }
    }

  return (
    <div className="input-wrapper">
        <h2>Create Episode</h2>
        <InputComponent
        type="text"
        placeholder="Episode name"
        required={true}
        state={name}
        setState={setName}
      />

      <InputComponent
        type="text"
        placeholder="Episode Description"
        required={true}
        state={discription}
        setState={setDiscription}
      />

      
      <FileInput
        text="add Audio file"
        id="AudioFile"
        accept={"audio/*"}
        fileHandleFunc={setAudioFile}
      />

    <Custombtn
        text={!loader ? "Create Now" : "creating..."}
        onClick={audioFileHandle}
        disabled={loader}
      ></Custombtn>


    </div>
  )
}

export default createEpisode;