import "./App.css";
import MovieList from "./pages/MovieList/MovieList";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import { BrowserRouter, Route, Routes } from "react-router";
import WishlistProvider from "./contexts/WishlistProvider";
import Wishlist from "./pages/Wishlist/Wishlist";

function App() {
  return (
    <>
      <WishlistProvider>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movies/:movieId" element={<MovieDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </WishlistProvider>
    </>
  );
}

export default App;
