// loginWebsite.slice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';

const initialState = {
  userData: null,
  loading: false,
  error: null,
  isLoggedIn: false,  // Add a flag for successful login
};

const loginWebsiteSlice = createSlice({
  name: 'loginWebsite',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.isLoggedIn = true;  // Update isLoggedIn status
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isLoggedIn = false;
    },
    logout: (state) => {
      state.userData = null;
      state.isLoggedIn = false; // Reset the login state
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = loginWebsiteSlice.actions;

export const loginUser = (name, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.get(`http://localhost:3001/users`);
    const selectedUser = response.data.find(
      (user) => user.name === name && user.password === password
    );
    if (!selectedUser) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid Username or Password!',
      });
      dispatch(loginFailure('Invalid credentials'));
    } else {
      Swal.fire({
        title: 'Login Successfully!',
        text: 'Now You Are Moved To Website!',
        icon: 'success',
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem('user-data', JSON.stringify(selectedUser));
          dispatch(loginSuccess(selectedUser));
        }
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    dispatch(loginFailure(error.message));
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong during login!',
    });
  }
};

export default loginWebsiteSlice.reducer;
