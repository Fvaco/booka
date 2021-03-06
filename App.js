import React from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';
import { MaterialCommunityIconPack } from './src/lib/style/icon-packs/material-community-icons';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppRouter } from './router';
import { createHttpLink } from 'apollo-link-http';

const link = createHttpLink({
  uri: 'https://zen-mahavira-6af357.netlify.com/.netlify/functions/graphql/',
});
const client = new ApolloClient({
  uri: 'https://zen-mahavira-6af357.netlify.com/.netlify/functions/graphql/',
  cache: new InMemoryCache(),
  link,
});

const App = () => (
  <ApolloProvider client={client}>
    <IconRegistry icons={[MaterialCommunityIconPack]} />
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <AppRouter />
    </ApplicationProvider>
  </ApolloProvider>
);

export default App;
