import React from "react";
import LocalePath from "@/shared/LocalePath";
import Logo from "@/public/logo.png";
import ImageWithFallback from "../ImageWithFallback";

export default function HeaderLogo() {
  return (
    <LocalePath href="/" className=" h-[48px] w-[120px]">
      <ImageWithFallback
        src={Logo}
        alt="logo icon"
        width="600"
        height="600"
        className="h-[48px] w-[120px] object-contain "
        priority
      />
    </LocalePath>
  );
}
