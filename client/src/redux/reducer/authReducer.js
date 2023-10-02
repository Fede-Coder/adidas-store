import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isFetching: false,
    isFetchingAuth: false,
	isAuthenticated: false,
    user: null,
	token: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsFetching: (state, action) => {
			state.isFetching = action.payload;
		},
		setIsFetchingAuth: (state, action) => {
			state.isFetchingAuth = action.payload;
		},
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
        },
        setUser: (state, action) => {
			state.user = action.payload;
		},
        setToken: (state, action) => {
            state.token = action.payload
        },
    }
})

export const {
    setIsFetching,
    setIsFetchingAuth,
    setAuthenticated,
    setUser,
    setToken,
} = authSlice.actions;

export default authSlice.reducer;