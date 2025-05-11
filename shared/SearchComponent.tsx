// "use client";
// import React, { useEffect, useMemo, useState } from "react";
// import debounce from "debounce";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// import { useLocale, useTranslations } from "next-intl";
// import { Input } from "./ui/input";
// import { ScrollArea } from "./ui/scroll-area";
// import UseSession from "@/store/UseSession";
// import { SessionType } from "@/components/Header";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";
// import { IoSearch } from "react-icons/io5";
// import { DialogContent } from "./ui/dialog";
// import { Dialog } from "./ui/dialog";
// import { buffer } from "stream/consumers";
// import axiosInstance from "@/utils/axiosClient";
//
// import { Dropdown, MenuProps } from "antd";
// import { CloseOutlined, ReloadOutlined } from "@ant-design/icons";
// import { RecentIcon } from "./Icons";

// const SearchComponent = () => {
//   const t = useTranslations("");
//   const router = useRouter();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchHistory, setSearchHistory] = useState<string[]>([]);

//   // Load search history from localStorage on mount
//   useEffect(() => {
//     const storedHistory = JSON.parse(
//       localStorage.getItem("searchHistory") || "[]"
//     );
//     setSearchHistory(storedHistory);
//   }, []);

//   // Handle input change
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   // Handle search action
//   const handleSearch = () => {
//     if (!searchTerm.trim()) return;

//     const updatedHistory = [
//       searchTerm,
//       ...searchHistory.filter((item) => item !== searchTerm),
//     ].slice(0, 5); // Keep latest 5
//     setSearchHistory(updatedHistory);
//     localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

//     router.push(`/search?keyword=${encodeURIComponent(searchTerm.trim())}`);
//     // setSearchTerm("");
//   };

//   const handleHistoryClick = (item: string) => {
//     setSearchTerm(item);
//     router.push(`/search?keyword=${encodeURIComponent(item)}`);
//   };

//   const handleRemoveItem = (item: string) => {
//     const updatedHistory = searchHistory.filter((i) => i !== item);
//     setSearchHistory(updatedHistory);
//     localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
//   };

//   // Clear all history
//   const handleClearAll = () => {
//     setSearchHistory([]);
//     localStorage.removeItem("searchHistory");
//   };

//   const items: MenuProps["items"] = searchHistory.length
//     ? [
//         {
//           label: (
//             <div className="flex justify-between items-center mb-5">
//               <span className="font-bold ">{t("LABELS.search_history")}</span>
//               <span
//                 onClick={handleClearAll}
//                 className="text-[#C21D20] text-sm cursor-pointer"
//               >
//                 {t("LABELS.clear_all")}
//               </span>
//             </div>
//           ),
//           key: "header",
//           disabled: true,
//         },
//         ...searchHistory.map((item) => ({
//           key: item,
//           label: (
//             <div className="flex items-center justify-between py-2.5">
//               <div
//                 className="flex items-center gap-2 cursor-pointer w-full"
//                 onClick={() => handleHistoryClick(item)}
//               >
//                 <RecentIcon />
//                 {item}
//               </div>
//               <CloseOutlined
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleRemoveItem(item);
//                 }}
//                 className="text-gray-400 cursor-pointer"
//               />
//             </div>
//           ),
//         })),
//       ]
//     : [
//         {
//           label: (
//             <span className="text-gray-500">{t("LABELS.no_history")}</span>
//           ),
//           key: "empty",
//           disabled: true,
//         },
//       ];
//   return (
//     <>
//       <div className="relative">
//         <Dropdown trigger={["click"]} menu={{ items }}>
//           <Input
//             type="text"
//             searchCustom
//             searchButtonSubmitted
//             className="2xl:w-[350px] xl:w-[275px] kklg:w-[648px] md:w-full ps-10 font-bold min-h-[42px] border-2 border-greynormal rounded-xl"
//             leftIcon={
//               <IoSearch
//                 onClick={() => {
//                   if (searchTerm.trim() !== "") handleSearch();
//                   // setIsDialogOpen(false);
//                 }}
//                 className="text-[#B0B0B0] me-2 cursor-pointer"
//                 size={25}
//               />
//             }
//             // leftIcon={<SearchIcon />}
//             placeholder={t("search")}
//             value={searchTerm}
//             onChange={handleChange}
//             onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//           />
//         </Dropdown>
//       </div>
//       {/* <DropdownMenu
//         dir={locale === "ar" ? "rtl" : "ltr"}
//         modal={false}
//         open={isDialogOpen}
//         onOpenChange={setIsDialogOpen}
//       >
//         <DropdownMenuTrigger>
//           <div className="w-full">
//             <Input
//               type="text"
//               searchCustom
//               searchButtonSubmitted
//               className="2xl:w-[350px] xl:w-[275px] lg:w-[648px] md:w-[450px] ps-10 font-bold min-h-[42px] border-2 border-greynormal rounded-xl"
//               // rightIcon={
//               //  <>
//               //   <button
//               //     disabled={searchQuery.trim() == ""}
//               //     onClick={() => {
//               //       handleSearchButtonClick();
//               //       setIsDialogOpen(false);
//               //     }}
//               //   >
//               //     <IoSearch className="text-primary me-2" size={25} />
//               //   </button>
//               //  </>
//               // }
//               rightIcon={

