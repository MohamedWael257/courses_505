// src/store/crud.ts
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import axiosInstance from "@/utils/axiosClient";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

interface AddItemProps {
  id: any;
}

interface CrudState {
  mainLoader: boolean;
  allComparisonsItems: any;
  itemId: AddItemProps | null;
  error: { status: number | null }; // Error object with message and status
}

const initialState: CrudState = {
  mainLoader: false,
  allComparisonsItems: [],
  itemId: null,
  error: { status: null }, // Initialize error object
};

// Thunk for fetching items with pagination
export const getAllComparisonsItems = createAsyncThunk(
  "compare/getAllComparisonsItems",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`comparisons`);
      return data?.data || [];
    } catch (error: any) {
      return rejectWithValue({
        status: error.response?.status || 500, // Include status code
      });
    }
  }
);

// Thunk for fetching items with pagination
export const DeleteAllComparisonsItems = createAsyncThunk(
  "compare/deleteAllComparisonsItems",
  async ({ message }: any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstance.delete(`comparisons`);
      if (data?.status === "success") {
        await dispatch(getAllComparisonsItems());
        Swal.fire({
          title: message,
          timer: 3000,
          // text: t("isDeletedSuccessfully"),
          showConfirmButton: false,
          // imageUrl: `${success}`, // showCancelButton: show_cancel,
          imageUrl:
            "https://s3-alpha-sig.figma.com/img/57ee/f3f7/36e136d3c035c699af832e6c97d12e9b?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iE-yDkSL3iiRGeVWok9qavHHadPXgpR-ToK52O3piBTMzuF73edGhlPkAKGmRzPxJAAgxNTTVxMSqRwKxWl3q589X2QP9-cFJ9mNjH5NVOy9T03WOrz~dJgySokXbW1kuUE-U37DQAk-2Vw5ToOC9wABL9qVMPgvacKSh7CeQzLYsX472xl2NSu9VVGAVhb1iKvWsqlP-gj1uJOEcv9p~-ESYkVIsWr687ElRV9oWwkm3qlMHBZO-bwYcK7WuInjAWSjQ1t7QoIVjzaIGszeL2gKGqFdGcZh6Ins~R1zReaRDz6oD96iJKxaY8-i49dC-s6wVD6g1SQDashs~mslAg__",
          // confirmButtonText: confirm_btn_txt || "BUTTONSconfirm",
          // cancelButtonText: "BUTTONScancel",
          customClass: {
            popup: "custom-popup-class",
            title: "custom-title-class",
          },
          padding: "1rem",
        });
        return data?.data || [];
      }
    } catch (error: any) {
      return rejectWithValue({
        status: error.response?.status || 500, // Include status code
      });
    }
  }
);
export const DeletecomparisonsItem = createAsyncThunk(
  "compare/deletecomparisonsItem",
  async ({ id, message }: any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstance.delete(`comparisons/${id}`);
      if (data?.status === "success") {
        await dispatch(getAllComparisonsItems());
        ShowAlertMixin({
          type: 15,
          icon: "success",
          title: message,
        });
        return data?.data || [];
      }
    } catch (error: any) {
      return rejectWithValue({
        status: error.response?.status || 500, // Include status code
      });
    }
  }
);
// Thunk for adding an item
export const AddItemTocomparisons = createAsyncThunk(
  "compare/AddItemTocomparisons",
  async ({ id, message }: any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstance.post(`comparisons`, {
        product_id: id,
      });
      if (data?.status === "success") {
        const in_compare = data?.data?.in_compare;
        await dispatch(getAllComparisonsItems());
        ShowAlertMixin({
          type: 15,
          icon: "success",
          title: message,
        });
        return { id, in_compare };
      }
    } catch (error: any) {
      return rejectWithValue({
        status: error.response?.status || 500, // Include status code
      });
    }
  }
);

// Slice
const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    AddToCompare: (state, action: PayloadAction<{ id: string }>) => {
      const newItemId = action.payload.id;
      const exists = state.allComparisonsItems.find(
        (item: any) => item.id == newItemId
      );
      if (!exists) {
        state.allComparisonsItems.push({ id: newItemId, in_compare: true });
      }
    },
    RemoveFromCompare: (state, action: PayloadAction<{ id: string }>) => {
      const itemIdToRemove = action.payload.id;
      state.allComparisonsItems = state.allComparisonsItems.filter(
        (item: any) => item.id != itemIdToRemove
      );
    },
    ClearCompare: (state) => {
      state.allComparisonsItems = {};
      state.mainLoader = false;
      state.error = { status: null }; // Clear error on cancel
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllComparisonsItems.pending, (state) => {
        state.mainLoader = true;
      })
      .addCase(getAllComparisonsItems.fulfilled, (state, action) => {
        state.mainLoader = false;
        // state.allComparisonsItems = action.payload;
        if (action.payload && action.payload.length > 0) {
          const existingIds = new Set(
            state.allComparisonsItems.map((item: any) => item.id)
          );

          action.payload.forEach((item: any) => {
            if (!existingIds.has(item.product_id)) {
              state.allComparisonsItems.push({
                id: item.product_id,
                in_compare: true,
              });
            }
          });
        }
      })
      .addCase(getAllComparisonsItems.rejected, (state: any, action) => {
        state.mainLoader = false;
        state.error = action.payload; // Store the error object
      })
      .addCase(DeleteAllComparisonsItems.pending, (state) => {
        // state.mainLoader = true;
      })
      .addCase(DeleteAllComparisonsItems.fulfilled, (state, action) => {
        // state.mainLoader = false;
        state.allComparisonsItems = [];
      })
      .addCase(DeleteAllComparisonsItems.rejected, (state: any, action) => {
        // state.mainLoader = false;
        state.error = action.payload; // Store the error object
      })
      .addCase(DeletecomparisonsItem.pending, (state) => {
        // state.mainLoader = true;
      })
      .addCase(DeletecomparisonsItem.fulfilled, (state, action) => {
        // state.mainLoader = false;
        if (action.payload) {
          state.allComparisonsItems = action.payload;
        }
      })
      .addCase(DeletecomparisonsItem.rejected, (state: any, action) => {
        // state.mainLoader = false;
        state.error = action.payload; // Store the error object
      })
      .addCase(AddItemTocomparisons.pending, (state) => {
        state.mainLoader = true;
      })
      .addCase(AddItemTocomparisons.fulfilled, (state, action) => {
        state.mainLoader = false;
        const updatedItem = action.payload;
        if (updatedItem) {
          state.allComparisonsItems = state.allComparisonsItems.map(
            (item: any) =>
              item.id == updatedItem.id
                ? { ...item, in_compare: updatedItem.in_compare }
                : item
          );
        }
      })
      .addCase(AddItemTocomparisons.rejected, (state: any, action) => {
        state.mainLoader = false;
        state.error = action.payload; // Store the error object
      });
  },
});
export const { ClearCompare, AddToCompare, RemoveFromCompare } =
  compareSlice.actions;

export default compareSlice.reducer;
