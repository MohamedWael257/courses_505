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
import PhoneNumber from "@/shared/form-controls/PhoneNumber";
import { Switch } from "@/shared/ui/switch";

interface LocationFormProps {
  setAuthStage: (stage: AuthStage) => void;
  dialogOpen: (open: boolean) => void;
  refetch: any;
  refresh?: any;
}
const locationForm: React.FC<LocationFormProps> = ({
  setAuthStage,
  dialogOpen,
  refetch,
  refresh = false,
}) => {
  const t = useTranslations("");
  const locale = useLocale();

  const { singleItem, mainLoader } = useSelector(
    (state: RootState) => state.AddressConfig
  );
  const [checked, setChecked] = useState(singleItem?.location_default || false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const formSchema = yup.object({
    full_name: yup.string().required("is a required field"),
    email: yup.string().required("is a required field"),
    phone: yup.string().required("is a required field"),
    phone_code: yup.string(),
    city_id: yup.string().required("is a required field"),
    location_id: yup.string().required("is a required field"),
    address_id: yup.string().required("is a required field"),
    location_name: yup.string().required("is a required field"),
    location_number: yup.string().required("is a required field"),
    room_number: yup.string().required("is a required field"),
    location_discription: yup.string().required("is a required field"),
    location_email: yup.string().required("is a required field"),
    location_defalut: yup.boolean().required("is a required field"),

    // is_default: yup.boolean().required("default_location is a required field"),
  });

  const form = useForm({
    // resolver: yupResolver(formSchema),
    defaultValues: {
      full_name: singleItem?.full_name || "",
      email: singleItem?.email || "",
      phone: singleItem?.phone || "",
      phone_code: singleItem?.phone_code || "",
      city_id: singleItem?.city_id || "",
      location_id: singleItem?.location_id || "",
      address_id: singleItem?.address_id || "",
      location_name: singleItem?.location_name || "",
      location_number: singleItem?.location_number || "",
      room_number: singleItem?.room_number || "",
      location_discription: singleItem?.location_discription || "",
      location_email: singleItem?.location_email || "",
      location_defalut: checked || false,
    },
  });

  async function onSubmit(
    values: yup.InferType<typeof formSchema>,
    actions: any
  ) {
    const finalOut = {
      full_name: values?.full_name,
      email: values?.email,
      phone: values?.phone,
      phone_code: values?.phone_code,
      city_id: values?.city_id,
      location_id: values?.location_id,
      address_id: values?.address_id,
      location_name: values?.location_name,
      location_number: values?.location_number,
      room_number: values?.room_number,
      location_discription: values?.location_discription,
      location_email: values?.location_email,
      location_defalut: values?.location_defalut,
    };
    try {
      setLoading(true);

      const endpoint = singleItem?.id
        ? `locations/${singleItem.id}`
        : `locations`;
      const method = singleItem?.id ? axiosInstance.put : axiosInstance.post;
      const { data } = await method(endpoint, finalOut);

      // if (data.status === "success") {
      Swal.fire({
        title: "success",
        timer: 3000,
        showConfirmButton: false,
        imageUrl: `${Success.src}`,
        customClass: {
          popup: "custom-popup-class",
          title: "custom-title-class",
        },
      });
      // if (data.data && +data.data.is_default == 1) {
      //   dispatch(
      //     setLocation({
      //       location_id: data?.data?.id,
      //       lat: data?.data?.lat,
      //       lng: data?.data?.lng,
      //       location_description: data?.data?.location,
      //     })
      //   );
      // }
      // if (refresh) {
      //   window.location.reload();
      // }
      // setAuthStage("location");
      // dialogOpen(false);
      // if (refetch) {
      //   refetch();
      // }
      setLoading(false);
      // }
    } catch (error: any) {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: error.response?.data?.message || error.message,
      });
      setLoading(false);
    }
  }
  // if (mainLoader) {
  //   return (
  //     <div className="min-h-[650px] flex items-center justify-center">
  //       <LoaderSection />
  //     </div>
  //   );
  // }
  return (
    <div className="flex flex-col gap-3 w-full p-4">
      <ScrollArea className="grow " dir={locale === "en" ? "ltr" : "rtl"}>
        <div className={`h-[650px] flex flex-col pe-2`}>
          <div className="mb-3">
            <h3 className="text-[20px] font-semibold grid grid-cols-[auto_1fr] gap-2">
              {t("Text.addresses")}
            </h3>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <div className="lg:grid lg:grid-cols-2 gap-4">
                  <FormInput
                    name="full_name"
                    label="full_name"
                    className="h-16 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-7 pe-10"
                    placeholder="full_name"
                  />{" "}
                  <FormInput
                    name="email"
                    label="email"
                    className="h-16 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-7 pe-10"
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
                    name="city_id"
                    label="city"
                    placeholder="city"
                    customStyle={true}
                    options={[]}
                    disabled={loading} // Disable if no city is selected or cities are loading
                  />
                  <FormSelect
                    name="location_id"
                    label="location"
                    placeholder="location"
                    customStyle={true}
                    options={[]}
                    disabled={loading} // Disable if no city is selected or cities are loading
                  />
                </div>
                <div className="grid lg:grid-cols-2 gap-3">
                  <FormSelect
                    name="address_id"
                    label="address"
                    placeholder="address"
                    customStyle={true}
                    options={[]}
                    disabled={loading} // Disable if no city is selected or cities are loading
                  />
                  <FormInput
                    name="location_name"
                    label="location_name"
                    className="h-16 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-7 pe-10"
                    placeholder="location_name"
                  />
                </div>
                <div className="grid lg:grid-cols-2 gap-3">
                  <FormInput
                    name="location_number"
                    label="location_number"
                    className="h-16 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-7 pe-10"
                    placeholder="location_number"
                  />
                  <FormInput
                    name="room_number"
                    label="room_number"
                    className="h-16 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-7 pe-10"
                    placeholder="room_number"
                  />
                </div>{" "}
                <div className="grid lg:grid-cols-2 gap-3">
                  <FormInput
                    name="location_discription"
                    label="location_discription"
                    className="h-16 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-7 pe-10"
                    placeholder="location_discription"
                  />
                  <FormInput
                    name="location_email"
                    label="location_email"
                    className="h-16 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-7 pe-10"
                    placeholder="location_email"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={checked} onCheckedChange={setChecked} />
                  <p>تعيين كعنوان أساسي</p>
                </div>{" "}
              </div>

              <div className="flex justify-end items-center gap-2 py-4">
                <button
                  disabled={loading}
                  className="rounded-full font-bold w-[177px] px-12s  text-center !h-[56px] !mt-[30px] md:!mt-[56px] bg-white hover:bg-primary hover:text-white transition-colors text-primary border border-primary"
                >
                  {t("BUTTONS.cancel")}
                </button>
                <CustomBtn
                  title={t("BUTTONS.CONFIRM_LOCATION")}
                  buttonType="submit"
                  loader={loading || mainLoader}
                  disabled={loading || mainLoader}
                  button
                  className="!rounded-full font-bold !w-[177px] px-12s  text-center !h-[56px] !mt-[30px] md:!mt-[56px] bg-primary text-white"
                />
              </div>
            </form>
          </Form>
        </div>
      </ScrollArea>
    </div>
  );
};

export default locationForm;
