import React from "react";
import ImageWithFallback from "@/shared/ImageWithFallback";
import Logo from "@/public/logo.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-secprimary py-12 overflow-x-hidden">
      <div className="flex justify-center items-center min-h-[100vh]">
        <div>
          <div className="flex justify-center">
            <ImageWithFallback
              src={Logo}
              width={500}
              height={500}
              className="w-28 h-20 object-contain"
              alt="logo"
            />
          </div>
          <div className="bg-white md:p-6 px-3 rounded-2xl mt-4 shadow-[4px_4px_50px_0_#0b09201a]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
