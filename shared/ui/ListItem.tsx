/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import ImageWithFallback from "../ImageWithFallback";
import LocalePath from "../LocalePath";

export const ListItem = ({
  className,
  title,
  path,
  children,
  href,
  setDropdownOpen,
  ...props
}: any) => {
  return (
    <li className="w-full bcccg-[#FCFBFD] rounded-[66px] ">
      <LocalePath
        href={`${href}`}
        // ref={ref}
        {...props}
        className="w-full"
      >
        <button
          className="w-full flex items-center justify-end gap-3 rounded-[66px] borddder-[1px] borddder-solid borfffder-[#F3F6FC] p-4"
          onClick={() => setDropdownOpen(false)}
        >
          <p className="text-[14px] font-bold text-end">{title}</p>
          <div className="bgfff-[#FCFBFD] w-[120px] h-[72px] rounded-full flex items-center justify-center">
            <img
              width={420}
              height={420}
              className="rounded-[16px] w-[120px] h-[72px] min-w-[120px] min-h-[72px] max-w-[120px] max-h-[72px] "
              src={path}
              alt="item image"
            />
          </div>
        </button>
        {/* <p className="line-clamp-2 text-sm   leading-snug text-muted-foreground">
            {children}
            </p> */}
      </LocalePath>
    </li>
  );
};
