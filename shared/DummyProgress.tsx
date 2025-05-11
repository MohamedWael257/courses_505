import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Progress } from './ui/progress';
import ImageWithFallback from './ImageWithFallback';

const DummyProgress = () => {
  return (
    <>
      <div className="flex gap-2 items-center">
        <AiFillStar color="#03A853" size={30} />

        <span className="text-[#1F1F1F] ">{5}</span>
        <Progress value={40} bg="03A853" className="w-full !max-h-[8px]" />
      </div>
      <div className="flex gap-2 items-center">
        <AiFillStar color="#98D642" size={30} />

        <span className="text-[#1F1F1F] ">{4}</span>
        <Progress value={30} bg="98D642" className="w-full !max-h-[8px]" />
      </div>
      <div className="flex gap-2 items-center">
        <AiFillStar color="#F3C221" size={30} />

        <span className="text-[#1F1F1F] ">{3}</span>
        <Progress value={20} bg="F3C221" className="w-full !max-h-[8px]" />
      </div>
      <div className="flex gap-2 items-center">
        <AiFillStar color="#DC8151" size={30} />

        <span className="text-[#1F1F1F] ">{2}</span>
        <Progress value={10} bg="DC8151" className="w-full !max-h-[8px]" />
      </div>
      <div className="flex gap-2 items-center">
        <AiFillStar color="#C54B4B" size={30} />

        <span className="text-[#1F1F1F] ">{1}</span>
        <Progress value={5} bg="C54B4B" className="w-full !max-h-[8px]" />
      </div>
    </>
  );
};

export default DummyProgress;
