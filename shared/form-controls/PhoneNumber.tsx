// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslations } from "next-intl";
import { cn } from "@/utils/helpers";
import { CountryPhoneCodes } from "@/public/countries/country-phone-code";
import { Skeleton } from "../ui/skeleton";
import axiosInstanceGeneralClient from "@/utils/axiosClientGeneral";

interface PhoneNumberProps {
  label?: string;
  showRequired?: boolean;
  country?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  throwErrorPhone?: boolean;
}

const PhoneNumber: React.FC<PhoneNumberProps> = ({
  label,
  showRequired = false,
  country = "sa",
  placeholder = "Enter phone number",
  disabled = false,
  className,
  throwErrorPhone,
}) => {
  const form = useFormContext();
  const t = useTranslations("LABELS");
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    formState: { errors },
  } = form;

  const { phone, phone_code } = form.getValues();
  const { setValue } = form;

  const [countries, setCountries] = useState<
    { name: string; shortName: string; dialCode: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [defaultCountry, setDefaultCountry] = useState<string>(country);
  const [dialCode, setDialCode] = useState<string>("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await axiosInstanceGeneralClient.get("countries");
        const data = await response?.data;

        const filteredCountries = data?.data?.filter((country: any) =>
          CountryPhoneCodes.some(
            (item) =>
              item.dial_code.replace("+", "") === String(country.phone_code)
          )
        );

        const formattedCountries = filteredCountries.map((country: any) => {
          const matched = CountryPhoneCodes.find(
            (item) =>
              item.dial_code.replace("+", "") === String(country.phone_code)
          );
          return {
            name: country.name,
            shortName: matched?.code.toLowerCase() || country.short_name,
            dialCode: country.phone_code,
          };
        });

        setCountries(formattedCountries);

        if (phone_code) {
          const foundCountry = formattedCountries.find(
            (c: any) => c.dialCode === phone_code
          );
          if (foundCountry) {
            setDefaultCountry(foundCountry.shortName);
            setDialCode(`+${foundCountry.dialCode}`);
          }
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handlePhoneChange = (
    value: string,
    country: { dialCode: string; countryCode: string }
  ) => {
    const newDial = `+${country.dialCode}`;
    setDialCode(newDial);

    let currentValue = value;
    if (!currentValue.startsWith(newDial)) {
      currentValue = newDial + currentValue.replace(/^\+?\d+/, "");
    }

    const numberOnly = currentValue.slice(newDial.length).trim();
    setValue("phone", numberOnly);
    setValue("phone_code", country.dialCode);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = inputRef.current;
    if (!input) return;

    const selectionStart = input.selectionStart ?? 0;
    const selectionEnd = input.selectionEnd ?? 0;
    const codeLength = dialCode.length;

    const isBackspaceAtCode =
      e.key === "Backspace" && selectionStart <= codeLength;
    const isDeleteAtCode = e.key === "Delete" && selectionStart < codeLength;
    const isSelectingCode =
      selectionStart < codeLength || selectionEnd < codeLength;

    if (isBackspaceAtCode || isDeleteAtCode || isSelectingCode) {
      e.preventDefault();
      setTimeout(() => {
        input.setSelectionRange(codeLength, codeLength);
      }, 0);
    }
  };

  const handleClick = () => {
    const input = inputRef.current;
    if (input) {
      const cursorPos = input.selectionStart ?? 0;
      if (cursorPos < dialCode.length) {
        input.setSelectionRange(dialCode.length, dialCode.length);
      }
    }
  };

  useEffect(() => {
    const current = inputRef.current;
    if (current && !current.value.startsWith(dialCode)) {
      current.value = dialCode;
    }
  }, [dialCode]);

  const onlyCountries = countries
    .map((c) => c.shortName.toLowerCase())
    .filter(Boolean);

  return (
    <Controller
      control={form.control}
      name="phone"
      render={() => (
        <FormItem className={cn("w-full", className)}>
          {label && (
            <FormLabel className="font-medium text-lg leading-8 my-2 px-2">
              {showRequired && <span className="text-error">*</span>}
              {t(label)}
            </FormLabel>
          )}

          <FormControl>
            <div dir="ltr" className="relative">
              {loading ? (
                <Skeleton className="w-full h-16 rounded-[12px]" />
              ) : (
                <PhoneInput
                  enableSearch
                  country={defaultCountry}
                  disabled={disabled}
                  placeholder={t(placeholder)}
                  onlyCountries={
                    onlyCountries.length > 0 ? onlyCountries : ["sa"]
                  }
                  buttonClass="hover:bg-[green]"
                  containerStyle={{ borderRadius: "12px" }}
                  inputStyle={{
                    width: "100%",
                    borderRadius: "12px",
                    height: "64px",
                    paddingLeft: "60px",
                    borderColor:
                      (errors.phone || errors.phone_code) &&
                      !form.getValues("phone")
                        ? "#ef233c"
                        : "#EAEDF0",
                  }}
                  buttonStyle={{
                    marginLeft: "10px",
                    height: "40px",
                    width: "40px",
                    marginTop: "12px",
                    borderRadius: "50%",
                    border: "none",
                  }}
                  value={`${dialCode}${phone || ""}`}
                  onChange={handlePhoneChange}
                  inputProps={{
                    ref: inputRef,
                    onKeyDown: handleKeyDown,
                    onClick: handleClick,
                  }}
                />
              )}
              {(errors.phone || errors.phone_code) &&
                !form.getValues("phone") && (
                  <p
                    role="alert"
                    className="text-error text-sm rtl:text-end"
                    style={{ color: "#ef233c" }}
                  >
                    {errors.phone && t(errors.phone?.message)}
                  </p>
                )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PhoneNumber;
