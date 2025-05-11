// src/store/crud.ts
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import axiosInstance from "@/utils/axiosClient";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import Success from "@/assets/images/success2.gif";

interface AddItemProps {
  id: any;
}

interface CrudState {
  mainLoader: boolean;
  allFavItems: any;
  itemId: AddItemProps | null;
  error: { status: number | null }; // Error object with message and status
}

const initialState: CrudState = {
  mainLoader: false,
  allFavItems: [],
  itemId: null,
  error: { status: null }, // Initialize error object
};

// Thunk for fetching items with pagination
export const getAllFavItems = createAsyncThunk(
  "fav/getAllFavItems",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`favorites`);
      return data?.data?.products || [];
    } catch (error: any) {
      return rejectWithValue({
        status: error.response?.status || 500, // Include status code
      });
    }
  }
);

// Thunk for fetching items with pagination
export const DeleteAllFavItems = createAsyncThunk(
  "fav/deleteAllFavItems",
  async ({ refetch }: any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstance.delete(`favorites`);
      if (data?.status === "success") {
        // await dispatch(getAllFavItems());
        await dispatch(ClearFav());
        Swal.fire({
          title: data?.message,
          timer: 3000,
          // text: t("isDeletedSuccessfully"),
          showConfirmButton: false,
          imageUrl: `${Success.src}`, // showCancelButton: show_cancel,
          customClass: {
            popup: "custom-popup-class",
            title: "custom-title-class",
          },
          padding: "1rem",
        });
        if (refetch) {
          refetch();
        }
        return [];
      }
    } catch (error: any) {
      return rejectWithValue({
        status: error.response?.status || 500, // Include status code
      });
    }
  }
);
export const DeleteFavItem = createAsyncThunk(
  "fav/deleteFavItem",
  async (
    { id, refetch, setIsFavouriteState }: any,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { data } = await axiosInstance.delete(`favorites/${id}`);
      if (data?.status === "success") {
        await dispatch(getAllFavItems());
        ShowAlertMixin({
          type: 15,
          icon: "success",
          title: data?.message,
        });
        setIsFavouriteState(false);
        if (refetch) {
          refetch();
        }
        return data?.data || [];
      }
    } catch (error: any) {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: error?.response?.data?.message,
      });
      return rejectWithValue({
        status: error.response?.status || 500, // Include status code
      });
    }
  }
);
// Thunk for adding an item
export const AddItemToFav = createAsyncThunk(
  "fav/AddItemToFav",
  async ({ id, setIsFavouriteState }: any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstance.post(`favorites`, {
        product_id: id,
      });
      if (data?.status === "success") {
        const is_favorite = data?.data?.is_favorite;
        await dispatch(getAllFavItems());
        ShowAlertMixin({
          type: 15,
          icon: "success",
          title: data?.message,
        });
        setIsFavouriteState(true);
        return { id, is_favorite };
      }
    } catch (error: any) {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: error?.response?.data?.message,
      });
      return rejectWithValue({
        status: error.response?.status || 500, // Include status code
      });
    }
  }
);

// Slice
const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    StateFav: (state, action: PayloadAction<{ id: any }>) => {
      const updatedItemId = action.payload.id;
      const existingItemIndex = state.allFavItems.findIndex(
        (item: any) => item.id == updatedItemId
      );

      if (existingItemIndex != -1) {
        // Item exists in favorites, remove it
        state.allFavItems.splice(existingItemIndex, 1);
      } else {
        // Item does not exist, add it to favorites
        state.allFavItems.push({ id: updatedItemId, is_favorite: true });
      }
    },
    AddToFav: (state, action: PayloadAction<{ id: string }>) => {
      const newItemId = action.payload.id;
      // Check if the item is already in favorites
      const exists = state.allFavItems.find(
        (item: any) => item.id == newItemId
      );
      if (!exists) {
        // If not, add it to favorites
        state.allFavItems.push({ id: newItemId, is_favorite: true });
      }
    },
    RemoveFromFav: (state, action: PayloadAction<{ id: string }>) => {
      const itemIdToRemove = action.payload.id;
      // Remove the item from favorites if it exists
      state.allFavItems = state.allFavItems.filter(
        (item: any) => item.id != itemIdToRemove
      );
    },
    ClearFav: (state) => {
      state.allFavItems = {};
      state.mainLoader = false;
      state.error = { status: null }; // Clear error on cancel
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFavItems.pending, (state) => {
        state.mainLoader = true;
      })
      .addCase(getAllFavItems.fulfilled, (state, action) => {
        state.mainLoader = false;
        state.allFavItems = action.payload;
      })
      .addCase(getAllFavItems.rejected, (state: any, action) => {
        state.mainLoader = false;
        state.error = action.payload; // Store the error object
      })
      .addCase(DeleteAllFavItems.pending, (state) => {
        // state.mainLoader = true;
      })
      .addCase(DeleteAllFavItems.fulfilled, (state, action) => {
        // state.mainLoader = false;
        state.allFavItems = [];
      })
      .addCase(DeleteAllFavItems.rejected, (state: any, action) => {
        // state.mainLoader = false;
        state.error = action.payload; // Store the error object
      })
      .addCase(DeleteFavItem.pending, (state) => {
        // state.mainLoader = true;
      })
      .addCase(DeleteFavItem.fulfilled, (state, action) => {
        // state.mainLoader = false;
        if (action.payload) {
          // state.allFavItems = action.payload;
          action.payload.length > 0
            ? action?.payload?.map((item: any) =>
                state.allFavItems.push({
                  id: item?.id,
                  is_favorite: item?.is_favorite,
                })
              )
            : [];
        }
      })
      .addCase(DeleteFavItem.rejected, (state: any, action) => {
        // state.mainLoader = false;
        state.error = action.payload; // Store the error object
      })
      .addCase(AddItemToFav.pending, (state) => {
        state.mainLoader = true;
      })
      .addCase(AddItemToFav.fulfilled, (state, action) => {
        state.mainLoader = false;
        const updatedItem = action.payload;
        if (updatedItem) {
          state.allFavItems = state.allFavItems.map((item: any) =>
            item.id == updatedItem.id
              ? { ...item, is_favorite: updatedItem.is_favorite }
              : item
          );
        }
      })
      .addCase(AddItemToFav.rejected, (state: any, action) => {
        state.mainLoader = false;
        state.error = action.payload; // Store the error object
      });
  },
});
export const { ClearFav, AddToFav, RemoveFromFav, StateFav } = favSlice.actions;

export default favSlice.reducer;
