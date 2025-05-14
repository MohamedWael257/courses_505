/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import PersonalAccountDetails from "@/components/profile/personal-account/PersonalAccountDetails";
import GeneralClientAxios from "@/shared/AxiosPage/GeneralClientAxios";
type Props = {};

export default function PersonalIndex({}: Props) {
  return (
    <>
      {/* <GeneralClientAxios method="GET" url="profile">
        {(data, refetch) => (
          <>
            <div className="bg-white p-4 rounded-lg mb-4"> */}
              <PersonalAccountDetails refetch={null} profile={null} />
            {/* </div>
          </>
        )}
      </GeneralClientAxios> */}
    </>
  );
}
