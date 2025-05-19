"use client";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import axiosInstance from "@/utils/axiosClient";
import { useDispatch } from "react-redux";
import {
  getAddressById,
  CancelAddOrUpdateAddresses,
} from "@/store/address.slice";
import { AppDispatch } from "@/store/store";
import AddressCard from "@/shared/card/AddressCard";
import { setLocation } from "@/store/locationSlice";
import { ScrollArea } from "@/shared/ui/scroll-area";
import ShowAlertMixin from "@/shared/ShowAlertMixin";

type Props = {
  addresses: {
    id: string;
    lat: number;
    lng: number;
    location: string;
    address: string;
    property_number: string;
    details: string;
    is_default: boolean;
    city: {
      id: string;
      name: string;
    };
  }[];
  setIsOpen: any;
  setAuthStage: any;
  refetch: any;
};

export default function CheckoutAddressesDetialssw({
  setAuthStage,
  addresses,
  setIsOpen,
  refetch,
}: Props) {
  const t = useTranslations("");
  const locale = useLocale();

  const dispatch = useDispatch<AppDispatch>();
  const EditItem = async (id: string) => {
    dispatch(getAddressById({ id })).then((res) => {
      if (res.payload) {
        setIsOpen(true);
        setAuthStage("location");
      }
    });
  };
  // const [LoadingCompleteDelete,setLoadingCompleteDelete]=useState(false)
  // const [LoadingCompleteSetDefault,setLoadingCompleteSetDefault]=useState(false)
  const deleteItemFromAddress = async (id: string) => {
    await axiosInstance
      .delete(`locations/${id}`)
      .then((res: any) => {
        ShowAlertMixin({
          type: 15,
          icon: "success",
          title: res?.data?.message,
        });
        refetch();
      })
      .catch((error) => {
        const errorMessage = error?.message;
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: errorMessage,
        });
      });
  };
  const toggleItemToDefault = async (id: string) => {
    await axiosInstance
      .patch(`locations/${id}/setDefault`)
      .then((res:any) => {
        ShowAlertMixin({
          type: 15,
          icon: "success",
          title: res?.data?.message,
        });
        dispatch(
          setLocation({
            lat: res?.data?.data?.lat,
            lng: res?.data?.data?.lng,
            location_description: res?.data?.data?.location,
            location_id: res?.data?.data?.id,
          })
        );
        refetch();
      })
      .catch((error) => {
        const errorMessage = error?.message;
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: errorMessage,
        });
      });
  };

  return (
    <>
      <div className="flex flex-col gap-0 pt-8 w-full md:p-4">
        <ScrollArea className="grow " dir={locale === "en" ? "ltr" : "rtl"}>
          <div className={`h-[500px] flex flex-col pe-2`}>
            <div className="grid gap-2">
              {addresses.map((address, index: number) => {
                return (
                  <AddressCard
                    setDefault={() => {
                      if (address.is_default == false) {
                        toggleItemToDefault(address?.id);
                      }
                    }}
                    EditItem={() => EditItem(address?.id)}
                    deleteItem={() => deleteItemFromAddress(address?.id)}
                    address={address}
                    index={index}
                    key={index}
                  />
                );
              })}
            </div>
            <div className="flex md:flex-row flex-col md:justify-between md:gap-0 gap-3 items-center mb-4">
              <button
                onClick={() => {
                  setIsOpen(true);
                  setAuthStage("location");
                  dispatch(CancelAddOrUpdateAddresses());
                }}
                className="text-center grid grid-cols-[auto_1fr] items-center gap-2 px-7 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
              >
                <FaPlus size={25} />
                {t("BUTTONS.addNewAddress")}
              </button>
              <div className=" flex gap-6 mb-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="text-center flex items-center gap-2   mx-auto px-7 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
                >
                  {t("BUTTONS.confirm")}
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  type="button"
                  className="text-center flex items-center gap-2   mx-auto px-7 py-3 bg-white border border-primary text-primary font-medium rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
                >
                  {t("BUTTONS.cancel")}
                </button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
