import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const url = 'http://localhost:8000/users'

export const signinData = createAsyncThunk(
  'form/signinData',
  async (data: unknown) => {
    const response = await axios.post(url, data, {
      headers: { 'Content-Type': 'application/json' },
    })
    return response.data
  }
)

export const getAuthData = createAsyncThunk('form/getAuthData', async () => {
  const response = await axios.get(url)
  return response.data
})
