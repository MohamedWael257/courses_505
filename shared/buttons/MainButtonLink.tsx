import MainArrow from '@/assets/icons/Arrow';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface MainButtonLinkProps {
  title: string;
  path?: any;
  className?: any;
}

const MainButtonLink: React.FC<MainButtonLinkProps> = ({
  title,
  path,
  className,
}) => {
  return (
    <Link
      href={path ? path : '#'}
      className={`bg-secondary main-effect-button flex w-max px-[18px] items-center gap-4 xl:gap-8 h-[48px] hover:opacity-[0.9] ${className}`}
    >
      <span className="text-primary">{title}</span>
      <MainArrow />
    </Link>
  );
};

export default MainButtonLink;
