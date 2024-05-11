import { createSlice } from '@reduxjs/toolkit';
import { } from '../../types/types';

const initialState = {
    dataList: [],
    error: {
        message: ''
    },

    loading: false,
    updateList: []
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {

        getData: (state, action) => {
            state.loading = false;
            state.dataList = action.payload;
        },
        getError: (state, action) => {
            state.error = action.payload;
        },
        getRequest: (state) => {
            state.loading = true;
        },
        getOneData: (state, action) => {
            state.updateList = action.payload
        }
    },
});

export const {

    getData,
    getError,
    getRequest,
    getOneData


} = dataSlice.actions;

export const dataReducers = dataSlice.reducer;
