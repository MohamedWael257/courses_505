import Faqs from "@/components/faqs/Faqs";
import FaqsTaps from "@/components/faqs/FaqsTaps";
import GeneralServerAxios from "@/shared/AxiosPage/GeneralServerAxios";
import AppBreadCrumbs from "@/shared/Breadcrumbs/AppBreadCrumbs";
import CustomCard from "@/shared/card/CustomCard";
import CustomNotData from "@/shared/CustomNotData";
import React from "react";
export default function page({
  searchParams,
}: {
  searchParams: {
    page?: string;
    filter?: string;
  };
}) {
  const page = Number(searchParams?.page) || 1;
  const filter = searchParams?.filter || "أسئلة عامة";

  return (
    <>
      <GeneralServerAxios method="GET" url="faqs">
        {(data, meta) => (
          <>
            <div className="overflow-x-hidden">
              {data?.length > 0 ? (
                <>
                  <CustomCard
                    title="الأسئلة الشائعة"
                    description={`اعثر على الإجابات الأكثر شيوعًا حول التسجيل، الدورات، الدفع، الشهادات، والانضمام كمدرّب — كل ما تحتاج معرفته في مكان واحد لتبدأ تجربتك بثقة.`}
                  />
                  <div className=" container">
                    <div className="grid grid-cols-1 lg:grid-cols-[2fr_10fr]  gap-6 items-center">
                      <FaqsTaps defaultType={filter} />
                      <Faqs
                        current_page={page}
                        paggination={meta}
                        faqs={data}
                      />
                    </div>
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
