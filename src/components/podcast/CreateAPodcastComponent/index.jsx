import { useState } from "react";
import InputComponent from "../../commonComponents/inputSection";
import Custombtn from "../../commonComponents/Button";
import FileInput from "../../commonComponents/inputSection/fileInput";
import { toast } from "react-toastify";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { auth, db } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";

function CreatePodcast() {
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [bannerImage, setBannerImage] = useState();
  const [displayImage, setdisplayImage] = useState();
  const [loader, setLoader] = useState(false);

  const handleCreatePod = async () => {
    setLoader(true);
    toast("creating Podcast");
    if (title && discription && bannerImage && displayImage) {
      try {
        // create the storage in my firbase
        const storage = getStorage();

        // create the reference for our images by "ref" function from firebase
        // the arguments for that are storage which we just created and a path where it will be stored
        // for path we are useing user's uid aand date.now because it will always create a usique reference for each image

        // upload the images using the reference we just created
        // and also giving the actual file,  OBVIOUSLY !!

        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );

        await uploadBytes(bannerImageRef, bannerImage);

        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);

        // now as we have uploaded our images into the firebase storage, it is time to download the image's url from firebase
        // to do that we use getDownloadURL function from firebase and give the image reference as its argument
        const bannerImageURL = await getDownloadURL(bannerImageRef);
        const displayImageURL = await getDownloadURL(displayImageRef);

        // now as we have the url of both the images it is time to create a doc for our podcast and save these urls and
        // other details like title and discription in it

        const podcastData = {
          title: title,
          discription: discription,
          bannerImage: bannerImageURL,
          displayImage: displayImageURL,
          createdBy: auth.currentUser.uid,
        };

        // So, the main difference between setDoc and addDoc is that setDoc can be used to both create
        // and update documents, and requires you to specify the document ID explicitly,
        // whereas addDoc is used only to add new documents, and generates
        // a new document ID automatically.
        await addDoc(collection(db, "podcasts"), podcastData);
        toast.success("Podcast created");
        setLoader(false);
      } catch (e) {
        toast.error(e.message);
        setLoader(false);
      }
    } else {
      toast.error("Please fill all the details");
      setLoader(false);
    }
  };

  const bannerHandle = (file) => {
    setBannerImage(file);
  };

  const dislpayImgHandle = (file) => {
    setdisplayImage(file);
  };
  return (
    <>
      <InputComponent
        type="text"
        placeholder="Podcast Title"
        required={true}
        state={title}
        setState={setTitle}
      />

      <InputComponent
        type="text"
        placeholder="Podcast Description"
        required={true}
        state={discription}
        setState={setDiscription}
      />

      <FileInput
        text="add Display Image"
        id="displayImage"
        accept={"image/*"}
        fileHandleFunc={dislpayImgHandle}
      />
      <FileInput
        text="add Banner Image"
        id="bannerImage"
        accept={"image/*"}
        fileHandleFunc={bannerHandle}
      />

      <Custombtn
        text={!loader ? "Create Now" : "creating..."}
        onClick={handleCreatePod}
        disabled={loader}
      ></Custombtn>
    </>
  );
}

export default CreatePodcast;
