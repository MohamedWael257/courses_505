"use client";
import React from "react";
import NotificationsData from "@/components/notifications/NotificationsData";
import EmptyNotifications from "@/components/notifications/EmptyNotifications";
import GeneralClientAxios from "@/shared/AxiosPage/GeneralClientAxios";
import AppBreadCrumbs from "@/shared/Breadcrumbs/AppBreadCrumbs";
type Props = {
  searchParams: {
    page?: string;
  };
};
export default async function page({ searchParams }: Props) {
  const paths = [{ name: "home", href: "/" }, { name: "notifications" }];

  const page = Number(searchParams?.page) || 1;

  return (
    <>
      <GeneralClientAxios method="GET" url="notifications" params={{ page }}>
        {(data, refetch, _, meta) => (
          <div className="bg-greynormal overflow-x-hidden">
            <div className=" container md:py-10 py-6">
              <AppBreadCrumbs paths={paths} />
              {data?.length > 0 ? (
                <NotificationsData
                  paggination={meta}
                  current_page={page}
                  refetch={refetch}
                  notifications={data}
                />
              ) : (
                <EmptyNotifications />
              )}
            </div>
          </div>
        )}
      </GeneralClientAxios>
    </>
  );
}
