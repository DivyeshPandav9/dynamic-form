import axios from "axios";
import { AppDispatch } from "../store";
import {  FieldInput } from "../../types/types";
import { getEmployee, getError, getRequest } from "./formSlice";

const apiUrl ='http://localhost:8000/employees';


export const postFieldData = (empData:FieldInput) => async (dispatch:AppDispatch) => {
    try {
      const reults = await axios.post(apiUrl, empData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(getEmployee(reults.data));
    } catch (error) {
      dispatch(getError(error));
    }
  };

  export const getAllFieldData = () => async (dispatch:AppDispatch) => {
    dispatch(getRequest());
    try {
      const results = await axios.get(apiUrl);
      dispatch(getEmployee(results.data));
    } catch (error) {
      dispatch(getError(error));
    }
  };

