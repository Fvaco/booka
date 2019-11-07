import React from 'react';
import { StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const createIconsMap = () => {
  const proxyHandler = {
    get(_, name) {
      return IconProvider(name);
    },
  };
  return new Proxy({}, proxyHandler);
};

const MaterialCommunityIcon = ({ name, style }) => {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return <Icon name={name} size={height} color={tintColor} style={iconStyle} />;
};

const IconProvider = name => ({
  toReactElement: props => MaterialCommunityIcon({ name, ...props }),
});

export const MaterialCommunityIconPack = {
  name: 'material-community',
  icons: createIconsMap(),
};
