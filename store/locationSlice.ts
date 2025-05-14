// store/locationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface LocationState {
  lat: number | null;
  lng: number | null;
  location_description: string | null;
  location_id?: string | null;

  isLoading?: boolean;
}

const initialState: LocationState = {
  lat: null,
  lng: null,
  location_description: null,
  location_id: null,

  isLoading: true,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<LocationState>) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
      state.location_description = action.payload.location_description;
      state.location_id = action.payload.location_id;

      state.isLoading = action.payload.isLoading;
      Cookies.set(
        "client_location",
        JSON.stringify({
          lat: action.payload.lat,
          lng: action.payload.lng,
          location_description: action.payload.location_description,
          location_id: action.payload.location_id,
        }),
        { expires: 30 }
      );
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
