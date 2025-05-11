import React, { ReactNode } from 'react';
import styles from './custom-btn.module.css';
import Link from 'next/link';
import { Loader } from 'lucide-react';
import LocalePath from '../LocalePath';

interface CustomBtnProps {
  type?: 'primary' | 'secondary';
  title: string;
  className?: ReactNode;
  button?: boolean;
  onClick?: () => void;
  path?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  buttonType?: 'button' | 'submit';
  disabled?: boolean;
  loader?: boolean;
}

const CustomBtn: React.FC<CustomBtnProps> = ({
  type = 'secondary',
  title,
  className,
  button = false,
  onClick,
  path = '#',
  leftIcon,
  rightIcon,
  buttonType,
  disabled,
  loader,
}) => {
  const classNames = `${disabled && 'hover:cursor-not-allowed'} ${
    styles['custom-btn']
  } ${type === 'primary' ? styles['border-btn'] : styles['primary-btn']} ${
    styles['button-rounded-custom']
  } ${className}`;

  return (
    <>
      {button ? (
        <button
          disabled={disabled}
          className={classNames}
          onClick={onClick}
          type={buttonType}
        >
          {rightIcon}{' '}
          <span
            className={`${
              (rightIcon && `ps-1 ${styles['right-move']}`) ||
              (leftIcon && `pe-1 ${styles['left-move']}`)
            } `}
          >
            {loader ? (
              <Loader className="text-secondrydark w-8 h-4 animate-spin" />
            ) : (
              title
            )}
          </span>{' '}
          {leftIcon}
        </button>
      ) : (
        <LocalePath href={path} className={classNames}>
          {rightIcon}
          <span className={`${(rightIcon && 'ps-1') || (leftIcon && 'pe-1')}`}>
            {loader ? (
              <Loader className="text-secondrydark w-8 h-4 animate-spin" />
            ) : (
              title
            )}
          </span>
          {leftIcon}
        </LocalePath>
      )}
    </>
  );
};

export default CustomBtn;
