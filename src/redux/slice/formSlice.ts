import { createSlice } from '@reduxjs/toolkit'
import { initialStateType } from '../../types/types'
import { postFieldData, getAllFieldData, deleteField } from './formHandler' // Import async thunks


const initialState: initialStateType = {
  empList: [],
  error: {
    message: '',
  },
 
  loading: false,
}

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    // No need to define synchronous reducers here since we're using createAsyncThunk
  },
  extraReducers: (builder) => {
    builder
      // Post Field Data
      .addCase(postFieldData.pending, (state) => {
        state.loading = true
      })
      .addCase(postFieldData.fulfilled, (state, action) => {
        state.loading = false
        state.empList.push(action.payload)
      })
      .addCase(postFieldData.rejected, (state, action) => {
        state.loading = false
        console.log(action.error.message)
      })

      // Get All Field Data
      .addCase(getAllFieldData.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllFieldData.fulfilled, (state, action) => {
        state.loading = false
        state.empList = action.payload
      })
      .addCase(getAllFieldData.rejected, (state, action) => {
        state.loading = false
        console.log(action.error.message)
      })

      // Delete Field
      .addCase(deleteField.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteField.fulfilled, (state, action) => {
        state.loading = false
        state.empList = state.empList.filter((emp) => emp.id !== action.payload)
      })
      .addCase(deleteField.rejected, (state, action) => {
        state.loading = false
        console.log(action.error.message)
      })
  },
})

export const feildDataReducers = employeeSlice.reducer

export default employeeSlice.reducer
