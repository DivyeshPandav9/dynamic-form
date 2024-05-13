import { createSlice } from '@reduxjs/toolkit'
import { getAuthData, signinData } from './authHandler'
import { authList } from '../../types/types'

const initialState: authList = {
  authData: [],
  error: {
    message: '',
  },

  loading: false,
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //postData api handle
      .addCase(signinData.pending, (state) => {
        state.loading = true
      })
      .addCase(signinData.fulfilled, (state, action) => {
        state.loading = false
        state.authData = action.payload
      })
      .addCase(signinData.rejected, (state, action) => {
        state.loading = false
        console.log(action.error)
      })

      .addCase(getAuthData.pending, (state) => {
        state.loading = true
      })
      .addCase(getAuthData.fulfilled, (state, action) => {
        state.loading = false
        state.authData = action.payload
      })
      .addCase(getAuthData.rejected, (state, action) => {
        state.loading = false
        console.log(action.error)
      })
  },
})

export const authReducers = dataSlice.reducer
export default dataSlice.reducer
