import Head from "next/head";
import { parseCookies } from "nookies";
import logo from "@/public/logo.png";
import { getLocale } from "next-intl/server";

interface MetaData {
  title: string;
  description: string;
  keywords: string;
  image: string;
  canonical_tags: string;
  type: string;
  url: string;
}

interface MetaTagsProps {
  metadata: MetaData | null;
}

const MetaComponent = async ({ metadata }: MetaTagsProps) => {
  const cookies = parseCookies();
  const localeCookies = cookies["NEXT_LOCALE"];
  const myLang = (await getLocale()) || localeCookies || "ar"; // Fallback to Arabic if no cookie is set
  const dir = myLang === "ar" ? "rtl" : "ltr";

  return (
    <Head>
      <title>
        {metadata?.title ?? dir === "rtl" ? "متجر متعدد" : "Matgar Doom"}
      </title>
      <meta
        name="description"
        content={
          metadata?.description ?? dir === "rtl"
            ? "رعاية شاملة و مميزة لتلبية احتياجاتك الصحية"
            : "Comprehensive and distinctive coverage of general health care"
        }
      />
      <meta
        name="keywords"
        content={metadata?.keywords ?? "Default Keywords"}
      />
      <meta
        property="og:title"
        content={
          metadata?.title ?? dir === "rtl" ? "متجر متعدد" : "Matgar Doom"
        }
      />
      <meta
        property="og:description"
        content={
          metadata?.description ?? dir === "rtl"
            ? "رعاية شاملة و مميزة لتلبية احتياجاتك الصحية"
            : "Comprehensive and distinctive coverage of general health care"
        }
      />
      <meta property="image" content={metadata?.image ?? logo.src} />
      <meta property="og:image" content={metadata?.image ?? logo.src} />
      <meta property="og:type" content={metadata?.type ?? "Default Type"} />
      <meta property="og:url" content={metadata?.url ?? ""} />
      <link rel="canonical" href={metadata?.canonical_tags ?? ""} />
    </Head>
  );
};

export default MetaComponent;
