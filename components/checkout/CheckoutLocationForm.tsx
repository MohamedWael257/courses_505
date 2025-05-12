"use client";
import FormInput from "@/shared/form-controls/FormInput";
import FormSelect from "@/shared/form-controls/FormSelect";
import PhoneNumber from "@/shared/form-controls/PhoneNumber";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import axiosInstance from "@/utils/axiosClient";
import axiosInstanceGeneralClient from "@/utils/axiosClientGeneral";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

type Props = {};

export default function CheckoutLocationForm({}: Props) {
  const [loadingLevel, setLoadingLevel] = useState(false);
  const [levelOptions, setLevelOptions] = useState([]);
  const t = useTranslations("");

  const transformLevelData = (data: any) => {
    return data.map((level: any) => ({
      label: level.name || `level ${level.id}`, // Use `name` if available, otherwise use a default
      value: level.id.toString(), // Convert id to string if needed
    }));
  };
  const [loading, setloading] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [locationsOptions, setLocationsOptions] = useState([]);
  const [addressesOptions, setAddressesOptions] = useState([]);

  const transformCityData = (data: any) => {
    return data.map((city: any) => ({
      label: city.name || `city ${city.id}`, // Use `name` if available, otherwise use a default
      value: city.id.toString(), // Convert id to string if needed
    }));
  };

  const transformLocationsData = (data: any) => {
    return data.map((location: any) => ({
      label: location.name || `location ${location.id}`, // Use `name` if available, otherwise use a default
      value: location.id.toString(), // Convert id to string if needed
    }));
  };
  const transformAddressesData = (data: any) => {
    return data.map((address: any) => ({
      label: address.name || `address ${address.id}`, // Use `name` if available, otherwise use a default
      value: address.id.toString(), // Convert id to string if needed
    }));
  };
  // Fetch Data
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setloading(true);
  //     try {
  //       const [fetchCities, fetchLocations, fetchAddresses] = await Promise.all(
  //         [
  //           axiosInstanceGeneralClient.get("cities"),
  //           axiosInstance.get("locations"),
  //           axiosInstance.get("addresses"),
  //         ]
  //       );
  //       const transformedCityData = transformCityData(fetchCities.data.data);
  //       setCityOptions(transformedCityData);

  //       const transformedLocationsData = transformLocationsData(
  //         fetchLocations.data.data
  //       );
  //       setLocationsOptions(transformedLocationsData);

  //       const transformedAddressesData = transformAddressesData(
  //         fetchAddresses.data.data
  //       );
  //       setAddressesOptions(transformedAddressesData);
  //     } catch (error: any) {
  //       const errorMessage = error?.response?.data?.message;
  //       ShowAlertMixin({
  //         type: 15,
  //         icon: "error",
  //         title: errorMessage,
  //       });
  //       setloading(false);
  //     } finally {
  //       setloading(false);
  //     }
  //   };

  //   fetchData();
  // }, []); // Ensure locale is included in the dependencies if it can change

  return (
    <div
      // data-aos="flip-left"
      className="border border-secprimary bg-white p-4 rounded-2xl"
    >
      <h2 className="capitalize text-darkprimary font-bold lg:text-2xl text-xl text-start lg:leading-[50px]   leading-8 mb-4">
        {t("LABELS.address")}
      </h2>
      <div className="flex flex-col gap-4">
        <PhoneNumber
          phone_name="addtional_phone"
          phone_code_name="addtional_phone_code"
          country="sa"
          label="phoneNumber"
          placeholder="phoneNumber"
        />
        <div className="grid lg:grid-cols-2 gap-3">
          <FormSelect
            name="city_id"
            label="city"
            placeholder="city"
            customStyle={true}
            options={cityOptions}
            disabled={loading} // Disable if no city is selected or cities are loading
          />
          <FormSelect
            name="location_id"
            label="location"
            placeholder="location"
            customStyle={true}
            options={locationsOptions}
            disabled={loading} // Disable if no city is selected or cities are loading
          />
        </div>
        <div className="grid lg:grid-cols-2 gap-3">
          <FormSelect
            name="address_id"
            label="address"
            placeholder="address"
            customStyle={true}
            options={addressesOptions}
            disabled={loading} // Disable if no city is selected or cities are loading
          />
          <FormInput
            name="location_name"
            label="location_name"
            className="h-14 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-7 pe-10"
            placeholder="location_name"
          />
        </div>
        <div className="grid lg:grid-cols-2 gap-3">
          <FormInput
            name="location_number"
            label="location_number"
            className="h-14 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-7 pe-10"
            placeholder="location_number"
          />
          <FormInput
            name="room_number"
            label="room_number"
            className="h-14 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-7 pe-10"
            placeholder="room_number"
          />
        </div>{" "}
        <div className="grid lg:grid-cols-2 gap-3">
          <FormInput
            name="location_discription"
            label="location_discription"
            className="h-14 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-7 pe-10"
            placeholder="location_discription"
          />
          <FormInput
            name="location_email"
            label="location_email"
            className="h-14 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-7 pe-10"
            placeholder="location_email"
          />
        </div>
      </div>
    </div>
  );
}
