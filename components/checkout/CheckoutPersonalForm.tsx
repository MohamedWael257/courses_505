"use client";
import FormInput from "@/shared/form-controls/FormInput";
import FormSelect from "@/shared/form-controls/FormSelect";
import PhoneNumber from "@/shared/form-controls/PhoneNumber";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import axiosInstanceGeneralClient from "@/utils/axiosClientGeneral";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

type Props = {};

export default function CheckoutPersonalForm({}: Props) {
  const [loadingLevel, setLoadingLevel] = useState(false);
  const [levelOptions, setLevelOptions] = useState([]);
  const t = useTranslations("");

  const transformLevelData = (data: any) => {
    return data.map((level: any) => ({
      label: level.name || `level ${level.id}`, // Use `name` if available, otherwise use a default
      value: level.id.toString(), // Convert id to string if needed
    }));
  };

  // Fetch levels
  useEffect(() => {
    const fetchCountries = async () => {
      setLoadingLevel(true);
      try {
        const res = await axiosInstanceGeneralClient.get("level");

        const transformedCityData = transformLevelData(res.data.data);
        setLevelOptions(transformedCityData);
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message;
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: errorMessage,
        });
        setLoadingLevel(false);
      } finally {
        setLoadingLevel(false);
      }
    };

    fetchCountries();
  }, []); // Ensure locale is included in the dependencies if it can change

  const [loadingCountries, setLoadingCountries] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);

  const transformCountryData = (data: any) => {
    return data.map((Country: any) => ({
      label: Country.name || `country ${Country.id}`, // Use `name` if available, otherwise use a default
      value: Country.id.toString(), // Convert id to string if needed
    }));
  };

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      setLoadingCountries(true);
      try {
        const res = await axiosInstanceGeneralClient.get("countries");

        const transformedCityData = transformCountryData(res.data.data);
        setCountryOptions(transformedCityData);
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message;
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: errorMessage,
        });
        setLoadingCountries(false);
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []); // Ensure locale is included in the dependencies if it can change

  return (
    <div
      data-aos="flip-left"
      className="border border-greynormal p-4 rounded-2xl"
    >
      <h2 className="capitalize text-darkprimary font-bold lg:text-2xl text-xl text-start lg:leading-[50px]   leading-8 mb-4">
        {t("LABELS.address")}
      </h2>
      <div className="flex flex-col gap-4">
        <div className="grid lg:grid-cols-2 gap-3">
          <FormInput
            name="full_name"
            label="fullname"
            className="h-14 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-7 pe-10"
            placeholder="fullname"
          />
          <FormInput
            name="email"
            label="email"
            className="h-14 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-7 pe-10"
            placeholder="email"
          />
        </div>
        <PhoneNumber
          country="sa"
          label="phoneNumber"
          placeholder="phoneNumber"
        />
        <div className="grid lg:grid-cols-2 gap-3">
          <FormSelect
            name="country_id"
            label="country"
            placeholder="country"
            customStyle={true}
            className="!h-14 placeholder:text"
            options={countryOptions}
            disabled={loadingCountries} // Disable if no country is selected or cities are loading
          />
          <FormSelect
            name="level"
            label="level"
            placeholder="level"
            customStyle={true}
            className="!h-14 placeholder:text bg-white"
            options={levelOptions}
            disabled={loadingLevel} // Disable if no country is selected or cities are loading
          />
        </div>
      </div>
    </div>
  );
}
