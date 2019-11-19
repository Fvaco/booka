import React, { useState, useRef, useEffect } from 'react';
import { Vibration } from 'react-native';
import { Layout, Text } from 'react-native-ui-kitten';
import { RNCamera } from 'react-native-camera';
import Permissions, { PERMISSIONS } from 'react-native-permissions';
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/react-hooks';
import { queries as BookQueries } from '../../store/resources/book';

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
  const [barcodeReadEnabled, setBarcodeReadEnabled] = useState(true);
  const [bottomSheetPosition, setBottomSheetPosition] = useState(
    SNAP_POINTS.INDEX.BOTTOM,
  );
  const cameraRef = useRef(null);
  const [getBookByISBN, { data: bookData, loading, called }] = useLazyQuery(
    BookQueries.GET_BOOK_BY_ISBN,
  );

  useEffect(() => {
    Permissions.check(PERMISSIONS.ANDROID.CAMERA).then(response => {
      setPermission(response);
    });
  }, []);
  useEffect(() => {
    if (bottomSheetPosition === SNAP_POINTS.INDEX.TOP) {
      setBarcodeReadEnabled(false);
      return;
    }
    if (!barcodeReadEnabled) setBarcodeReadEnabled(true);
  }, [barcodeReadEnabled, bottomSheetPosition]);

  const toggleFlash = () => {
    setFlash(!flash);
  };

  const handleBarcodeScan = ({ data }) => {
    if (!barcodeReadEnabled) return;
    if (data !== bookISBN) {
      setBookISBN(data);
      setBottomSheetPosition(SNAP_POINTS.INDEX.MIDDLE);
      getBookByISBN({ variables: { ISBN: data } });
      Vibration.vibrate(100);
    }
  };
  const handleBottomSheetClose = () => {
    setBottomSheetPosition(SNAP_POINTS.INDEX.BOTTOM);
    setBookISBN('');
  };
  const BottomSheetContentComponent = () => {
    if (!called) return null;
    if (called && loading) return <Text>Loading</Text>;
    if (!bookData) return null;
    return <BookInfo book={bookData.getBookByISBN}></BookInfo>;
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
        ContentComponent={<BottomSheetContentComponent />}
        onCloseEnd={handleBottomSheetClose}
      />
      <StyledRNCamera
        ref={cameraRef}
        type="back"
        autoFocus="on"
        captureAudio={false}
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
