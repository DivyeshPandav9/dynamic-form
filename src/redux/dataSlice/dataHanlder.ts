import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const apiUrlData = 'http://localhost:8000/data'

export const postData = createAsyncThunk(
  'form/postData',
  async (data: unknown) => {
    const response = await axios.post(apiUrlData, data, {
      headers: { 'Content-Type': 'application/json' },
    })
    return response.data
  }
)

export const getDataList = createAsyncThunk('form/getDataList', async () => {
  const response = await axios.get(apiUrlData)
  return response.data
})

export const deleteData = createAsyncThunk(
  'form/deleteData',
  async (id: string, { dispatch }) => {
    await axios.delete(`${apiUrlData}/${id}`)
    dispatch(getDataList())
    return id
  }
)
