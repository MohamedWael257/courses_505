"use client";
import React, { PropsWithChildren } from "react";

import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

type props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  scroll?: boolean;
  onClick?: () => void;
  isActive?: boolean;
  dataAos?: string;
  dataAosDuration?: string;
};

export default function LocalePath({
  href,
  className = "",
  children,
  onClick,
  scroll,
  isActive = false,
  dataAos,
  dataAosDuration,
}: PropsWithChildren<props>) {
  const locale = useLocale();
  // const pathname = usePathname();

  // const normalizedPathname = pathname.replace(/^\/en/, "");
  // const isActive =
  //   `/${normalizedPathname}` == `${href}` || normalizedPathname == href;
  return (
    <Link
      onClick={onClick}
      prefetch={true}
      className={`${className ? className : ""}  ${
        isActive ? "active-link" : ""
      }`}
      // className={className}
      href={`${locale === "en" ? `/${locale}${href}` : `${href}`}`}
      scroll={scroll}
      data-aos={dataAos}
      data-aos-duration={dataAosDuration}
    >
      {children}
    </Link>
  );
}
