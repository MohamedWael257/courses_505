// import React, { PropsWithChildren } from "react";
// import { TimesIcon } from "../Icons";

// type Props = {
//   closeBtn?: boolean;
//   close: () => void;
//   presist?: boolean;
// };
// export default function MainModal({
//   closeBtn = true,
//   children,
//   close,
//   presist = false,
// }: PropsWithChildren<Props>) {
//   return (
//     <div
//       className="main-modal fixed top-0 left-0 bg-[#00000071] flex-col gap-5 w-screen h-screen z-50 flex justify-center items-center"
//       onClick={() => (presist ? "" : close())}
//     >
//       {closeBtn && (
//         <button
//           className="text-gray-200 font-medium text-4xl"
//           type="button"
//           onClick={close}
//         >
//           <TimesIcon className=" text-white" />
//         </button>
//       )}

//       {children}
//     </div>
//   );
// }
"use client";
import React, { PropsWithChildren } from "react";
import { TimesIcon } from "../Icons";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  closeBtn?: boolean;
  close: () => void;
  presist?: boolean;
  panorama?: boolean;
  title?: string;
  subtitle?: React.ReactNode;
  width?: string;
};
export default function MainModal({
  closeBtn = true,
  children,
  close,
  title,
  presist = false,
  panorama = false,
  subtitle,
  width,
}: PropsWithChildren<Props>) {
  const t = useTranslations("");

  return (
    <div
      // className="main-modal w-[90%] h-3/4 overflow-scroll fixed xl:left-24 lg:left-12 md:left-8 left-4 top-32 z-[9999] bg-[#FFFFFF] border-2 border-[#AEAEAE]  lg:p-0 p-4"
      // className="main-modal lg:w-1/2 w-[90%] lg:h-3/4 md:h-[65%] h-1/2 overflow-hidden  fixed top-[13%] lg:left-[25%] left-[5%] rounded-2xl bg-[#ffffff] p-4 flex-col gap-5 z-50 flex justify-center items-center"
      // className="main-modal lg:w-1/2 w-[90%] h-fit overflow-hidden  fixed top-[13%] lg:left-[25%] left-[5%] rounded-2xl bg-[#ffffff] p-4 flex-col gap-5 z-50 flex justify-center items-center"

      className={`main-modal fixed  left-[50%] top-[50%] z-[99999] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-white border-2 border-greynormal p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg presist ? "animate-show" : "animate-hide"
      }`}
      // className="main-modal main-modell "
      onClick={() => (presist ? "" : close())}
    >
      <div className={`flex justify-between ${panorama ? "p-0" : " p-4"}`}>
        <button
          className="absolute z-[999] inline-block bg-[#d9d9d9] rounded-xl  end-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground  "
          style={{ backgroundColor: "#d9d9d9" }}
          // type="button"
          onClick={close}
        >
          <X className="h-12 w-12  bg-[#d9d9d9] text-dark p-3 rounded-lg" />
        </button>

        <p className="text-3xl font-semibold   leading-10 text-center text-primary">
          {title}
        </p>
        {subtitle && subtitle}
      </div>

      {children}
    </div>
  );
}
