import React from 'react';

const ConnectButton = ({onPress}) => {
  return (
    <Container onclick={onPress} className='rounded-full'>
      Connect wallet
    </Container>
  );
};

const Container = styled(Text)`
  width: 312px;
  height: 75px;
  background-color: #2B62A0;
`;

export default ConnectButton;
