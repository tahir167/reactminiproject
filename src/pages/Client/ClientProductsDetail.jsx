import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { FaRegHeart } from "react-icons/fa";
import { SlBasket } from 'react-icons/sl';
import { useParams } from 'react-router-dom';
import controller from '../../services/requests/productsRequest';
import { endpoints } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/features/favoritesSlice';
import { addToBasket } from '../../redux/features/basketSlice'; 
import { enqueueSnackbar } from 'notistack';
import { FaHeart } from 'react-icons/fa';
const ClientproductsDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const favorites = useSelector((state) => state.favorites.favorites);
  const isFavorite = favorites.includes(id);

  useEffect(() => {
    controller.getOne(endpoints.products, id)
      .then((resp) => setProduct({ ...resp }))
      .catch((err) => console.error("Product loading error", err));
  }, [id]);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleToggleFavorite = () => {
    if (user && user.role === "client") {
      dispatch(toggleFavorite(id));
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

  const handleAddToBasket = () => {
    if (user && user.role === "client") {
      dispatch(addToBasket({ productId: product.id, quantity }));
      enqueueSnackbar(`${product.title} x${quantity} added to basket successfully`, {
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

  if (!product) {
    return <div className="text-center text-2xl mt-10">Loading...</div>;
  }

  const stars = Array.from({ length: 5 }, (_, index) => (
    <FaStar
      key={index}
      className={`text-xl ${index < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
    />
  ));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-[90%] mx-auto mt-5">
      <img
        className="w-full h-[400px] object-cover rounded-lg"
        src={product.imageUrl}
        alt={product.title}
      />
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-xl text-gray-500">{product.title2}</p>
        <p className="flex items-center gap-1">
          {stars} <span className="ml-2 text-gray-600">({product.rating} out of 5)</span>
        </p>
        <h1 className="text-3xl text-green-600 font-bold">${product.price} </h1>
        <h2 className="text-2xl font-bold">Description</h2>
        <p className="text-gray-500 text-lg">{product.description}</p>
        <p className="text-lg text-green-500">{product.stock || "No stock info"}</p>
        <h2 className="text-2xl font-bold">Quantity</h2>
        <div className="flex items-center gap-3 w-[200px]">
          <button onClick={decrement} className="w-10 h-10 text-xl bg-gray-200 rounded hover:bg-gray-300">-</button>
          <span className="text-xl font-semibold">{quantity}</span>
          <button onClick={increment} className="w-10 h-10 text-xl bg-gray-200 rounded hover:bg-gray-300">+</button>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            className="flex justify-center items-center gap-2 w-[85%] h-[40px] bg-black rounded text-white hover:bg-gray-800"
            onClick={handleAddToBasket}
          >
            <SlBasket /> Add to Basket
          </button>
          <button
            className="w-[15%] h-[40px] border border-gray-500 rounded flex items-center justify-center hover:bg-gray-100"
            onClick={handleToggleFavorite}
          >
            {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientproductsDetail;