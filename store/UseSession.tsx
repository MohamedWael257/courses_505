'use client'
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";

export default function UseSession() {
  const { session } = useSelector((state: RootState) => state.AuthConfig);
  return session && session.is_verify == true ? session : null;
}
