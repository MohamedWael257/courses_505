import { createSlice } from "@reduxjs/toolkit";

interface StoreValuesState {
  storedValues: any;
  saveRegisterData: any;
}
const initialState: StoreValuesState = {
  storedValues: null,
  saveRegisterData: null,
};
const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState,

  reducers: {
    addForgetPassword: (state, action) => {
      state.storedValues = action.payload; // Directly mutate the state
    },
    saveRegisterData: (state, action) => {
      state.saveRegisterData = action.payload; // Directly mutate the state
    },
    clearaddForgetPassword: (state) => {
      state.storedValues = null; // Directly mutate the state
    },
  },
});

export const { addForgetPassword, saveRegisterData, clearaddForgetPassword } =
  forgetPasswordSlice.actions;
export default forgetPasswordSlice.reducer;
