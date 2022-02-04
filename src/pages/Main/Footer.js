import React from 'react';
import mayc from '../../assets/images/MAYC.png';

const Footer = () => {
  return (
    <div className={'flex flex-col md:flex-row justify-center items-center md:items-start bg-primary py-8 px-4 mt-10'}>
      <img alt='MAYC' className={'mr-0 md:mr-10 w-40 md:w-auto'} src={mayc}/>
      <div className={'flex flex-col'}>
        <div className={'text-center md:text-left mt-6 md:mt-0 text-xl md:text-3xl font-bold'}>MAYC Giveaway</div>
        <div className={'text-center md:text-left text-xl md:text-3xl max-w-2xl'}>If all 8008 Mouth Breathers are minted we will snapshot wallet addresses on January 1, 2022 and randomly select a hodler to win MAYC #5956.</div>
      </div>
    </div>
  )
};

export default Footer;
