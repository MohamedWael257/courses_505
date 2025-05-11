// "use client";
// import React, { useEffect, useState } from "react";
// import Teleport from "@/shared/Teleport/Teleport";
// import { Cart4, Heart, Notificaation, Person, Spinner } from "@/shared/Icons";
// import { usePathname } from "next/navigation";
// import LocalePath from "@/shared/LocalePath";
// import { useLocale, useTranslations } from "next-intl";
// import SideMenu from "./SideMenu";
// import { FaBars } from "react-icons/fa";
// import ImageWithFallback from "../ImageWithFallback";
// import Logo from "@/public/logo_white.png";
// import HeaderLogo from "./HeaderLogo";
// import LocationIcon from "@/assets/icons/location";
// import LocationText from "../LocationText";
// import discountShape from "@/assets/images/discount-shape.png";
// import SearchComponent from "../SearchComponent";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { Skeleton } from "../ui/skeleton";
// import { HiMenuAlt2 } from "react-icons/hi";

// const MobileNav = ({
//   memoizedSession,
//   totalPrice,
//   productCount,
//   mainLoader,
//   categories,
// }: any) => {
//   const t = useTranslations();
//   const router = usePathname();
//   const cleanPath = (path: string) => {
//     const pathWithoutQuery = path.split("?")[0];
//     return pathWithoutQuery.endsWith("/") && pathWithoutQuery !== "/"
//       ? pathWithoutQuery.slice(0, -1)
//       : pathWithoutQuery;
//   };
//   const activeLink = cleanPath(router);

//   const [isOpen, setOpen] = useState(false);

//   const [isClient, setIsClient] = useState(false);
//   useEffect(() => {
//     setIsClient(true); // Set client state
//   }, []);
//   const locale = useLocale();
//   return (
//     <>
//       <div className="px-3 py-5 bg-primary ">
//         <div className=" flex md:flex-row flex-col md:justify-between md:items-center md:gap-0 gap-4 mb-4">
//           <div className="flex gap-3 md:justify-normal justify-between items-center">
//             <button
//               className={`lg:hidden flex  justify-end text-white text-3xl font-semibold cursor-pointer`}
//               onClick={() => setOpen(true)}
//             >
//               <HiMenuAlt2 size={35} />
//             </button>
//             <LocalePath href="/" className=" h-[48px] w-[80px]">
//               <ImageWithFallback
//                 src={Logo}
//                 alt="logo icon"
//                 width="600"
//                 height="600"
//                 className="h-[48px] w-[80px] object-contain "
//                 priority
//               />
//             </LocalePath>
//             {/* <HeaderLogo /> */}
//           </div>
//           <div className="flex md:justify-normal justify-between items-center gap-2">
//             {isClient && (
//               <>
//                 {memoizedSession ? (
//                   <LocalePath
//                     href="/profile/addresses"
//                     className="grid grid-cols-[auto_1fr_auto] items-center gap-2 bg-greynormal rounded-xl p-3 max-w-64"
//                   >
//                     <Person className="size-6" />
//                     <span>{memoizedSession.full_name}</span>
//                     <MdKeyboardArrowDown size={25} />
//                   </LocalePath>
//                 ) : (
//                   <LocalePath
//                     href="/auth/login"
//                     className="flex items-center gap-2 bg-greynormal rounded-xl p-3 max-w-64"
//                   >
//                     <Person className="size-6" />
//                     {t("Text.auth")}
//                     {/* <MdKeyboardArrowDown size={25} /> */}
//                   </LocalePath>
//                 )}
//               </>
//             )}
//             {mainLoader ? (
//               <Skeleton className=" !w-28 !h-12 !bg-white" />
//             ) : (
//               <div className="relative">
//                 <p className="bg-white w-6 h-6 grid place-content-center rounded-full absolute -top-2 -end-3 shadow-card-shadow">
//                   {productCount}
//                 </p>
//                 <LocalePath
//                   href="/cart"
//                   className="flex items-center gap-2 bg-white text-primary rounded-xl p-3 max-w-40 "
//                 >
//                   <Cart4 color={"#4F008C"} className="size-6" />
//                   {totalPrice} {t("Text.SR")}
//                 </LocalePath>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="grid grid-cols-[1fr_auto_auto_auto] gap-3">
//           <div className="relative">
//             <SearchComponent />
//           </div>
//           <LocalePath href="/compare">
//             <Spinner className="bg-greynormal rounded-xl p-3 size-[45px]" />
//           </LocalePath>
//           <LocalePath href="/favourits">
//             <Heart className="bg-greynormal rounded-xl p-3 size-[45px]" />
//           </LocalePath>
//           <LocalePath href="/notifications" className="relative">
//             <p className="bg-error/90 w-2 h-2 rounded-full absolute top-3 start-[14px]"></p>
//             <Notificaation className="bg-greynormal rounded-xl p-3 size-[45px] " />
//           </LocalePath>
//         </div>
//       </div>
//       <div className="bg-secprimary px-3 py-3">
//         <div className="grid grid-cols-[auto_1fr] items-center gap-4">
//           <LocationIcon className="size-6" />
//           <div className="flex flex-col items-start font-bold text-secondrytext">
//             {t("Text.deliver_to")}
//             <LocationText className="line-clamp-1 text-dark" />
//             {/* <MdKeyboardArrowDown size={25} /> */}
//           </div>
//         </div>
//       </div>

