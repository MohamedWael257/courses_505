import Faqs from "@/components/faqs/Faqs";
import GeneralServerAxios from "@/shared/AxiosPage/GeneralServerAxios";
import AppBreadCrumbs from "@/shared/Breadcrumbs/AppBreadCrumbs";
import CustomNotData from "@/shared/CustomNotData";
import React from "react";
export default function page({
  searchParams,
}: {
  searchParams: {
    page?: string;
  };
}) {
  const page = Number(searchParams?.page) || 1;
  const paths = [{ name: "home", href: "/" }, { name: "faqs" }];

  return (
    <>
      <GeneralServerAxios method="GET" url="faqs">
        {(data, meta) => (
          <>
            <div className="overflow-x-hidden">
              {data?.length > 0 ? (
                <>
                  <div className="bg-secgreynormal">
                    <div className=" container md:py-10 py-6">
                      <AppBreadCrumbs
                        TranslateTitle
                        paths={paths}
                        title={"faqs"}
                      />
                    </div>
                  </div>
                  <div className=" container">
                    <Faqs current_page={page} paggination={meta} faqs={data} />
                  </div>
                </>
              ) : (
                <CustomNotData />
              )}
            </div>
          </>
        )}
      </GeneralServerAxios>
    </>
  );
}
