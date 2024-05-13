// import { createSlice } from '@reduxjs/toolkit';
// import { initialStateType } from '../../types/types';
// const tokenString = localStorage.getItem('token');
// const currentUser = tokenString ? JSON.parse(tokenString) : null;

// const initialState:initialStateType = {
//     empList: [],
//     error: {
//         message: ''
//     },
//     updateList: {
//         name: '',
//         age: 0,
//         department: '',
//         job_title: '',
//         salary: 0
//     },
//     searchList: [],
//     loading: false,
//     currentUser: currentUser,
// };

// const employeeSlice = createSlice({
//   name: 'employee',
//   initialState,
//   reducers: {

//     getFieldData: (state, action) => {
//       state.loading = false;
//       state.empList = action.payload;
//     },
//     getError: (state, action) => {
//       state.error = action.payload;
//     },
//     getRequest: (state) => {
//         state.loading = true;
//     },
//   },
// });

// export const {

//   getFieldData,
//   getError,
//   getRequest

// } = employeeSlice.actions;

// export const feildDataReducers = employeeSlice.reducer;

import { createSlice } from '@reduxjs/toolkit'
import { initialStateType } from '../../types/types'
import { postFieldData, getAllFieldData, deleteField } from './formHandler' // Import async thunks

const tokenString = localStorage.getItem('token')
const currentUser = tokenString ? JSON.parse(tokenString) : null

const initialState: initialStateType = {
  empList: [],
  error: {
    message: '',
  },
  updateList: {
    name: '',
    age: 0,
    department: '',
    job_title: '',
    salary: 0,
  },
  searchList: [],
  loading: false,
  currentUser: currentUser,
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
