import { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import styles from "./MovieList.module.css";
import { ClipLoader } from "react-spinners";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPopularMovies() {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/popular?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const data = await res.json();

      const movieDTO = await Promise.all(
        data.results.map(async (movie) => {
          return {
            id: movie.id,
            title: movie.title,
            image: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
            note: movie.vote_average.toFixed(1),
            overview: movie.overview,
            date: movie.release_date,
          };
        })
      );
      // console.log(movieDTO);
      setMovies(movieDTO);

      setLoading(false);
    }
    fetchPopularMovies();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  } else {
    return (
      <>
        <h1>Liste des films populaires</h1>
        <div className={styles.grid}>
          {movies.map((movie, index) => (
            <MovieCard
              key={index}
              title={movie.title}
              image={movie.image}
              note={movie.note}
              movieId={movie.id}
            ></MovieCard>
          ))}
        </div>
      </>
    );
  }
};

export default MovieList;
