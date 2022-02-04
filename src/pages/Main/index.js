import React from 'react';
import styled from 'styled-components';
import banner from '../../assets/images/web-bannerv2.png';
import mouthLogo from '../../assets/images/logo.png';
import Footer from "./Footer";
import Mint from "../../components/Mint";

const Main = () => {
  return (
    <Container className={'flex flex-col'}>
      <img src={banner} alt={'banner'}/>
      <img className={'self-center -mt-10 md:-mt-20 w-20 h-20 md:w-40 md:h-40 object-contain'} src={mouthLogo} alt={'logo'} style={{width: '10vw'}}/>
      <Mint/>
      <Footer/>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1920px;
`;

export default Main;
