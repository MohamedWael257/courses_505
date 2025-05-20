import React from "react";
import AppBreadCrumbs from "@/shared/Breadcrumbs/AppBreadCrumbs";
import GeneralServerAxios from "@/shared/AxiosPage/GeneralServerAxios";
import CustomNotData from "@/shared/CustomNotData";
export default function page() {
  const paths = [{ name: "home", href: "/" }, { name: "return-policy" }];

  return (
    <>
      <GeneralServerAxios method="GET" url="page/terms">
        {(data) => (
          <div className="overflow-x-hidden">
            {data ? (
              <>
                <div className=" container">
                  <div className=" container md:py-10 py-6">
                    <div
                      className="lg:w-3/4 text-start"
                      dangerouslySetInnerHTML={{
                        __html: data?.desc,
                      }}
                    ></div>
                  </div>
                </div>
              </>
            ) : (
              <CustomNotData />
            )}
          </div>
        )}
      </GeneralServerAxios>
    </>
  );
}
