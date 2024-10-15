import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';

// Initial state, checking localStorage for persisted userData
const initialState = {
  userData: JSON.parse(localStorage.getItem('user-data')) || null,
  loading: false,
  error: null,
  isLoggedIn: JSON.parse(localStorage.getItem('user-data')) !== null,
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
      state.isLoggedIn = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isLoggedIn = false;
    },
    logout: (state) => {
      state.userData = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user-data');
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = loginWebsiteSlice.actions;

// This is the login action that will be dispatched
export const loginUser = (name, password) => async (dispatch) => {
  dispatch(loginStart());

  try {
    const response = await axios.get(`http://localhost:3001/users`);

    // Handle case when no users are returned from the API
    if (!response.data || response.data.length === 0) {
      throw new Error("No users found");
    }

    // Finding the user with the matching credentials
    const selectedUser = response.data.find(
      (user) => user.name === name && user.password === password
    );

    // If the user is not found
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
          // Storing user data in localStorage
          localStorage.setItem('user-data', JSON.stringify(selectedUser));
          dispatch(loginSuccess(selectedUser));
        }
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    dispatch(loginFailure(error.message || 'Something went wrong during login!'));
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong during login!',
    });
  }
};

export default loginWebsiteSlice.reducer;