import axios from 'axios'
import { AppDispatch } from '../store'
import { getData, getError } from './dataSlice'
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
    // Dispatch getDataList to fetch updated data after deletion
    dispatch(getDataList())
    return id // Return data to be used in the fulfilled case
  }
)

// export const selectData = createAsyncThunk('form/selectData',async(id: string)=>{
//   const response = await axios.get(`${apiUrlData}/${id}`);
//   return response.data
// })

// export const selectData = (id: string) => async (dispatch: AppDispatch) => {
//   try {
//     const result = await axios.get(`${apiUrlData}/${id}`);
//     dispatch(getOneData(result.data));
//   } catch (error) {
//     dispatch(getError(error));
//   }
// };

export const updateData =
  (data: unknown, id: string) => async (dispatch: AppDispatch) => {
    try {
      const reults = await axios.put(`${apiUrlData}/${id}`, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      dispatch(getData(reults.data))
    } catch (error) {
      dispatch(getError(error))
    }
  }