//       <Teleport to="body">
//         {isOpen && (
//           <SideMenu close={() => setOpen(false)}>
//             <ul className="flex  gap-5  flex-col  flex-wrap px-4">
//               <div className="absolute top-6 start-4 z-40">
//                 <HeaderLogo />
//               </div>
//               <div className="line bg-greynormal w-full h-0.5 my-3"></div>

//               <li
//                 onClick={() => setOpen(false)}
//                 className={`cursor-pointer hover:text-primary text-xl   leading-6  ${
//                   activeLink === cleanPath(`/`) ? "text-primary font-bold" : ``
//                 }`}
//               >
//                 <LocalePath href={`/`}>{t(`NAV.home`)}</LocalePath>
//               </li>
//               <li
//                 onClick={() => setOpen(false)}
//                 className={`cursor-pointer hover:text-primary text-xl   leading-6  ${
//                   activeLink === cleanPath(`/offers`)
//                     ? "text-primary font-bold"
//                     : ``
//                 }`}
//               >
//                 <LocalePath
//                   className={`text-lg cursor-pointer font-normal   leading-5 text-center text-success flex items-center`}
//                   href={`/offers`}
//                 >
//                   <ImageWithFallback
//                     src={discountShape}
//                     width={1000}
//                     height={1000}
//                     className="w-6 h-6 object-contain me-3"
//                     alt="discountShape"
//                   />
//                   <p>{t("Text.offers")}</p>
//                 </LocalePath>
//               </li>
//               {categories.map((el: any, index: number) => (
//                 <li
//                   onClick={() => setOpen(false)}
//                   className={`cursor-pointer hover:text-primary text-xl   leading-6  ${
//                     activeLink ===
//                     cleanPath(
//                       `${locale == "ar" ? "" : "/en"}/categories/${
//                         locale == "ar"
//                           ? encodeURIComponent(el.slug)
//                           : decodeURIComponent(el.slug)
//                       }?main_category=${el.id}`
//                     )
//                       ? "text-primary font-bold"
//                       : ``
//                   }`}
//                   key={index}
//                 >
//                   <LocalePath
//                     href={`/categories/${el.slug}?main_category=${el.id}`}
//                   >
//                     {el?.title}
//                   </LocalePath>
//                 </li>
//               ))}
//               {/* {QuickLinks.map((el: FooterLink, index: number) => {
//                 return (
//                   <li
//                     onClick={() => setOpen(false)}
//                     className={`cursor-pointer hover:text-primary text-xl   leading-6  ${
//                       cleanPath(activeLink) === cleanPath(`/privacy`)
//                         ? "text-primary font-bold"
//                         : ``
//                     }`}
//                     key={index}
//                   >
//                     <LocalePath href={el.path}>
//                       {t(`FOOTER.QuickLinks.${el.name}`)}
//                     </LocalePath>
//                   </li>
//                 );
//               })} */}
//             </ul>
//             {/* <div className=" ms-4 flex flex-cog justify-start text-white mt-5">
//               <LangSwitcher />
//             </div> */}
//           </SideMenu>
//         )}
//       </Teleport>
//     </>
//   );
// };

