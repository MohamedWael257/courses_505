import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import ImageWithFallback from "../ImageWithFallback";
import { SlLocationPin } from "react-icons/sl";
import { LiaUserEditSolid } from "react-icons/lia";
import { BiCoinStack } from "react-icons/bi";
import { LiaGiftSolid } from "react-icons/lia";
import { FaRegStar } from "react-icons/fa";
import { BsChatSquareText } from "react-icons/bs";
import { LuWallet } from "react-icons/lu";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { RiFileCopy2Line } from "react-icons/ri";
import {
  Chats,
  Coupons,
  EditProfile,
  Gifts,
  Orders,
  Points,
  Starts,
  Wallet,
} from "../Icons";

const useAccountLinks = () => {
  const t = useTranslations("NAV");

  const accountMenuItems = [
    {
      name: t("addresses"),
      path: "/profile/addresses",
      icon: <SlLocationPin size={40} />,

      activeIcon: <SlLocationPin size={40} color={"#4F008C"} />,
    },
    {
      name: t("orders"),
      path: "/profile/orders?status=active",
      icon: <Orders className="size-10" color={"#3E3E3E"} />,

      activeIcon: <Orders className="size-10" color={"#4F008C"} />,
    },
    {
      name: t("Edit profile"),
      path: "/profile/personal-account",
      icon: <EditProfile className="size-10" color={"#3E3E3E"} />,

      activeIcon: <EditProfile className="size-10" color={"#4F008C"} />,
    },
    {
      name: t("wallet"),
      path: "/profile/wallet?type=deposit",
      icon: <Wallet className="size-10" color={"#3E3E3E"} />,

      activeIcon: <Wallet className="size-10" color={"#4F008C"} />,
    },
    {
      name: t("coupons"),
      path: "/profile/coupons?filter=",
      icon: <Coupons className="size-10" color={"#3E3E3E"} />,

      activeIcon: <Coupons className="size-10" color={"#4F008C"} />,
    },
    {
      name: t("points"),
      path: "/profile/points",
      icon: <Points className="size-10" color={"#3E3E3E"} />,

      activeIcon: <Points className="size-10" color={"#4F008C"} />,
    },
    {
      name: t("gifts"),
      path: "/profile/gifts",
      icon: <Gifts className="size-10" color={"#3E3E3E"} />,

      activeIcon: <Gifts className="size-10" color={"#4F008C"} />,
    },
    {
      name: t("rates"),
      path: "/profile/rates",
      icon: <Starts className="size-10" color={"#3E3E3E"} />,

      activeIcon: <Starts className="size-10" color={"#4F008C"} />,
    },
    {
      name: t("chats"),
      path: "/profile/chats",
      icon: <Chats className="size-10" color={"#3E3E3E"} />,

      activeIcon: <Chats className="size-10" color={"#4F008C"} />,
    },
  ];

  return { accountMenuItems };
};

export default useAccountLinks;
