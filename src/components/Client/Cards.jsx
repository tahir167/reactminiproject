import React from 'react'
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SlBasket } from 'react-icons/sl';
import { enqueueSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { toggleFavorite } from '../../redux/features/favoritesSlice';
import { addToBasket } from '../../redux/features/basketSlice';

const Cards = ({ products }) => {
  const user = useSelector((state) => state.user.user);
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();

  const handleAddToBasket = (product, quantity = 1) => {
    if (user && user.role === "client") {
      dispatch(addToBasket({ productId: product.id, quantity }));
      enqueueSnackbar(`${product.title} added to basket successfully`, {
        variant: "success",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right"
        }
      });
    } else {
      enqueueSnackbar("You should be logged in to add to basket", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right"
        }
      });
    }
  };

  const handleToggleFavorite = (productId) => {
    if (user && user.role === "client") {
      dispatch(toggleFavorite(productId));
      const isFavorite = favorites.includes(productId);
      enqueueSnackbar(
        isFavorite ? "Removed from favorites" : "Added to favorites",
        {
          variant: isFavorite ? "info" : "success",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right"
          }
        }
      );
    } else {
      enqueueSnackbar("You should be logged in to manage favorites", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right"
        }
      });
    }
  };

  return (
    <div className="grid grid-cols-4 gap-7 w-[80%] mx-auto mt-7">
      {products.map((product) => {
        const isFavorite = favorites.includes(product.id);

        return (
          <div key={product.id} className="w-full h-[480px] border rounded-lg overflow-hidden relative">
            <div
              className='absolute left-[85%] top-[15px] w-[35px] h-[35px] bg-white rounded flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors shadow-sm'
              onClick={() => handleToggleFavorite(product.id)}
            >
              {isFavorite ? (
                <FaHeart className='text-red-500' />
              ) : (
                <FaRegHeart className='text-gray-500' />
              )}
            </div>
            <img src={product.imageUrl} alt={product.title} className='w-full h-[37%] object-cover' />
            <div className='w-[90%] mx-auto flex flex-col gap-2 my-3'>
              <h1 className='text-xl font-bold'>{product.title}</h1>
              <p>{product.title2}</p>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <p className='flex items-center'>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl" />
                ))}
                <span className="ml-1">({product.rating})</span>
              </p>
              <h1 className='text-xl font-bold'>${product.price}</h1>
              <p className='text-green-500'>{product.stock} in stock</p>
              <div className='flex gap-2'>
                <button
                  className='w-[70%] h-[40px] bg-black rounded-lg text-white flex gap-2 justify-center items-center hover:bg-gray-800 transition'
                  onClick={() => handleAddToBasket(product)}
                >
                  <SlBasket /> Add to Basket
                </button>
                <button className='w-[30%] h-[40px] border border-slate-300 rounded-lg hover:bg-gray-50 transition'>
                  <Link to={`/products/${product.id}`} className="w-full h-full flex items-center justify-center">
                    Details
                  </Link>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;