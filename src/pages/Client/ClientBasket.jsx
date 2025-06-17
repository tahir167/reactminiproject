
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import controller from '../../services/requests/productsRequest';
import { endpoints } from '../../constants';
import { removeFromBasket, updateBasketQuantity } from '../../redux/features/basketSlice';
import { SlBasket } from 'react-icons/sl';

const ClientBasket = () => {
  const user = useSelector((state) => state.user.user);
  const basketItems = useSelector((state) => state.basket.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [detailedBasketItems, setDetailedBasketItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBasketDetails = async () => {
      if (!user) {
        setLoading(false);
        setDetailedBasketItems([]);
        return;
      }

      setLoading(true);
      const productPromises = basketItems.map(async (item) => {
        try {
          const product = await controller.getOne(endpoints.products, item.productId);
          return { ...product, quantity: item.quantity };
        } catch (error) {
          console.error(`Error fetching product ${item.productId}:`, error);
          enqueueSnackbar(`Error loading product details for ID: ${item.productId}`, { variant: "error" });
          return null;
        }
      });

      const fetchedProducts = await Promise.all(productPromises);
      setDetailedBasketItems(fetchedProducts.filter(item => item !== null));
      setLoading(false);
    };

    fetchBasketDetails();
  }, [basketItems, user]);

  const handleRemoveFromBasket = (productId) => {
    dispatch(removeFromBasket(productId));
    enqueueSnackbar("Product removed from basket", {
      variant: "info",
      autoHideDuration: 2000,
      anchorOrigin: { vertical: "bottom", horizontal: "right" }
    });
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromBasket(productId);
    } else {
      dispatch(updateBasketQuantity({ productId, quantity: newQuantity }));
    }
  };

  const calculateTotalPrice = () => {
    return detailedBasketItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleProceedToCheckout = () => {
    if (!user) {
      enqueueSnackbar("Zəhmət olmasa əvvəlcə daxil olun", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: { vertical: "bottom", horizontal: "right" }
      });
      navigate('/login');
      return;
    }

    if (detailedBasketItems.length === 0) {
      enqueueSnackbar("Səbətiniz boşdur", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: { vertical: "bottom", horizontal: "right" }
      });
      return;
    }

    navigate('/clientformforpay');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to view your basket.</p>
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your basket...</p>
        </div>
      </div>
    );
  }

  if (detailedBasketItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <SlBasket className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your Basket is Empty</h2>
          <p className="text-gray-600 mb-4">Looks like you haven't added anything to your basket yet.</p>
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
      <div className="w-[80%] mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Shopping Basket</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            {detailedBasketItems.map((item) => (
              <div key={item.id} className="flex items-center border-b py-4 last:border-b-0">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md mr-6"
                />
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="w-8 h-8 text-lg bg-gray-200 rounded-l hover:bg-gray-300 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-lg font-semibold border-t border-b py-1">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="w-8 h-8 text-lg bg-gray-200 rounded-r hover:bg-gray-300 transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveFromBasket(item.id)}
                      className="ml-6 text-red-600 hover:text-red-800 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between text-lg mb-2">
              <span>Subtotal ({basketItems.length} items):</span>
              <span>${calculateTotalPrice()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold mb-4">
              <span>Total:</span>
              <span>${calculateTotalPrice()}</span>
            </div>
            <button
              onClick={handleProceedToCheckout} 
              className="w-full bg-green-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientBasket;