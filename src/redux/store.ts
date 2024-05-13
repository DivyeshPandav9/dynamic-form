import { configureStore } from '@reduxjs/toolkit'
import { feildDataReducers } from './slice/formSlice'
import { dataReducers } from './dataSlice/dataSlice'
import { authReducers } from './authSlice/authSlice'

const store = configureStore({
  reducer: {
    fieldData: feildDataReducers,
    data: dataReducers,
    auth: authReducers,
  },
})

export default store
export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
