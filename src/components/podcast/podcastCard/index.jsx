import { Link } from "react-router-dom";
import "./style.css";

function PodcastCard({id, image, title}) {
  return (
    <Link to={`/Podcasts/${id}`}>
      <div className="podcastCard">
        <img src={image} />
        <p>{title}</p>
      </div>
    </Link>
  );
}

export default PodcastCard;
