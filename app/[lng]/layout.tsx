import { Suspense } from "react";
import { Metadata } from "next";
import IntilProvider from "@/utils/providers/locale";
import ProviderStore from "@/utils/providers/ProviderStore";
import ToastProvider from "@/utils/providers/toastProvider";
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
    // description: isArabic
    // ? "ايفا وورلد هى منصة الإعلانات المبوبة الرائدة للعقارات في مصر، هدفها الأساسي هو الربط بين المشترين والمستثمرين وأصحاب المقاولات والبائعين والمستأجرين والوسطاء لتسهيل عملية البحث عن المقاولات. لأن عملية البحث عن المقاولات عملية مرهقة وتحتاج إلى كثير من الوقت والمجهود، نقدم لكم تجربة عقارية سهلة و مميزة تجعلك تبحث عن العقار المناسب لك سواء للإيجار، البيع أو الشراء كل ذلك من خلال منصة واحدة فقط"
    // : "Eva World is the leading classifieds platform for real estate in Egypt. Its primary goal is to connect buyers, investors, contractors, sellers, renters, and brokers to simplify the process of finding construction and real estate opportunities. Recognizing that searching for properties can be a time-consuming and exhaustive process, Eva World offers an easy and distinctive real estate experience. Whether you're looking to rent, sell, or buy, you can find the right property for your needs—all through one comprehensive platform.",
    icons: {
      icon: Logo.src,
    },
    openGraph: {
      images: Logo.src,
    },
    // other: {
    //   "Cache-Control": "no-cache, no-store, must-revalidate",
    //   image: Logo.src,
    //   "og:image": Logo.src,
    // },
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
          {/* <ToastProvider> */}
          {/* <Suspense fallback={<Loader />}> */}
          <ProviderStore>
            {/* <LocationHandler /> */}
            <div className="flex min-h-[100vh] flex-col">
              <Header settings={settings} />
              {/* <div className="h-20">Header</div> */}
              {children}
              <MainFooter settings={settings} />
              {/* <div className="h-20">Footer</div> */}

              <ScrollBtn />
              {/* <MobileTabs /> */}
            </div>
          </ProviderStore>
          {/* </Suspense> */}
          {/* </ToastProvider> */}
        </IntilProvider>
      </body>
    </html>
  );
}
