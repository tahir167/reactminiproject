import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/features/userSlice';
import { enqueueSnackbar } from 'notistack';
import controller from '../../services/requests/productsRequest';
import { endpoints } from '../../constants';

const ClientProfile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [addAmount, setAddAmount] = useState('');
  const [addingBalance, setAddingBalance] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const allRentals = await controller.getAll(endpoints.rentals);
        const userOrders = allRentals.filter(order => String(order.userId) === String(user.id));
        setOrders(userOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoadingOrders(false);
      }
    };

    if (user) fetchOrders();
  }, [user]);
  

  const handleAddBalance = async () => {
    const amount = parseFloat(addAmount);
    if (!amount || amount <= 0) {
      enqueueSnackbar('Düzgün məbləğ daxil edin', { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      return;
    }

    setAddingBalance(true);
    try {
      const newBalance = parseFloat((parseFloat(user.balance || 0) + amount).toFixed(2));
      await controller.update(endpoints.users, user.id, { balance: newBalance });
      dispatch(updateUser({ balance: newBalance }));
      setAddAmount('');
      enqueueSnackbar(`$${amount.toFixed(2)} balansa əlavə edildi!`, { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
    } catch (error) {
      enqueueSnackbar('Balans yenilənərkən xəta baş verdi', { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
    } finally {
      setAddingBalance(false);
    }
  };

  return (
    <div className="w-[90%] lg:w-[80%] mx-auto mt-7 mb-10 flex flex-col gap-7">

      {/* Üst hissə: profil + balance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">

        {/* Profil kartı */}
        <div className='border border-gray-400 rounded-lg p-5'>
          <div className='flex flex-col items-center gap-1'>
            <img className='w-[90px] h-[90px] rounded-full border' src={user.profileImg} alt="" />
            <h1 className='text-xl font-bold'>{user.fullName}</h1>
            <p className='text-lg text-gray-600'>{user.email}</p>
          </div>
          <div className='flex justify-between mt-4'>
            <div className='flex flex-col gap-1'>
              <p className='text-gray-600'>Member Since:</p>
              <p className='text-gray-600'>Balance:</p>
              <p className='text-gray-600'>Total orders:</p>
            </div>
            <div className='flex flex-col gap-1 items-end'>
              <p>{new Date(user.registeredAt).getFullYear()}</p>
              <p className='text-green-500 font-semibold'>${parseFloat(user.balance || 0).toFixed(2)}</p>
              <p>{orders.length}</p>
            </div>
          </div>
        </div>

        {/* Balance artır kartı */}
        <div className='border border-gray-400 rounded-lg p-5 flex flex-col justify-center gap-4'>
          <h2 className='text-xl font-bold text-gray-800'>Balans Artır</h2>
          <p className='text-gray-500 text-sm'>Hesabınıza balans əlavə edin</p>
          <div className='flex gap-2'>
            {[10, 25, 50, 100].map(amount => (
              <button
                key={amount}
                onClick={() => setAddAmount(String(amount))}
                className={`flex-1 py-2 rounded-md border text-sm font-medium transition ${addAmount === String(amount) ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                ${amount}
              </button>
            ))}
          </div>
          <div className='flex gap-2'>
            <input
              type="number"
              min="1"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              placeholder="Məbləğ daxil edin..."
              className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'
            />
            <button
              onClick={handleAddBalance}
              disabled={addingBalance}
              className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed text-sm'
            >
              {addingBalance ? 'Əlavə edilir...' : 'Əlavə et'}
            </button>
          </div>
        </div>
      </div>

      {/* Sifarişlər */}
      

    </div>
  )
}

export default ClientProfile