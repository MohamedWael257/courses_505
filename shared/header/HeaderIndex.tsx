/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useTranslations, useLocale } from "next-intl";
import HeaderLogo from "@/shared/header/HeaderLogo";
import MobileNav from "@/shared/header/MobileNav";
import LocationIcon from "@/assets/icons/location";
// import LocationText from "@/shared/LocationText";
import HeaderNavItems from "@/shared/header/HeaderNavItems";
import AppDialog from "@/shared/Dialogs/AppDialog";
import { useEffect, useMemo, useState } from "react";
import HeaderTop from "@/shared/header/HeaderTop";
import HeaderPages from "@/shared/header/HeaderPages";
import SearchComponent from "@/shared/SearchComponent";
import UseSession from "@/store/UseSession";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { AuthStage, SessionType } from "@/components/Header";
import Cookies from "js-cookie";
import { getAllCartItems } from "@/store/cartStore.slice";
import { getAllFavItems } from "@/store/favourtis";
import ShowAlertMixin from "../ShowAlertMixin";
import axiosInstance from "@/utils/axiosClient";
import { updateUser } from "@/store/auth.slice";
import { usePathname } from "next/navigation";

export default function HeaderIndex({ settings }: any) {
  const t = useTranslations();

  const [authStage, setAuthStage] = useState<AuthStage>("");
  const pathname = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const session = UseSession();
  const memoizedSession: SessionType | any = useMemo(() => session, [session]);
  const { totalPrice, productCount, mainLoader } = useSelector(
    (state: RootState) => state.CartConfig
  );
  const { allFavItems } = useSelector(
    (state: RootState) => state.FavouritsConfig
  );
  const favCount = allFavItems?.length;
  // const { storedValues } = useSelector(
  //   (state: RootState) => state.ForgetConfig
  // );
  // const dispatch = useDispatch<AppDispatch>();
  // const token = Cookies.get("token");
  // const UpdateProfile = async () => {
  //   try {
  //     const response = await axiosInstance.get("/profile");

  //     dispatch(updateUser(response.data.data));
  //   } catch (error: any) {
  //     ShowAlertMixin({
  //       type: 15,
  //       icon: "error",
  //       title: error?.response?.data?.message,
  //     });
  //   } finally {
  //   }
  // };

  // useEffect(() => {
  //   if (token) {
  //     UpdateProfile();
  //   }
  //   dispatch(getAllCartItems());
  //   dispatch(getAllFavItems());
  // }, [token]);
  const isRedLogo =
    pathname?.endsWith("books") ||
    pathname?.endsWith("faqs") ||
    pathname?.endsWith("about") ||
    pathname?.endsWith("contact") ||
    (pathname?.includes("courses") && !pathname?.includes("profile")) ||
    pathname?.endsWith("terms") ||
    pathname?.endsWith("en") ||
    pathname == "/";

  const isAuth = pathname?.includes("auth");
  return (
    <>
      <header
        className={` z-50 w-full shadow-sm  relative top-0 left-0 h-fit ${
          isRedLogo ? "bg-secprimary" : "bg-white"
        } ${isAuth ? "hidden" : "inline-block"}`}
      >
        <nav className="relative z-10 w-full py-4 container lg:flex hidden justify-between fklex-wrap items-center gap-8">
          <div className="flex items-center gap-10">
            <HeaderLogo />
            <HeaderNavItems />
          </div>
          {/* <div className="lg:hidden inline-block w-full">
            <MobileNav
              categories={categories}
              memoizedSession={memoizedSession}
              totalPrice={totalPrice}
              productCount={productCount}
              mainLoader={mainLoader}
            />
          </div> */}
          <HeaderPages
            memoizedSession={memoizedSession}
            totalPrice={totalPrice}
            productCount={productCount}
            mainLoader={mainLoader}
            favCount={favCount}
          />
        </nav>
      </header>
      {/* <AppDialog
        setIsDialogOpen={setIsDialogOpen}
        isDialogOpen={isDialogOpen}
        authStage={authStage}
        setAuthStage={setAuthStage}
      /> */}
    </>
  );
}
