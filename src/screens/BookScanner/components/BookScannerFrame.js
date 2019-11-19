import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, Layout } from 'react-native-ui-kitten';
import { light } from '@eva-design/eva';
import styled from 'styled-components';

import { AnimatedIcon } from '../../../components/AnimatedIcon';

export const BookScannerFrame = ({ enableFlash, toggleFlash }) => (
  <StyledScannerFrameWrapper>
    <StyledScannerFrameLine>
      <StyledTouchableFlashIcon onPress={toggleFlash}>
        <StyledFlashIcon
          isEnabled={enableFlash}
          name={enableFlash ? 'lightbulb' : 'lightbulb-off'}
        />
      </StyledTouchableFlashIcon>
      <StyledAnimatedIcon
        animation="flash"
        easing="ease-in-out-cubic"
        iterationCount="infinite"
        name="barcode-scan"
      />
    </StyledScannerFrameLine>
  </StyledScannerFrameWrapper>
);

const StyledScannerFrameWrapper = styled(Layout)`
  width: 100%;
  height: 100%;
  position: absolute;

  padding: 30px;
  z-index: 1;
  background-color: transparent;
`;

const StyledScannerFrameLine = styled(Layout)`
  flex: 1;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  position: relative;
  border-width: 2;
  border-color: whitesmoke;
  border-radius: 15;
  background-color: transparent;
`;

const StyledTouchableFlashIcon = styled(TouchableOpacity)`
  position: absolute;
  top: 15;
  left: 15;
`;
const StyledFlashIcon = styled(Icon)`
  position: relative;
  color: ${({ isEnabled }) =>
    isEnabled ? light['color-basic-200'] : light['color-basic-600']};
  font-size: 24;
`;

const StyledAnimatedIcon = styled(AnimatedIcon)`
  color: ${light['color-danger-700']};
  position: absolute;
  bottom: 10;
  right: 15;
  font-size: 18;
`;
