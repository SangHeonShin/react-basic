import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

function Detail() {
  const { id } = useParams();
  console.log(useParams());
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          <Movie
            key={movie.id}
            id={movie.id}
            rating={movie.rating}
            coverImg={movie.medium_cover_image}
            title={movie.title}
            year={movie.year}
            summary={""}
            genres={movie.genres}
          />
        </div>
      )}
    </div>
  );
}

export default Detail;
