import React from "react";
import AppBreadCrumbs from "@/shared/Breadcrumbs/AppBreadCrumbs";
import GeneralServerAxios from "@/shared/AxiosPage/GeneralServerAxios";
import CustomNotData from "@/shared/CustomNotData";
import CustomCard from "@/shared/card/CustomCard";
export default function page() {
  const paths = [{ name: "home", href: "/" }, { name: "about" }];

  return (
    <>
      <GeneralServerAxios method="GET" url="page/about">
        {(data) => (
          <div className="overflow-x-hidden">
            {data ? (
              <>
                <CustomCard
                  title="تواصل معنا"
                  description={`
                       اعثر على الإجابات الأكثر شيوعًا حول التسجيل، الدورات، الدفع، الشهادات، والانضمام كمدرّب — كل ما تحتاج معرفته في مكان واحد لتبدأ تجربتك بثقة.
                       `}
                />
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