// export default MobileNav;

// "use client";
// import React, { useEffect, useState } from "react";
// import Teleport from "@/shared/Teleport/Teleport";
// import { Cart4, Heart, Notificaation, Person, Spinner } from "@/shared/Icons";
// import { usePathname } from "next/navigation";
// import LocalePath from "@/shared/LocalePath";
// import { useLocale, useTranslations } from "next-intl";
// import SideMenu from "./SideMenu";
// import { FaBars } from "react-icons/fa";
// import ImageWithFallback from "../ImageWithFallback";
// import Logo from "@/public/logo_white.png";
// import HeaderLogo from "./HeaderLogo";
// import LocationIcon from "@/assets/icons/location";
// import LocationText from "../LocationText";
// import discountShape from "@/assets/images/discount-shape.png";
// import SearchComponent from "../SearchComponent";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { Skeleton } from "../ui/skeleton";
// import { HiMenuAlt2 } from "react-icons/hi";

// const MobileNav = ({
//   memoizedSession,
//   totalPrice,
//   productCount,
//   mainLoader,
//   categories,
// }: any) => {
//   const t = useTranslations();
//   const router = usePathname();
//   const cleanPath = (path: string) => {
//     const pathWithoutQuery = path.split("?")[0];
//     return pathWithoutQuery.endsWith("/") && pathWithoutQuery !== "/"
//       ? pathWithoutQuery.slice(0, -1)
//       : pathWithoutQuery;
//   };
//   const activeLink = cleanPath(router);

//   const [isOpen, setOpen] = useState(false);

//   const [isClient, setIsClient] = useState(false);
//   useEffect(() => {
//     setIsClient(true); // Set client state
//   }, []);
//   const locale = useLocale();
//   return (
//     <>
//       <div className="px-3 py-5 bg-primary ">
//         <div className=" flex md:flex-row flex-col md:justify-between md:items-center md:gap-0 gap-4 mb-4">
//           <div className="flex gap-3 justify-between items-center">
//             <div className="flex gap-3 items-center">
//               <button
//                 className={`lg:hidden flex  justify-end text-white text-3xl font-semibold cursor-pointer`}
//                 onClick={() => setOpen(true)}
//               >
//                 <HiMenuAlt2 size={35} />
//               </button>
//               <LocalePath href="/" className=" h-[48px] w-[80px]">
//                 <ImageWithFallback
//                   src={Logo}
//                   alt="logo icon"
//                   width="600"
//                   height="600"
//                   className="h-[48px] w-[80px] object-contain "
//                   priority
//                 />
//               </LocalePath>
//             </div>

