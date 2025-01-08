import { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../contexts/WishlistProvider";
import styles from "./Wishlist.module.css";
import MovieCard from "../../components/MovieCard/MovieCard";

const Wishlist = () => {
  const [wishlistMovies, setWishlistMovies] = useState([]);

  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  useEffect(() => {
    const fetchWishlistMovies = async () => {
      const fetchedMovies = await Promise.all(
        wishlist.map(async (id) => {
          if (id) {
            const res = await fetch(
              `https://api.themoviedb.org/3/movie/${id}?api_key=${
                import.meta.env.VITE_API_KEY
              }`
            );

            const movie = await res.json();
            return {
              title: movie.title,
              id: movie.id,
              title: movie.title,
              image: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
              note: movie.vote_average.toFixed(1),
              overview: movie.overview,
              date: movie.release_date,
            };
            // setWishlistMovies([...wishlistMovies, movie]);
          }
        })
      );
      setWishlistMovies(fetchedMovies);
    };

    fetchWishlistMovies();
  }, [wishlist]);

  return (
    <>
      <h1>Liste de souhaits</h1>
      <div className={styles.grid}>
        {wishlistMovies.map((movie, index) => (
          <MovieCard
            key={index}
            isDeletable={true}
            title={movie.title}
            image={movie.image}
            note={movie.note}
            movieId={movie.id}
          ></MovieCard>
        ))}
      </div>
    </>
  );
};

export default Wishlist;
