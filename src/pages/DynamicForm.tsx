import { useEffect, useState } from 'react'
import { getAllFieldData } from '../redux/slice/formHandler'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import {  postData } from '../redux/dataSlice/dataHanlder'
import { useNavigate } from 'react-router'

const DynamicForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  

  useEffect(() => {
    dispatch(getAllFieldData())
  }, [dispatch])

  const data = useAppSelector((state) => state.fieldData.empList)
  const [validationMessages, setValidationMessages] = useState<Record<string, string>>({})
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget

    const newValidationMessages: Record<string, string> = {}

    // Iterate through each form field in the form
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
    console.log('Form submitted successfully:', formValues)
    dispatch(postData(formValues))
    navigate('/show')
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
            data?.map((field, index) => (
              <div key={index} className="mb-1  p-1 rounded-md">
                <label
                  htmlFor={field.name}
                  className="block text-gray-700 font-medium mb-1"
                >
                  {field.label || field.name}
                </label>

                {field.type === 'select' ? (
                  // Render a select field if the field type is 'select'
                  <select
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    {field?.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </select>
                ) : (
                  // Render an input field for other types
                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                )}
                {/* Display validation message for each field */}
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

