

import { userLogin, userLogout } from "@/services/userService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null
}

export const loginUserThunk = createAsyncThunk(
    "user/loginUser",
    async ({email, password}, {rejectWithValue}) =>{
        try {
            const response = await userLogin({email, password});
            console.log("login: ",response);
            
            
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
);


export const logoutUserThunk = createAsyncThunk(
    "user/logoutUser",
    async (_, {rejectWithValue}) => {
        try {
            const response = await userLogout();

            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
);


const userAuthSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder

            // cases for login user
            .addCase(loginUserThunk.pending, (state) => {
                state.loading=true;
                state.error=null;
            })
            .addCase(loginUserThunk.fulfilled, (state, action) =>{
                state.user= action.payload.user;
                state.token = action.payload.token;
                state.loading= false;
                state.error = null;
            })
            .addCase(loginUserThunk.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })

            // cases for logout user
            .addCase(logoutUserThunk.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUserThunk.fulfilled, (state)=>{
                state.loading = false;
                state.user=null;
                state.token = null;
                
            })
            .addCase(logoutUserThunk.rejected, (state, action)=>{
                state.loading=false;
                state.error = action.payload;
            })
    }
});



export default userAuthSlice.reducer;