import React, { useContext } from "react";
import styles from "./MovieCard.module.css";
import { Link } from "react-router";
import { WishlistContext } from "../../contexts/WishlistProvider";

const MovieCard = ({ movieId, title, image, note, isDeletable = false }) => {
  const { removeFromWishlist } = useContext(WishlistContext);

  if (isDeletable) {
    return (
      <div className={styles.card}>
        <img className={styles.movieImage} src={image} />
        <h2 className={styles.movieName}>{title}</h2>
        <p className={styles.movieNote}>Note : {note}/10</p>
        <Link to={"/movies/" + movieId}>
          <button type="button">Détails</button>
        </Link>
        <button type="button" onClick={() => removeFromWishlist(movieId)}>
          Retirer
        </button>
      </div>
    );
  } else {
    return (
      <div className={styles.card}>
        <img className={styles.movieImage} src={image} />
        <h2 className={styles.movieName}>{title}</h2>
        <p className={styles.movieNote}>Note : {note}/10</p>
        <Link to={"/movies/" + movieId}>
          <button type="button">Détails</button>
        </Link>
      </div>
    );
  }
};

export default MovieCard;
