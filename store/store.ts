import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import LocationReducer from "@/store/locationSlice";
import AuthReducer from "@/store/auth.slice";
import cartStoreSlice from "@/store/cartStore.slice";
import AddressReducer from "@/store/address.slice";
import ForgetReducer from "@/store/forget.slice";
import NotificationReducer from "@/store/notification.slice";
import FavouritsReducer from "@/store/favourtis";
import ComparisonsReducer from "@/store/comparisons";
const rootReducer = combineReducers({
  locationConfig: LocationReducer,
  AuthConfig: AuthReducer,
  CartConfig: cartStoreSlice,
  AddressConfig: AddressReducer,
  ForgetConfig: ForgetReducer,
  NotificationConfig: NotificationReducer,
  FavouritsConfig: FavouritsReducer,
  ComparisonsConfig: ComparisonsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: true,
});

// Setting up listeners for refetch behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
