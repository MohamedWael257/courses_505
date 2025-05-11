/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Link from "next/link";

// Lib
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Chadcn component
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { AuthStage } from "@/components/Header";
import { Form } from "@/shared/ui/form";
import FormInput from "@/shared/form-controls/FormInput";

import CustomBtn from "@/shared/buttons/CustomBtn";
import Swal from "sweetalert2";
import FormSelect from "@/shared/form-controls/FormSelect";
import { useRouter } from "next/navigation";
import PhoneNumber from "@/shared/form-controls/PhoneNumber";
import PasswordController from "@/shared/form-controls/PasswordController";
import LocalePath from "@/shared/LocalePath";
import AppDialog from "@/shared/Dialogs/AppDialog";
import { UseMutate } from "@/utils/hooks/useMutate";
import { useDispatch } from "react-redux";
import { addForgetPassword, saveRegisterData } from "@/store/forget.slice";
import FormSelectCutsom from "@/shared/form-controls/FormSelectCutsom";
import FormInputDate from "@/shared/form-controls/FormDate";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import axiosInstanceGeneralClient from "@/utils/axiosClientGeneral";
import { DateIcon } from "@/shared/Icons";
import FormCheckbox from "@/shared/form-controls/FormCheckbox";

const Register: React.FC = () => {
  const [throwErrorPhone, setThrowErrorPhone] = useState(false);
  const [authStage, setAuthStage] = useState<AuthStage>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Parse directions if they exist
  const t = useTranslations("");
  const locale = useLocale();

  const [loadingLevel, setLoadingLevel] = useState(false);
  const [levelOptions, setLevelOptions] = useState([]);

  const transformLevelData = (data: any) => {
    return data.map((level: any) => ({
      label: level.name || `level ${level.id}`, // Use `name` if available, otherwise use a default
      value: level.id.toString(), // Convert id to string if needed
    }));
  };

  // Fetch levels
  useEffect(() => {
    const fetchCountries = async () => {
      setLoadingLevel(true);
      try {
        const res = await axiosInstanceGeneralClient.get("level");

        const transformedCityData = transformLevelData(res.data.data);
        setLevelOptions(transformedCityData);
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message;
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: errorMessage,
        });
        setLoadingLevel(false);
      } finally {
        setLoadingLevel(false);
      }
    };

    fetchCountries();
  }, []); // Ensure locale is included in the dependencies if it can change

  const [loadingCountries, setLoadingCountries] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);

  const transformCountryData = (data: any) => {
    return data.map((Country: any) => ({
      label: Country.name || `country ${Country.id}`, // Use `name` if available, otherwise use a default
      value: Country.id.toString(), // Convert id to string if needed
    }));
  };

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      setLoadingCountries(true);
      try {
        const res = await axiosInstanceGeneralClient.get("countries");

        const transformedCityData = transformCountryData(res.data.data);
        setCountryOptions(transformedCityData);
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message;
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: errorMessage,
        });
        setLoadingCountries(false);
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []); // Ensure locale is included in the dependencies if it can change

  const formSchema = yup.object({
    full_name: yup
      .string()
      .required("name is a required field")
      .matches(/^(\S+\s)+\S+(\S|$)/, "The value must be two words")
      .max(250, "The full name must be less than 250 characters"),
    email: yup
      .string()
      .email("invalid_email_address")
      .required("email is a required field"),
    phone: yup.string().required("phone_required"),

    phone_code: yup.string(),
    country_id: yup.string().required("country is a required field"),
    level: yup.string().required("level is a required field"),
    password: yup.string().required("password_required"),
    password_confirmation: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password"), null as any], "Passwords don't match"),
    birthday: yup.string().required(t("date_of_birth is a required field")),
    agree: yup.string().required(t("agree is a required field")),
  });

  const form = useForm({
    // resolver: yupResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      phone_code: "",
      birthday: "",
      country_id: "",
      level: "",
      password: "",
      password_confirmation: "",
      agree: "",
    },
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const formatLocalDate = (date: Date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const { mutate: RegisterMutate, isLoading: LoadingComplete } = UseMutate({
    endpoint: "complete-register",
    onSuccess: (responseData: any) => {
      // setTimeout(() => {
      //   setIsDialogOpen(true);
      //   setAuthStage("TypeVerifyCodeRegister");
      // }, 300);
      ShowAlertMixin({
        type: 15,
        icon: "success",
        title: responseData?.message,
      });
      router.replace(`${locale == "ar" ? "" : "/en"}/auth/verify-code-email`);
    },

    onError: (error: any) => {
      // @ts-ignore
      const errorMessage = error?.message;
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: errorMessage,
      });
    },
  });

  async function onSubmit(
    values: yup.InferType<typeof formSchema>,
    actions: any
  ) {
    // @ts-ignore
    // if (values.phone === "") {
    //   setThrowErrorPhone(true);
    //   return;
    // } else {
    //   setThrowErrorPhone(false);
    // }
    const finalOut = {
      full_name: values?.full_name,
      email: values?.email,
      phone: values?.phone,
      phone_code: values?.phone_code,
      birthday: formatLocalDate(new Date(values?.birthday)),
      country_id: values?.country_id,
      level: values?.level,
      password: values?.password,
      password_confirmation: values?.password_confirmation,
      agree: values?.agree,
    };
    // await RegisterMutate(finalOut);
    ShowAlertMixin({
      type: 15,
      icon: "success",
      title: "success",
    });
    router.replace(`${locale == "ar" ? "" : "/en"}/auth/verify-code-email`);
    dispatch(
      addForgetPassword({
        email: values.email,
      })
    );
    dispatch(
      saveRegisterData({
        password: values.password,
      })
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3  md:w-[560px] h-fit p-4">
        <div className="mb-3">
          <h3 className="text-[24px] font-bold text-center">
            {t("Text.CREATE_ACCOUNT")}
          </h3>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormInput
                name="full_name"
                label="fullname"
                className="h-14 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-7 pe-10"
                placeholder="fullname"
              />

              <FormInput
                name="email"
                label="email"
                className="h-14 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-7 pe-10"
                placeholder="email"
              />
              <PhoneNumber
                throwErrorPhone={throwErrorPhone}
                country="sa"
                label="phoneNumber"
                placeholder="phoneNumber"
              />
              <FormInputDate
                name="birthday"
                label={"date_of_birth"}
                className="h-14 !w-full  placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-7 pe-10"
                placeholder={"date_of_birth"}
                showRequired
                rightIcon={
                  <>
                    <DateIcon className="size-6" />
                  </>
                }
              />
              <FormSelect
                name="level"
                label="level"
                placeholder="level"
                customStyle={true}
                className="!h-14 placeholder:text bg-white"
                options={levelOptions}
                disabled={loadingLevel} // Disable if no country is selected or cities are loading
              />
              <FormSelect
                name="country_id"
                label="country"
                placeholder="country"
                customStyle={true}
                className="!h-14 placeholder:text"
                options={countryOptions}
                disabled={loadingCountries} // Disable if no country is selected or cities are loading
              />
              {/* Radio Group for Gender Selection */}

              <PasswordController
                // @ts-ignore
                name="password"
                label="password"
                placeholder="password"
                className="h-14 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-7 pe-10"
              />

              <PasswordController
                // @ts-ignore
                name="password_confirmation"
                label="password_confirmation"
                placeholder="password_confirmation"
                className="h-14 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-7 pe-10"
              />
              {/* <FormCheckbox
                name="agree"
                label="agree"
                className="h-14 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-7 pe-10"
              /> */}
            </div>

            <div className="!pt-2">
              <CustomBtn
                title={t("validations.create_a_new_account")}
                buttonType="submit"
                loader={false}
                disabled={false}
                button
                className=" !w-full !h-[56px] !rounded-[12px]  !mt-[20px]"
              />
            </div>
          </form>
        </Form>
        <p className="text-center mt-4 ">
          {t("validations.have_an_account")} {"  "}
          <LocalePath
            href="/auth/login"
            className="font-semibold hover:underline py-1 text-primary"
          >
            {t("validations.login")}
          </LocalePath>
        </p>
      </div>
      <AppDialog
        setIsDialogOpen={setIsDialogOpen}
        isDialogOpen={isDialogOpen}
        authStage={authStage}
        setAuthStage={setAuthStage}
      />
    </>
  );
};

export default Register;
