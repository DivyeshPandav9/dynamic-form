import { configureStore } from '@reduxjs/toolkit';
import { employeeReducers } from './slice/formSlice';
import { dataReducers } from './dataSlice/dataSlice';

const store = configureStore({
  reducer: {
    employee: employeeReducers,
    data:dataReducers
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
