import NoAddressesIcon from "@/assets/images/no-address.svg";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { setLocation } from "./locationSlice";
import axiosInstance from "@/utils/axiosClient";

import ShowAlertMixin from "@/shared/ShowAlertMixin";

interface AddItemProps {
  id: any;
}

interface CrudState {
  mainLoader: boolean;
  allAddressesItems: any;
  singleItem: any;
  itemId: AddItemProps | null;
  error: { status: number | null }; // Error object with message and status
}

const initialState: CrudState = {
  mainLoader: true,
  allAddressesItems: [],
  itemId: null,
  singleItem: {},
  error: { status: null }, // Initialize error object
};

// Thunk for fetching items with pagination
export const getAllAddressesItems = createAsyncThunk(
  "address/locations",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`locations`);
      return data?.data || [];
    } catch (error: any) {
      return rejectWithValue({
        status: error.response?.status || 500, // Include status code
      });
    }
  }
);

export const getAddressById = createAsyncThunk(
  "address/getAddressById",
  async ({ id }: AddItemProps, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`locations/${id}`);
      return data?.data || [];
    } catch (error: any) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status || 500, // Include status code
      });
    }
  }
);

// Thunk for toggling an item to default
export const toggleItemToDefault = createAsyncThunk(
  "address/toggleItemToDefault",
  async ({ id, message }: any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstance.patch(`locations/${id}/setDefault`);

      if (data?.status === "success") {
        ShowAlertMixin({
          type: 15,
          icon: "success",
          title: message,
        });
        if (data?.data) {
          dispatch(
            setLocation({
              lat: data?.data?.lat,
              lng: data?.data?.lng,
              location_description: data?.data?.location,
              location_id: data?.data?.id,
            })
          );
        }
        dispatch(getAllAddressesItems());
      }
    } catch (error: any) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status || 500, // Include status code
      });
    }
  }
);

// Thunk for deleting an item
export const deleteItemFromAddress = createAsyncThunk(
  "address/deleteItemFromAddress",
  async ({ id, message }: any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstance.delete(`locations/${id}`);
      if (data?.status === "success") {
        ShowAlertMixin({
          type: 15,
          icon: "success",
          title: message,
        });
        dispatch(getAllAddressesItems());
        return data?.data;
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: errorMessage,
      });
      return rejectWithValue({
        message: errorMessage,
        status: error.response?.status || 500, // Include status code
      });
    }
  }
);

// Thunk for adding or updating an item
export const addOrUpdateItemToAddresses = createAsyncThunk(
  "address/addOrUpdateItemToAddresses",
  async (
    { id, values, message }: { id?: string; values: any; message?: any },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const endpoint = id ? `locations/${id}` : `locations`;
      const method = id ? axiosInstance.put : axiosInstance.post;

      const response = await method(endpoint, values);

      if (response?.data?.status === "success") {
        dispatch(getAllAddressesItems());
        Swal.fire({
          title: message,
          timer: 3000,
          showConfirmButton: false,
          imageUrl:
            "https://s3-alpha-sig.figma.com/img/57ee/f3f7/36e136d3c035c699af832e6c97d12e9b?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iE-yDkSL3iiRGeVWok9qavHHadPXgpR-ToK52O3piBTMzuF73edGhlPkAKGmRzPxJAAgxNTTVxMSqRwKxWl3q589X2QP9-cFJ9mNjH5NVOy9T03WOrz~dJgySokXbW1kuUE-U37DQAk-2Vw5ToOC9wABL9qVMPgvacKSh7CeQzLYsX472xl2NSu9VVGAVhb1iKvWsqlP-gj1uJOEcv9p~-ESYkVIsWr687ElRV9oWwkm3qlMHBZO-bwYcK7WuInjAWSjQ1t7QoIVjzaIGszeL2gKGqFdGcZh6Ins~R1zReaRDz6oD96iJKxaY8-i49dC-s6wVD6g1SQDashs~mslAg__",
          customClass: {
            popup: "custom-popup-class",
            title: "custom-title-class",
          },
          padding: "1rem",
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "حدث خطأ ما. حاول مجدداً.";
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: errorMessage,
      });
      return rejectWithValue({
        message: errorMessage,
        status: error.response?.status || 500, // Include status code
      });
    }
  }
);

// Slice
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    CancelAddOrUpdateAddresses: (state) => {
      state.singleItem = {};
      state.mainLoader = false;
      state.error = { status: null }; // Clear error on cancel
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAddressesItems.pending, (state) => {
        state.mainLoader = true;
      })
      .addCase(getAllAddressesItems.fulfilled, (state, action) => {
        state.mainLoader = false;
        state.allAddressesItems = action.payload;
      })
      .addCase(getAllAddressesItems.rejected, (state: any, action) => {
        state.mainLoader = false;
        state.error = action.payload; // Store the error object
      })
      .addCase(getAddressById.pending, (state) => {
        state.mainLoader = true;
      })
      .addCase(getAddressById.fulfilled, (state, action) => {
        state.mainLoader = false;
        state.singleItem = action.payload;
      })
      .addCase(getAddressById.rejected, (state: any, action) => {
        state.mainLoader = false;
        state.error = action.payload; // Store the error object
      })
      .addCase(toggleItemToDefault.pending, (state) => {
        state.mainLoader = true;
      })
      .addCase(toggleItemToDefault.fulfilled, (state) => {
        state.mainLoader = false;
      })
      .addCase(toggleItemToDefault.rejected, (state: any, action) => {
        state.mainLoader = false;
        state.error = action.payload; // Store the error object
      })
      .addCase(addOrUpdateItemToAddresses.pending, (state) => {
        // state.mainLoader = true;
      })
      .addCase(addOrUpdateItemToAddresses.fulfilled, (state) => {
        state.mainLoader = false;
      })
      .addCase(addOrUpdateItemToAddresses.rejected, (state: any, action) => {
        state.mainLoader = false;
        state.error = action.payload; // Store the error object
      })
      .addCase(deleteItemFromAddress.pending, (state) => {
        // state.mainLoader = true; // Uncomment if needed
      })
      .addCase(deleteItemFromAddress.fulfilled, (state, action) => {
        if (action.payload) {
          state.allAddressesItems = action.payload;
        }
      })
      .addCase(deleteItemFromAddress.rejected, (state: any, action) => {
        state.error = action.payload; // Store the error object
      });
  },
});

export const { CancelAddOrUpdateAddresses } = addressSlice.actions;
export default addressSlice.reducer;
