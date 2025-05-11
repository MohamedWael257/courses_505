import * as React from 'react';
const CartNavbarIcon = (props: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={21}
    fill='none'
    {...props}
  >
    <g clipPath='url(#a)'>
      <path
        fill='#1F2B7B'
        d='M19.091 15.5h-8.994c-1.297 0-2.447-.851-2.798-2.07L4.259 3.129c-.108-.373-.467-.629-.877-.629H1a1 1 0 0 1 0-2h2.382c1.297 0 2.446.851 2.797 2.07l.569 1.93h15.295c.624 0 1.216.297 1.583.795a1.889 1.889 0 0 1 .288 1.696l-2.063 6.548a2.902 2.902 0 0 1-2.76 1.961ZM11 20.5c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2Zm7 0c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2Z'
      />
    </g>
    <defs>
      <clipPath id='a'>
        <path fill='#fff' d='M0 .5h24v20H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default CartNavbarIcon;