//                    <IoSearch
//                     onClick={() =>{
//                       if(searchQuery.trim() !== "")
//                      handleSearchButtonClick();
//                      setIsDialogOpen(false);
//                    }}
//                     className="text-primary me-2" size={25} />

//                }
//               // leftIcon={<SearchIcon />}
//               placeholder={t("search")}
//               value={searchQuery}
//               onChange={handleChangeSearch}
//               onKeyDown={handleKeyDown}
//               onClick={() => {
//                 if (isDialogOpen == false) {
//                   setIsDialogOpen(true);
//                 }
//               }}
//             />
//           </div>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent
//           style={{ boxShadow: "0 0 15px 4px #5e5e5e" }}
//           className="z-[99999999] p-4 mt-6 rounded-xl md:w-[450px] w-[400px] md:translate-x-0 translate-x-[-10px]"
//         >
//           <ScrollArea
//             className="h-[300px] sm:pe-4"
//             dir={locale === "ar" ? "rtl" : "ltr"}
//           >
//             <div
//               onClick={() => {
//                 setIsDialogOpen(false);
//               }}
//             >
//               data
//             </div>
//           </ScrollArea>
//         </DropdownMenuContent>
//       </DropdownMenu> */}
//       {/* <div className="w-full">
//         <Input
//           type="text"
//           searchCustom
//           searchButtonSubmitted
//           className="2xl:w-[350px] xl:w-[275px] lg:w-[225px] ps-10 font-bold min-h-[42px] border-2 border-greynormal rounded-xl"
//           rightIcon={
//             <IoSearch
//               onClick={() => {
//                 handleSearchButtonClick();
//                 setIsDialogOpen(false);
//               }}
//               className="text-primary me-2"
//               size={25}
//             />
//           }
//           // leftIcon={<SearchIcon />}
//           placeholder={t("search")}
//           value={searchQuery}
//           onChange={handleChangeSearch}
//           onKeyDown={handleKeyDown}
//           onClick={() => {
//             setIsDialogOpen(true);
//           }}
//         />
//       </div>
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent
//           dir={locale === "ar" ? "rtl" : "ltr"}
//           className="w-[90%] xl:w-[500px] max-w-[90%] xl:max-w-[60%] bg-white border border-secondrydark"
//           showCloseButton={false}
//         >
//           <div className="flex flex-col gap-6 mt-7">
//             <div className="w-full">
//               <Input
//                 type="text"
//                 searchCustom
//                 searchButtonSubmitted
//                 className="h-full w-full min-h-[62px] border-[#F5F5FA] bg-[#F4F4F4] focus:border-none search-input rounded-[12px] disabled:!cursor-pointer disabled:!opacity-1 "
//                 rightIcon={
//                   <IoSearch
//                     onClick={() => {
//                       handleSearchButtonClick();
//                       setIsDialogOpen(false);
//                     }}
//                     className="text-primary me-2"
//                     size={25}
//                   />
//                 }
//                 // leftIcon={<SearchIcon />}
//                 placeholder={t("search")}
//                 value={searchQuery}
//                 onChange={handleChangeSearch}
//                 onKeyDown={handleKeyDown}
//                 onClick={() => {
//                   setIsDialogOpen(true);
//                 }}
//               />
//             </div>

//             <ScrollArea
//               className="h-[300px] sm:pe-4"
//               dir={locale === "ar" ? "rtl" : "ltr"}
//             >
//               {data?.map((ele: any, index: number) => (
//                 <div
//                   key={index}
//                   onClick={() => {
//                     setIsDialogOpen(false);
//                   }}
//                 >
//                   data
//                 </div>
//               ))}
//             </ScrollArea>
//           </div>
//         </DialogContent>
//       </Dialog> */}
//     </>
//   );
// };

