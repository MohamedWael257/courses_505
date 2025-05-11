import * as React from 'react';
const HeartIcon = ({ startScrolling, otherprops }: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={32}
    height={32}
    fill='none'
    {...otherprops}
  >
    <path
      stroke={`${startScrolling ? '#000' : '#F8F8F7'}`}
      d='m16.017 6.643.333.298.334-.298a7.311 7.311 0 0 1 10.046.278 7.313 7.313 0 0 1 .297 10.03l-10.68 10.694L5.67 16.95A7.314 7.314 0 0 1 16.017 6.643Z'
    />
  </svg>
);
export default HeartIcon;
