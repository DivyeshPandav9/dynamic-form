import axios from "axios";
import { AppDispatch } from "../store";
import { getData, getError, getOneData, getRequest } from "./dataSlice";

const apiUrlData = 'http://localhost:8000/data';

export const postData = (data: unknown) => async (dispatch: AppDispatch) => {
  try {
    const reults = await axios.post(apiUrlData, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch(getData(reults.data));
  } catch (error) {
    dispatch(getError(error));
  }
};

export const getDataList = () => async (dispatch: AppDispatch) => {
  dispatch(getRequest());
  try {
    const results = await axios.get(apiUrlData);
    dispatch(getData(results.data));
  } catch (error) {
    dispatch(getError(error));
  }
};

export const deleteData = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${apiUrlData}/${id}`);
    dispatch(getDataList());
  } catch (error) {
    dispatch(getError(error));
  }
};

export const selectData = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const result = await axios.get(`${apiUrlData}/${id}`);
    dispatch(getOneData(result.data));
  } catch (error) {
    dispatch(getError(error));
  }
};

export const updateData = (data: unknown, id: string) => async (dispatch: AppDispatch) => {
  try {
    const reults = await axios.put(
      `${apiUrlData}/${id}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    dispatch(getData(reults.data));
  } catch (error) {
    dispatch(getError(error));
  }
};
