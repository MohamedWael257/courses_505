"use client";
import { useTranslations } from "next-intl";
import { UserIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import UseSession from "@/store/UseSession";
import { SessionType } from "@/components/Header";
import {
  Cart4,
  CartIcon,
  Heart,
  HomeIcon,
  Notificaation,
  Person,
  Spinner,
} from "./Icons";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Skeleton } from "./ui/skeleton";
import LocalePath from "./LocalePath";
import { usePathname } from "next/navigation";

const MobileTabs = () => {
  const t = useTranslations();
  const session = UseSession();
  const memoizedSession: SessionType | any = useMemo(() => session, [session]);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true); // Set client state
  }, []);
  const { totalPrice, productCount, mainLoader } = useSelector(
    (state: RootState) => state.CartConfig
  );
  const countClass = `border-white text-white border-[2px] border-solid size-4 md:size-5 text-[10px] md:text-sm bg-primary grid place-content-center rounded-full absolute -top-1.5 right-0.5`;
  const className = `*:fill-darkprimary size-6`;
  const pathname = usePathname();

  const normalizedPathname = pathname.replace(/^\/en/, "");

  return (
    <div
      className="bg-white text-darkprimary font-semibold text-sm  w-full 
            shadow-[0px_-9px_24px_0px_#CECEF129] z-[999] fixed bottom-0 p-6 flex items-center justify-between gap-2 lg:hidden "
    >
      <LocalePath
        isActive={`/${normalizedPathname}` == `/` || normalizedPathname == "/"}
        href="/"
        className="mobile-tab"
      >
        <HomeIcon className="size-6 *:stroke-darkprimary home-icon" />
        <span>{t("NAV.home")}</span>
      </LocalePath>
      <LocalePath
        isActive={
          `/${normalizedPathname}` == `/cart` || normalizedPathname == "/cart"
        }
        href="/cart"
        className="relative mobile-tab"
      >
        <div className={countClass}>{productCount}</div>
        <Cart4 className={className} />
        <span>{t("NAV.cart")}</span>
      </LocalePath>

      <LocalePath
        isActive={
          `/${normalizedPathname}` == `/favourits` ||
          normalizedPathname == "/favourits"
        }
        href="/favourits"
        className="mobile-tab"
      >
        <Heart className="size-6 *:stroke-darkprimary home-icon" />
        <span>{t("NAV.favourits")}</span>
      </LocalePath>

      {/* <LocalePath href="/notifications" className="relative mobile-tab">
        <p className="bg-error/90 w-2 h-2 rounded-full absolute top-3 start-[14px]"></p>
        <Notificaation className="size-6 *:stroke-darkprimary home-icon" />
        <span>{t("NAV.notifications")}</span>
      </LocalePath> */}
      {/* <LoginBtnProvide isTab /> */}
      {/* {isClient && (
        <>
          {memoizedSession ? (
            <LocalePath
              isActive={normalizedPathname.includes("profile")}
              href="/profile/addresses"
              className="mobile-tab"
            >
              <Person className="size-6 *:fill-darkprimary" />
              <span>{t("NAV.myAccount")}</span>
            </LocalePath>
          ) : ( */}
            <LocalePath
              isActive={normalizedPathname.includes("auth")}
              href="/auth/login"
              className="mobile-tab"
            >
              <Person className="size-6 *:fill-darkprimary" />
              {t("NAV.myAccount")}
              {/* <MdKeyboardArrowDown size={25} /> */}
            </LocalePath>
          {/* )}
        </>
      )} */}
    </div>
  );
};

export default MobileTabs;
