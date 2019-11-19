import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { Text, Layout } from 'react-native-ui-kitten';
import Animated from 'react-native-reanimated';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { conditionalExpression } from '@babel/types';

const MIDDLE_SNAP_PERCENT = 30;
const MIDDLE_POSITION_VALUE = 1 - MIDDLE_SNAP_PERCENT / 100;
export const SNAP_POINTS = {
  INDEX: {
    TOP: 0,
    MIDDLE: 1,
    BOTTOM: 2,
    INITIAL: 2,
  },
};

const renderContent = (children, scrollEnabled) => (
  <StyledContentWrapper>
    <StyledContentScrollView scrollEnabled={scrollEnabled}>
      {children}
    </StyledContentScrollView>
  </StyledContentWrapper>
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
  ...props
}) => {
  const { height: windowHeight, width } = Dimensions.get('window');
  const { call, block, Value, cond, lessThan, greaterOrEq } = Animated;
  const callbackNodeValue = new Value(1);

  const bottomSheetRef = useRef(null);
  const [contentGestureEnabled, setContentGestureEnabled] = useState(true);
  const handleSheetPositionChange = debounce(([value]) => {
    if (value < 0.01) {
      onPositionChange(SNAP_POINTS.INDEX.TOP);
    }
    if (value >= 1) {
      onPositionChange(SNAP_POINTS.INDEX.BOTTOM);
    }
    const isMiddlePositionValue =
      parseFloat(value.toFixed(1)) === MIDDLE_POSITION_VALUE;
    if (isMiddlePositionValue) {
      onPositionChange(SNAP_POINTS.INDEX.MIDDLE);
    }
  }, 100);

  useEffect(() => {
    bottomSheetRef.current.snapTo(positionIndex);
  }, [positionIndex]);

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[windowHeight - 80, `${MIDDLE_SNAP_PERCENT}%`, 0]}
        initialSnap={SNAP_POINTS.INDEX.INITIAL}
        callbackNode={callbackNodeValue}
        overdragResistanceFactor={100}
        renderContent={() =>
          renderContent(ContentComponent, !contentGestureEnabled)
        }
        renderHeader={renderHeader}
        enabledContentGestureInteraction={contentGestureEnabled}
        {...props}
      />
      <Animated.Code
        exec={block([
          call([callbackNodeValue], handleSheetPositionChange),
          cond(
            lessThan(callbackNodeValue, 0.01),
            call([callbackNodeValue], () => setContentGestureEnabled(false)),
          ),
          cond(
            greaterOrEq(callbackNodeValue, 0.01),
            call([callbackNodeValue], () => setContentGestureEnabled(true)),
          ),
        ])}
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
`;
const StyledContentScrollView = styled(ScrollView)`
  padding: 15px;
`;
