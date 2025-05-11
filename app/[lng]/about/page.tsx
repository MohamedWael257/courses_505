import React from "react";
import BreadcrumbSlugs from "@/shared/Breadcrumbs/CustomBreadcrumbs";
import GeneralServerAxios from "@/shared/AxiosPage/GeneralServerAxios";
import CustomNotData from "@/shared/CustomNotData";
export default function page() {
  const paths = [{ name: "home", href: "/" }, { name: "about" }];

  return (
    <>
      <GeneralServerAxios method="GET" url="page/about">
        {(data) => (
          <div className="overflow-x-hidden">
            {data ? (
              <>
                <div className="bg-secgreynormal">
                  <div className=" container md:py-10 py-6">
                    <BreadcrumbSlugs paths={paths} title={data?.title} />
                  </div>
                </div>
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
