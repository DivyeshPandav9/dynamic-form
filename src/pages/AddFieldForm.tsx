import React, { FormEventHandler, useState } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { AppDispatch } from '../redux/store'
import { Errors, FieldInput } from '../types/types'
import { postFieldData } from '../redux/slice/formHandler'
import { useNavigate } from 'react-router'

const AddFieldForm = () => {
  const [errors, setErrors] = useState<Errors>({})
  const [newField, setNewField] = useState<FieldInput>({
    label: '',
    type: '',
    name: '',
    placeholder: '',
    options: [] as { value: string; label: string }[],
  })

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const validateInput = () => {
    const newErrors: Errors = {}

    if (!newField.label || newField.label.length < 3) {
      newErrors.label = 'Name must be at least 3 characters long.'
    }

    if (!newField.name || newField.name.length < 2) {
      newErrors.name = 'Age must be a positive integer.'
    }

    if (!newField.type) {
      newErrors.type = 'Type is required.'
    }

    if (!newField.placeholder || newField.placeholder.length < 3) {
      newErrors.placeholder = 'Job title must be at least 3 characters long.'
    }

    setErrors(newErrors)
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0
  }

  const showConfirmationDialog = async (title: string) => {
    const result = await Swal.fire({
      icon: 'success',
      title: title || 'Your work has been saved',
      showConfirmButton: true,
    })
    return result.isConfirmed
  }

  const handleForm: FormEventHandler = async (e) => {
    e.preventDefault()

    // Validate input before submission
    if (validateInput()) {
      const confirm = await showConfirmationDialog('Field added successfully')
      if (confirm) {
        setNewField({
          label: '',
          type: 'text',
          name: '',
          placeholder: '',
          options: [],
        })

        dispatch(postFieldData(newField))

        navigate('/dynamic')
      }
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setNewField({ ...newField, [name]: value })
  }

  const handleOptionsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target
    setNewField((prevField) => {
      const updatedOptions = prevField.options ? [...prevField.options] : []
      updatedOptions[index] = { ...updatedOptions[index], value }
      return { ...prevField, options: updatedOptions }
    })
  }

  const removeOption = (index: number) => {
    setNewField((prevField) => {
      const updatedOptions = prevField.options ? [...prevField.options] : []
      updatedOptions.splice(index, 1)
      return { ...prevField, options: updatedOptions }
    })
  }

  const addOption = () => {
    setNewField((prevField) => ({
      ...prevField,
      options: [...(prevField.options || []), { value: '', label: '' }],
    }))
  }
  const goToRemove = () => {
    navigate('/removeField')
  }

  return (
    <div className="border max-w-md mx-auto p-8 rounded-lg mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center mt-4">Super Form</h1>
      <form
        onSubmit={handleForm}
        className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Label</label>
          <input
            type="text"
            name="label"
            value={newField.label}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.label && (
            <div className="text-red-500 text-sm mt-1">{errors.label}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Type</label>
          <select
            name="type"
            value={newField.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="" disabled>
              Select field type
            </option>
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="email">Email</option>
            <option value="password">Password</option>
            <option value="select">Select</option>
            <option value="tel">tel</option>
          </select>
          {errors.type && (
            <div className="text-red-500 text-sm mt-1">{errors.type}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={newField.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.name && (
            <div className="text-red-500 text-sm mt-1">{errors.name}</div>
          )}
        </div>
        {newField.type === 'select' && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Options
            </label>
            {(newField.options || []).map((option, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={option.value}
                  onChange={(e) => handleOptionsChange(e, index)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md focus:outline-none hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="px-3 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
            >
              Add Option
            </button>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Placeholder
          </label>
          <input
            type="text"
            name="placeholder"
            value={newField.placeholder}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.placeholder && (
            <div className="text-red-500 text-sm mt-1">
              {errors.placeholder}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
        >
          Add Field
        </button>
        <button
          onClick={goToRemove}
          className="px-4 py-2 ml-2 bg-red-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
        >
          Remove Field
        </button>
      </form>
    </div>
  )
}

export default AddFieldForm

