import axiosInstance from "@/utils/axiosClient";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id?: number;
  quantity: number;
  product: any;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  productCount: number;
  error: { status: number | null };
  mainLoader: boolean;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  productCount: 0,
  error: { status: null },
  mainLoader: false,
};

// Thunk for fetching items with pagination
export const getAllCartItems = createAsyncThunk(
  "cart/getAllCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`cart`);
      return data || [];
    } catch (error: any) {
      return rejectWithValue({
        status: error.response?.status || 500, // Include status code
      });
    }
  }
);

const cartStoreSlice = createSlice({
  name: "cartStore",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingIndex = state.items.findIndex(
        (item) => item.id == action.payload.id
      );

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += 1;
        state.totalPrice +=
          action.payload.product.price_after_discount > 0
            ? action.payload.product.price_after_discount
            : action.payload.product.price;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
        state.productCount += 1;
        state.totalPrice +=
          (action.payload.product.price_after_discount > 0
            ? action.payload.product.price_after_discount
            : action.payload.product.price) * action.payload.quantity;
      }

      // state.totalPrice +=
      //   action.payload.product.price - (action.payload.product.discount ?? 0);
    },
    removeItem: (state, action: PayloadAction<{ id: number }>) => {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.totalPrice -=
          (state.items[existingIndex].product.price_after_discount > 0
            ? state.items[existingIndex].product.price_after_discount
            : state.items[existingIndex].product.price) *
          state.items[existingIndex].quantity;
        state.items.splice(existingIndex, 1);
        state.productCount -= 1;
      }
    },
    decreaseItemQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex >= 0 && state.items[existingIndex].quantity > 1) {
        state.items[existingIndex].quantity -= 1;
        state.totalPrice -=
          state.items[existingIndex].product.price_after_discount > 0
            ? state.items[existingIndex].product.price_after_discount
            : state.items[existingIndex].product.price;
      }
    },
    setProductCount: (state, action: PayloadAction<number>) => {
      state.productCount = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.productCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCartItems.pending, (state) => {
        state.mainLoader = true;
      })
      .addCase(getAllCartItems.fulfilled, (state, action) => {
        state.mainLoader = false;
        // state.items = action.payload?.data || [];
        action.payload?.data?.length > 0
          ? action.payload?.data?.map((item: any) => {
              state.items.push({
                id: item?.product?.id,
                product: item?.product,
                quantity: item?.quantity,
              });
            })
          : (state.items = []);
        state.productCount = action.payload?.data?.length || 0;
        state.totalPrice = action.payload?.subTotal || 0;
      })
      .addCase(getAllCartItems.rejected, (state) => {
        state.mainLoader = false;
      });
  },
});

export const {
  addItem,
  removeItem,
  decreaseItemQuantity,
  setProductCount,
  clearCart,
} = cartStoreSlice.actions;

export default cartStoreSlice.reducer;
