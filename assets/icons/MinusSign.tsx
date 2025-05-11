import * as React from "react";

interface MinusSignProps {
  disabled?: boolean;
}

const MinusSign: React.FC<MinusSignProps> = ({ disabled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} fill="none">
    <path
      fill={!disabled ? "#4F008C" : "#A2A3A3"}
      d="M18.5 12.75h-12c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h12c.41 0 .75.34.75.75s-.34.75-.75.75Z"
    />
  </svg>
);
export default MinusSign;