// export default SearchComponent;

"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useLocale, useTranslations } from "next-intl";
import { Input } from "./ui/input";
import { IoSearch } from "react-icons/io5";
import axiosInstance from "@/utils/axiosClient";
import { Dropdown, MenuProps, Spin } from "antd";
import ShowAlertMixin from "./ShowAlertMixin";
import Image from "next/image";
import { RiArrowLeftSLine } from "react-icons/ri";
import LocalePath from "./LocalePath";
import ImageWithFallback from "./ImageWithFallback";

const SearchComponent = () => {
  const t = useTranslations("");
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  // const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const locale = useLocale();
  const [searchData, setSearchData] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const handleGetSearchData = async () => {
    if (!searchTerm.trim()) return;

    try {
      setLoader(true);
      const { data } = await axiosInstance.get(
        `/search?keyword=${encodeURIComponent(searchTerm)}`
      );
      if (data?.status == "success") {
        setSearchData(data?.data);
        // dispatch(getAllCartItems());
      }
    } catch (error: any) {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: error?.response?.data?.message,
      });
    } finally {
      // setIncrementLoader(false);
      setLoader(false);
    }
  };
  useEffect(() => {
    if (searchTerm) {
      handleGetSearchData();
    }
  }, [searchTerm]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle search action
  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    // const updatedHistory = [
    //   searchTerm,
    //   ...searchHistory.filter((item) => item !== searchTerm),
    // ].slice(0, 5); // Keep latest 5
    // setSearchHistory(updatedHistory);
    // localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

    router.push(`/search?keyword=${encodeURIComponent(searchTerm.trim())}`);
    // setSearchTerm("");
  };

  const items: MenuProps["items"] = loader
    ? [
        {
          label: <Spin spinning={loader} />,
          key: "loading",
          disabled: true,
        },
      ]
    : searchData?.length > 0
    ? [
        ...searchData.map((item: any) => ({
          key: `search_${item.id}`,
          label: (
            <div
              key={item.id}
              onClick={() =>
                router.push(
                  `${locale == "ar" ? "" : "/en"}/products/${item?.slug}`
                )
              }
              className="grid grid-cols-[auto_1fr] items-center gap-3 mb-2"
            >
              <div className="bg-greynormal cursor-pointer p-2 rounded-xl flex justify-center items-center">
                <ImageWithFallback
                  src={item?.main?.media}
                  alt="image"
                  width={800}
                  height={800}
                  className="w-[50px] h-[50px] object-contain"
                />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-base font-medium leading-6 line-clamp-1 w-[200px] text-start text-text">
                  {item?.name}
                </p>
                <div className="flex gap-2">
                  <p className="text-base text-text font-semibold leading-5">
                    {item?.price_after_discount > 0
                      ? item?.price_after_discount
                      : item?.price}{" "}
                    {t("Text.SR")}
                  </p>
                  {item?.price_after_discount > 0 && (
                    <p className="text-base text-secondrydark font-normal line-through">
                      {item?.price} {t("Text.SR")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ),
        })),

        {
          label: (
            <LocalePath
              href={`/search?keyword=${searchTerm}`}
              className="!text-primary text-lg text-start font-medium flex gap-2 items-center justify-start w-fit whitespace-nowrap"
            >
              {t("Show more")} ({searchData.length})
              <RiArrowLeftSLine
                className={`${locale === "ar" ? "" : "rotate-180"}`}
                size={25}
              />
            </LocalePath>
          ),
          key: "all",
        },
      ]
    : [
        {
          label: (
            <span className="text-gray-500">{t("LABELS.no_history")}</span>
          ),
          key: "empty",
          disabled: true,
        },
      ];
  return (
    <>
      <div className="relative">
        <Dropdown
          trigger={["click"]}
          menu={{ items }}
          overlayStyle={{ height: "400px" }}
          overlayClassName="search-drop-down"
        >
          <Input
            type="text"
            searchCustom
            searchButtonSubmitted
            className="2xl:w-[350px] xl:w-[275px] kklg:w-[648px] md:w-full ps-10 font-bold min-h-[42px] border-2 border-greynormal rounded-xl"
            leftIcon={
              <IoSearch
                onClick={() => {
                  if (searchTerm.trim() !== "") handleSearch();
                  // setIsDialogOpen(false);
                }}
                className="text-[#B0B0B0] me-2 cursor-pointer"
                size={25}
              />
            }
            // leftIcon={<SearchIcon />}
            placeholder={"search"}
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </Dropdown>
      </div>
    </>
  );
};

export default SearchComponent;
