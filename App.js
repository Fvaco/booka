import React from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';
import { FontAwesome5IconPack } from './src/lib/style/icon-packs/font-awesome-5-icons';
import { MaterialCommunityIconPack } from './src/lib/style/icon-packs/material-community-icons';

import { AppRouter } from './router';

const App = () => (
  <>
    <IconRegistry icons={[MaterialCommunityIconPack]} />
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <AppRouter />
    </ApplicationProvider>
  </>
);

export default App;
