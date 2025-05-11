import React from "react";
import BreadcrumbSlugs from "@/shared/Breadcrumbs/CustomBreadcrumbs";
import CartCopmonent from "@/components/cart/CartCopmonent";
export default function page({
  searchParams,
}: {
  searchParams: { code?: string };
}) {
  const code = searchParams.code || "";
  const paths = [{ name: "home", href: "/" }, { name: "cart" }];

  return (
    <div className="bg-white overflow-x-hidden">
      <div className=" container md:py-10 py-6">
        <BreadcrumbSlugs icon paths={paths} subtitle={"cart"} TranslateTitle />
      </div>
      <CartCopmonent code={code} />
    </div>
  );
}
