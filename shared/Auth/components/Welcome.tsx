"use client";

// Chadcn component
import { useLocale, useTranslations } from "next-intl";
import { ScrollArea } from "../../ui/scroll-area";
import CustomBtn from "@/shared/buttons/CustomBtn";
import Logo from "@/public/logo.png";
import Illustration from "@/assets/images/Illustration.png";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import ImageWithFallback from "@/shared/ImageWithFallback";
import Success from "@/assets/images/success2.gif";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/utils/axiosClient";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import { UseMutate } from "@/utils/hooks/useMutate";
import { saveCredentials } from "@/store/auth.slice";
import { useEffect, useState } from "react";
import { addForgetPassword } from "@/store/forget.slice";
import LoaderWarper from "@/shared/Loader/LoaderWarper";
import Cookies from "js-cookie";

interface VerifyCodeProps {
  dialogOpen: (open: boolean) => void;
  isDialogOpen: boolean;
}

const Welcome: React.FC<VerifyCodeProps> = ({ dialogOpen, isDialogOpen }) => {
  const t = useTranslations("");
  const locale = useLocale();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { saveRegisterData } = useSelector(
    (state: RootState) => state.ForgetConfig
  );
  const [isLoadingFirstTime, setIsLoadingFirstTime] = useState(true);

  const [termsData, setTermsData] = useState<any>(null);
  const fetchTermsData = async () => {
    try {
      const response = await axiosInstance.get("page/terms");

      setTermsData(response.data.data);
    } catch (error: any) {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: error?.response?.data?.message,
      });
      dialogOpen(false);
    } finally {
      setIsLoadingFirstTime(false);
    }
  };
  useEffect(() => {
    fetchTermsData();
  }, []);

  const { mutate: LoginMutate, isLoading: LoadingComplete } = UseMutate({
    endpoint: "login",
    onSuccess: async (responseData: any) => {
      if (responseData?.data) {
        if (+responseData.data.is_verify == 0) {
          dispatch(
            addForgetPassword({
              phone: responseData.data?.phone,
              phone_code: responseData.data?.phone_code,
              email: responseData.data?.email,
            })
          );
          router.replace(
            `${locale == "ar" ? "" : "/en"}/auth/verify-code-phone`
          );
        } else {
          await Swal.fire({
            title: responseData?.message,
            timer: 3000,
            showConfirmButton: false,
            imageUrl: `${Success.src}`,
            customClass: {
              popup: "custom-popup-class",
              title: "custom-title-class",
            },
            padding: "1rem",
          });
          await dispatch(saveCredentials(responseData.data));
          Cookies.remove("guest");
          router.replace(`${locale == "ar" ? "/" : "/en"}`);
        }
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.message;
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: errorMessage,
      });
    },
  });
  const handelSubmit = async () => {
    const finalOut = {
      phone: saveRegisterData?.phone,
      phone_code: saveRegisterData?.phone_code,
      password: saveRegisterData?.password,
    };
    LoginMutate(finalOut);
  };
  // useEffect(() => {
  //   if (isDialogOpen == false) {
  //     router.replace(`${locale == "ar" ? "/" : "/en"}`);
  //   }
  // }, [isDialogOpen]);
  // console.log("🚀 ~ isDialogOpen:", isDialogOpen)

  return (
    <>
      {isLoadingFirstTime ? (
        <div className="flex items-center justify-center md:min-h-[750px] min-h-[500px]">
          <LoaderWarper />
        </div>
      ) : (
        <div className="flex flex-col gap-0 pt-8">
          <ScrollArea className="grow " dir={locale === "en" ? "ltr" : "rtl"}>
            <div className={`md:h-[750px] h-[500px] flex flex-col`}>
              {/* <div className="flex flex-col items-center justify-center gap-8 mt-10"> */}
              <div className="bg-secprimary p-6 flex flex-col items-center justify-center gap-8">
                <div className="flex gap-3 justify-center items-center">
                  <ImageWithFallback
                    src={Logo}
                    alt="logo icon"
                    width="600"
                    height="600"
                    className="h-[48px] w-[80px] object-contain "
                    priority
                  />
                  <p className="text-darkprimary text-base   leading-6">
                    {t("Text.welcome")}
                  </p>
                </div>
                <ImageWithFallback
                  src={Illustration}
                  alt="logo icon"
                  width="600"
                  height="600"
                  className="h-[200px] w-[200px] object-contain "
                  priority
                />
              </div>
              <div className="flex flex-col gap-2 p-4">
                <h2 className="text-darkprimary font-bold text-xl   leading-7">
                  {t("Text.intro")}
                </h2>
                <p className="text-darkprimary text-base   leading-6">
                  {termsData?.title ?? t("Text.welcomeDesc")}
                </p>
                <br />
                <h2 className="text-darkprimary font-bold text-xl   leading-7">
                  {t("Text.intro2")}
                </h2>
                <p className="text-darkprimary text-base   leading-6">
                  {termsData?.desc ?? t("Text.welcomeDesc2")}
                </p>
                <div className="!pt-4 w-full h-max ">
                  <CustomBtn
                    onClick={() => {
                      handelSubmit();
                      // notify("success", "registerData?.message");
                    }}
                    title={t("Text.accept")}
                    buttonType="submit"
                    button
                    loader={false}
                    disabled={false}
                    className="!w-full  !h-[56px] !rounded-full "
                  />
                </div>
              </div>
            </div>
            {/* </div> */}
          </ScrollArea>
        </div>
      )}
    </>
  );
};

export default Welcome;
