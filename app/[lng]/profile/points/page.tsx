import React from "react";
import EmptyPoints from "@/components/profile/points/EmptyPoints";
import PointsCard from "@/components/profile/points/PointsCard";
import PointsDetails from "@/components/profile/points/PointsDetails";
import GeneralServerAxios from "@/shared/AxiosPage/GeneralServerAxios";
import MetaComponent from "@/shared/MetaComponent";
export default function page({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const type = searchParams.type || "deposit"; // let page = 1;

  return (
    <>
      <GeneralServerAxios
        requests={[
          { method: "GET", url: "points", key: "points" },
          {
            method: "GET",
            url: "points/transactions",
            key: `transactions`,
            params: { type },
          },
        ]}
      >
        {(data) => (
          <>
            <PointsCard points={data?.points?.data} />
            {data?.transactions?.data?.length > 0 ? (
              <PointsDetails
                transactions={data?.transactions?.data}
                defaultType={"deposit"}
              />
            ) : (
              <EmptyPoints />
            )}
          </>
        )}
      </GeneralServerAxios>
    </>
  );
}
