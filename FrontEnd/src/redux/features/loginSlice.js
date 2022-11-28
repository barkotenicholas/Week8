import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {LoginService} from '../../services/auth.service.js'
import { setMessage } from './messageSlice.js';

export const loginUser = createAsyncThunk(
    '/auth/login',
    async (user,thunkAPI) => {

        try {
            const data = await LoginService(user);
            thunkAPI.dispatch(setMessage(data.message))
            return data
        } catch (error) {
            const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          thunkAPI.dispatch(setMessage(message));
          return thunkAPI.rejectWithValue();
        }

    }
)


const initialState = {
    user: sessionStorage.getItem("user") ?
        JSON.parse(sessionStorage.getItem("user")) :
        null
}

const authSlice = createSlice({
    name: "Login",
    initialState,
    reducers: {
        login: (state, action) => {
            console.log("User info");
            state.user = action.payload
            sessionStorage.setItem("user", JSON.stringify(action.payload));

        },
        signOutUser: (state) => {
            console.log(`removing users`);
            sessionStorage.removeItem("user")
            state.user = null;

        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending,(state,action)=>{

        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.user = action.payload
        })
        .addCase(loginUser.rejected,(state,payload)=>{

        })
    }

})

export const {  login, signOutUser } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;