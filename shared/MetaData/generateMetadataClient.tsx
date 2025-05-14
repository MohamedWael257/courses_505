"use client";
import { parseCookies } from "nookies";
import Logo from "@/public/logo.png";
import axiosInstanceGeneralClient from "@/utils/axiosClientGeneral";
import axiosInstance from "@/utils/axiosClient";
import { useLocale } from "next-intl";

type MetadataProps = {
  endpoint: string;
  general?: boolean;
};

export async function generateMetadataFromEndpoint({
  endpoint,
  general = false,
}: MetadataProps) {
  const cookies = parseCookies();
  const localeCookies = cookies["NEXT_LOCALE"];
  const contextLocale = useLocale();
  const isArabaic = contextLocale || localeCookies || "ar"; // Fallback to Arabic if no cookie is set
  isArabaic === "ar";

  try {
    const response = general
      ? await axiosInstanceGeneralClient.get(`${endpoint}`)
      : await axiosInstance.get(`${endpoint}`);
    const metadata = response?.data?.metadata;

    return {
      title: metadata?.title ?? (isArabaic ? "متجر كورسات" : "Matgar Courses"),
      // description:
      //   metadata?.description ??
      //   (isArabaic
      //     ? "رعاية شاملة و مميزة لتلبية احتياجاتك الصحية"
      //     : "Comprehensive and distinctive coverage of general health care"),
      keywords: metadata?.keywords ?? "Default Keywords",
      alternates: {
        canonical: metadata?.canonical_tags || "",
      },
      openGraph: {
        title:
          metadata?.title ?? (isArabaic ? "متجر كورسات" : "Matgar Courses"),
        // description:
        //   metadata?.description ??
        //   (isArabaic
        //     ? "رعاية شاملة و مميزة لتلبية احتياجاتك الصحية"
        //     : "Comprehensive and distinctive coverage of general health care"),
        type: metadata?.type ?? "Default Type",
        url: metadata?.url ?? "",
        images: [
          {
            url: metadata?.image || Logo.src,
            width: 1200,
            height: 630,
            alt: metadata?.title || "Default OG Image",
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: isArabaic ? "متجر كورسات" : "Matgar Courses",
      // description:
      //   isArabaic
      //     ? "رعاية شاملة و مميزة لتلبية احتياجاتك الصحية"
      //     : "Comprehensive and distinctive coverage of general health care",
      icons: {
        icon: Logo.src,
      },
      openGraph: {
        images: Logo.src,
      },
    };
  }
}
