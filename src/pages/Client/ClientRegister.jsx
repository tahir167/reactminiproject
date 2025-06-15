import React from 'react'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import controller from '../../services/requests/productsRequest'
import { endpoints } from '../../constants'
import registerValidationSchema from '../../../src/validations/registerValidation.js'
import Password from 'antd/es/input/Password.js'

const ClientRegister = () => {
  const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      fullName: "",
      profileImg: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values, action) => {
      const users = await controller.getAll(endpoints.users);
      const duplicateEmail = users.find((u) => u.email === values.email);

      if (duplicateEmail) {
        enqueueSnackbar("Email already taken", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right"
          }
        });
      } else {
      await  controller.post(endpoints.users,{
          fullName:values.fullName,
          email:values.email,
          Password:values.password,
          role:"client",
          phone:values.phone,
          profileImg:values.profileImg,
          registeredAt:new Date()

        })
        navigate("/login")
        enqueueSnackbar("User registered successfully", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right"
          }
          
        });
        action.resetForm();
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-[400px] space-y-4">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        <input
          name='fullName'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullName}
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
        )}

        <input
          name='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          type="email"
          placeholder="Email Address"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm">{formik.errors.email}</p>
        )}

        <input
          name='phone'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          type="tel"
          placeholder="Phone Number"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-500 text-sm">{formik.errors.phone}</p>
        )}

        <input
          name='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm">{formik.errors.password}</p>
        )}

        <input
          name='confirmPassword'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
        )}

        <input
          name='profileImg'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.profileImg}
          type="url"
          placeholder="Profile Image URL"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {formik.touched.profileImg && formik.errors.profileImg && (
          <p className="text-red-500 text-sm">{formik.errors.profileImg}</p>
        )}

        <button
          disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
          type="submit"
          className="w-full disabled:bg-blue-300 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>

        <div className='flex mx-auto justify-center'>
          <p>Already have an account?&nbsp;</p>
          <Link className='text-blue-700' to={"/login"}>Login</Link>
        </div>
      </form>
    </div>
  )
}

export default ClientRegister;
