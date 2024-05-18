import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { FieldInput } from '../../types/types'

const apiUrl = 'http://localhost:8000/employees'

// Thunk to post field data
export const postFieldData = createAsyncThunk(
  'form/postFieldData',
  async (empData: FieldInput) => {
    const response = await axios.post(apiUrl, empData, {
      headers: { 'Content-Type': 'application/json' },
    })
    return response.data
  }
)
 
// Thunk to get all field data
export const getAllFieldData = createAsyncThunk(
  'form/getAllFieldData',
  async () => {
    const response = await axios.get(apiUrl)
    return response.data 
  }
)

// Thunk to delete field data
export const deleteField = createAsyncThunk(
  'form/deleteField',
  async (id: string) => {
    await axios.delete(`${apiUrl}/${id}`)
    return id 
  }
)
