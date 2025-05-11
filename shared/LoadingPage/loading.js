import Image from "next/image";
import React from "react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="screen_loader h-screen w-screen flex justify-center items-center inset-0 bg-[#fafafa] dark:bg-[#060818]  animate__animated">
      <div className="relative">
        <svg
          width="100"
          height="100"
          viewBox="0 0 135 135"
          xmlns="http://www.w3.org/2000/svg"
          fill="#2D2D2D"
        >
          <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 67 67"
              to="360 67 67"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
        <Image
          src="/assets/images/logo.png"
          width={54}
          height={40}
          alt="full logo"
          className="absolute  left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ top: "56%" }}
        />
      </div>
    </div>
  );
}
