
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import controller from '../../services/requests/productsRequest'; 
import { endpoints } from '../../constants'; 

import { login } from '../../redux/features/userSlice'; 

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Yanlış e-poçt formatı')
      .required('E-poçt mütləq doldurulmalıdır'),
    password: Yup.string()
      .min(6, 'Parol ən azı 6 simvol olmalıdır')
      .required('Parol mütləq doldurulmalıdır'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        setSubmitting(true);
        
        const users = await controller.getAll(endpoints.users);
        const adminUser = users.find(
          (u) => u.email === values.email && u.password === values.password && u.role === 'admin'
        );

        if (adminUser) {
          dispatch(login(adminUser)); 
          enqueueSnackbar(`Xoş gəldiniz, ${adminUser.fullName || adminUser.email}!`, {
            variant: 'success',
            autoHideDuration: 2000,
            anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
          });
          navigate('/admin', { replace: true });
        } else {
          enqueueSnackbar('Yanlış e-poçt və ya parol, ya da admin səlahiyyətləriniz yoxdur.', {
            variant: 'error',
            autoHideDuration: 3000,
            anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
          });
          setErrors({ email: ' ', password: 'Yanlış e-poçt və ya parol.' }); 
        }
      } catch (error) {
        console.error('Admin giriş xətası:', error);
        enqueueSnackbar('Giriş zamanı bir xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.', {
          variant: 'error',
          autoHideDuration: 3000,
          anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Girişi</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-poçt
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="admin@example.com"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Parol
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="••••••••"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors ${
              formik.isSubmitting || !formik.isValid
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {formik.isSubmitting ? 'Daxil Olunur...' : 'Daxil Ol'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;