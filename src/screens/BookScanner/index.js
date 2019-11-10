import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { Layout } from 'react-native-ui-kitten';
import { RNCamera } from 'react-native-camera';
import Permissions, { PERMISSIONS } from 'react-native-permissions';
import styled from 'styled-components';

import { BookScannerFrame } from './components/BookScannerFrame';
import {
  BookScannerBottomSheet,
  SNAP_POINTS,
} from './components/BookScannerBottomSheet';

import { BookInfo } from '../../components/BookInfo';

export const ROUTER_KEY_BOOK_SCANNER = 'BookScanner';

export const BookScanner = () => {
  const [flash, setFlash] = useState(false);
  const [bookISBN, setBookISBN] = useState('');
  const [permission, setPermission] = useState('undetermined');
  const [barcodeRead, setBarcodeRead] = useState(true);
  const [bottomSheetPosition, setBottomSheetPosition] = useState(
    SNAP_POINTS.INDEX.BOTTOM,
  );
  const cameraRef = useRef(null);
  useEffect(() => {
    Permissions.check(PERMISSIONS.ANDROID.CAMERA).then(response => {
      setPermission(response);
    });
  }, []);
  useEffect(() => {
    if (bottomSheetPosition === SNAP_POINTS.INDEX.TOP)
      return setBarcodeRead(false);
    setBarcodeRead(true);
  }, [bottomSheetPosition]);

  const toggleFlash = () => {
    setFlash(!flash);
  };

  const handleBarcodeScan = ({ data }) => {
    if (!barcodeRead) return;
    if (data !== bookISBN) {
      setBookISBN(data);
      setBottomSheetPosition(SNAP_POINTS.INDEX.MIDDLE);
    }
  };
  return (
    <StyledBookScannerWrapper>
      <BookScannerFrame enableFlash={flash} toggleFlash={toggleFlash} />
      <BookScannerBottomSheet
        positionIndex={bottomSheetPosition}
        onPositionChange={newPositionIndex => {
          if (newPositionIndex !== bottomSheetPosition)
            setBottomSheetPosition(newPositionIndex);
        }}
        ContentComponent={<BookInfo book={{ isbn: bookISBN }} />}
      />
      <StyledRNCamera
        ref={cameraRef}
        type="back"
        autoFocus="on"
        flashMode={flash ? 'torch' : 'off'}
        onBarCodeRead={handleBarcodeScan}
      />
    </StyledBookScannerWrapper>
  );
};

const StyledRNCamera = styled(RNCamera)`
  flex: 1;
`;
const StyledBookScannerWrapper = styled(Layout)`
  flex: 1;
`;
