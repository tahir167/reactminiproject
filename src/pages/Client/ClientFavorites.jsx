import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SlBasket } from 'react-icons/sl';
import { enqueueSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { toggleFavorite } from '../../redux/features/favoritesSlice';
import { addToBasket } from '../../redux/features/basketSlice'; 
import controller from '../../services/requests/productsRequest.js';

const ClientFavorites = () => {
  const user = useSelector((state) => state.user.user);
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      if (favorites.length === 0) {
        setFavoriteProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const allProducts = await controller.getAll('/products');
        const filteredFavorites = allProducts.filter(product =>
          favorites.includes(product.id)
        );

        setFavoriteProducts(filteredFavorites);
      } catch (error) {
        console.error('Error fetching favorite products:', error);
        enqueueSnackbar("Error loading favorite products", {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right"
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteProducts();
  }, [favorites]); 

  const handleAddToBasket = (product) => {
    if (user && user.role === "client") {
      dispatch(addToBasket({ productId: product.id, quantity: 1 })); 
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to view your favorites.</p>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  if (favoriteProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <FaRegHeart className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">No Favorites Yet</h2>
          <p className="text-gray-600 mb-4">Start adding products to your favorites!</p>
          <Link
            to="/products"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-[90%] lg:w-[80%] mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">My Favorites</h1>
          <p className="text-gray-600">
            You have {favoriteProducts.length} product{favoriteProducts.length !== 1 ? 's' : ''} in your favorites
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {favoriteProducts.map((product) => {
            const isFavorite = favorites.includes(product.id);

            return (
              <div key={product.id} className="w-full h-auto lg:h-[480px] border rounded-lg overflow-hidden relative bg-white shadow-sm hover:shadow-md transition-shadow">
                <div
                  className='absolute right-[10px] top-[15px] w-[35px] h-[35px] bg-white rounded flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors shadow-sm z-10'
                  onClick={() => handleToggleFavorite(product.id)}
                >
                  {isFavorite ? (
                    <FaHeart className='text-red-500' />
                  ) : (
                    <FaRegHeart className='text-gray-500' />
                  )}
                </div>
                <img
                  src={product.imageUrl || '/placeholder-image.jpg'}
                  alt={product.title}
                  className='w-full h-[200px] lg:h-[37%] object-cover'
                />
                <div className='w-[90%] mx-auto flex flex-col gap-2 my-3'>
                  <h1 className='text-xl font-bold'>{product.title}</h1>
                  {product.title2 && <p>{product.title2}</p>}
                  {product.description && <p className="text-gray-600 text-sm">{product.description}</p>}
                  <p className='flex items-center'>
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-xl" />
                    ))}
                    <span className="ml-1">({product.rating || '5.0'})</span>
                  </p>
                  <h1 className='text-xl font-bold'>${product.price}</h1>
                  <p className='text-green-500'>{product.stock || 0} in stock</p>
                  <div className='flex gap-2 mb-3'>
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
      </div>
    </div>
  );
};

export default ClientFavorites;