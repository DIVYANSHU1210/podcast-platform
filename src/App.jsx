import { useEffect, useState } from 'react'

import './App.css'

import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Pages/Navbar'
import Podcasts from './components/Pages/Podcasts'
import Profile from './components/Pages/Profile'
import Signup from './components/Pages/Signup'
import StartAPodcast from './components/Pages/StartAPodcast'
import CreateEpisode from './components/Pages/CreateEpisode'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './firebase'
import { onSnapshot } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { setUser } from './slices/userSlice'
import PrivateRouter from './PrivateRouter'
import { doc } from 'firebase/firestore'
import PodcastDetails from './components/Pages/PodcastDetails'


function App() {
  const dispatch = useDispatch();

  // this peace of code will help to retrive current logged in user from my firebase 
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                })
              );
            }
          },
          (error) => {
            console.error("Error fetching user data", error);
          }
        );
  
        // Cleanup function for the snapshot subscription
        return () => {
          unsubscribeSnapshot();
        };
      }
    });
  
    // Cleanup function for the authentication subscription
    return () => {
      unsubscribeAuth();
    };
  }, []);
  
  
  const [count, setCount] = useState(0);
  return (
    <>  
      <Navbar/>
      <Routes>
        <Route path='/' element= {<Signup/>}/>
        <Route element={<PrivateRouter/>}>
          <Route path='/Podcasts' element={<Podcasts/>}/>
          <Route path='/startPodcast' element={<StartAPodcast/>}/>
          <Route path='/Profile' element={<Profile/>}/>
          {/* In the context of web development and routing, the colon (:) is commonly used to denote a dynamic segment in a URL. When you see a pattern like '/Podcasts/:id', the colon before 'id' indicates that 'id' is a placeholder for a variable value. */}
          <Route path='/Podcasts/:id' element={<PodcastDetails/>}></Route>
          <Route path='Podcasts/:id/create-episode' element={<CreateEpisode/>}></Route>
        </Route>
        
      </Routes>  
    </>
  )
}

export default App
