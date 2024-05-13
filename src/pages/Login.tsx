import React, { useEffect, useState } from 'react'
import bcrypt from 'bcryptjs' // Import bcryptjs
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { getAuthData } from '../redux/authSlice/authHandler'
import { FormErrors } from '../types/types'
import { useNavigate } from 'react-router'
import useAuth from '../hook/useAuth'
import Swal from 'sweetalert2'
const Login: React.FC = () => {
  useAuth('token')
  const [formData, setLoginData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    password: '',
  })

  const authData = useAppSelector((state) => state.auth.authData)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAuthData())
  }, [dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setErrors({
      ...errors,
      [e.target.name]: '', // Reset error message when user starts typing
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let formIsValid = true
    const newErrors: FormErrors = {
      name: '',
      email: '',
      password: '',
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
      formIsValid = false
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
      formIsValid = false
    }

    if (!formIsValid) {
      setErrors(newErrors)
      return
    }

    // Find the user's data based on the entered email
    const user = authData.find((userData) => userData.email === formData.email)

    if (user) {
      const isPasswordMatch = await bcrypt.compare(
        formData.password,
        user.password
      )

      if (isPasswordMatch) {
        const token =
          Math.random().toString(36).substr(2) +
          Math.random().toString(36).substr(2)

        // Set the token in localStorage
        localStorage.setItem('token', JSON.stringify(token))
        navigate('/')
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Login Successful!',
        })
        console.log('Login Successful')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Incorrect Password',
        })
        console.log('Incorrect Password')
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'User not found',
      })
      console.log('User not found')
    }
  }

  return (
    <div className="border max-w-md mx-auto p-8 rounded-lg mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center mt-4">Login Here</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Enter Your Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${
              errors.email ? 'border-red-500' : ''
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Enter Your Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${
              errors.password ? 'border-red-500' : ''
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
        >
          Sign in
        </button>
      </form>
    </div>
  )
}

export default Login