//             <div className="flex gap-4 items-center">
//               <LocalePath href="/compare">
//                 <Spinner className="bg-greynormal rounded-xl p-3 size-[45px]" />
//               </LocalePath>
//               <LocalePath href="/favourits">
//                 <Heart className="bg-greynormal rounded-xl p-3 size-[45px]" />
//               </LocalePath>
//               <LocalePath href="/notifications" className="relative">
//                 <p className="bg-error/90 w-2 h-2 rounded-full absolute top-3 start-[14px]"></p>
//                 <Notificaation className="bg-greynormal rounded-xl p-3 size-[45px] " />
//               </LocalePath>
//             </div>
//             {/* <HeaderLogo /> */}
//           </div>
//           <div className="flex md:justify-normal justify-between items-center gap-2">
//             {isClient && (
//               <>
//                 {memoizedSession ? (
//                   <LocalePath
//                     href="/profile/addresses"
//                     className="grid grid-cols-[auto_1fr_auto] items-center gap-2 bg-greynormal rounded-xl p-3 max-w-64"
//                   >
//                     <Person className="size-6" />
//                     <span>{memoizedSession.full_name}</span>
//                     <MdKeyboardArrowDown size={25} />
//                   </LocalePath>
//                 ) : (
//                   <LocalePath
//                     href="/auth/login"
//                     className="flex items-center gap-2 bg-greynormal rounded-xl p-3 max-w-64"
//                   >
//                     <Person className="size-6" />
//                     {t("Text.auth")}
//                     {/* <MdKeyboardArrowDown size={25} /> */}
//                   </LocalePath>
//                 )}
//               </>
//             )}
//             {mainLoader ? (
//               <Skeleton className=" !w-28 !h-12 !bg-white" />
//             ) : (
//               <div className="relative">
//                 <p className="bg-white w-6 h-6 grid place-content-center rounded-full absolute -top-2 -end-3 shadow-card-shadow">
//                   {productCount}
//                 </p>
//                 <LocalePath
//                   href="/cart"
//                   className="flex items-center gap-2 bg-white text-primary rounded-xl p-3 max-w-40 "
//                 >
//                   <Cart4 color={"#4F008C"} className="size-6" />
//                   {totalPrice} {t("Text.SR")}
//                 </LocalePath>
//               </div>
//             )}
//           </div>
//         </div>
//         {/* <div className="grid grid-cols-[1fr_auto_auto_auto] gap-3"> */}
//         <div className="relative">
//           <SearchComponent />
//         </div>
//         {/* <LocalePath href="/compare">
//             <Spinner className="bg-greynormal rounded-xl p-3 size-[45px]" />
//           </LocalePath>
//           <LocalePath href="/favourits">
//             <Heart className="bg-greynormal rounded-xl p-3 size-[45px]" />
//           </LocalePath>
//           <LocalePath href="/notifications" className="relative">
//             <p className="bg-error/90 w-2 h-2 rounded-full absolute top-3 start-[14px]"></p>
//             <Notificaation className="bg-greynormal rounded-xl p-3 size-[45px] " />
//           </LocalePath> */}
//         {/* </div> */}
//       </div>
// <div className="bg-secprimary px-3 py-3">
//   <div className="grid grid-cols-[auto_1fr] items-center gap-4">
//     <LocationIcon className="size-6" />
//     <div className="flex flex-col items-start font-bold text-secondrytext">
//       {t("Text.deliver_to")}
//       <LocationText className="line-clamp-1 text-dark" />
//       {/* <MdKeyboardArrowDown size={25} /> */}
//     </div>
//   </div>
// </div>

//       <Teleport to="body">
//         {isOpen && (
//           <SideMenu close={() => setOpen(false)}>
//             <ul className="flex  gap-5  flex-col  flex-wrap px-4">
//               <div className="absolute top-6 start-4 z-40">
//                 <HeaderLogo />
//               </div>
//               <div className="line bg-greynormal w-full h-0.5 my-3"></div>

