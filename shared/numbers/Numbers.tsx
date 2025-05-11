"use client";
import { useEffect, useState, useRef } from "react";
import Counter from "./Counter";
type Props = {
  statistics: any;
};

export default function Numbers({ statistics }: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [startCounting, setStartCounting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.offsetTop;
        if (window.scrollY >= sectionTop - 400) {
          setStartCounting(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-primary  min-h-[200px] max-h-[560px] text-white lg:p-8 p-4 grid lg:grid-cols-4 md:grid-cols-2 items-center gap-8 justify-center "
    >
      {/* <div className=" grid justify-center">
        <h2 className="text-5xl font-bold   leading-10 text-center text-white mb-4">
          29
        </h2>
        <p className="text-2xl   leading-9 text-center font-medium text-border">
          أفرع في السعودية
        </p>
      </div>
      <div className=" grid justify-center">
        <h2 className="text-5xl font-bold   leading-10 text-center text-white mb-4">
          209
        </h2>
        <p className="text-2xl   leading-9 text-center font-medium text-border">
          أفرع في السعودية
        </p>
      </div>
      <div className=" grid justify-center">
        <h2 className="text-5xl font-bold   leading-10 text-center text-white mb-4">
          89
        </h2>
        <p className="text-2xl   leading-9 text-center font-medium text-border">
          أفرع في السعودية
        </p>
      </div>
      <div className=" grid justify-center">
        <h2 className="text-5xl font-bold   leading-10 text-center text-white mb-4">
          405
        </h2>
        <p className="text-2xl   leading-9 text-center font-medium text-border">
          أفرع في السعودية
        </p>
      </div> */}
      {startCounting && (
        <>
          {statistics?.map((ele: any) => {
            return <Counter key={ele?.id} goal={ele?.value} text={ele?.key} />;
          })}
        </>
      )}
    </div>
  );
}
