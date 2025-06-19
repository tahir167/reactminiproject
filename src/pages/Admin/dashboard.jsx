import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import controller from '../../services/requests/productsRequest';
import { endpoints } from '../../constants';
import { enqueueSnackbar } from 'notistack';

const Dashboard = () => {
  const [rentals, setRentals] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedRentals = await controller.getAll(endpoints.rentals);
        const fetchedProducts = await controller.getAll(endpoints.products);
        setRentals(fetchedRentals);
        setProducts(fetchedProducts);
      } catch (err) {
        console.error('Dashboard məlumatlarını gətirmək alınmadı:', err);
        setError('Dashboard məlumatları yüklənərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
        enqueueSnackbar('Dashboard datası yüklənərkən xəta baş verdi.', {
          variant: 'error',
          autoHideDuration: 3000,
          anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const getOrdersByMonthData = () => {
    const monthlyOrders = {};
    rentals.forEach(rental => {
      const monthYear = new Date(rental.orderDate).toLocaleString('en-US', { month: 'short', year: 'numeric' });
      monthlyOrders[monthYear] = (monthlyOrders[monthYear] || 0) + 1;
    });

    const sortedMonths = Object.keys(monthlyOrders).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA - dateB;
    });

    return sortedMonths.map(monthYear => ({
      name: monthYear, 
      orders: monthlyOrders[monthYear],
    }));
  };

  const getMonthlyEarningsData = () => {
    const monthlyEarnings = {};
    rentals.forEach(rental => {
      const monthYear = new Date(rental.orderDate).toLocaleString('en-US', { month: 'short', year: 'numeric' });
      monthlyEarnings[monthYear] = (monthlyEarnings[monthYear] || 0) + parseFloat(rental.totalPrice || 0);
    });

    const sortedMonths = Object.keys(monthlyEarnings).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA - dateB;
    });

    return sortedMonths.map(monthYear => ({
      name: monthYear, 
      earnings: monthlyEarnings[monthYear],
    }));
  };

  const getCategorySalesData = () => {
    const categorySales = {};
    rentals.forEach(rental => {
      rental.products.forEach(rentedProduct => {
        const productDetail = products.find(p => p.id === rentedProduct.productId);
        if (productDetail) {
          const category = productDetail.category || 'Naməlum Kateqoriya';
          categorySales[category] = (categorySales[category] || 0) + (rentedProduct.quantity || 1);
        }
      });
    });

    return Object.keys(categorySales).map(category => ({
      name: category, 
      value: categorySales[category],
    }));
  };

  const ordersData = getOrdersByMonthData();
  const monthlyEarningsData = getMonthlyEarningsData();
  const categorySalesData = getCategorySalesData();

  const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF5733', '#33FF57', '#3357FF', '#FF69B4', '#1E90FF'];

  if (loading) {
    return <div className="text-center py-10 text-xl text-gray-600">Dashboard yüklənir...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-xl text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Admin Paneli İdarəetmə Paneli</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Aylar Üzrə Sifarişlər</h3>
        {ordersData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={ordersData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip formatter={(value) => `${value} sifariş`} />
              <Area type="monotone" dataKey="orders" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">Hələlik sifariş məlumatı yoxdur.</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Aylar Üzrə Qazanc</h3>
        {monthlyEarningsData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyEarningsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis formatter={(value) => `$${value.toFixed(2)}`} />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Bar dataKey="earnings" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">Hələlik aylar üzrə qazanc məlumatı yoxdur.</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Kateqoriyalar Üzrə Satış Sayı</h3>
        {categorySalesData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categorySalesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {categorySalesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name, props) => [`${value} ədəd`, props.payload.name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">Hələlik kateqoriya satış məlumatı yoxdur.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;