import ImageWithFallback from "@/shared/ImageWithFallback";
import React from "react";

type Props = {
  data: any;
};

export default function ChooseUS({ data }: Props) {
  return (
    <div className="container lg:py-16">
      <h2
        data-aos="zoom-in"
        data-aos-duration="100"
        className="font-medium text-xl leading-7 text-center text-error bg-error/[0.15] px-5 p-3 rounded-2xl w-fit mx-auto"
      >
        لماذا تختارنا؟
      </h2>
      <p
        data-aos="zoom-in"
        data-aos-duration="200"
        className="lg:text-4xl md:text-2xl text-lg font-medium leading-8 text-darkprimary text-center my-5"
      >
        نقدم تجربة تعلم فريدة
      </p>
      <div className="grid lg:grid-cols-2 gap-5">
        <div
          data-aos="flip-left"
          className="grid grid-cols-[auto_1fr] gap-4 bg-[#B8F0F3] p-6 pt-10 rounded-2xl h-52"
        >
          <svg
            width="88"
            height="88"
            viewBox="0 0 88 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M44.0001 87.5599C37.1637 87.5599 31.5412 82.363 30.8677 75.7043C25.683 79.9364 18.0325 79.6355 13.1985 74.8015C8.36449 69.9675 8.06355 62.317 12.2957 57.1323C5.63699 56.4588 0.440063 50.8363 0.440063 43.9999C0.440064 37.1636 5.637 31.5411 12.2957 30.8676C8.06356 25.6829 8.3645 18.0324 13.1985 13.1984C18.0325 8.36436 25.683 8.06342 30.8677 12.2956C31.5412 5.63686 37.1637 0.439942 44.0001 0.439941C50.8364 0.439941 56.4589 5.63686 57.1324 12.2956C62.3171 8.06342 69.9676 8.36435 74.8016 13.1984C79.6357 18.0324 79.9366 25.6829 75.7044 30.8676C82.3631 31.5411 87.5601 37.1636 87.5601 43.9999C87.5601 50.8363 82.3631 56.4588 75.7044 57.1323C79.9366 62.317 79.6357 69.9675 74.8016 74.8015C69.9676 79.6355 62.3171 79.9364 57.1324 75.7043C56.4589 82.363 50.8364 87.5599 44.0001 87.5599Z"
              fill="#66DEE5"
            />
          </svg>
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl leading-7 font-medium text-start">
              منصة متكاملة لكل احتياجاتك التعليمية
            </h2>
            <p className="text-base font-normal leading-9 text-start">
              في مكان واحد، نوفر لك الدورات المباشرة والمسجلة، مع مكتبة شاملة من
              الكتب الإلكترونية والقوالب الجاهزة لدعم رحلتك نحو التميز.
            </p>
          </div>
        </div>
        <div
          data-aos="flip-right"
          className="grid grid-cols-[auto_1fr] gap-4 bg-[#FFD1C2] p-6 pt-10 rounded-2xl h-52"
        >
          <svg
            width="88"
            height="88"
            viewBox="0 0 88 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M71.8005 44C81.6872 39.4548 88 32.536 88 24.7867C88 11.0974 68.3005 0 44 0C19.6995 0 0 11.0974 0 24.7867C0 32.536 6.31283 39.4548 16.1995 44C6.31283 48.5452 0 55.464 0 63.2133C0 76.9026 19.6995 88 44 88C68.3005 88 88 76.9026 88 63.2133C88 55.464 81.6872 48.5452 71.8005 44Z"
              fill="#F4ADB3"
            />
          </svg>

          <div className="flex flex-col gap-6">
            <h2 className="text-2xl leading-7 font-medium text-start">
              منصة متكاملة لكل احتياجاتك التعليمية
            </h2>
            <p className="text-base font-normal leading-9 text-start">
              في مكان واحد، نوفر لك الدورات المباشرة والمسجلة، مع مكتبة شاملة من
              الكتب الإلكترونية والقوالب الجاهزة لدعم رحلتك نحو التميز.
            </p>
          </div>
        </div>
        <div
          data-aos="flip-left"
          className="grid grid-cols-[auto_1fr] gap-4 bg-[#4F008C] p-6 pt-10 rounded-2xl h-52 text-white"
        >
          <svg
            width="88"
            height="88"
            viewBox="0 0 88 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M88 0C39.3989 0 0 39.3989 0 88H88V0Z" fill="#7233A3" />
          </svg>

          <div className="flex flex-col gap-6">
            <h2 className="text-2xl leading-7 font-medium text-start">
              منصة متكاملة لكل احتياجاتك التعليمية
            </h2>
            <p className="text-base font-normal leading-9 text-start">
              في مكان واحد، نوفر لك الدورات المباشرة والمسجلة، مع مكتبة شاملة من
              الكتب الإلكترونية والقوالب الجاهزة لدعم رحلتك نحو التميز.
            </p>
          </div>
        </div>
        <div
          data-aos="flip-right"
          className="grid grid-cols-[auto_1fr] gap-4 bg-[#FFE87F] p-6 pt-10 rounded-2xl h-52"
        >
          <svg
            width="87"
            height="87"
            viewBox="0 0 87 87"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M44.9533 86.9613C68.2531 86.416 86.9733 67.3575 86.9733 43.9267C86.9733 20.1527 67.7007 0.880005 43.9267 0.880005C20.4958 0.880005 1.43734 19.6003 0.892008 42.9L0.880005 86.9733L44.9533 86.9613Z"
              fill="#EFD14B"
            />
          </svg>

          <div className="flex flex-col gap-6">
            <h2 className="text-2xl leading-7 font-medium text-start">
              منصة متكاملة لكل احتياجاتك التعليمية
            </h2>
            <p className="text-base font-normal leading-9 text-start">
              في مكان واحد، نوفر لك الدورات المباشرة والمسجلة، مع مكتبة شاملة من
              الكتب الإلكترونية والقوالب الجاهزة لدعم رحلتك نحو التميز.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
