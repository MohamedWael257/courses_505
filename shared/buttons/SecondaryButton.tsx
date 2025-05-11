import MainArrow from '@/assets/icons/Arrow';
import Image from 'next/image';
import React from 'react';
import { useTranslations } from 'next-intl';
import Loader from '../Loader/Loader';

interface SecondaryButtonProps {
  title: string;
  type?: any;
  className?: any;
  loading?: boolean;
  disabled?: boolean;
  action?: () => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  title,
  type,
  className,
  loading,
  disabled,
  action,
}) => {
  const t = useTranslations('LABELS');
  return (
    <button
      type={type ? type : 'button'}
      className={`bg-[#2D2D2D] ${className} main-effect-button secondary-button-style flex w-max px-[18px] items-center gap-4 xl:gap-8 h-[48px] hover:opacity-[0.9]`}
      disabled={disabled}
      onClick={action}
    >
      <span className="text-[#fff]">{title}</span>

      {loading ? <Loader /> : <MainArrow />}
    </button>
  );
};

export default SecondaryButton;
