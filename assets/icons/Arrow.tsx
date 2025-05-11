import * as React from 'react';
const MainArrow = (props: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={13}
    height={12}
    fill='none'
    {...props}
  >
    <g fill='#2D2D2D' clipPath='url(#a)'>
      <path d='M10.515 1.125h-9a.375.375 0 0 0 0 .75h8.094l-8.36 8.36a.374.374 0 1 0 .53.53l8.36-8.36V10.5a.375.375 0 0 0 .75 0v-9a.375.375 0 0 0-.374-.375Z' />
      <path
        fillRule='evenodd'
        d='M1.515.925h9a.575.575 0 0 1 .575.575v9a.575.575 0 0 1-1.15 0V2.888l-8.018 8.017a.575.575 0 1 1-.813-.813l8.017-8.017H1.515a.575.575 0 1 1 0-1.15Zm0 .95a.375.375 0 0 1 0-.75h9a.375.375 0 0 1 .375.375v9a.375.375 0 0 1-.75 0V2.405l-8.36 8.36a.376.376 0 0 1-.617-.118.375.375 0 0 1 .087-.412l8.36-8.36H1.514Z'
        clipRule='evenodd'
      />
    </g>
    <defs>
      <clipPath id='a'>
        <path fill='#fff' d='M.015 0h12v12h-12z' />
      </clipPath>
    </defs>
  </svg>
);
export default MainArrow;
