import React from 'react';
import styled from 'styled-components';

import WhiteText from "./WhiteText";
import {Colors} from '../styles'

const RoundButton = styled(WhiteText)`
  cursor: pointer;
  height: 75px;
  min-width: 75px;
  background-color: ${Colors.primary};
  border-radius: 9999px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;


export default RoundButton;
