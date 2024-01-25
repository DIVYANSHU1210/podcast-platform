import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { setPodcasts } from "../../slices/podcastSlice";
import { useDispatch } from "react-redux";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import PodcastCard from "../podcast/podcastCard";
import InputComponent from "../commonComponents/inputSection";
import Loader from "../commonComponents/Loader";

let Podcasts = ()=>{
    const dispatch = useDispatch();
    
    
    // console.log(podcasts);
    const [search, setSearch]= useState("");
    
    
    useEffect(()=>{
        const unsubscribe = onSnapshot(
            query(collection(db, "podcasts")),
            (querySnapshot) =>{
                const podcastsData = [];
                querySnapshot.forEach((doc)=>{
                    podcastsData.push({id: doc.id, ...doc.data() });
                });
                dispatch(setPodcasts(podcastsData));
            },
            (error)=>{
                console.error("Error while fetching podcasts", error);
            }
        );

        return () =>{
            unsubscribe();
        }
    }, [dispatch]);

    const podcasts = useSelector((state) => state.podcasts.podcasts);
    let filteredPodcasts = podcasts.filter((item)=>item.title.toLowerCase().includes(search.toLowerCase()))
    
    return(
        <div className="input-wrapper" style={{marginTop:"3rem"}}>
            <h2>Discover Podcasts</h2>
            <InputComponent type="text" state= {search} setState={setSearch} placeholder="Search Podcast" required={true}></InputComponent>
            <div className="podcast-library">
                {filteredPodcasts.length > 0 ? 
                <>
                    {filteredPodcasts.map((item)=>{
                        return <PodcastCard id={item.id} image = {item.displayImage} title = {item.title}/>
                    })}
                </> 
                
                : <Loader/>
                // (<p>{search? "Podcast not found":"no podcasts available"}</p>)
                }
            </div>
        </div>
    )
}

export default Podcasts;