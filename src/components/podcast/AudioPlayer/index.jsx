import { useEffect, useRef, useState } from "react";
import "./style.css"
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

function AudioPlayer({audioFile, image}) {
    let audioRef = useRef();
    const [duration, setDurtion] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState();
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMute , setIsMute] = useState(false);


    useEffect(()=>{
        if(isPlaying){
            audioRef.current.play();
        }else{
            audioRef.current.pause();
        }
    },[isPlaying])

    useEffect(()=>{
        if(!isMute){//if isMute is false ie. !isMute
            // change the volume property to be not mute
            audioRef.current.volume = 1;
            setVolume(1);
        }else{
            // else if isMute is true it means we need the audio to be mute so mute it by making volume zero
            audioRef.current.volume = 0;
            setVolume(0);
        }
    },[isMute])


    // this function will set "duration" as the duration(length) of my current audio file
    const handleDuraition = ()=>{
        const duration = audioRef.current.duration;
        setDurtion(duration);
    }

    // this is used to constantly change the timestamp (the first p tag after play pause button) 
    // with the help of currentTime feature of ref 
    const handleTimeUpdate = ()=>{
        const currentTime = audioRef.current.currentTime;
        setCurrentTime(currentTime);
    }

    // handleSeek function is added to handle changes in the seek bar, allowing the user to jump to different positions in the audio track.
    const handleSeek = (e)=>{
        const seekTime = parseFloat(e.target.value);
        setCurrentTime(seekTime);
        audioRef.current.currentTime = seekTime;
    }

    // The formatTime helper function is introduced to format the time in MM:SS format for display.
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    const handleVolume = (e)=>{
        setVolume(e.target.value);
        audioRef.current.volume = e.target.value;
    }
    const togglePlay = ()=>{
        setIsPlaying(!isPlaying);
        
    }
    const toggleMute = ()=>{
        setIsMute(!isMute);
    }

    
    return (
    <div className="audioPlayer">
        <img src={image} className="displayImage"/>
        <audio 
        ref={audioRef} 
        src={audioFile}
        // The "onLoadedMetadata" event is used to set the duration when the audio metadata is loaded.
        onLoadedMetadata={handleDuraition}
        // The "onTimeupdate" event occurs when the play time of a media changes. 
        onTimeUpdate={handleTimeUpdate}/>
        <div className="duration-flex">
            <p onClick={togglePlay} style={{cursor:"pointer"}}>{isPlaying ? <FaPause/>:<FaPlay/>}</p>
            <p>{formatTime(currentTime)}</p>
            <input 
            type="range"
            value={currentTime}
            min={0}
            max={duration || 1}
            step={.01}
            onChange={handleSeek}
            className="duration-range"/>
            <p>{formatTime(duration)}</p>
        </div>
        <div className="volume-flex">
            <p onClick={toggleMute} style={{cursor:"pointer"}}>{!isMute ? <FaVolumeUp/>:<FaVolumeMute/>}</p>
            <input 
            type="range"
            value={volume}
            min={0}
            max={1}
            step={.01}
            onChange={handleVolume}
            className="volume-range"/>
        </div>
    </div>
  )
}

export default AudioPlayer