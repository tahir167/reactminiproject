
import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import loginValidation from '../../validations/loginValidation'
import controller from '../../services/requests/productsRequest'
import { endpoints } from '../../constants'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/features/userSlice'

const ClientLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginValidation,
    onSubmit: async (values, action) => {
      try {
        console.log(values)
        
        const users = await controller.getAll(endpoints.users)
        
        const validUser = users.find((u) => {
          return u.email === values.email && u.Password === values.password && u.role === "client"
        })
        
        if (validUser) {
          action.resetForm()
          
          enqueueSnackbar("User signed in successfully", {
            variant: "success",
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right"
            }
          })
          
          dispatch(login(validUser))
          navigate("/products")
        } else {
          enqueueSnackbar("Invalid credentials", {
            variant: "error",
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right"
            }
          })
        }
      } catch (error) {
        console.error('Login error:', error)
        enqueueSnackbar("Login failed. Please try again.", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right"
          }
        })
      }
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-[400px] space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <div>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            name="email"
            placeholder="Email Address"
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
            placeholder="Password"
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
          {formik.isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-center text-sm">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-700 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default ClientLogin