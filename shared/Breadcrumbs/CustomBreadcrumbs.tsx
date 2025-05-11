"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import { useLocale, useTranslations } from "next-intl";
import { RiArrowLeftSLine } from "react-icons/ri";
import { CgFormatSlash } from "react-icons/cg";

interface BreadcrumbSlugsProps {
  paths: Array<{ name: string | undefined; href?: string }>;
  stopTranslate?: boolean;
  title?: any;
  subtitle?: any;
  TranslateTitle?: boolean;
  icon?: boolean;
}

const BreadcrumbSlugs: React.FC<BreadcrumbSlugsProps> = ({
  paths,
  title,
  subtitle,
  stopTranslate,
  TranslateTitle = false,
  icon,
}) => {
  const locale = useLocale();
  const t = useTranslations("NAV");

  return (
    <>
      <Breadcrumb dir={locale === "ar" ? "rtl" : "ltr"}>
        <BreadcrumbList>
          {paths.map((path, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {path.href ? (
                  <BreadcrumbLink
                    className={`text-[#666666] text-[16px] font-medium ${
                      paths.length == 1 ? "text-center" : ""
                    }`}
                    href={`${locale == "ar" ? "" : "/en"}/${path.href}`}
                  >
                    {/* {stopTranslate && index > 0 ? path.name : t(path.name)} */}
                    {stopTranslate ? path.name : t(path.name)}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage
                    className={`${
                      paths.length == 1 ? "text-center" : ""
                    } font-medium text-[#191919] text-[16px]`}
                  >
                    {stopTranslate ? path.name : t(path.name)}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < paths.length - 1 && (
                <p className="text-[#666666] font-bold text-[16px]">
                  {icon ? (
                    <CgFormatSlash
                      className={`${locale == "ar" ? "" : "rotate-180"}`}
                      size={25}
                    />
                  ) : (
                    <RiArrowLeftSLine
                      className={`${locale == "ar" ? "" : "rotate-180"}`}
                      size={25}
                    />
                  )}
                </p>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      {title && (
        <h2 className="text-4xl font-bold   leading-10 text-start mt-8">
          {/* {t(`${title}`)} */}
          {TranslateTitle ? t(`${title}`) : title}
        </h2>
      )}
      {subtitle && (
        <h2 className="md:text-2xl text-xl  text-darkprimary leading-8 font-bold  mt-8  text-start">
          {TranslateTitle ? t(`${subtitle}`) : subtitle}
        </h2>
      )}
    </>
  );
};

export default BreadcrumbSlugs;
