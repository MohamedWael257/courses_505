/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaSnapchat,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import LocalePath from "@/shared/LocalePath";
import { QuickLinks, FooterLink } from "@/shared/footer/FooterLinks";
import { useTranslations } from "next-intl";
import googleplay from "@/assets/images/Google-Play-Black.png";
import appstore from "@/assets/images/App-Store-Black.png";
import ImageWithFallback from "@/shared/ImageWithFallback";
import Visa from "@/assets/images/visa.png";
import MasterCard from "@/assets/images/mastercard.png";
import paypal from "@/assets/images/paypal.png";
import Mada from "@/assets/images/mada.png";

export default function FooterIndex({ categories, settings }: any) {
  const t = useTranslations("FOOTER");
  const setting = settings?.reduce((acc: any, item: any) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
  return (
    <>
      <div className="h-0.5 bg-greynormal"></div>
      {/* {!loading && setting && data && ( */}
      <footer className=" relative z-[9] mt-auto h-fit w-full p-8 text-dark  overflow-hidden max-lg:pb-20">
        <div className=" grid container  grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-5">
          {/* <div className=" grid container  grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5"> */}
          <ul className="text-start capitalize text-lg font-normal">
            <h2 className="font-bold  text-xl   leading-8 text-start mb-2">
              {t("Main")}
            </h2>
            {/* <div className=" bg-white w-16 h-0.5 my-3 "></div> */}
            <div className="grid md:grid-cols-2 ">
              {categories?.length > 0 &&
                categories?.map((el: any, index: number) => (
                  <li className="my-2 font-normal  cursor-pointer" key={index}>
                    <LocalePath
                      href={`/categories/${el.slug}?main_category=${el.id}`}
                    >
                      {el?.title}
                    </LocalePath>
                  </li>
                ))}
            </div>
          </ul>
          <ul className="text-start  text-lg font-normal">
            <h2 className="font-bold capitalize  text-xl   leading-8 text-start mb-2">
              {t("Quick")}
            </h2>
            <div>
              {QuickLinks.map((el: FooterLink, index: number) => {
                return (
                  <li className="my-2 font-normal  cursor-pointer" key={index}>
                    <LocalePath href={el.path}>
                      {t(`QuickLinks.${el.name}`)}
                    </LocalePath>
                  </li>
                );
              })}
            </div>
          </ul>
          {/* <ul className="text-start  text-lg font-normal">
            <h2 className="font-bold capitalize  text-xl   leading-8 text-start mb-2">
              {t("download_app")}
            </h2>
            <div className="flex lg:flex-col gap-4">
              <Link href="/">
                <Image
                  src={googleplay}
                  width={1000}
                  height={1000}
                  alt="googleplay"
                  className="w-[148px] lg:dh-9 h-[58px]"
                />
              </Link>
              <Link href="/">
                <Image
                  src={appstore}
                  width={1000}
                  height={1000}
                  alt="appstore"
                  className="w-[148px] lg:dh-9 h-[58px]"
                />
              </Link>
            </div>
          </ul> */}
          {/* <ul className="text-start  text-lg font-normal sm:col-span-2 lg:col-span-1 "> */}
          <ul className="text-start  text-lg font-normal">
            <h2 className="font-bold  text-xl   leading-8 text-start mb-2">
              {t("Communication")}
            </h2>
            <div className="flex justify-evesnly my-4">
              <Link href={`${setting?.facebook}`}>
                <FaFacebookF
                  className="text-secondrytext mx-2 bg-greynormal p-3 rounded-full"
                  size={45}
                />
              </Link>
              <Link href={`${setting?.tiktok}`}>
                <FaTiktok
                  className="text-secondrytext mx-2 bg-greynormal p-3 rounded-full"
                  size={45}
                />
              </Link>

              <Link href={`${setting?.snapchat}`}>
                <FaSnapchat
                  className="text-secondrytext mx-2 bg-greynormal p-3 rounded-full"
                  size={45}
                />
              </Link>
              <Link href={`${setting?.twitter}`}>
                <FaTwitter
                  className="text-secondrytext mx-2 bg-greynormal p-3 rounded-full"
                  size={45}
                />
              </Link>
            </div>
          </ul>
        </div>
        <div className=" bg-greynormal container w-full h-[1px] my-3"></div>
        <div className="container py-4 ">
          <div className="md:flex justify-between items-center">
            <p className=" text-sm font-normal   leading-6 text-stsart text-dark">
              {t("roles")}
            </p>
            <div className="flex gap-3 items-center md:my-0 my-4">
              <ImageWithFallback
                src={Visa}
                alt="visa"
                width="600"
                height="600"
                className="h-5 w-12 object-contain "
                priority
              />
              <ImageWithFallback
                src={MasterCard}
                alt="mastercard"
                width="600"
                height="600"
                className="h-5 w-12 object-contain "
              />
              <ImageWithFallback
                src={paypal}
                alt="paypal"
                width="600"
                height="600"
                className="h-5 w-12 object-contain "
              />
              <ImageWithFallback
                src={Mada}
                alt="Mada"
                width="600"
                height="600"
                className="h-5 w-12 object-contain "
              />
            </div>
          </div>
        </div>
      </footer>
      {/* )} */}
    </>
  );
}
