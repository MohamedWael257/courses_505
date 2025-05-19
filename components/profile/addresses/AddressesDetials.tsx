"use client";
import React, { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import showAlert from "@/shared/ShowAlert";
import axiosInstance from "@/utils/axiosClient";
import { useDispatch } from "react-redux";
import {
  getAddressById,
  CancelAddOrUpdateAddresses,
} from "@/store/address.slice";
import { AppDispatch } from "@/store/store";
import AddressCard from "@/shared/card/AddressCard";
import { setLocation } from "@/store/locationSlice";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import AppPagination from "@/shared/Pagination/AppPagination";
import { usePathname, useRouter } from "next/navigation";
import { updateURLParams } from "@/utils/helpers";

type Props = {
  addresses:
    | {
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
      }[]
    | null;
  setIsOpen: any;
  setAuthStage: any;
  refetch: any;
  current_page: any;
  paggination: any;
};

export default function AddressesDetials({
  setAuthStage,
  addresses,
  setIsOpen,
  refetch,
  paggination,
  current_page,
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
  const deleteItem = (id: string) => {
    showAlert(
      t,
      t("Text.deleteAddress"),
      t("Text.deleteAddressDesc"),
      false,
      t("BUTTONS.confirm"),
      true,
      "warning",
      () => deleteItemFromAddress(id)
      // dispatch(
      //   deleteItemFromAddress({
      //     id: id,
      //     message: t("Messages.locationSavedSuccessfully"),
      //   })
      // )
    );
    // setLoadingCompleteDelete(isLoading)
  };
  const toggleItemToDefault = async (id: string) => {
    await axiosInstance
      .patch(`locations/${id}/setDefault`)
      .then((res) => {
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
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handlePaggination = (selectedPage: any) => {
    updateURLParams({ page: selectedPage }, router, pathname);
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);
  };
  return (
    <>
      <div className="bg-greynormal p-6 rounded-2xl border border-secprimary">
        <div className="flex gap-4 items-center my-6">
          <h2 className="flex-1 text-darkprimary font-bold lg:text-2xl text-xl text-start lg:leading-[50px]   leading-8">
            {t("Text.addressesTitle")}
          </h2>
          <button
            onClick={() => {
              setIsOpen(true);
              setAuthStage("location");
              dispatch(CancelAddOrUpdateAddresses());
            }}
            className="text-center grid grid-cols-[auto_1fr] items-center gap-2 px-7 py-3 bg-primary text-white font-medium rounded-full shadow-md hover:bg-orange-600 transition duration-300"
          >
            <FaPlus size={25} />
            {t("BUTTONS.addNewAddress")}
          </button>
        </div>
        <div ref={containerRef} className="grid gap-2">
          {/* {addresses.map((address, index: number) => {
          return (
            <AddressCard
              setDefault={() => {
                if (address.is_default == false) {
                  toggleItemToDefault(address?.id);
                }
              }}
              EditItem={() => EditItem(address?.id)}
              deleteItem={() => deleteItem(address?.id)}
              address={address}
              index={index}
              key={index}
            />
          );
        })} */}
          {[...Array(2)].map((address, index) => (
            <AddressCard
              setDefault={() => {
                if (address.is_default == false) {
                  toggleItemToDefault(address?.id);
                }
              }}
              EditItem={() => EditItem(address?.id)}
              deleteItem={() => deleteItem(address?.id)}
              address={address}
              index={index}
              key={index}
            />
          ))}
        </div>
        {addresses && addresses.length > 0 && (
          <div className="py-8">
            <AppPagination
              itemsPerPage={paggination?.per_page}
              totalItems={paggination?.total}
              totalPage={paggination?.last_page}
              currentPage={+current_page}
              paginate={handlePaggination}
            />
          </div>
        )}
      </div>
    </>
  );
}
