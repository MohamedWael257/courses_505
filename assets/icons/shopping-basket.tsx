import * as React from 'react';
const ShoppingBasket = (props: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    {...props}
  >
    <path
      fill='#fff'
      fillRule='evenodd'
      d='M3.47 4.25h1l.05.01a3.2 3.2 0 0 1 3 2.27l.2.69h10.43a3.2 3.2 0 0 1 2.4 1.1c.603.7.87 1.627.73 2.54l-.6 4.14a3.2 3.2 0 0 1-3.14 2.8h-5.88a3.2 3.2 0 0 1-3.05-2.27L6.08 7a1.68 1.68 0 0 0-1.61-1.25h-1a.75.75 0 0 1 0-1.5Zm6.58 10.8a1.68 1.68 0 0 0 1.61 1.2h5.88a1.7 1.7 0 0 0 1.66-1.43l.6-4.15a1.68 1.68 0 0 0-1.63-1.96h-10l1.88 6.34Z'
      clipRule='evenodd'
    />
    <path
      fill='#fff'
      d='M11.43 19a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM17.43 19a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z'
    />
  </svg>
);
export default ShoppingBasket;
