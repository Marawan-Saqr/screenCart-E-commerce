import { createSlice } from "@reduxjs/toolkit";

// Initial state for registration
const initialState = {
  loading: false,
  success: false,
  error: null,
};

// Define the registration slice
const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    // Action to start registration
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Action when registration is successful
    registerSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    // Action when registration fails
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set the error message from the payload
    },
    // Reset registration state (for example, on logout or other events)
    resetRegisterState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
});

// Export the actions
export const {
  registerStart,
  registerSuccess,
  registerFailure,
  resetRegisterState,
} = registerSlice.actions;

// Export the reducer
export default registerSlice.reducer;
