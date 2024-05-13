import React, { useState } from 'react'
import bcrypt from 'bcryptjs' // Import bcryptjs
import { useAppDispatch } from '../redux/hooks'
import { signinData } from '../redux/authSlice/authHandler'
import { useNavigate } from 'react-router'
import { FormErrors } from '../types/types'
import useAuth from '../hook/useAuth'

const Signin: React.FC = () => {
  useAuth('token')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setErrors({
      ...errors,
      [e.target.name]: '', // Reset error message when user starts typing
    })
  }

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validation
    let formIsValid = true
    const newErrors: FormErrors = {
      name: '',
      email: '',
      password: '',
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
      formIsValid = false
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

    // Hash the password
    const hashedPassword = await bcrypt.hash(formData.password, 10) // 10 is the salt rounds

    const data = { ...formData, password: hashedPassword }
    console.log(data)

    dispatch(signinData(data))
    navigate('/login')
  }

  return (
    <div className="border max-w-md mx-auto p-8 rounded-lg mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center mt-4">Signup Here</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Enter Your Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="divyesh.."
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${
              errors.name ? 'border-red-500' : ''
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

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

export default Signin
