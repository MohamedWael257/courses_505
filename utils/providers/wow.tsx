"use client";
import React, { useEffect } from "react";

import "aos/dist/aos.css"; // Import the AOS CSS

export default function WowProvider() {
  useEffect(() => {
    const AOS = require("aos");

    AOS.init({
      duration: 500, // Animation duration in milliseconds
      offset: 0, // Offset for triggering the animation
      once: true, // Animation happens only once
      easing: "ease-in-out", // Easing function for animation
    });
  }, []);

  return <></>;
}
