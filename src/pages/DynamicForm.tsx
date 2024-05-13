import { useEffect, useState } from 'react'
// import {Todo} from '../types/types'
import { getAllFieldData } from '../redux/slice/formHandler'
// import { useNavigate } from 'react-router';
// import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { getDataList, postData } from '../redux/dataSlice/dataHanlder'
import { useNavigate } from 'react-router'
// import { FieldInput } from "../types/types";

const DynamicForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // const data1 = useAppSelector((state)=>state.fieldData.empList);

  //   const navigate = useNavigate();

  //   const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    dispatch(getAllFieldData())
  }, [dispatch])

  const data = useAppSelector((state) => state.fieldData.empList)
  // console.log(data);
  const [validationMessages, setValidationMessages] = useState<
    Record<string, string>
  >({})
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the form from submitting and refreshing the page
    event.preventDefault()

    // Get the form element from the event
    const form = event.currentTarget

    // Create an object to store validation messages
    const newValidationMessages: Record<string, string> = {}

    // Iterate through each form field in the form
    Array.from(form.elements).forEach((element) => {
      // Check if the element is an input or select element
      if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
        // Cast the element to the appropriate type
        const inputElement = element as HTMLInputElement | HTMLSelectElement

        // Check if the field value is empty
        if (inputElement.value.trim() === '') {
          // If the field is empty, set a validation message for that field
          newValidationMessages[
            inputElement.name
          ] = `The field "${inputElement.name}" is required.`
          // Optionally, add a CSS class for visual feedback
          inputElement.classList.add('invalid')
        } else {
          // If the field is not empty, remove any previous validation message
          newValidationMessages[inputElement.name] = ''
          // Remove the invalid CSS class if necessary
          inputElement.classList.remove('invalid')
        }
      }
    })

    // Set the new validation messages in the state
    setValidationMessages(newValidationMessages)

    // Check if there are any validation errors
    const hasValidationErrors = Object.values(newValidationMessages).some(
      (message) => message !== ''
    )

    // If there are validation errors, stop form submission and return
    if (hasValidationErrors) {
      return
    }

    // If all fields have values, proceed with form submission
    const formData = new FormData(form)
    // const formValues: Record<string, string> = {};
    const formValues: Record<string, string> = {}
    formData.forEach((value, key) => {
      formValues[key] = value as string
    })
    console.log('Form submitted successfully:', formValues)
    dispatch(postData(formValues))
    dispatch(getDataList())
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
// function getAllFieldData(): any {
//   throw new Error("Function not implemented.");
// }
