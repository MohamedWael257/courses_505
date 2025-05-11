"use client";

import Link from "next/link";

// Lib
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Chadcn component
import { useTranslations } from "next-intl";
import { Form } from "@/shared/ui/form";
import { AuthStage } from "@/components/Header";
import CustomBtn from "@/shared/buttons/CustomBtn";
import GoogleMapFormField from "./../../shared/googleMap/GoogleMapFormField";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import LoaderSection from "@/shared/LoaderSection/LoaderSection";

interface LocationFormProps {
  setAuthStage: (stage: AuthStage) => void;
  dialogOpen: (open: boolean) => void;
  setLongitude: React.Dispatch<React.SetStateAction<number | null>>;
  setLatitude: React.Dispatch<React.SetStateAction<number | null>>;
}
const LocationForm: React.FC<LocationFormProps> = ({
  setAuthStage,
  dialogOpen,
  setLongitude,
  setLatitude,
}) => {
  const { singleItem, mainLoader } = useSelector(
    (state: RootState) => state.AddressConfig
  );

  const t = useTranslations("");
  const formSchema = yup.object({
    lat: yup.string().required("this_field_is_required"),
    lng: yup.string().required("this_field_is_required"),
  });
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      lat: singleItem?.lat || "",
      lng: singleItem?.lng || "",
    },
  });
  // const { lng, lat } = useSelector((state: RootState) => {
  //   return {
  //     lng: state.locationConfig.lng,
  //     lat: state.locationConfig.lat,
  //   };
  // });
  // const handleSetLocation = () => {
  //   form.setValue("lat", lat ? lat.toString() : "");
  //   form.setValue("lng", lng ? lng.toString() : "");
  // };

  async function onSubmit(values: yup.InferType<typeof formSchema>) {
    setLongitude(Number(values.lng));
    setLatitude(Number(values.lat));
    setAuthStage("locationconfirm");
  }
  if (mainLoader) {
    return <LoaderSection />;
  }
  return (
    <div className="flex flex-col gap-3 w-full p-4">
      <div className="mb-6">
        <h3 className="text-[24px] font-bold">
          {t("Text.SET_LOCATION_ON_MAP")}
        </h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-8 relative">
            {/* {lat && lng && (
              <button
                className="absolute bottom-[11rem] start-[4rem] bg-white p-4 rounded-xl text-center cursor-pointer z-50"
                onClick={() => handleSetLocation}
              >
                حدد مكاني
              </button>
            )} */}
            <GoogleMapFormField
              latitude={singleItem?.lat}
              longitude={singleItem?.lng}
            />
            <div className="!pt-2 z-[1] relative">
              <CustomBtn
                title={t("BUTTONS.CONFIRM_LOCATION")}
                buttonType="submit"
                disabled={false}
                loader={false}
                button
                className=" !w-full !h-[56px] !rounded-[12px]  !mt-[20px]"
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LocationForm;
