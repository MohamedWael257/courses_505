import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormField,
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
  throwErrorPhone = false,
}) => {
  const form = useFormContext();
  const t = useTranslations("LABELS");

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

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://doom.elsayed.aait-d.com/api/general/countries",
          {
            method: "GET",
            headers: {
              "Accept-Language": "en",
            },
          }
        );
        const data = await response.json();

        const filteredCountries = data.data.filter((country: any) =>
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

  const formatPhoneNumber = (
    phoneCode: string,
    phoneNumber: string
  ): string => {
    if (!phoneCode || !phoneNumber) return "";
    return `+${phoneCode}${phoneNumber}`;
  };

  // const handlePhoneChange = (
  //   value: string,
  //   country: { dialCode: string; countryCode: string }
  // ) => {
  //   const phoneNumber = value.slice(country.dialCode.length).trim();
  //   setValue("phone", phoneNumber);
  //   setValue("phone_code", country.dialCode);
  // };
  const handlePhoneChange = (
    value: string,
    country: { dialCode: string; countryCode: string }
  ) => {
    const phoneNumber = value.slice(country.dialCode.length).trim();

    // Only set the phone value if it's not empty
    if (phoneNumber) {
      setValue("phone", phoneNumber);
    } else {
      // If the phone number is empty, do not update the phone_code
      setValue("phone", "");
    }

    // Always set the phone_code based on the selected country
    setValue("phone_code", country.dialCode);
  };
  const onlyCountries = countries
    .map((c) => c.shortName.toLowerCase())
    .filter(Boolean);

  return (
    <Controller
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem className={cn("w-full", className)}>
          {label && (
            <FormLabel className="font-medium text-lg leading-6 my-2 px-2">
              {showRequired && <span className="text-error">*</span>}
              {t(label)}
            </FormLabel>
          )}

          <FormControl>
            <div dir="ltr" className="relative">
              {loading ? (
                <Skeleton className="w-full h-14 rounded-full" />
              ) : (
                <PhoneInput
                  enableSearch
                  country={countries[0]?.shortName}
                  disabled={disabled}
                  placeholder={t(placeholder)}
                  onlyCountries={
                    onlyCountries.length > 0 ? onlyCountries : ["sa"]
                  }
                  buttonClass="hover:bg-[green]"
                  containerStyle={{
                    borderRadius: "12px",
                  }}
                  inputStyle={{
                    width: "100%",
                    borderRadius: "12px",
                    height: "64px",
                    paddingLeft: "60px",
                    borderColor:
                      errors["phone"] || errors["phone_code"] || throwErrorPhone
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
                  value={formatPhoneNumber(phone_code, phone)}
                  onChange={handlePhoneChange}
                />
              )}
              {errors &&
                (errors.phone || errors.phone_code || throwErrorPhone) && (
                  <p
                    role="alert"
                    style={{ color: "#ef233c " }}
                    className="text-error text-sm rtl:text-end"
                  >
                    {throwErrorPhone && t("The phone field must be a number")}
                    {errors.phone && t(errors.phone?.message)}
                    {errors.phone_code && t(errors.phone_code?.message)}
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
