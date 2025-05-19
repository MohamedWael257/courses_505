/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CountryPhoneCodes } from "../public/countries/country-phone-code";
import Cookies from "js-cookie";
import { AppDispatch } from "@/store/store";
import axiosInstance from "./axiosClient";
import { updateUser } from "@/store/auth.slice";
import ShowAlertMixin from "@/shared/ShowAlertMixin";

interface LocationProps {
  dispatch: AppDispatch;
  setLocation: any;
}

interface FetchLocationProps extends LocationProps {
  lat: number;
  lng: number;
}

interface HandleLocationFetch extends LocationProps {
  clientLocation: any;
}

const googleAPIKey = "AIzaSyDRymdCLWxCwLHFnwv36iieKAMjiwk8sdc";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPhoneNumber = (phonecode: string, phone: string): string => {
  const dial_code =
    CountryPhoneCodes.find(
      (country) => `+${phonecode}` == country.dial_code.toLowerCase()
    )?.dial_code || "";
  return `${dial_code}${phone}`;
};

const fetchLocation = async ({
  lat,
  lng,
  dispatch,
  setLocation,
}: FetchLocationProps) => {
  // dispatch(setLocation({ isLoading: true }));
  try {
    const locale = Cookies.get("NEXT_LOCALE") || "ar";

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=false&key=${googleAPIKey}&language=${locale}`
    );
    const data = await response.json();

    if (data.results.length) {
      const addressComponents = data.results[0]?.address_components;
      const trimmedResults = addressComponents.slice(0, -2);
      const address = trimmedResults.map((el: any) => el.short_name).join(" ");

      const locationData = {
        lat,
        lng,
        location_description: address,
      };

      Cookies.set("client_location", JSON.stringify(locationData));
      dispatch(setLocation({ ...locationData, isLoading: false }));
      console.log("Location successfully saved and dispatched:", address);
    }
  } catch (error) {
    console.error("Error fetching geolocation address:", error);
  }
};

export const handleLocationFetch = ({
  dispatch,
  setLocation,
  clientLocation,
}: HandleLocationFetch) => {
  if (!clientLocation) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          fetchLocation({ lat, lng, dispatch, setLocation });
        },
        (error) => {
          dispatch(setLocation({ isLoading: false }));
          console.error("Geolocation error:", error);
        }
      );
    }
  } else {
    const location = JSON.parse(clientLocation);
    dispatch(setLocation({ ...location, isLoading: false }));
  }
};

export const updateURLParams = (
  params: { [key: string]: string | null },
  router: any,
  pathname: any,
  page?: boolean,
  refetch?: any
) => {
  const newSearchParams = new URLSearchParams(window.location.search);
  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, value);
    }
    if (page) {
      newSearchParams.delete("page");
    }
    if (refetch) {
      refetch();
    }
  });
  router.replace(`${pathname}?${newSearchParams.toString()}`, {
    scroll: false,
  });
};

export const UpdateProfile = async (dispatch: AppDispatch) => {
  try {
    const response = await axiosInstance.get("/profile");

    dispatch(updateUser(response.data.data));
  } catch (error: any) {
    ShowAlertMixin({
      type: 15,
      icon: "error",
      title: error?.response?.data?.message,
    });
  } finally {
  }
};
