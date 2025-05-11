import * as React from 'react';

interface StarRateMedicalProps {
  fill?: boolean;
  otherProps?: any;
}
const StarRateSmall: React.FC<StarRateMedicalProps> = ({
  fill,
  otherProps,
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={20}
    fill='none'
    className='w-[20px] min-w-[20px]'
    {...otherProps}
  >
    <path
      fill={fill ? '#FEBA44' : '#F3F6FC'}
      d='m12.033 3.78.55 1.667a1.875 1.875 0 0 0 1.775 1.3h1.734a1.867 1.867 0 0 1 1.1 3.384l-1.425 1.033a1.875 1.875 0 0 0-.684 2.092l.55 1.666a1.867 1.867 0 0 1-2.875 2.117l-1.4-1.042a1.875 1.875 0 0 0-2.2 0l-1.4 1.042a1.867 1.867 0 0 1-2.875-2.092l.55-1.666a1.875 1.875 0 0 0-.683-2.092l-1.458-1.05a1.867 1.867 0 0 1 1.133-3.392h1.733a1.875 1.875 0 0 0 1.775-1.283l.55-1.667a1.867 1.867 0 0 1 3.55-.016Z'
    />
  </svg>
);
export default StarRateSmall;
