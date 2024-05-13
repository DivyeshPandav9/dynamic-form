// import axios from "axios";
// import { AppDispatch } from "../store";
// import {  FieldInput } from "../../types/types";
// import { getFieldData, getError, getRequest } from "./formSlice";
// import { createAsyncThunk } from "@reduxjs/toolkit";

// const apiUrl ='http://localhost:8000/employees';

// export const postFieldData = (empData:FieldInput) => async (dispatch:AppDispatch) => {
//     try {
//       const reults = await axios.post(apiUrl, empData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       dispatch(getFieldData(reults.data));
//     } catch (error) {
//       dispatch(getError(error));
//     }
//   };

//   export const getAllFieldData = () => async (dispatch:AppDispatch) => {
//     dispatch(getRequest());
//     try {
//       const results = await axios.get(apiUrl);
//       dispatch(getFieldData(results.data));
//     } catch (error) {
//       dispatch(getError(error));
//     }
//   };

//   export const deleteField = (id: string) => async (dispatch: AppDispatch) => {
//     try {
//       await axios.delete(`${apiUrl}/${id}`);
//       dispatch(getAllFieldData());
//     } catch (error) {
//       dispatch(getError(error));
//     }
//   };

//   // export const deleteField = createAsyncThunk('deleteField',async()=>{

//   // })

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
    return response.data // Return data to be used in the fulfilled case
  }
)

// Thunk to delete field data
export const deleteField = createAsyncThunk(
  'form/deleteField',
  async (id: string) => {
    await axios.delete(`${apiUrl}/${id}`)
    return id // Return data to be used in the fulfilled case
  }
)
