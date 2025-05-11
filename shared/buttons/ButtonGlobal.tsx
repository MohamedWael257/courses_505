import MainArrow from "@/assets/icons/Arrow";
import { icon } from "leaflet";
import Image from "next/image";
import React from "react";

interface ButtonGlobalProps {
  title: string;
  type?: any;
  icon?: any;
  className?: string;
}

const ButtonGlobal: React.FC<ButtonGlobalProps> = ({
  title,
  type,
  className,
  icon,
}) => {
  return (
    <button
      // type={type ? type : 'button'}
      className={`bg-primary text-base font-medium   leading-8 text-center px-6 py-2 rounded-xl ${className}`}
    >
      {title}
      {icon && icon}
    </button>
  );
};

export default ButtonGlobal;
