import React from 'react';
import { SafeAreaView } from 'react-native';
import { Text, Layout } from 'react-native-ui-kitten';
import { RNCamera } from 'react-native-camera';

export const ROUTER_KEY_BOOK_SCANNER = 'BookScanner';

export const BookScanner = () => {
  return (
    <SafeAreaView>
      <Layout
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'black',
        }}>
        <RNCamera
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
          type={RNCamera.Constants.Type.back}
          style={{
            flex: 1,
            backgroundColor: 'red',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        />
      </Layout>
    </SafeAreaView>
  );
};

BookScanner.navigationOptions = () => ({
  header: null,
});
