import { useEffect, useState } from 'react'
import { getAllFieldData } from '../redux/slice/formHandler'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { postData } from '../redux/dataSlice/dataHanlder'
import { useNavigate } from 'react-router'

const DynamicForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllFieldData())
  }, [dispatch])

  const data = useAppSelector((state) => state.fieldData.empList)
  const [validationMessages, setValidationMessages] = useState<Record<string, string>>({})

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const newValidationMessages: Record<string, string> = {}

    Array.from(form.elements).forEach((element) => {
      if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
        const inputElement = element as HTMLInputElement | HTMLSelectElement
        if (inputElement.value.trim() === '') {
          newValidationMessages[
            inputElement.name
          ] = `The field "${inputElement.name}" is required.`
          inputElement.classList.add('invalid')
        } else {
          newValidationMessages[inputElement.name] = ''
          inputElement.classList.remove('invalid')

          const fieldData = data.find(
            (field) => field.name === inputElement.name
          )

          if (fieldData) {
            // Validate using custom regex if provided
            if (
              fieldData.regex &&
              typeof fieldData.regex === 'string' && // Check if fieldData.regex is a string
              !new RegExp(fieldData.regex).test(inputElement.value.trim())
            ) {
              newValidationMessages[
                inputElement.name
              ] = `The field "${inputElement.name}" is invalid.`
              inputElement.classList.add('invalid')
            }

            // Additional validation for specific types
            if (
              inputElement.type === 'email' &&
              !isValidEmail(inputElement.value.trim())
            ) {
              newValidationMessages[inputElement.name] =
                'Please enter a valid email address.'
              inputElement.classList.add('invalid')
            }
            if (
              inputElement.type === 'tel' &&
              !isValidPhoneNumber(inputElement.value.trim())
            ) {
              newValidationMessages[inputElement.name] =
                'Please enter a valid phone number.'
              inputElement.classList.add('invalid')
            }
            if (
              inputElement.type === 'password' &&
              !isStrongPassword(inputElement.value.trim())
            ) {
              newValidationMessages[inputElement.name] =
                'Password must contain at least 8 characters including uppercase, lowercase, and numeric characters.'
              inputElement.classList.add('invalid')
            }
          }
        }
      }
    })

    setValidationMessages(newValidationMessages)
    const hasValidationErrors = Object.values(newValidationMessages).some(
      (message) => message !== ''
    )

    if (hasValidationErrors) {
      return
    }

    const formData = new FormData(form)
    const formValues: Record<string, string> = {}
    formData.forEach((value, key) => {
      formValues[key] = value as string
    })

    await dispatch(postData(formValues))
    navigate('/show')
  }

  // Function to validate email format
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Function to validate phone number format
  const isValidPhoneNumber = (phoneNumber: string): boolean => {
    const phoneRegex = /^\+?[1-9]\d{9}$/
    return phoneRegex.test(phoneNumber)
  }

  // Function to validate password complexity
  const isStrongPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    return passwordRegex.test(password)
  }

  return (
    <>
      <div className="border max-w-md mx-auto p-8 rounded-lg mt-8">
        <h1 className="text-2xl font-bold mb-4 text-center mt-4">
          Dynamic Form
        </h1>
        <form
          className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg"
          onSubmit={handleSubmit}
        >
          {data.length > 0 ? (
            data.map((field, index) => (
              <div key={index} className="mb-1 p-1 rounded-md">
                <label
                  htmlFor={field.name}
                  className="block text-gray-700 font-medium mb-1"
                >
                  {field.label || field.name}
                </label>
                {field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    {field.options ? (
                      field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.value}
                        </option>
                      ))
                    ) : (
                      <option disabled>No options available</option>
                    )}
                  </select>
                ) : (
                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                )}
                {validationMessages[field.name] && (
                  <span className="text-red-600">
                    {validationMessages[field.name]}
                  </span>
                )}
              </div>
            ))
          ) : (
            <h3>Reload to show data</h3>
          )}
          <button
            type="submit"
            className="w-full px-3 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default DynamicForm
