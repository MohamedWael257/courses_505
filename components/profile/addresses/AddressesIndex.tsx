/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import AppDialog from "@/shared/Dialogs/AppDialog";
import { AuthStage } from "@/components/Header";
import AddressesDetials from "@/components/profile/addresses/AddressesDetials";
import GeneralClientAxios from "@/shared/AxiosPage/GeneralClientAxios";
import EmptyAddresses from "./EmptyAddresses";
export default function AddressesIndex({ current_page }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [authStage, setAuthStage] = useState<AuthStage>("location");

  return (
    <>
      {/* <GeneralClientAxios method="GET" url={`locations`}>
        {(data, refetch, _, meta) => ( */}
      <>
        {/* {data?.length > 0 ? ( */}
        <AddressesDetials
          setAuthStage={setAuthStage}
          setIsOpen={setIsOpen}
          addresses={null}
          refetch={null}
          paggination={{}}
          current_page={current_page}
        />
        {/* ) : (
              <EmptyAddresses
                setAuthStage={setAuthStage}
                setIsOpen={setIsOpen}
              />
            )} */}
        <AppDialog
          width={authStage === "location" ? "w-[580px]" : ""}
          setIsDialogOpen={setIsOpen}
          isDialogOpen={isOpen}
          authStage={authStage}
          setAuthStage={setAuthStage}
          refetch={null}
        />
      </>
      {/* )}
      </GeneralClientAxios> */}
    </>
  );
}
