"use client";
// @ts-ignore

import FormInput, { FormInputProps } from "@/shared/form-controls/FormInput";
import { Eye, EyeOff, Key } from "lucide-react";
import { useState } from "react";
import { UnlockIcon } from "../Icons";

interface PasswordControllerProps extends FormInputProps {}

const PasswordController: React.FC<PasswordControllerProps> = ({
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    // @ts-ignore
    <FormInput
      disabled={props?.disabled}
      rightIcon={
        <button
          type="button"
          className="!pe-5"
          onClick={() => setShowPassword((state) => !state)}
        >
          {showPassword ? <Eye color="#2D2D2D" /> : <UnlockIcon />}
        </button>
      }
      // leftIcon={<Key color='#BCBCBC' />}
      type={showPassword ? "text" : "password"}
      {...props}
    />
  );
};

export default PasswordController;
