import React from "react";
import Frame from "@/assets/images/frame.png";
import Group from "@/assets/images/group.png";
import ImageWithFallback from "@/shared/ImageWithFallback";
import LocalePath from "@/shared/LocalePath";

type Props = {};

export default function JoinUS({}: Props) {
  return (
    <div
      //   style={{ backgroundImage: "url(../../../../assets/images/frame.png)" }}
      className="container  bg-primary relative gap-3 flex justify-start  p-8 px-24 rounded-3xl h-[373px] my-6 overflow-hidden"
    >
      <div className="flex flex-col gap-4 w-1/2">
        <h2
          data-aos="fade-up"
          data-aos-duration="100"
          className="font-medium text-4xl !leading-[72px] text-start text-white"
        >
          انضم إلى نخبة المدرّبين وشارك خبراتك مع الآلاف
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="200"
          className="font-normal text-base leading-8 text-start text-white"
        >
          سواء كنت محترفًا أكاديميًا أو صاحب خبرة عملية، منصتنا تمنحك الأدوات
          لتقديم دوراتك بكل سهولة واحترافية. أنشئ محتوى تدريبي، تفاعل مع الطلاب،
          وتابع آدائهم
        </p>
        <LocalePath
          data-aos="fade-up"
          data-aos-duration="300"
          href="/joinus"
          className="font-normal text-sm leading-6 text-center text-white bg-error/90 rounded-full px-5 p-3 w-fit"
        >
          إنضم إلينا كمدرب
        </LocalePath>
      </div>
      <ImageWithFallback
        src={Frame}
        alt="image"
        width={500}
        height={500}
        className="w-[50%] h-[373px] object-contain absolute top-0 left-[-75px]  z-20"
      />
    </div>
  );
}
