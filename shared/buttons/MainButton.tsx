import MainArrow from '@/assets/icons/Arrow';
import Image from 'next/image';
import React from 'react';
import { useTranslations } from 'next-intl';
import Loader from '../Loader/Loader';

interface MainButtonProps {
  title: string;
  type?: any;
  className?: any;
  loading?: boolean;
  action?: () => void;
}

const MainButton: React.FC<MainButtonProps> = ({
  title,
  type,
  className,
  loading,
  action,
}) => {
  const t = useTranslations('Index');
  return (
    <button
      type={type ? type : 'button'}
      className={`bg-secondary main-effect-button flex w-max px-[18px] items-center gap-4 xl:gap-8 h-[48px] hover:opacity-[0.9] ${className}`}
      onClick={action}
    >
      <span className="text-[#fff]">{t(title)}</span>

      {loading ? <Loader /> : <MainArrow />}
    </button>
  );
};

export default MainButton;
