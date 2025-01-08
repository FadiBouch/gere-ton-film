import { useContext, useEffect, useState } from "react";
import styles from "./MovieDetail.module.css";
import { useParams } from "react-router";
import { ClipLoader } from "react-spinners";
import { WishlistContext } from "../../contexts/WishlistProvider";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { wishlist, addToWishlist } = useContext(WishlistContext);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
            import.meta.env.VITE_API_KEY
          }`
        );
        if (!movieResponse.ok)
          throw new Error("Impossible de charger le film.");
        const movieData = await movieResponse.json();

        setMovie(movieData);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    const fetchActors = async () => {
      try {
        const actorsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${
            import.meta.env.VITE_API_KEY
          }`
        );
        if (!actorsResponse.ok)
          throw new Error("Impossible de charger les acteurs.");
        const actorsData = await actorsResponse.json();
        setActors(actorsData.cast.slice(0, 10));
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([fetchMovieDetails(), fetchActors()]);
      setLoading(false);
    };

    fetchAllData();
  }, [movieId]);

  if (error) {
    return <div className={styles.errorMessage}>Erreur : {error}</div>;
  }

  let isInWishlist = false;

  if (wishlist && wishlist.length > 0) {
    isInWishlist = wishlist.some((item) => item === movieId);
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  } else {
    return (
      <div className={styles.movieDetails}>
        <h1 className={styles.movieTitle}>{movie.title}</h1>
        <div className={styles.movieHeader}>
          <img
            src={"https://image.tmdb.org/t/p/w200" + movie.poster_path}
            alt={`Affiche de ${movie.title}`}
            className={styles.moviePoster}
          />
          <div className={styles.movieInfo}>
            <p>
              <strong>Résumé :</strong> {movie.overview}
            </p>
            <p>
              <strong>Date de sortie :</strong> {movie.release_date}
            </p>
            <p>
              <strong>Note moyenne :</strong> {movie.vote_average.toFixed(1)}/10
            </p>
          </div>
          <button
            className={styles.wishlistButton}
            onClick={() => addToWishlist(movieId)}
            disabled={isInWishlist ? true : false}
          >
            {isInWishlist ? "Déjà dans la Wishlist" : "Ajouter à la Wishlist"}
          </button>
        </div>

        <h2 className={styles.sectionTitle}>Acteurs principaux</h2>
        <ul className={styles.actorsList}>
          {actors.map((actor) => (
            <li key={actor.id} className={styles.actorItem}>
              {actor.name} - <em>{actor.character}</em>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default MovieDetail;
