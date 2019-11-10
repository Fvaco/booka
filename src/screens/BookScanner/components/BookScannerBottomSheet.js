import React, { useEffect, useRef } from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import { Text, Layout } from 'react-native-ui-kitten';
import Animated from 'react-native-reanimated';
import styled from 'styled-components';
import { debounce } from 'lodash';

const MIDDLE_SNAP_PERCENT = 30;
export const SNAP_POINTS = {
  INDEX: {
    TOP: 0,
    MIDDLE: 1,
    BOTTOM: 2,
    INITIAL: 2,
  },
};

const renderContent = children => (
  <StyledContentWrapper>{children}</StyledContentWrapper>
);

const renderHeader = () => (
  <StyledHeaderWrapper>
    <StyledHeaderDragger />
  </StyledHeaderWrapper>
);

export const BookScannerBottomSheet = ({
  ContentComponent,
  positionIndex,
  onPositionChange,
}) => {
  const { call, block, Value } = Animated;
  const callbackNodeValue = new Value(1);

  const bottomSheetRef = useRef(null);
  const handleHeaderPositionChange = debounce(([value]) => {
    if (value < 0.01) return onPositionChange(SNAP_POINTS.INDEX.TOP);
    if (value >= 1) return onPositionChange(SNAP_POINTS.INDEX.BOTTOM);
    const isMiddlePositionValue =
      parseFloat(value.toFixed(1)) === 1 - MIDDLE_SNAP_PERCENT / 100;
    if (isMiddlePositionValue)
      return onPositionChange(SNAP_POINTS.INDEX.MIDDLE);
  }, 150);
  useEffect(() => {
    bottomSheetRef.current.snapTo(positionIndex);
  }, [positionIndex]);
  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['100%', `${MIDDLE_SNAP_PERCENT}%`, 0]}
        initialSnap={SNAP_POINTS.INDEX.INITIAL}
        callbackNode={callbackNodeValue}
        renderContent={() => renderContent(ContentComponent)}
        renderHeader={renderHeader}
      />
      <Animated.Code
        exec={block([call([callbackNodeValue], handleHeaderPositionChange)])}
      />
    </>
  );
};

const StyledHeaderWrapper = styled(Layout)`
  background-color: white;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-top-end-radius: 20;
  border-top-start-radius: 20;
`;
const StyledHeaderDragger = styled(Layout)`
  border-radius: 10;
  height: 10;
  width: 50;
  background-color: lightgray;
`;
const StyledContentWrapper = styled(Layout)`
  background-color: white;
  height: 100%;
  padding: 15px;
`;
