import { useTranslations } from "next-intl";
import React from "react";
import {
  Courses,
  Downloads,
  EditProfile,
  Location,
  Orders,
  Wallet,
} from "../Icons";

const useAccountLinks = () => {
  const t = useTranslations("NAV");

  const accountMenuItems = [
    {
      name: t("Edit profile"),
      path: "/profile/personal-account",
      icon: <EditProfile className="size-10" color={"#3E3E3E"} />,

      activeIcon: <EditProfile className="size-10" color={"#4F008C"} />,
    },
    {
      name: t("addresses"),
      path: "/profile/addresses",
      icon: <Location className="size-10" color={"#3E3E3E"} />,

      activeIcon: <Location className="size-10" color={"#4F008C"} />,
    },
    {
      name: t("orders"),
      path: "/profile/orders?status=active",
      icon: <Orders className="size-10" color={"#3E3E3E"} />,

      activeIcon: <Orders className="size-10" color={"#4F008C"} />,
    },
    {
      name: t("courses"),
      path: "/profile/courses",
      icon: <Courses className="size-10" color={"#3E3E3E"} />,

      activeIcon: <Courses className="size-10" color={"#4F008C"} />,
    },
    {
      name: t("downloads"),
      path: "/profile/downloads",
      icon: <Downloads className="size-10" color={"#3E3E3E"} />,

      activeIcon: <Downloads className="size-10" color={"#4F008C"} />,
    },
    {
      name: t("wallet"),
      path: "/profile/wallet",
      icon: <Wallet className="size-10" color={"#3E3E3E"} />,

      activeIcon: <Wallet className="size-10" color={"#4F008C"} />,
    
    },
  ];

  return { accountMenuItems };
};

export default useAccountLinks;
