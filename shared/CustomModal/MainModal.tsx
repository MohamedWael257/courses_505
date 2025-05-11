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
import React, { PropsWithChildren } from "react";
import { TimesIcon } from "../Icons";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  closeBtn?: boolean;
  close: () => void;
  presist?: boolean;
};
export default function MainModal({
  closeBtn = true,
  children,
  close,
  presist = false,
}: PropsWithChildren<Props>) {
  const t = useTranslations("");

  return (
    <div
      // className="main-modal w-[90%] h-3/4 overflow-scroll fixed xl:left-24 lg:left-12 md:left-8 left-4 top-32 z-[9999] bg-[#FFFFFF] border-2 border-[#AEAEAE]  lg:p-0 p-4"
      className="main-modal main-modell "
      onClick={() => (presist ? "" : close())}
    >
      <div
        className="p-4"
        // className="lg:flex lg:justify-between"
        // style={{ flexDirection: "row-reverse" }}
      >
        {closeBtn && (
          <button
            className="absolusste right-4 top-7 bg-[#d9d9d9] rounded-xl  opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            style={{ backgroundColor: "#d9d9d9" }}
            // type="button"
            onClick={close}
          >
            <X className="h-12 w-12  bg-[#d9d9d9] text-dark p-3 rounded-lg" />
            {/* <span className="sr-only">Close</span> */}
            {/* <TimesIcon className=" text-white" /> */}
          </button>
        )}
        <div>
          <h2
            // data-aos="fade-left"
            className="my-10 lg:w-[80%] text-4xl   leading-10 font-bold "
          >
            {t("Compare.compare")}
          </h2>
          <p className="my-4 text-greynormal font-normal text-lg    leading-7">
            {t("Compare.choose")}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
}
