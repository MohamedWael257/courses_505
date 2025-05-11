// src/store/crud.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axiosInstance from "@/utils/axiosClient";

interface CrudState {
  mainLoader: boolean;
  is_active: boolean;
  allNotificationsItems: any;
}

const initialState: CrudState = {
  mainLoader: false,
  allNotificationsItems: [],
  is_active: Cookies.get("shams_allow_notification")
    ? Cookies.get("shams_allow_notification") == "true"
    : true,
};
// console.log("🚀 ~ Cookies", Cookies.get("shams_allow_notification") == "true");

// Thunk for fetching items with pagination
export const getAllNotifications = createAsyncThunk(
  "fav/getAllNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`notification`);
      return data?.data || [];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for adding an item
export const toggleActiveNotification = createAsyncThunk(
  "fav/toggleActiveNotification",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstance.post(`is_allow_notification`);
      if (data?.status === "success") {
        toast.success(data?.message);
        return data?.data?.is_allow_notification;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotifications.pending, (state) => {
        state.mainLoader = true;
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        state.mainLoader = false;
        state.allNotificationsItems = action.payload;
      })
      .addCase(getAllNotifications.rejected, (state) => {
        state.mainLoader = false;
      })
      .addCase(toggleActiveNotification.pending, (state) => {
        state.mainLoader = true;
      })
      .addCase(toggleActiveNotification.fulfilled, (state, action) => {
        state.mainLoader = false;
        state.is_active = action.payload;
        Cookies.set("shams_allow_notification", action.payload);
      })
      .addCase(toggleActiveNotification.rejected, (state) => {
        state.mainLoader = false;
      });
  },
});

export default notificationSlice.reducer;
