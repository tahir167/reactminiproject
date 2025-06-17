import React, { useEffect, useState } from 'react'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import controller from '../../services/requests/productsRequest';
import { endpoints } from '../../constants';
import { clearBasket } from '../../redux/features/basketSlice';

const ClientFormforPay = () => {
  const user = useSelector((state) => state.user.user);
  const basketItems = useSelector((state) => state.basket.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [detailedBasketItems, setDetailedBasketItems] = useState([]); 
  const [loadingBasket, setLoadingBasket] = useState(true); 
  const [totalOrderPrice, setTotalOrderPrice] = useState(0); 

  useEffect(() => {
    const fetchBasketDetails = async () => {
      if (!user || basketItems.length === 0) {
        setLoadingBasket(false);
        setDetailedBasketItems([]);
        setTotalOrderPrice(0);
        return;
      }

      setLoadingBasket(true);
      const productPromises = basketItems.map(async (item) => {
        try {
          const product = await controller.getOne(endpoints.products, item.productId);
          return { ...product, quantity: item.quantity }; 
        } catch (error) {
          console.error(`Error fetching product ${item.productId} for checkout:`, error);
          enqueueSnackbar(`Məhsul detalları yüklənərkən xəta: ${item.productId}`, { variant: "error" });
          return null;
        }
      });

      const fetchedProducts = await Promise.all(productPromises);
      const validProducts = fetchedProducts.filter(item => item !== null);
      setDetailedBasketItems(validProducts);

      const calculatedTotalPrice = validProducts.reduce((total, item) => total + (item.price * item.quantity), 0);
      setTotalOrderPrice(calculatedTotalPrice);

      setLoadingBasket(false);
    };

    fetchBasketDetails();
  }, [basketItems, user]); 


  const validationSchema = Yup.object({
    country: Yup.string()
      .required('Ölkə sahəsi mütləq doldurulmalıdır')
      .min(2, 'Ölkə adı ən azı 2 hərf olmalıdır'),
    city: Yup.string()
      .required('Şəhər sahəsi mütləq doldurulmalıdır')
      .min(2, 'Şəhər adı ən azı 2 hərf olmalıdır'),
    streetAddress: Yup.string()
      .required('Küçə ünvanı mütləq doldurulmalıdır')
      .min(5, 'Küçə ünvanı ən azı 5 hərf olmalıdır'),
    phoneNumber: Yup.string()
      .required('Telefon nömrəsi mütləq doldurulmalıdır')
      .matches(/^[0-9]{10}$/, 'Telefon nömrəsi 10 rəqəm olmalıdır'),
    orderNote: Yup.string()
      .required('Sifariş qeydi mütləq doldurulmalıdır')
      .min(3, 'Sifariş qeydi ən azı 3 hərf olmalıdır')
  });

  const formik = useFormik({
    initialValues: {
      country: '',
      city: '',
      streetAddress: '',
      phoneNumber: '',
      orderNote: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (!user) {
          enqueueSnackbar('Giriş etməmisiniz. Zəhmət olmasa daxil olun.', {
            variant: 'error', autoHideDuration: 3000, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
          });
          navigate('/login');
          return;
        }
        if (detailedBasketItems.length === 0) {
          enqueueSnackbar('Səbətiniz boşdur. Zəhmət olmasa məhsul əlavə edin.', {
            variant: 'error', autoHideDuration: 3000, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
          });
          return;
        }

        const productsForOrder = detailedBasketItems.map(item => ({
          productId: item.id, 
          name: item.title,
          quantity: item.quantity,
          price: item.price
        }));

        const finalTotalPrice = totalOrderPrice.toFixed(2);


        const newOrder = {
          id: Date.now().toString(), 
          userId: user.id,
          products: productsForOrder,
          orderDate: new Date().toISOString().split('T')[0], 
          country: values.country,
          city: values.city,
          "street adress": values.streetAddress, 
          phoneNumber: values.phoneNumber,
          orderNote: values.orderNote,
          totalPrice: finalTotalPrice
        };

        const response = await controller.post(endpoints.rentals, newOrder);

        if (response.status === 201 || response.status === 200) {
          enqueueSnackbar('Sifarişiniz uğurla verilmişdir!', {
            variant: 'success', autoHideDuration: 3000, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
          });

          dispatch(clearBasket());

          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          throw new Error('Sifariş verməkdə xəta');
        }

      } catch (error) {
        console.error('Order submission error:', error);
        enqueueSnackbar('Sifariş verməkdə xəta baş verdi', {
          variant: 'error', autoHideDuration: 3000, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
        });
      } finally {
        setSubmitting(false);
      }
    }
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Zəhmət olmasa giriş edin</h2>
          <p className="text-gray-600 mb-4">Sifariş vermək üçün hesabınıza giriş etməlisiniz.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Giriş
          </button>
        </div>
      </div>
    );
  }

  if (loadingBasket) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Səbət məlumatları yüklənir...</p>
        </div>
      </div>
    );
  }

  if (detailedBasketItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Səbətiniz boşdur</h2>
          <p className="text-gray-600 mb-4">Sifariş vermək üçün əvvəlcə məhsul əlavə edin.</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Məhsullara bax
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"> 
        <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Çatdırılma Məlumatları
          </h1>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Ölkə *
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formik.touched.country && formik.errors.country
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300'
                }`}
                placeholder="Məsələn: Azərbaycan"
              />
              {formik.touched.country && formik.errors.country && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.country}</p>
              )}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                Şəhər *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formik.touched.city && formik.errors.city
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300'
                }`}
                placeholder="Məsələn: Bakı"
              />
              {formik.touched.city && formik.errors.city && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.city}</p>
              )}
            </div>

            <div>
              <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">
                Küçə ünvanı *
              </label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={formik.values.streetAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formik.touched.streetAddress && formik.errors.streetAddress
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300'
                }`}
                placeholder="Məsələn: Nizami küçəsi 5"
              />
              {formik.touched.streetAddress && formik.errors.streetAddress && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.streetAddress}</p>
              )}
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Telefon nömrəsi *
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300'
                }`}
                placeholder="Məsələn: 0501234567"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.phoneNumber}</p>
              )}
            </div>

            <div>
              <label htmlFor="orderNote" className="block text-sm font-medium text-gray-700 mb-1">
                Sifariş qeydi *
              </label>
              <textarea
                id="orderNote"
                name="orderNote"
                rows={4}
                value={formik.values.orderNote}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formik.touched.orderNote && formik.errors.orderNote
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300'
                }`}
                placeholder="Sifarişinizlə bağlı qeydlərinizi yazın..."
              />
              {formik.touched.orderNote && formik.errors.orderNote && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.orderNote}</p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/basket')}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Geri qayıt
              </button>
              <button
                type="submit"
                disabled={formik.isSubmitting || !formik.isValid || detailedBasketItems.length === 0} 
                className={`flex-1 py-3 px-4 rounded-md text-white font-semibold transition-colors ${
                  formik.isSubmitting || !formik.isValid || detailedBasketItems.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {formik.isSubmitting ? 'Göndərilir...' : `Sifarişi ver (${totalOrderPrice.toFixed(2)}$)`} 
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-2xl font-bold mb-4">Sifariş Xülasəsi</h2>
            {detailedBasketItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b py-3 last:border-b-0">
                    <div className="flex items-center">
                        <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover rounded-md mr-4"/>
                        <div>
                            <p className="font-semibold text-gray-800">{item.title}</p>
                            <p className="text-sm text-gray-600">Miqdar: {item.quantity}</p>
                        </div>
                    </div>
                    <p className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            ))}
            <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-lg font-bold">
                    <span>Cəmi:</span>
                    <span>${totalOrderPrice.toFixed(2)}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ClientFormforPay;