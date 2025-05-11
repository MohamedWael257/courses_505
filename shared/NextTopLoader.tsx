import NextTopLoader from "nextjs-toploader";
import React from "react";

export default function NextTopLoad() {
  return (
    <NextTopLoader
      color="#4F008C"
      initialPosition={0.08}
      crawlSpeed={200}
      height={4}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
      shadow="0 0 10px #4F008C,0 0 5px #4F008C"
    />
  );
}