//               <li
//                 onClick={() => setOpen(false)}
//                 className={`cursor-pointer hover:text-primary text-xl   leading-6  ${
//                   activeLink === cleanPath(`/`) ? "text-primary font-bold" : ``
//                 }`}
//               >
//                 <LocalePath href={`/`}>{t(`NAV.home`)}</LocalePath>
//               </li>
//               <li
//                 onClick={() => setOpen(false)}
//                 className={`cursor-pointer hover:text-primary text-xl   leading-6  ${
//                   activeLink === cleanPath(`/offers`)
//                     ? "text-primary font-bold"
//                     : ``
//                 }`}
//               >
//                 <LocalePath
//                   className={`text-lg cursor-pointer font-normal   leading-5 text-center text-success flex items-center`}
//                   href={`/offers`}
//                 >
//                   <ImageWithFallback
//                     src={discountShape}
//                     width={1000}
//                     height={1000}
//                     className="w-6 h-6 object-contain me-3"
//                     alt="discountShape"
//                   />
//                   <p>{t("Text.offers")}</p>
//                 </LocalePath>
//               </li>
//               {categories.map((el: any, index: number) => (
//                 <li
//                   onClick={() => setOpen(false)}
//                   className={`cursor-pointer hover:text-primary text-xl   leading-6  ${
//                     activeLink ===
//                     cleanPath(
//                       `${locale == "ar" ? "" : "/en"}/categories/${
//                         locale == "ar"
//                           ? encodeURIComponent(el.slug)
//                           : decodeURIComponent(el.slug)
//                       }?main_category=${el.id}`
//                     )
//                       ? "text-primary font-bold"
//                       : ``
//                   }`}
//                   key={index}
//                 >
//                   <LocalePath
//                     href={`/categories/${el.slug}?main_category=${el.id}`}
//                   >
//                     {el?.title}
//                   </LocalePath>
//                 </li>
//               ))}
//               {/* {QuickLinks.map((el: FooterLink, index: number) => {
//                 return (
//                   <li
//                     onClick={() => setOpen(false)}
//                     className={`cursor-pointer hover:text-primary text-xl   leading-6  ${
//                       cleanPath(activeLink) === cleanPath(`/privacy`)
//                         ? "text-primary font-bold"
//                         : ``
//                     }`}
//                     key={index}
//                   >
//                     <LocalePath href={el.path}>
//                       {t(`FOOTER.QuickLinks.${el.name}`)}
//                     </LocalePath>
//                   </li>
//                 );
//               })} */}
//             </ul>
//             {/* <div className=" ms-4 flex flex-cog justify-start text-white mt-5">
//               <LangSwitcher />
//             </div> */}
//           </SideMenu>
//         )}
//       </Teleport>
//     </>
//   );
// };

// export default MobileNav;
"use client";
import React, { useEffect, useState } from "react";
import Teleport from "@/shared/Teleport/Teleport";
import {
  Cart4,
  GreenDiscountIcon,
  Heart,
  Notificaation,
  Person,
  Spinner,
} from "@/shared/Icons";
import { usePathname } from "next/navigation";
import LocalePath from "@/shared/LocalePath";
import { useLocale, useTranslations } from "next-intl";
import SideMenu from "./SideMenu";
import { FaBars } from "react-icons/fa";
import ImageWithFallback from "../ImageWithFallback";
import Logo from "@/public/logo_white.png";
import HeaderLogo from "./HeaderLogo";
import LocationIcon from "@/assets/icons/location";
// import LocationText from "../LocationText";
import SearchComponent from "../SearchComponent";
import { HiMenuAlt2 } from "react-icons/hi";

