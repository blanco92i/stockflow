import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import authService from './authService';
import { getTokenFromLocalStorage } from '../../utils/tokenUtil';

const initialState = {
    user:null,
    isAuthenticated: false,
    loading: false,
    isSuccess: false,
    isError: false,
    message: ''
};

//restaurer l'utilisateur à partir du localStorage
export const restoreAuth = createAsyncThunk(
    'auth/restore', 
    async (_, thunkAPI) => {
        try {
        const token = getTokenFromLocalStorage();
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if(token && storedUser) {
            return storedUser;
        }
            return null;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
    } 
);

export const login = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
        try {
            const response = await authService.login(userData);
            const responseData = response.data || response; // Handle both cases where data is nested or not
            toast.success('Login successful');
            return responseData;
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Login failed';
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//register user
export const register = createAsyncThunk(
    'auth/register',
    async (userData, thunkAPI) => {
        try {
            const response = await authService.register(userData);
           const responseData = response.data || response; // Handle both cases where data is nested or not
            toast.success('Registration successful');
            return responseData;
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Registration failed';
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            authService.logout();
            state.user = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
        //restore auth
        .addCase(restoreAuth.pending, (state) => {
            state.loading = true;
        })
        .addCase(restoreAuth.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        })
        .addCase(restoreAuth.rejected, (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        //login
        .addCase(login.pending, (state) => {
            state.loading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isError = false;
            state.message = '';
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.isError = true;
            state.message = action.payload || 'Login failed';
        })

        //register
        .addCase(register.pending, (state) => {
            state.loading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isSuccess = true;
            state.isError = false;
            state.message = '';
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.isError = true;
            state.message = action.payload || 'Registration failed';
        });
    }
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;