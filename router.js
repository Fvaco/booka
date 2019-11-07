import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { light } from '@eva-design/eva';

import { ROUTER_KEY_BOOK_LIST, BookList } from './src/screens/BooksList';
import {
  ROUTER_KEY_BOOK_SCANNER,
  BookScanner,
} from './src/screens/BookScanner';

const MainNavigator = createStackNavigator(
  {
    [ROUTER_KEY_BOOK_LIST]: { screen: BookList },
    [ROUTER_KEY_BOOK_SCANNER]: { screen: BookScanner },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: light['color-primary-500'],
      },
      headerTintColor: light['color-primary-100'],
      headerTitleStyle: {
        color: light['color-primary-100'],
        fontWeight: 'bold',
      },
    },
  },
);

export const AppRouter = createAppContainer(MainNavigator);
