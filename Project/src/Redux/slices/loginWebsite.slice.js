import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';

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
      localStorage.setItem('user-data', JSON.stringify(action.payload));
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

export const loginUser = (name, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.get('http://localhost:3001/websiteUsers');
    const selectedUser = response.data.find((user) => user.name === name && user.password === password);

    if (!selectedUser) {
      Swal.fire('Oops...', 'Invalid Username or Password!', 'error');
      dispatch(loginFailure('Invalid credentials'));
    } else {
      dispatch(loginSuccess(selectedUser));
      Swal.fire('Success', 'Login Successfully!', 'success');
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
    Swal.fire('Error', 'Something went wrong!', 'error');
  }
};

export default loginWebsiteSlice.reducer;