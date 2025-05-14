/* eslint-disable react-hooks/exhaustive-deps */
import HeaderIndex from "@/shared/header/HeaderIndex";
export interface SessionType {
  id: string;
  full_name: string;
  image: string;
  email: string;
  nationality: any;
  country: any;
  phone_code: string;
  phone: string;
  gender: string;
  birthday: string;
  phone_complete_form: string;
  unread_notifications: number;
  is_ban: boolean;
  is_verify: boolean;
  is_admin_active_user: boolean;
  wallet_balance: number;
  points: number;
  token: string;
  used_point: string;
}
export type AuthStage =
  | ""
  | "phoneVerify"
  | "emailVerify"
  | "TypeVerifyCode"
  | "TypeVerifyCodeRegister"
  | "verify"
  | "change-password"
  | "welcome"
  | "locationData"
  | "location"
  | "location"
  | "cancelorder"
  | "returnorder"
  | "cancelproduct"
  | "productrate"
  | "providerrate"
  | "shippingrate"
  | "Questionier";
export default async function Header({  settings }: any) {
  return (
    <>
      {/* { settings && ( */}
      <HeaderIndex  settings={settings} />
      {/* )} */}
    </>
  );
}
