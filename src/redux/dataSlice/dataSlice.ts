import { createSlice } from '@reduxjs/toolkit'
import {} from '../../types/types'
import { deleteData, getDataList, postData } from './dataHanlder'

const initialState = {
  dataList: [],
  error: {
    message: '',
  },
  loading: false,
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {  },
  extraReducers: (builder) => {
    builder
      //postData api handle
      .addCase(postData.pending, (state) => {
        state.loading = true
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.loading = false
        state.dataList = action.payload
      })
      .addCase(postData.rejected, (state, action) => {
        state.loading = false
        console.log(action.error)
      })

      //getDataList api handle
      .addCase(getDataList.pending, (state) => {
        state.loading = true
      })
      .addCase(getDataList.fulfilled, (state, action) => {
        state.loading = false
        state.dataList = action.payload
      })
      .addCase(getDataList.rejected, (state, action) => {
        state.loading = false
        console.log(action.payload)
      })

      //deleteData api handle
      .addCase(deleteData.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteData.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.loading = false
        console.log(action.error.message)
      })
  },
})

export default dataSlice.reducer

export const dataReducers = dataSlice.reducer
