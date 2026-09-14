import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { deletewishlist } from "../services/wishlistservice";
import { removeFromWishlist } from "../redux/slice/wishlistSlice";

function Wishlist() {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const handleRemove = async (item) => {
    try {
      await deletewishlist(item.wishlistId);

      dispatch(removeFromWishlist(item.id));
    } catch (error) {
      console.log("Failed to remove wishlist item:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f3ed] px-6 py-10">

      <h1 className="text-4xl font-bold text-center text-[#2F5D50]">
        My Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center mt-20">

          <Heart
            size={60}
            className="mx-auto text-gray-400"
          />

          <h2 className="text-2xl font-bold mt-4">
            Your wishlist is empty
          </h2>

          <p className="text-gray-500 mt-2">
            Add your favourite products to your wishlist.
          </p>

          <Link
            to="/product"
            className="inline-block mt-6 bg-[#2F5D50] text-white px-6 py-3 rounded-xl"
          >
            Explore Products
          </Link>

        </div>
      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">

          {wishlistItems.map((item) => (

            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-4 shadow"
            >

              <Link to={`/product/${item.id}`}>

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-60 object-cover rounded-lg"
                />

                <h2 className="text-xl font-bold mt-4">
                  {item.name}
                </h2>

                <p className="text-lg font-bold text-[#2F5D50] mt-2">
                  ₹{item.price}
                </p>

              </Link>

              <button
                onClick={() => handleRemove(item)}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-xl"
              >
                <Trash2 size={18} />
                Remove
              </button>

            </motion.div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Wishlist;
