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
  // const { allAddressesItems, mainLoader, error } = useSelector(
  //   (state: RootState) => state.AddressConfig
  // );
  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   dispatch(getAllAddressesItems());
  // }, []);
  // if (error && error.status) {
  //   return <CustomError status={error.status} />;
  // }
  return (
    <>
      {/* {mainLoader ? (
       <div
          className="screen_loader h-full relative inset-0 bg-transparent dark:bg-[#060818] z-[1] grid place-content-center animate__animated"
         // style={{ zIndex: 999 }}
        >
          <LoaderSection />
        </div>
      ) : allAddressesItems?.length > 0 ? (
        <AddressesDetials
          setAuthStage={setAuthStage}
          setIsOpen={setIsOpen}
          addresses={allAddressesItems}
        />
      ) : (
        <EmptyAddresses setAuthStage={setAuthStage} setIsOpen={setIsOpen} />
      )} */}
      <GeneralClientAxios method="GET" url={`locations`}>
        {(data, refetch, _, meta) => (
          <>
            {data?.length > 0 ? (
              <AddressesDetials
                setAuthStage={setAuthStage}
                setIsOpen={setIsOpen}
                addresses={data}
                refetch={refetch}
                paggination={meta}
                current_page={current_page}
              />
            ) : (
              <EmptyAddresses
                setAuthStage={setAuthStage}
                setIsOpen={setIsOpen}
              />
            )}
            <AppDialog
              width={
                authStage === "location"
                  ? "w-[650px]"
                  : authStage === "locationconfirm"
                  ? "w-[580px]"
                  : ""
              }
              setIsDialogOpen={setIsOpen}
              isDialogOpen={isOpen}
              authStage={authStage}
              setAuthStage={setAuthStage}
              refetch={refetch}
            />
          </>
        )}
      </GeneralClientAxios>
      {/* <AppDialog
        width={
          authStage === "location"
            ? "w-[650px]"
            : authStage === "locationconfirm"
            ? "w-[580px]"
            : ""
        }
        setIsDialogOpen={setIsOpen}
        isDialogOpen={isOpen}
        authStage={authStage}
        setAuthStage={setAuthStage}
      /> */}
    </>
  );
}
