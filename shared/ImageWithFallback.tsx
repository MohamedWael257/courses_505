/* eslint-disable jsx-a11y/alt-text */
"use client";

import React, { useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";
import fallbackSrc from "@/public/logo.png";
interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string;
}

const ImageWithFallback = (props: ImageWithFallbackProps) => {
  const { src, className, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);
  const [isFallback, setIsFallback] = useState(false);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);
  return (
    <Image
      {...rest}
      src={imgSrc}
      className={`${className || ""} ${isFallback ? "!object-contain" : ""}`}
      onError={() => {
        setImgSrc(fallbackSrc);
        setIsFallback(true);
      }}
    />
  );
};

export default ImageWithFallback;
