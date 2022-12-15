import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../../api/api.js";

const debug = createAsyncThunk('auth/debug', async (param, thunkAPI) => {
    try {
        const res = await authAPI.debug();
        if (res.data.account) {
            return res.data.account.email;
        } else {
            alert(res.data)
        }
    } catch (error) {
        alert(error)
    }
});

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        email: '',
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(debug.fulfilled, (state, action) => {
            state.email = action.payload;
        });
    },
});

export const accountAsync = {
    debug,
};