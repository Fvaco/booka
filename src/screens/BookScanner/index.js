import React, { useState, useRef, useEffect } from 'react';
import { Layout, Icon, Button, Text } from 'react-native-ui-kitten';
import { RNCamera } from 'react-native-camera';
import * as Animatable from 'react-native-animatable';
import BottomSheet from 'reanimated-bottom-sheet';
import Permissions, { PERMISSIONS } from 'react-native-permissions';
import { light } from '@eva-design/eva';

export const ROUTER_KEY_BOOK_SCANNER = 'BookScanner';

const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

export const BookScanner = () => {
  const [flash, setFlash] = useState('off');
  const [isbn, setIsbn] = useState('');
  const [zoom, setZoom] = useState(0);
  const [autoFocus, setAutoFocus] = useState('on');
  const [type, setType] = useState('back');
  const [permission, setPermission] = useState('undetermined');
  const cameraRef = useRef(null);
  const scanIconRef = useRef(null);
  useEffect(() => {
    Permissions.check(PERMISSIONS.ANDROID.CAMERA).then(response => {
      setPermission(response);
    });
  }, []);

  const toggleFlash = () => {
    setFlash(!flash);
  };
  const zoomOut = () => {
    setZoom(zoom - 0.1 < 0 ? 0 : zoom - 0.1);
  };
  const zoomIn = () => {
    setZoom(zoom + 0.1 > 1 ? 1 : zoom + 0.1);
  };
  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
    }
  };
  const renderContent = () => (
    <Layout style={{ backgroundColor: 'white', height: '100%', padding: 15 }}>
      <Text>Content</Text>
    </Layout>
  );

  const renderHeader = () => (
    <Layout
      style={{
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
      }}>
      <Layout
        style={{
          borderRadius: 10,
          height: 5,
          width: 50,
          backgroundColor: 'lightgray',
        }}
      />
    </Layout>
  );
  return (
    <Layout style={{ flex: 1 }}>
      <Layout
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          padding: 20,
          zIndex: 1,
          backgroundColor: 'transparent',
        }}>
        <Layout
          style={{
            flex: 1,
            position: 'relative',
            borderWidth: 2,
            borderColor: 'whitesmoke',
            borderRadius: 10,
            backgroundColor: 'transparent',
          }}>
          <AnimatedScanIcon />
        </Layout>
      </Layout>
      <BottomSheet
        snapPoints={['100%', 200, 0]}
        initialSnap={1}
        renderContent={renderContent}
        renderHeader={renderHeader}
      />
      <RNCamera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={type}
        autoFocus={autoFocus}
        flashMode={flash}
        onBarCodeRead={({ data }) => {
          if (data !== isbn) {
            console.log(`New ISBN is ${data} old one was ${isbn}`);
            setIsbn(data);
          }
        }}
      />
    </Layout>
  );
};

const AnimatedScanIcon = () => (
  <AnimatedIcon
    animation="flash"
    easing="ease-in-out-cubic"
    iterationCount="infinite"
    name="barcode-scan"
    style={{
      color: light['color-danger-700'],
      position: 'absolute',
      top: 15,
      left: 15,
      fontSize: 24,
    }}
  />
);
