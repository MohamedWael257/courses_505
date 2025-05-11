import * as React from "react";

interface PlusSignProps {
  disabled?: boolean;
}

const PlusSign: React.FC<PlusSignProps> = ({ disabled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={15} height={14} fill="none">
    <path
      fill={!disabled ? "#4F008C" : "#A2A3A3"}
      d="M13.5 7.75h-12c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h12c.41 0 .75.34.75.75s-.34.75-.75.75Z"
    />
    <path
      fill={!disabled ? "#4F008C" : "#A2A3A3"}
      d="M7.5 13.75c-.41 0-.75-.34-.75-.75V1c0-.41.34-.75.75-.75s.75.34.75.75v12c0 .41-.34.75-.75.75Z"
    />
  </svg>
);
export default PlusSign;
