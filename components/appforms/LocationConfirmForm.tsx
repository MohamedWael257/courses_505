/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { HiOutlineLocationMarker } from "react-icons/hi";

import Link from "next/link";

// Lib
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Chadcn component
import { useLocale, useTranslations } from "next-intl";
import { ScrollArea } from "@/shared/ui/scroll-area";

import { Form } from "@/shared/ui/form";
import { AuthStage } from "@/components/Header";
import CustomBtn from "@/shared/buttons/CustomBtn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import FormInput from "@/shared/form-controls/FormInput";
import { Checkbox } from "@/shared/ui/checkbox";
import FormTextarea from "@/shared/form-controls/FormTextarea";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import FormSelect from "@/shared/form-controls/FormSelect";
import axiosInstance from "@/utils/axiosClient";
import { RiArrowRightLine } from "react-icons/ri";
import { setLocation } from "@/store/locationSlice";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import { Edit } from "@/shared/Icons";
import LoaderSection from "@/shared/LoaderSection/LoaderSection";
import Success from "@/assets/images/success2.gif";
import axiosInstanceGeneralClient from "@/utils/axiosClientGeneral";

interface LocationConfirmFormProps {
  setAuthStage: (stage: AuthStage) => void;
  dialogOpen: (open: boolean) => void;
  longitude: number | null;
  latitude: number | null;
  refetch: any;
  refresh?: any;
}
const LocationConfirmForm: React.FC<LocationConfirmFormProps> = ({
  setAuthStage,
  dialogOpen,
  longitude,
  latitude,
  refetch,
  refresh = false,
}) => {
  const t = useTranslations("");
  const locale = useLocale();
  const googleAPIKey = "AIzaSyDRymdCLWxCwLHFnwv36iieKAMjiwk8sdc";
  const [locationAddress, setLocationAddress] = useState<string | null>(null);
  const { singleItem, mainLoader } = useSelector(
    (state: RootState) => state.AddressConfig
  );
  const [loading, setLoading] = useState(false);
  const [loadingfetchLocation, setLoadingfetchLocation] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const fetchLocation = async (lat: number, lng: number) => {
    setLoadingfetchLocation(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=false&key=${googleAPIKey}&language=${locale}`
      );
      const data = await response.json();

      if (data.results.length) {
        const addressComponents = data.results[0]?.address_components;
        const trimmedResults = addressComponents.slice(0, -2);
        const address = trimmedResults
          .map((el: any) => el.short_name)
          .join(" ");
        setLocationAddress(address);
        setLoadingfetchLocation(false);
      }
    } catch (error: any) {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: error?.response?.data?.message,
      });
      setLoadingfetchLocation(false);
    }
  };
  useEffect(() => {
    if (latitude && longitude) {
      fetchLocation(latitude, longitude);
    }
  }, [latitude, longitude]);
  const [cityOptions, setCityOptions] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const transformCityData = (data: any) => {
    return data.map((city: any) => ({
      label: city.name || `City ${city.id}`, // Use `name` if available, otherwise use a default
      value: city.id, // Convert id to string if needed
    }));
  };

  // Fetch cities
  useEffect(() => {
    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const res = await axiosInstanceGeneralClient.get(`cities`);
        const transformedCityData = transformCityData(res.data.data);
        setCityOptions(transformedCityData);
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message;
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: errorMessage,
        });
        setLoadingCities(false);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, []); // Ensure locale is included in the dependencies if it can change

  const formSchema = yup.object({
    city_id: yup.string().required("city is a required field"),
    address_name: yup.string().required("address is a required field"),
    property_number: yup.string().required("project_num is a required field"),
    address_desc: yup.string().required("address_desc is a required field"),
    // is_default: yup.boolean().required("default_location is a required field"),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      city_id: singleItem?.city?.id || "",
      address_name: singleItem?.address || "",
      property_number: singleItem?.property_number || "",
      address_desc: singleItem?.details || "",
      // is_default: false,
    },
  });
  // const { lng, lat } = useSelector((state: RootState) => {
  //   return {
  //     lng: state.locationConfig.lng,
  //     lat: state.locationConfig.lat,
  //   };
  // });
  const handleSetLocation = () => {
    // form.setValue("lat", lat ? lat.toString() : "");
    // form.setValue("lng", lng ? lng.toString() : "");
  };

  async function onSubmit(
    values: yup.InferType<typeof formSchema>,
    actions: any
  ) {
    const finalOut = {
      lat: latitude,
      lng: longitude,
      location: locationAddress,
      address: values?.address_name,
      details: values?.address_desc,
      property_number: values?.property_number,
      // is_default: values?.is_default,
      city_id: values?.city_id,
    };
    try {
      setLoading(true);

      const endpoint = singleItem?.id
        ? `locations/${singleItem.id}`
        : `locations`;
      const method = singleItem?.id ? axiosInstance.put : axiosInstance.post;
      const { data } = await method(endpoint, finalOut);

      if (data.status === "success") {
        Swal.fire({
          title: data?.message,
          timer: 3000,
          showConfirmButton: false,
          imageUrl: `${Success.src}`,
          customClass: {
            popup: "custom-popup-class",
            title: "custom-title-class",
          },
        });
        if (data.data && +data.data.is_default == 1) {
          dispatch(
            setLocation({
              location_id: data?.data?.id,
              lat: data?.data?.lat,
              lng: data?.data?.lng,
              location_description: data?.data?.location,
            })
          );
        }
        if (refresh) {
          window.location.reload();
        }
        setAuthStage("location");
        dialogOpen(false);
        if (refetch) {
          refetch();
        }
        setLoading(false);
      }
    } catch (error: any) {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: error.response?.data?.message || error.message,
      });
      setLoading(false);
    }
  }
  if (mainLoader || loadingfetchLocation || loadingCities) {
    return (
      <div className="min-h-[650px] flex items-center justify-center">
        <LoaderSection />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 w-full p-4">
      <ScrollArea className="grow " dir={locale === "en" ? "ltr" : "rtl"}>
        <div className={`h-[650px] flex flex-col pe-2`}>
          <div className="mb-6">
            <h3
              className="text-[24px] font-bold grid grid-cols-[auto_1fr] gap-2"
              onClick={() => setAuthStage("location")}
            >
              <RiArrowRightLine
                className={`${locale == "ar" ? "" : "rotate-180 me-4"}`}
                size={30}
              />
              {t("Text.GO_BACK_TO_MAP")}
            </h3>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-4 items-center mb-3">
            <img
              className="lg:w-[150px] lg:h-[150px] w-24 h-24 object-contain rounded-2xl"
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=12&size=800x600&key=${googleAPIKey}`}
              alt="image"
              // width={400}
              // height={400}
            />
            <div>
              <h2 className="capitalize font-semibold lg:text-xl text-lg text-start lg:leading-8 mb-5 ">
                {locationAddress}
              </h2>
              <Edit
                onClick={() => setAuthStage("location")}
                className="size-8 border-[1px] border-secondrydark rounded-lg p-[5px]"
              />
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormSelect
                name="city_id"
                label="city"
                placeholder="city"
                customStyle={true}
                className="!h-16 placeholder:text"
                options={cityOptions}
                disabled={loadingCities} // Disable if no country is selected or cities are loading
              />
              <div className="grid lg:grid-cols-2  gap-3 mb-4">
                <FormInput
                  name="address_name"
                  label="address_name"
                  className="h-16  placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-[12px] border border-subborder pe-10"
                  placeholder="address_name"
                  // leftIcon={<Email />}
                />
                <FormInput
                  name="property_number"
                  label="project_num"
                  className="h-16  placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-[12px] border border-subborder pe-10"
                  placeholder="project_num"
                  // leftIcon={<Email />}
                />
              </div>
              <FormTextarea
                name="address_desc"
                label="address_desc"
                className="h-[200px]  placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-[12px] border border-subborder pe-10"
                placeholder="address_desc"
                // leftIcon={<Email />}
              />
              {/* <div className="flex items-center gap-3 mt-4">
                <Checkbox
                  id="is_default"
                  name="is_default"
                  onCheckedChange={(checked) => {
                    form.setValue("is_default", checked === true);
                  }}
                />
                <p
                  className={
                    form?.formState?.errors?.is_default ? "text-error" : ""
                  }
                >
                  {t("Text.SET_AS_DEFAULT_ADDRESS")}
                </p>
              </div> */}
              <div className="!pt-2 z-[1] relative">
                <CustomBtn
                  title={t("BUTTONS.CONFIRM_LOCATION")}
                  buttonType="submit"
                  loader={loading || mainLoader}
                  disabled={loading || mainLoader}
                  button
                  className=" !w-full !h-[56px] !rounded-[12px]  !mt-[20px]"
                />
              </div>
            </form>
          </Form>
        </div>
      </ScrollArea>
    </div>
  );
};

export default LocationConfirmForm;
