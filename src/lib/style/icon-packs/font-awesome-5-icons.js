import React from 'react';
import { StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

const createIconsMap = () => {
  const proxyHandler = {
    get(_, name) {
      return IconProvider(name);
    },
  };
  return new Proxy({}, proxyHandler);
};

const FontAwesome5Icon = ({ name, style }) => {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return <Icon name={name} size={height} color={tintColor} style={iconStyle} />;
};

const IconProvider = name => ({
  toReactElement: props => FontAwesome5Icon({ name, ...props }),
});

export const FontAwesome5IconPack = {
  name: 'font-awesome-5',
  icons: createIconsMap(),
};
