import { createSlice } from '@reduxjs/toolkit';
import { initialStateType } from '../../types/types';
const tokenString = localStorage.getItem('token');
const currentUser = tokenString ? JSON.parse(tokenString) : null;

const initialState:initialStateType = {
    empList: [],
    error: {
        message: ''
    },
    updateList: {
        name: '',
        age: 0,
        department: '',
        job_title: '',
        salary: 0
    },
    searchList: [],
    loading: false,
    currentUser: currentUser,
 
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
   
    getEmployee: (state, action) => {
      state.loading = false;
      state.empList = action.payload;
    },
    getError: (state, action) => {
      state.error = action.payload;
    },
    getRequest: (state) => {
        state.loading = true;
      },
   
  },
});

export const {
  
  getEmployee,
  getError,
  getRequest


} = employeeSlice.actions;

export const employeeReducers = employeeSlice.reducer;
