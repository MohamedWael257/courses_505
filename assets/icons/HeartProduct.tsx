import * as React from 'react';
const HeartProductIcon = ({ filled }: any) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={19} height={19} fill='none'>
    <path
      fill={filled ? '#D20300' : '#FCFCFB'}
      stroke='#D20300'
      d='m9.193 2.596.343.324.343-.324a4.917 4.917 0 0 1 3.518-1.36A4.948 4.948 0 0 1 16.84 2.8a5.532 5.532 0 0 1 1.496 3.657 5.567 5.567 0 0 1-1.286 3.733l-7.516 7.926L2.02 10.19A5.567 5.567 0 0 1 .733 6.455a5.532 5.532 0 0 1 1.498-3.66 4.95 4.95 0 0 1 3.444-1.56 4.919 4.919 0 0 1 3.518 1.361Z'
    />
  </svg>
);
export default HeartProductIcon;
