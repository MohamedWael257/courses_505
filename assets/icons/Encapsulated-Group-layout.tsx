import * as React from 'react';
const EncapsulatedGroupLayout = (props: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={32}
    height={32}
    fill='none'
    {...props}
  >
    <g
      stroke='#CBD1DB'
      strokeMiterlimit={10}
      strokeWidth={1.5}
      clipPath='url(#a)'
    >
      <path
        strokeLinecap='round'
        d='M15.863 8.588v4.44m.027-10.36a8.877 8.877 0 0 0-8.88 8.88v2.8c0 .907-.374 2.267-.84 3.04l-1.694 2.827c-1.04 1.746-.32 3.693 1.6 4.333a31.121 31.121 0 0 0 19.64 0 2.96 2.96 0 0 0 1.6-4.333l-1.693-2.827c-.466-.773-.84-2.147-.84-3.04v-2.8c-.013-4.88-4.013-8.88-8.893-8.88Z'
      />
      <path d='M20.304 25.094c0 2.44-2 4.44-4.44 4.44a4.448 4.448 0 0 1-3.134-1.307c-.8-.8-1.306-1.92-1.306-3.133' />
    </g>
    <defs>
      <clipPath id='a'>
        <path fill='#fff' d='M0 0h32v32H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default EncapsulatedGroupLayout;
