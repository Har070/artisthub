import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload;
        },
    }
});

export const { setAuth } = authSlice.actions;

export const selectAuth = state => state.auth.user;

export default authSlice.reducer;




