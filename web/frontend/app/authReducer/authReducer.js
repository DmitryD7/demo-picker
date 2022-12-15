import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI,} from "../../api/api.js";

const login = createAsyncThunk('auth/login', async (params, thunkAPI) => {
    try {
        const res = await authAPI.login(params);
        if (res.data.email) {
            return res.data;
        } else {
            alert(res.data)
        }
    } catch (error) {
        alert(error)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn;
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload) {
                state.isLoggedIn = true;
            }
        });
    },
});

export const authAsyncActions = {
    login,
}