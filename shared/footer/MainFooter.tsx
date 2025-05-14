/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaPhoneAlt,
  FaSnapchat,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import LocalePath from "@/shared/LocalePath";
import { QuickLinks, FooterLink, MainLinks } from "@/shared/footer/FooterLinks";
import { useTranslations } from "next-intl";
import googleplay from "@/assets/images/Google-Play-Black.png";
import appstore from "@/assets/images/App-Store-Black.png";
import ImageWithFallback from "@/shared/ImageWithFallback";
import Visa from "@/assets/images/visa.png";
import MasterCard from "@/assets/images/mastercard.png";
import paypal from "@/assets/images/paypal.png";
import Mada from "@/assets/images/mada.png";
import Logo from "@/public/logo.png";
import { MdOutlineEmail } from "react-icons/md";

export default function FooterIndex({ settings }: any) {
  const t = useTranslations("FOOTER");
  const setting =
    settings?.length > 0 &&
    settings?.reduce((acc: any, item: any) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
  return (
    <>
      <footer className=" relative z-[9] mt-auto h-fit w-full p-8 text-dark  overflow-hidden max-lg:pb-20">
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_1fr] gap-5 container">
          <div className="logo">
            <ImageWithFallback
              src={Logo}
              alt="logo"
              width={1200}
              height={1200}
              className=" mx-3 w-36 h-14  object-contain "
            />
          </div>
          <ul className="text-start capitalize text-lg font-normal">
            <h2 className="font-bold  text-xl leading-8 text-start mb-2">
              {t("Main")}
            </h2>
            {/* <div className=" bg-white w-16 h-0.5 my-3 "></div> */}
            <div className="grid grid-cols-2 ">
              {MainLinks.map((el: FooterLink, index: number) => (
                <li
                  className="my-2 font-normal hover:text-thirdy cursor-pointer"
                  key={index}
                >
                  <LocalePath href={el.path}>
                    {t(`MainLinks.${el.name}`)}
                  </LocalePath>
                </li>
              ))}
            </div>
          </ul>
          <ul className="text-start  text-lg font-normal">
            <h2 className="font-bold capitalize  text-xl leading-8 text-start mb-2">
              {t("Quick")}
            </h2>
            {/* <div className=" bg-white w-16 h-0.5 my-3"></div> */}
            {/* {setting?.phones?.map((ele: any, index: number) => {
              return ( */}
            <li
              // key={index}
              className="my-4 font-normal text-darkprimary grid grid-cols-[auto_1fr] gap-4 items-center cursor-pointer"
            >
              <FaPhoneAlt className="text-darkprimary mx-2" size={25} />
              {/* {ele?.phone} {"  "} {ele?.phone_code} {" + "} */}
              966966966 966+
            </li>
            {/* );
            })} */}
            {/* {setting?.emails?.map((ele: any, index: number) => { */}
            {/* return ( */}
            <li
              // key={index}
              className="my-4 font-normal text-darkprimary grid grid-cols-[auto_1fr] gap-4 items-center cursor-pointer"
            >
              <MdOutlineEmail className="text-darkprimary mx-2" size={25} />
              {/* {ele} */}
              info@allimak.com
            </li>
            {/* );
            })} */}
          </ul>
          <ul className="text-start  text-lg font-normal">
            <h2 className="font-bold  text-xl   leading-8 text-start mb-2">
              {t("Communication")}
            </h2>
            <div className="flex justify-evesnly my-4">
              <Link href={`${setting?.facebook}`}>
                <FaFacebookF
                  className="text-primary mx-2 bg-secprimary p-3 rounded-full"
                  size={45}
                />
              </Link>
              <Link href={`${setting?.tiktok}`}>
                <FaTiktok
                  className="text-primary mx-2 bg-secprimary p-3 rounded-full"
                  size={45}
                />
              </Link>

              <Link href={`${setting?.snapchat}`}>
                <FaSnapchat
                  className="text-primary mx-2 bg-secprimary p-3 rounded-full"
                  size={45}
                />
              </Link>
              <Link href={`${setting?.twitter}`}>
                <FaTwitter
                  className="text-primary mx-2 bg-secprimary p-3 rounded-full"
                  size={45}
                />
              </Link>
              <Link href={`${setting?.Youtube}`}>
                <FaYoutube
                  className="text-primary mx-2 bg-secprimary p-3 rounded-full"
                  size={45}
                />
              </Link>
            </div>
          </ul>
        </div>
        <div className=" bg-greynormal container w-full h-[1px] my-3"></div>
        <div className="container py-4 ">
          <div className="md:flex justify-between items-center">
            <div className=" text-sm font-normal leading-4 text-censter md:mb-0 mb-4">
              <LocalePath href="/privacy-policy">
                {t("privacy-policy")}
              </LocalePath>
              <LocalePath href="/terms" className="mx-3">
                {t("terms")}
              </LocalePath>
            </div>
            <p className=" text-sm font-normal   leading-6 text-start text-dark">
              {t("roles")}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