const MobileNav = ({
  memoizedSession,
  totalPrice,
  productCount,
  mainLoader,
  categories,
}: any) => {
  const t = useTranslations();
  const router = usePathname();
  const cleanPath = (path: string) => {
    const pathWithoutQuery = path.split("?")[0];
    return pathWithoutQuery.endsWith("/") && pathWithoutQuery !== "/"
      ? pathWithoutQuery.slice(0, -1)
      : pathWithoutQuery;
  };
  const activeLink = cleanPath(router);

  const [isOpen, setOpen] = useState(false);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true); // Set client state
  }, []);
  const locale = useLocale();
  return (
    <>
      <div className="px-3 py-5 bg-primary ">
        <div className=" flex justify-between items-center  mb-4">
          <div className="flex items-center gap-2">
            <button
              className={`lg:hidden flex  justify-end text-white text-3xl font-semibold cursor-pointer`}
              onClick={() => setOpen(true)}
            >
              <HiMenuAlt2 size={35} />
            </button>
            <LocalePath href="/" className=" h-[48px] w-[80px]">
              <ImageWithFallback
                src={Logo}
                alt="logo icon"
                width="600"
                height="600"
                className="h-[48px] w-[80px] object-contain "
                priority
              />
            </LocalePath>
            {/* <HeaderLogo /> */}
          </div>
          <LocalePath href="/notifications" className="relative">
            <p className="bg-error/90 w-2 h-2 rounded-full absolute top-3 start-[14px]"></p>
            <Notificaation className="bg-greynormal rounded-xl p-3 size-[45px] " />
          </LocalePath>
        </div>
        <div className="relative">
          <SearchComponent />
        </div>
      </div>
      <div className="bg-secprimary px-3 py-3">
        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          <LocationIcon className="size-6" />
          <div className="flex flex-col items-start font-bold text-secondrytext">
            {t("Text.deliver_to")}
            {/* <LocationText className="line-clamp-1 text-dark" /> */}
            {/* <MdKeyboardArrowDown size={25} /> */}
          </div>
        </div>
      </div>

      <Teleport to="body">
        {isOpen && (
          <SideMenu close={() => setOpen(false)}>
            <ul className="flex  gap-5  flex-col  flex-wrap px-4">
              <div className="absolute top-6 start-4 z-40">
                <HeaderLogo />
              </div>
              <div className="line bg-greynormal w-full h-0.5 my-3"></div>

              <li
                onClick={() => setOpen(false)}
                className={`cursor-pointer hover:text-primary text-xl   leading-6  ${
                  activeLink === cleanPath(`/`) ? "text-primary font-bold" : ``
                }`}
              >
                <LocalePath href={`/`}>{t(`NAV.home`)}</LocalePath>
              </li>
              <li
                onClick={() => setOpen(false)}
                className={`cursor-pointer hover:text-primary text-xl   leading-6  ${
                  activeLink === cleanPath(`/offers`)
                    ? "text-primary font-bold"
                    : ``
                }`}
              >
                <LocalePath
                  className={`text-lg cursor-pointer font-normal   leading-5 text-center text-success flex items-center`}
                  href={`/offers`}
                >
                  <GreenDiscountIcon className="size-6" />
                  <p>{t("Text.offers")}</p>
                </LocalePath>
              </li>
              {categories.map((el: any, index: number) => (
                <li
                  onClick={() => setOpen(false)}
                  className={`cursor-pointer hover:text-primary text-xl   leading-6  ${
                    activeLink ===
                    cleanPath(
                      `${locale == "ar" ? "" : "/en"}/categories/${
                        locale == "ar"
                          ? encodeURIComponent(el.slug)
                          : decodeURIComponent(el.slug)
                      }?main_category=${el.id}`
                    )
                      ? "text-primary font-bold"
                      : ``
                  }`}
                  key={index}
                >
                  <LocalePath
                    href={`/categories/${el.slug}?main_category=${el.id}`}
                  >
                    {el?.title}
                  </LocalePath>
                </li>
              ))}
              {/* {QuickLinks.map((el: FooterLink, index: number) => {
                return (
                  <li
                    onClick={() => setOpen(false)}
                    className={`cursor-pointer hover:text-primary text-xl   leading-6  ${
                      cleanPath(activeLink) === cleanPath(`/privacy`)
                        ? "text-primary font-bold"
                        : ``
                    }`}
                    key={index}
                  >
                    <LocalePath href={el.path}>
                      {t(`FOOTER.QuickLinks.${el.name}`)}
                    </LocalePath>
                  </li>
                );
              })} */}
            </ul>
            {/* <div className=" ms-4 flex flex-cog justify-start text-white mt-5">
              <LangSwitcher />
            </div> */}
          </SideMenu>
        )}
      </Teleport>
    </>
  );
};

export default MobileNav;
