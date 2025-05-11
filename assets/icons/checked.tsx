import * as React from 'react';
const CheckedIcon = (props: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    {...props}
  >
    <circle cx={8} cy={8} r={8} fill='#1D4787' />
    <g clipPath='url(#a)'>
      <path
        fill='#fff'
        fillRule='evenodd'
        d='M11.992 5.602v.28a.847.847 0 0 1-.18.329 943.875 943.875 0 0 1-4.57 4.555.665.665 0 0 1-.781-.032L4.125 8.398a.796.796 0 0 1-.133-.265v-.281c.147-.407.434-.561.86-.461l.156.078c.617.62 1.237 1.237 1.86 1.851C8.24 7.95 9.614 6.583 10.991 5.22c.345-.186.644-.132.899.164.039.072.072.145.101.219Z'
        clipRule='evenodd'
        opacity={0.983}
      />
    </g>
    <defs>
      <clipPath id='a'>
        <path fill='#fff' d='M4 4h8v8H4z' />
      </clipPath>
    </defs>
  </svg>
);
export default CheckedIcon;
