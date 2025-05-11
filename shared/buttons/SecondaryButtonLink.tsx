import MainArrow from '@/assets/icons/Arrow';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface SecondaryButtonLinkProps {
  title: string;
  path?: any;
  className?: any;
  removeOverFlow?: () => void;
}

const SecondaryButtonLink: React.FC<SecondaryButtonLinkProps> = ({
  title,
  path,
  className,
  removeOverFlow,
}) => {
  return (
    <Link
      onClick={removeOverFlow}
      href={path ? path : '#'}
      className={`bg-[#2D2D2D] ${className} main-effect-button secondary-button-style flex w-max px-[18px] items-center gap-4 xl:gap-8 h-[48px] hover:opacity-[0.9]`}
    >
      <span className="text-[#fff]">{title}</span>
      <MainArrow />
    </Link>
  );
};

export default SecondaryButtonLink;
