import { useFormik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import loginValidation from '../../validations/loginValidation';
import controller from '../../services/requests/productsRequest';
import { endpoints } from '../../constants';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/features/userSlice';

const ClientLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginValidation,
    onSubmit: async (values, action) => {
      try {
        console.log(values);

        const users = await controller.getAll(endpoints.users);

        const foundUser = users.find((u) => {
          return u.email === values.email && u.Password === values.password;
        });

        if (!foundUser) {
          enqueueSnackbar("Email və ya şifrə yanlışdır.", {
            variant: "error",
            autoHideDuration: 3000,
            anchorOrigin: { vertical: "bottom", horizontal: "right" }
          });
          return; 
        }

        if (foundUser.isBanned) {
          const now = new Date();
          let banMessage = "Hesabınız ban edilib.";

          if (foundUser.banUntil === "permanent") {
            banMessage = "Hesabınız daimi olaraq ban edilib. Daxil ola bilməzsiniz.";
          } else if (foundUser.banUntil && new Date(foundUser.banUntil) > now) {
            const banUntilDate = new Date(foundUser.banUntil).toLocaleDateString('az-AZ', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
            banMessage = `Hesabınız ban edilib. Siz ${banUntilDate} tarixinə qədər daxil ola bilməzsiniz.`;
          } else if (foundUser.banUntil && new Date(foundUser.banUntil) <= now) {
            try {
              const unbannedUser = {
                ...foundUser,
                isBanned: false,
                banDuration: null,
                banUntil: null,
                bannedAt: null,
              };
              await controller.update(endpoints.users, foundUser.id, unbannedUser);
              enqueueSnackbar("Ban müddətiniz bitdi. Daxil ola bilərsiniz.", { variant: "info" });
              foundUser.isBanned = false; 
            } catch (updateError) {
              console.error("Ban statusunu yeniləmək alınmadı:", updateError);
              enqueueSnackbar("Ban statusu yenilənərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.", { variant: "error" });
              return;
            }
          }
          
          if (foundUser.isBanned) { 
            enqueueSnackbar(banMessage, {
              variant: "warning",
              autoHideDuration: 5000,
              anchorOrigin: { vertical: "bottom", horizontal: "right" }
            });
            return; 
          }
        }
        if (foundUser.role === "client") {
          action.resetForm();

          enqueueSnackbar("Uğurla daxil oldunuz.", {
            variant: "success",
            autoHideDuration: 2000,
            anchorOrigin: { vertical: "bottom", horizontal: "right" }
          });

          dispatch(login(foundUser)); 
          navigate("/products"); 
        } else {
          enqueueSnackbar("Daxil olmaq üçün müştəri hesabı tələb olunur.", {
            variant: "error",
            autoHideDuration: 3000,
            anchorOrigin: { vertical: "bottom", horizontal: "right" }
          });
        }

      } catch (error) {
        console.error('Login zamanı xəta:', error);
        enqueueSnackbar("Daxil olmaq mümkün olmadı. Zəhmət olmasa yenidən cəhd edin.", {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "bottom", horizontal: "right" }
        });
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-[400px] space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Müştəri Girişi</h2>

        <div>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            name="email"
            placeholder="Email Ünvanı"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="password"
            placeholder="Şifrə"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-300"
        >
          {formik.isSubmitting ? 'Daxil olunur...' : 'Daxil Ol'}
        </button>

        <div className="text-center text-sm">
          <p>
            Hesabınız yoxdur?{' '}
            <Link to="/register" className="text-blue-700 hover:underline">
              Buradan qeydiyyatdan keçin
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ClientLogin;