import { Suspense } from "react";
import { Metadata } from "next";
import IntilProvider from "@/utils/providers/locale";
import ProviderStore from "@/utils/providers/ProviderStore";
import WowProvider from "@/utils/providers/wow";
import LocationHandler from "@/shared/LocationHandler";
import NextTopLoad from "@/shared/NextTopLoader";
import Header from "@/components/Header";
import Loader from "@/shared/Loader/Loader";
import MainFooter from "@/components/MainFooter";
import "animate.css";
import "@/app/main.scss";
import "aos/dist/aos.css";
import ScrollBtn from "@/shared/ScrollBtn";
import MobileTabs from "@/shared/MobileTabs";
import { ConnectionProvider } from "@/utils/providers/ConnectionProvider";
import Logo from "@/public/logo.png";
import { getHeaderData } from "@/shared/AxiosPage/GeneralServerAxios";

export async function generateMetadata({
  params: { lng },
}: {
  params: { lng: string };
}): Promise<Metadata> {
  const isArabic = lng === "ar";

  return {
    title: isArabic ? "متجر كورسات" : "Matgar Courses",
    description: isArabic ? "متجر كورسات" : "Matgar Courses",
    icons: {
      icon: Logo.src,
    },
    openGraph: {
      images: Logo.src,
    },
  };
}
export default async function RootLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: { lng: string };
}>) {
  const { settings } = await getHeaderData(); // Call getData
  return (
    <html lang={lng} dir={lng == "ar" ? "rtl" : "ltr"}>
      <body className="bg-white ">
        <IntilProvider>
          <NextTopLoad />
          <WowProvider />
          <Suspense fallback={<Loader />}>
            <ProviderStore>
              {/* <LocationHandler /> */}
              <div className="flex min-h-[100vh] flex-col">
                <Header settings={settings} />
                {children}
                <MainFooter settings={settings} />
                <ScrollBtn />
                <MobileTabs />
              </div>
            </ProviderStore>
          </Suspense>
        </IntilProvider>
      </body>
    </html>
  );
}
