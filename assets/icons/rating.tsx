import * as React from 'react';

interface StarRateIconProps {
  fill?: boolean;
  onClick?: () => void; // إضافة خاصية onClick
  onMouseEnter?: () => void; // إضافة خاصية onMouseEnter
  onMouseLeave?: () => void; // إضافة خاصية onMouseLeave
  otherProps?: any;
}

const RateIcon: React.FC<StarRateIconProps> = ({
  fill,
  onClick,
  onMouseEnter,
  onMouseLeave,
  otherProps,
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={40}
      height={40}
      fill='none'
      onClick={onClick} // استخدام الخاصية onClick
      onMouseEnter={onMouseEnter} // استخدام الخاصية onMouseEnter
      onMouseLeave={onMouseLeave} // استخدام الخاصية onMouseLeave
      {...otherProps}
      className='scale-[0.9]'
    >
      <path
        fill={fill ? '#FEBA44' : ''}
        stroke='#FEBA44'
        d='m24.067 7.561 1.1 3.334a3.75 3.75 0 0 0 3.55 2.6h3.466a3.733 3.733 0 0 1 2.2 6.766l-2.85 2.067a3.75 3.75 0 0 0-1.367 4.183l1.1 3.334a3.733 3.733 0 0 1-5.75 4.233l-2.8-2.083a3.75 3.75 0 0 0-4.4 0l-2.8 2.083a3.733 3.733 0 0 1-5.75-4.183l1.1-3.334A3.75 3.75 0 0 0 9.5 22.378l-2.917-2.1a3.733 3.733 0 0 1 2.267-6.783h3.466a3.75 3.75 0 0 0 3.55-2.567l1.1-3.333a3.733 3.733 0 0 1 7.1-.034Z'
      />
    </svg>
  );
};

export default RateIcon;
