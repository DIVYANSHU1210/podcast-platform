
import { NavLink } from "react-router-dom";

let Navbar = ()=>{
    return (
        <div className="navbar">
            <div className="gradient"></div>
            <NavLink to = "/">Signup</NavLink>
            <NavLink to = "/Podcasts">Podcasts</NavLink>
            <NavLink to ="/startPodcast">Start A Podcast</NavLink>
            <NavLink to = "/Profile">Profile</NavLink>
        </div>
        
    )
}

export default Navbar;