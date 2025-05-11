/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import DeleteAccountButton from "@/components/profile/personal-account/DeleteAccountButton";
import PersonalAccountDetails from "@/components/profile/personal-account/PersonalAccountDetails";
import PersonalAccountTop from "@/components/profile/personal-account/PersonalAccountTop";
import GeneralClientAxios from "@/shared/AxiosPage/GeneralClientAxios";
type Props = {};

export default function PersonalIndex({}: Props) {
  return (
    <>
      <GeneralClientAxios method="GET" url="profile">
        {(data, refetch) => (
          <>
            <PersonalAccountTop profile={data} />
            <div className="bg-white p-4 rounded-lg mb-4">
              <PersonalAccountDetails refetch={refetch} profile={data} />
            </div>
            <div className="bg-white p-4 rounded-lg mb-4">
              <DeleteAccountButton />
            </div>
          </>
        )}
      </GeneralClientAxios>
    </>
  );
}
