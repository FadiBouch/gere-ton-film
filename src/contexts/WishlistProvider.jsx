import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext(undefined);

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    console.log(wishlist, "wish");
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (id) => {
    if (!wishlist.find((item) => item === id) && id) {
      setWishlist([...wishlist, id]);
    }
  };

  const removeFromWishlist = (id) => {
    console.log(id, "remove");
    setWishlist(wishlist.filter((x) => x != id));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
